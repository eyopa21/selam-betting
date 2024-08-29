import { useQuasar } from 'quasar'
import type { NuxtError } from '#app'


export function useErrorNotifications(error: Ref<NuxtError> | unknown) {
    const $q = useQuasar()
   // console.log("errororororrrrrrrrrrrrrrrrrrrr", error);
    if(error.value.statusCode === 401)
{
    error.value.message = 'Token is missing'
}

    $q.notify({
       message: error.value.message
   })
}
