<script setup lang="ts">
import AuthImg from '../VUE/authImg.vue'

const config = useRuntimeConfig()
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
const selectedAttachment = ref('')
const showAttachmentModal = computed(() => {
  return !!selectedAttachment.value
})
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
              >
                <template #avatar>
                  <a v-if="i.attachment" class="tw-cursor-pointer tw-transition-all tw-duration-500 hover:tw-scale-105" @click="selectedAttachment = `${i.attachment}`">
                    <q-icon name="attachment" class="tw-size-8 tw-p-4" size="lg" />
                  </a>
                </template>
              </q-chat-message>
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

    <q-dialog v-model="showAttachmentModal" persistent transition-show="scale" transition-hide="scale">
      <q-card class=" text-black" style="width: 600px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 tw-font-bold">
            Attachment
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <AuthImg v-if="selectedAttachment" :url="selectedAttachment" />
          <div v-else>
            Failed to load the image right nows
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="close" @click="selectedAttachment = ''" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
