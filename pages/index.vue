<template>
  <div class="tw-grid tw-grid-cols-12 w-full custom-container tw-gap-4 tw-py-8">
    <div class="tw-col-span-2 tw-hidden lg:tw-block">
      <div class="tw-sticky tw-top-24">
        <HomeFilter />
      </div>
    </div>
    <div class="lg:tw-col-span-8 tw-col-span-12">
      <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />
      <GamesList />
    </div>
    <div class="tw-col-span-2 tw-hidden lg:tw-block">
      <div class="tw-sticky tw-top-24">
        <Slips />
      </div>
    </div>
  </div>
</template>
