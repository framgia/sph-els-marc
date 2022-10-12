import { axiosClient } from './axiosClient'

const submitLogin = async (user, pass) => {
  try {
    const response = await axiosClient.post('dj-rest-auth/login/', {
      username: user,
      password: pass,
    })
    localStorage.setItem('token', response.data.key)
    const inforesp = await getLoggedInInfo()
    if (response.status === 200 && inforesp.status === 200) {
      const { data } = inforesp
      data['accessToken'] = localStorage.getItem('token')
      const profileresp = await getProfileInfo(inforesp.data.pk)
      if (profileresp.status === 200) {
        const profiledata = profileresp.data
        data['is_admin'] = profiledata.user.is_superuser
        localStorage.setItem('user', JSON.stringify(data))
        return [data, response]
      }
    }
  } catch (error) {
    console.error(`Error encountered while logging in: ${error}`)
    return ['', error]
  }
}

const submitRegister = async (user, email, pass1, pass2) => {
  try {
    const response = await axiosClient.post('dj-rest-auth/registration/', {
      username: user,
      password1: pass1,
      password2: pass2,
      email: email,
    })
    localStorage.setItem('token', response.data.key)
    const inforesp = await getLoggedInInfo()
    console.log(inforesp)
    if (response.status === 201 && inforesp.status === 200) {
      const { data } = inforesp
      data['accessToken'] = localStorage.getItem('token')
      const profileresp = await getProfileInfo(inforesp.data.pk)
      console.log(profileresp)
      if (profileresp.status === 200) {
        const profiledata = profileresp.data
        data['is_admin'] = profiledata.user.is_superuser
        localStorage.setItem('user', JSON.stringify(data))
        return [data, response]
      }
    }
  } catch (error) {
    console.error(`Error encountered while logging in: ${error}`)
    return ['', error]
  }
}

const getLoggedInInfo = async () => {
  const response = await axiosClient.get('dj-rest-auth/user/')
  return response
}

const getProfileInfo = async (id) => {
  const response = await axiosClient.get(`profile/${id}/`)
  return response
}

const submitLogout = async () => {
  const response = await axiosClient.post('dj-rest-auth/logout/')
  return response
}

export { submitLogin, submitRegister, submitLogout, getLoggedInInfo }
