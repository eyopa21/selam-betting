<script setup lang="ts">
definePageMeta({
  layout: 'account',
})
</script>

<template>
  <div>
    <di class="tw-flex tw-justify-between tw-text-primary-500">
      <div class="tw-pl-4 tw-font-bold">
        <h4 class="tw-text-lg">
          Account settings
        </h4>
        <p>Additional website features available</p>
      </div>
      <div
        class="tw-w-cover tw-flex tw-place-content-center tw-items-center tw-justify-end tw-gap-16 tw-border tw-bg-white tw-px-2 "
      >
        <span class="tw-text-base tw-font-semibold">Sign out on all devices </span>
        <q-btn glossy color="primary" class="tw-h-4">
          <span class="text-white tw-text-sm tw-font-bold">
            <q-icon name="logout" color="red" /> SIGN OUT
          </span>
        </q-btn>
      </div>
    </di>
    <div class="tw-mt-6 tw-flex tw-w-full tw-justify-between tw-gap-4 tw-px-4">
      <div class="tw-flex tw-w-1/2 tw-flex-col tw-gap-2">
        <div class="tw-w-full tw-bg-white tw-p-2 tw-px-8 tw-text-primary-500">
          <h5 class="tw-text-base tw-font-bold">
            Mailing list
          </h5>
          <p>Send via email</p>
          <div class="tw-flex tw-flex-col tw-text-base tw-font-bold">
            <q-toggle label="News about events" />
            <q-toggle label="Deposit notifications" />
            <q-toggle label="My bet outcomes" />
          </div>
        </div>
        <div class="tw-w-full tw-bg-white tw-p-2 tw-px-8 tw-text-primary-500">
          <h5 class="tw-text-base tw-font-bold">
            Account
          </h5>
          <p>Send via email</p>
          <div class="tw-flex tw-flex-col tw-text-base tw-font-bold">
            <q-toggle label="Show balance on top panel" />
            <q-toggle label="Email Sign in" />
            <q-toggle label="QR code Sign in" />
          </div>
        </div>
        <div class="tw-w-full tw-bg-white tw-p-4 tw-px-8 tw-pb-8 tw-text-primary-500">
          <h5 class="tw-text-base tw-font-bold">
            Account
          </h5>
          <p>Get an extra bonus!</p>
          <div class="tw-flex tw-w-full tw-gap-4  tw-text-base tw-font-bold">
            <q-input outlined label="First name" class=" tw-w-full" />
            <q-btn color="orange-4">
              CHECK
            </q-btn>
          </div>
        </div>
      </div>
      <div class="tw-flex tw-w-1/2 tw-flex-col tw-gap-2">
        <div class="tw-w-full tw-bg-white tw-p-2 tw-px-8 tw-text-primary-500">
          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-flex tw-flex-col">
              <p>
                Two-factor authentication
              </p>
              <p>
                Extract protection for your account
              </p>
            </div>
            <div>
              <q-btn color="orange-4">
                ENABLE
              </q-btn>
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-bg-white tw-p-2 tw-px-4 tw-pb-8 tw-text-primary-500">
          <h5 class="tw-mb-4 tw-text-base tw-font-bold">
            BONUSES
          </h5>
          <div class="tw-flex tw-items-start  tw-justify-between tw-gap-6">
            <div class="tw-flex tw-w-1/2  tw-flex-col">
              <div class="tw-flex tw-items-center tw-gap-4 tw-bg-primary-600 tw-p-2 tw-text-white">
                <q-icon name="sports_soccer" size="xl" />
                <div>
                  <p class="tw-font-bold">
                    Bonus for sports betting
                  </p>

                  <p>Welcome bonus on your 1st deposit up to 5,000 ETB</p>
                </div>
              </div>
              <div
                class=" tw-flex tw-items-center tw-gap-4 tw-border-2 tw-border-primary-500 tw-p-2 tw-text-primary-500"
              >
                <q-icon name="do_disturb_alt" size="xl" />
                <div>
                  <p class="tw-font-bold">
                    Reject bonuses
                  </p>
                  <p>Make your selection later</p>
                </div>
              </div>
            </div>
            <div class="tw-w-1/2">
              <ul class="tw-list-disc tw-space-y-2">
                <li>
                  Regardless of the bonus type chosen, customers are entitled to participate in other
                  promotions offered by the company. This does not include deposit bonuses that are
                  subject to wagering bonus funds by placing certain types of bets on sports events.
                </li>
                <li>
                  By rejecting bonuses, you automatically reject all other promotions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
