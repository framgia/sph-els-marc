export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {
      Authorization: "Basic " + user.accessToken,
      WithCredentials: true,
    };
  } else {
    return {};
  }
}
