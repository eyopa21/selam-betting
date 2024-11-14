<script setup lang="ts">
const { $authentication } = useNuxtApp()
const { formatDate } = useHelpers()
const isOpen = ref(false)
const { data, error, status, execute } = useLazyFetch('/api/contact/get-my-tickets', {
  immediate: false,
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div>
    <q-btn label="My Chat History" color="primary" @click="isOpen = true; execute()" />

    <q-dialog v-model="isOpen" transition-show="rotate" transition-hide="rotate">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 tw-font-semibold tw-uppercase">
            Chat History
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="status === 'pending'">
            <SkeletonsChat />
          </div>
          <div v-else class="q-pa-md row justify-center tw-bg-gray-100">
            <div v-for="i in data?.results" :key="i.id" style="width: 100%; ">
              <q-chat-message
                v-if="i.user"
                :name="`${i.subject} (me)`"
                :text="[i.description]"
                sent
                :stamp="formatDate(i.created_at)"
              />
              <q-chat-message
                v-else
                name="Harif sport"
                avatar="/bot.avif"
                :text="[i.description]"
                :stamp="formatDate(i.created_at)"
              />
            </div>
          </div>
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn v-close-popup flat label="Decline" color="primary" />
          <q-btn v-close-popup flat label="Accept" color="primary" />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>
