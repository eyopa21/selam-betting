<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const termsAndPolicy = ref(false)
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-pl-4 tw-font-bold">
      <h4 class="tw-text-lg">
        Become an affiliate and start earning!
      </h4>
      <p>Build a multi-level network by inviting your friends who in turn will refer their friends</p>
    </div>

    <div class="tw-ml-4 ">
      <div class="tw-mt-6 tw-h-full tw-w-2/3 tw-bg-white tw-p-4">
        <h5 class="tw-text-xl tw-font-bold">
          How does it work?
        </h5>
        <ul class="prose tw-list-disc tw-space-y-2 tw-p-4 tw-text-base tw-font-semibold">
          <li>
            You invite your friends.
          </li>
          <li>
            Your friends register, deposit funds, and place bets..
          </li>
          <li>
            You receive your reward!.
          </li>
        </ul>
        <p class="tw-text-base tw-font-semibold">
          As you refer friends, you build a multi-level network. At each
          level you'll earn a percentage of the
          HarifSport net profit:
        </p>
        <div class="tw-m-1 tw-mt-4">
          <q-checkbox v-model="termsAndPolicy" dense>
            <span class="tw-text-[15px] tw-text-gray-500">I accept the Terms and Conditions</span>
          </q-checkbox>
        </div>
        <div class="tw-mt-16">
          <q-btn color="red-10" class="tw-w-full tw-py-3">
            TAKE PART
          </q-btn>
        </div>
      </div>
      <div class="tw-mt-4">
        <WithdrawSendMoneyToFriend />
      </div>
    </div>
  </div>
</template>
