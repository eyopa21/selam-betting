export default function () {
    return useState('layout', () => {
        return {
            mainLoader: false,
            showDrawer: true,
            miniState: true
        }
    })
}
