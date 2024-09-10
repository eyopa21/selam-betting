export default function () {
  return useState('layout', () => {
    return {
      mainLoader: false,
      showLeftDrawer: false,
      showRightDrawer: true,
      leftMiniState: false,
      rightMiniState: false,
      showLogin: false,
      showRegister: false,
      showSideBarProfileMenu: false,
    }
  })
}
