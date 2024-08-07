<template>
    <div>
        <q-layout view="lHh LpR fff" class="dark:tw-bg-primary-800">
            <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
                <Header />
            </q-header>
            <div class="tw-pt-16">
                <slot />
            </div>
            </q-layout>
    </div>
</template>