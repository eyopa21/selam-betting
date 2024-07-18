<template>
    <div >
        <h3 class="tw-text-2xl tw-font-bold tw-text-primary-700 tw-text-center">
            Forgot password
        </h3>
        <q-form @submit="onSendOtp" class="q-gutter-md tw-my-8">
            <q-input dense outlined v-model="state.email" label="Your email" lazy-rules
                :rules="[(val: string) => (val && validateEmail(val)) || 'Invalid email']" />
            <q-btn label="Send Code" type="submit"
                class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold"
                :loading="loading" />
        </q-form>
        <hr class="tw-text-gray-700 tw-py-4" />
        <p class="tw-text-gray-500 text-center">
            Go back to
            <span class="tw-text-[#8E203A] tw-cursor-pointer">sign in</span>
        </p>
    </div>
</template>


<script setup lang="ts">
const $q = useQuasar();

const { login, loading, error, sendOtp, resetPassword } = useAuth();
const state = ref({
    email: ''
})

const isOtpSent = useCookie('otpSent');
const onSendOtp = async () => {
    const res = await sendOtp(state.value.email);
    console.log("resi", res);
    if (res.error) {
        $q.notify({
            message: `${res?.error}`,
            color: "red",
        });
    } else if (res.message) {
        $q.notify({
            message: `${res?.message}`,
            color: "green",
        });
        isOtpSent.value = state.value.email
        
    }

};
</script>