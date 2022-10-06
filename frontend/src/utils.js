import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const dateFormatter = (dateString) => {
  const timeAgo = new TimeAgo('en-US')

  return timeAgo.format(new Date(dateString), 'mini')
}

export { dateFormatter }
