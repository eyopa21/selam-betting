import { useQuasar } from "quasar";
import type { NuxtError } from "#app";
import { FetchError } from "ofetch";

export function useErrorNotifications(
  error: Ref<NuxtError> | Ref<FetchError | null>
) {
  const $q = useQuasar();

  if (error.value && error.value.statusCode === 401) {
    error.value.message = error.value.message;
  }

  $q.notify({
    message: error.value?.message,
  });
}
