<template>
  <div class=" tw-p-8 tw-px-4">
    <div class="q-pa-md tw-w-full tw-rounded-xl tw-bg-white">
      <q-list bordered>
        <div v-for="i in 4" :key="i">
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="First"
            default-opened
            header-class="text-primary !tw-border-b"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </div>
      </q-list>
    </div>
  </div>
</template>
