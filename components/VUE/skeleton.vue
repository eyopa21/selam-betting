<template>
  <div class="q-pa-md tw-w-full">
   
     <div>
      <div v-for="i in 10" :key="i">
         <q-skeleton animation="blink" type="text" width="100%" height="20px" />
      </div>
     </div>
  
  </div>
</template>