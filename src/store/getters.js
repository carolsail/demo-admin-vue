const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  user: state => {
    return {
      id: state.user.id,
      name: state.user.name,
      avatar: state.user.avatar
    }
  }
}
export default getters
