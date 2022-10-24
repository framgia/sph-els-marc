import { rest } from 'msw';

const URL = process.env.REACT_APP_BASE_URL;
const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;

export const handlers = [
  rest.post(`${URL}dj-rest-auth/login/`, (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'elearning-admin' && password === 'wsx123') {
      return res(
        ctx.status(200),
        ctx.json({
          key: '12345',
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          non_field_errors: ['Unable to log in with provided credentials.'],
        })
      );
    }
  }),

  rest.get(`${URL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pk: 1,
        username: 'elearning-admin',
        email: 'elearning-admin@elearning.dev',
        first_name: 'From Mock Service',
        last_name: 'Administrator',
      })
    );
  }),

  rest.get(`${URL}profile/1/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        bio: "I'm admin",
        user: {
          first_name: 'From Mock Service',
          last_name: 'Administrator',
          is_superuser: true,
          username: 'elearning-admin',
          email: 'elearning-admin@elearning.dev',
        },
        follower_count: 0,
        following_count: 0,
        is_profile_updated: true,
        following: [],
        followers: [],
        lessons_learned: 1,
        words_learned: 2,
        profile_picture: `${MEDIA_URL}profile_pictures/elearning-admin/painting.jpg`,
      })
    );
  }),

  rest.get(`${URL}activities/1/0/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user_id: 1,
        activities: [
          {
            user_id: 1,
            user_name: 'elearning-admin',
            activity_type: 'quiz',
            user_profile_picture: `${MEDIA_URL}profile_pictures/elearning-admin/painting.jpg`,
            category_taken: 'Basic 3 Words',
            category_id: 1,
            score: 2,
            total: 3,
            created_at: '2022-09-28T18:42:23.331893',
          },
        ],
      })
    );
  }),

  rest.get(`${URL}words_learned/`, (req, res, ctx) => {
    //const { query } = req.query;
    //?user_profile_taker_id=1&is_correct=true&page=1
    const user_profile_taker_id = req.url.searchParams.get(
      'user_profile_taker_id'
    );
    const is_correct = req.url.searchParams.get('is_correct');
    const page = req.url.searchParams.get('page');
    if (
      user_profile_taker_id === '1' &&
      is_correct === 'true' &&
      page === '1'
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          next: null,
          previous: null,
          page_size: 5,
          total_pages: 1,
          count: 2,
          results: [
            {
              word_taken: '本',
              correct_answer: 'Boy',
              is_correct: true,
            },
            {
              word_taken: 'ベッド',
              correct_answer: 'Bed',
              is_correct: true,
            },
          ],
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          non_field_errors: ['Unable to get words learned.'],
        })
      );
    }
  }),
];
