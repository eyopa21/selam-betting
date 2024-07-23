
<script setup lang="ts">

const $q = useQuasar();
const layout = useLayout();

const props = defineProps<{
    email: string
}>()
const { register, error, loading, verifyOtp } = useAuth();
const State = ref({
    otp: ''
})
const verifyOTP = async () => {
   
    verifyOtp(props.email, State.value.otp).then(res => {
        if (res?.error) {
            $q.notify({
                message: res?.error,
                color: "red",
            });
        } else {
            layout.value.showRegister = false
            layout.value.showLogin = true
            $q.notify({
                message: "Registered successfully!",
                color: "green",
            });
        }
    }).catch(error => {
        $q.notify({
            message: error,
            color: "red",
        });
    })



};

</script>


<template>
    <div>
        <q-icon name="mail"
            class="tw-flex tw-justify-center tw-text-9xl tw-aspect-square tw-text-primary-700 tw-w-full mx-auto" />
        <p class="tw-text-gray-700 tw-font-semibold tw-text-center tw-text-3xl">
            Please check your email 
        </p>
        <p class="tw-text-gray-500 tw-text-center tw-text-md tw-font-semibold tw-my-4">
            We've sent a code to {{ props.email }}
        </p>
        <q-form @submit="verifyOTP" class="q-gutter-md tw-my-8">
            <q-input dense outlined v-model="State.otp" label="Code" lazy-rules class="tw-my-4" />
            <q-btn :loading="loading" label="Verify" type="submit"
                class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold tw-my-2" />
        </q-form>
        <p class="tw-text-center tw-text-gray-600">
            Go back to
            <span class="tw-text-[#8E203A] tw-cursor-pointer">Sign up</span>
        </p>
    </div>
</template>