const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  keys: state => state.user.keys,
  loadings: state => state.loading.loadings,
  baseData: state => state.global.baseData,
  newRouter: state => state.permission.newRouter
}
export default getters
