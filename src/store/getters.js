const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  csrftoken: state => state.user.csrftoken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  user: state => state.user.user,
  is_superuser: state => state.user.is_superuser
}
export default getters
