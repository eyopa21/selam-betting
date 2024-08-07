<script setup lang="ts">
definePageMeta({
    layout: 'casino'
})
const slide = ref('1')
const games = ref([
    {
        image: 'https://client.qtlauncher.com/images/?id=1x2-plinkogo_en_US&type=logo-square&version=1677489299406',
        name: 'Plinko Go',
        link: 'https://client.qtlauncher.com/client/game-launcher.html#/?gameSession=36ad70595ac14a55b324c992c7afb87b-CIS&amp;hideSplash=true'
    }, {
        image: 'https://client.qtlauncher.com/images/?id=GLX-fmines_en_US&type=logo-square&version=1692005766333',
        name: 'F Mines',
        link: "https://fg-launcher-api.ffaassttyy-54rg78cw.com/?PartnerId=CF76253AC5DF2E930A950C189E35F281&amp;culture=en&amp;Mode=2&amp;gameType=Mines&amp;isMobile=true&amp;IsDemo=true"
    },
    {
        image: 'https://client.qtlauncher.com/images/?id=TRB-aero_en_US&type=logo-square&version=1701153611058',
        name: 'hello',
        link: 'https://client.qtlauncher.com/client/game-launcher.html#/?gameSession=c6459495-20ec-4125-a267-d8f3a44093cc&amp;hideSplash=true'
    }, {
        image: 'https://client.qtlauncher.com/images/?id=GMC-footballfreestyler_en_US&type=logo-square&version=1715673674871',
        name: 'hello',
        link: 'https://client.qtlauncher.com/client/game-launcher.html#/?gameSession=543c5434-7d9a-4dda-90ef-bc6a43f31483&hideSplash=true'
    }, {
        image: 'https://client.qtlauncher.com/images/?id=SPB-hilo_en_US&type=logo-square&version=1671525909235',
        name: 'hello',
        link: 'https://client.qtlauncher.com/client/game-launcher.html#/?gameSession=49cdb228-8dba-4382-991f-e5efb838bcc6&hideSplash=true'
    }, {
        image: 'https://client.qtlauncher.com/images/?id=RED-alexanderthegreatworldconqueror_en_US&type=logo-square&version=1684145060701',
        name: 'hello',
        link: 'https://client.qtlauncher.com/client/game-launcher.html#/?gameSession=f97ed8ffb04647f88f12b376725593a1-CIS&hideSplash=true'
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-bookofthefallen_en_US&type=logo-square&version=1664534218304',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=WAZ-burningstars3_en_US&type=logo-square&version=1671629244294',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=GZX-bookofcairo_en_US&type=logo-square&version=1663271874047',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=1x2-disco777_en_US&type=logo-square&version=1662575710450',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=NLC-fireintheholexbomb_en_US&type=logo-square&version=1683223361283',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-fruitparty_en_US&type=logo-square&version=1668596261144',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=KGL-goldtracker7s_en_US&type=logo-square&version=1690366810894',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=NLC-folsomprison_en_US&type=logo-square&version=1655284194010',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=OPY-foresttreasures_en_US&type=logo-square&version=1710228210833',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-fruitparty2_en_US&type=logo-square&version=1668596625406',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-hottoburn_en_US&type=logo-square&version=1668608315631',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-johnhunterandthemayangods_en_US&type=logo-square&version=1668683586324',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=GMC-lukeechanceandthebookofluck_en_US&type=logo-square&version=1696431217748',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-shininghot100_en_US&type=logo-square&version=1658249402144',
        name: 'hello',
        link: ''
    }, {
        image: 'https://client.qtlauncher.com/images/?id=PPC-shininghot40_en_US&type=logo-square&version=1658249173497',
        name: 'hello',
        link: ''
    }

])


</script>

<template>
    <div class="tw-mx-auto">
        <div class="tw-p-4 ">
            <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" infinite animated
                control-color="white" navigation padding arrows height="300px" :autoplay="true"
                class="text-white shadow-1 tw-rounded-3xl rounded-border">
                <q-carousel-slide name="1" img-src="/images/image 63.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="6" img-src="/images/image 64.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="7" img-src="/images/image 65.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="2" img-src="/images/Fenan pay.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="3" img-src="/images/Fly emrates.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="4" img-src="/images/Pepsi banner.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
                <q-carousel-slide name="5" img-src="/images/ITSC banner.png"
                    class="tw-w-full tw-h-full"></q-carousel-slide>
            </q-carousel>
        </div>
        <div class="tw-flex tw-justify-center">
            <q-tabs narrow-indicator dense align="justify" class="text-white">
                <q-route-tab name="mails" icon="home" label="LOBBY" />
                <q-route-tab name="virtual" icon="add_to_queue" label="VIRTUAL" />
                <q-route-tab name="league" icon="api" label="HARIFSPORT LEAGUE" />
                <q-route-tab name="crash" icon="videogame_asset" label="CRASH GAMES" />
                <q-route-tab name="mines" icon="emoji_events" label="MINES" />
                <q-route-tab name="instant" icon="casino" label="INSTANT WINS" />
                <q-route-tab name="keno" icon="flight_takeoff" label="KENO" />
                <q-route-tab name="plinko" icon="directions_boat_filled" label="PLINKO" />
                <q-route-tab name="roulette" icon="directions_car_filled" label="ROULETTE" />
                <q-route-tab name="slots" icon="fort" label="SLOTS" />
                <q-route-tab name="virtual_games" icon="directions_boat_filled" label="VIRTUAL GAMES" />

            </q-tabs>
        </div>
        <div class="tw-flex tw-mt-6 tw-justify-center tw-gap-4">

            <q-input outlined standout="text-blue-grey-5" input-class="text-white" label="Search for your Games"
                class="tw-bg-primary-700 tw-w-72">
                <template v-slot:prepend>
                    <q-icon name="search" color="blue-grey-2" />
                </template>
            </q-input>
            <q-btn color="primary" label="Let's Look" text-color="blue-grey-2" />


        </div>
        <div class="tw-p-8">
            <div class="tw-grid tw-grid-cols-4 tw-gap-4">
                <div v-for="(i, key) in games" :key="key"
                    class="tw-relative hover:-tw-translate-y-2 tw-transition-all tw-duration-500">
                    <div class="tw-absolute tw-right-0">
                        <q-btn flat round color="white" icon="favorite_outline"
                            class="hover:tw-scale-110 tw-transition-all tw-duration-500" />
                    </div>
                    <img :src="i.image" :alt="i.name" class="tw-rounded">
                    <div class="tw-flex tw-mt-2 tw-space-x-4 tw-justify-between tw-w-full">
                        <q-btn color="primary" label="Play" class="tw-w-full" " />
                        <q-btn color=" black" label="Practice" class="tw-w-full tw-hidden lg:tw-block" />

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>