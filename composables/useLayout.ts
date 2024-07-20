export default function () {
    return useState('layout', () => {
        return {
            mainLoader: false,
            showDrawer: false,
            miniState: true,
            showLogin: false,
            showRegister: false
        }
    })
}
