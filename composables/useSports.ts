export const useSports = async () => {
    console.log("this is composable");

    const { $api } = useNuxtApp()
    return await $api.sports.getSports();
}
