<template>
  <div class="tw-grid tw-grid-cols-12 w-full custom-container tw-gap-4 tw-py-8">
    <div class="tw-col-span-2 tw-hidden lg:tw-block">
      <HomeFilter />
    </div>
    <div class="lg:tw-col-span-8 tw-col-span-12">
      <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />
      <GamesList />
    </div>
    <div class="tw-col-span-2 tw-hidden lg:tw-block">
      <Slips />
    </div>
  </div>
</template>
