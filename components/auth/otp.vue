<template>
    <div >
        <q-icon  name="mail"
            class="tw-flex tw-justify-center tw-text-9xl tw-aspect-square tw-text-primary-700 tw-w-full mx-auto" />
        <p class="tw-text-gray-700 tw-font-semibold tw-text-center tw-text-3xl">
            Please check your email
        </p>
        <p class="tw-text-gray-500 tw-text-center tw-text-md tw-font-semibold tw-my-4">
            We've sent a code to {{ props.email }}
        </p>
        <q-form @submit="onResetPassword" class="q-gutter-md tw-my-8">
            <q-input dense outlined v-model="state.code" label="Code" lazy-rules class="tw-my-4" />
            <q-input dense outlined v-model="state.newPassword" label="New password" lazy-rules class="tw-my-4"
                :rules="[(val: string) => (validatePassword(val)) || 'Invalid password or Weak Password']" />
            <q-btn :loading="loading" label="Reset" type="submit"
                class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold tw-my-2" />
        </q-form>
        <p class="tw-text-center tw-text-gray-600">
            Go back to
            <span class="tw-text-[#8E203A] tw-cursor-pointer" >Sign in</span>
        </p>
    </div>
</template>

<script setup lang="ts">
const $q = useQuasar();
const layout = useLayout();
const props = defineProps<{
    email: string
}>()
const state = ref({
    code: '',
    newPassword: ''
})

const { loading, resetPassword } = useAuth();
const onResetPassword = async () => {
    const res = await resetPassword(state.value.code, state.value.newPassword);
    if (res && 'error' in res) {
        $q.notify({
            message: `${res.error.Error}`,
            color: "red",
        });
    }
    if (res && 'Message' in res) {
        $q.notify({
            message: res.Message,
            color: "green",
        });
       layout.value.showLogin = false
      
    }
};


</script>