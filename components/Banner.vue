<template>
    <div class="banner-container">
        <div class="side-banner-container left" v-show="showAds">
            <a class="ads-row" :href="value.url" target="_blank" v-for="(value, index) in adsLeft" :key="index" @click="updateAdsImageClick(value)">
                <nuxt-img :src="value.picture" :alt="value.name" />
            </a>
            <nuxt-img format="webp" src="/left.png" alt="loader" />
            <div class="close-ads" @click="showAds = false" v-show="adsLeft.length > 0"><b-icon-x-lg /></div>
        </div>
        <div class="mid-banner-container">
            <a class="ads-row" :href="value.url" target="_blank" v-for="(value, index) in adsCenter" :key="index" @click="updateAdsImageClick(value)">
                <nuxt-img :src="value.picture" :alt="value.name" />
            </a>
            <nuxt-img format="webp" src="/center.png" alt="loader" />
            <nuxt-img format="webp" src="/center.png" alt="loader" />
            <nuxt-img format="webp" src="/center.png" alt="loader" />
            <nuxt-img format="webp" src="/center.png" alt="loader" />
        </div>
        <div class="side-banner-container right" v-show="showAds">
            <a class="ads-row" :href="value.url" target="_blank" v-for="(value, index) in adsRight" :key="index" @click="updateAdsImageClick(value)">
                <nuxt-img :src="value.picture" :alt="value.name" />
            </a>
            <nuxt-img format="webp" src="/left.png" alt="loader" />
            <div class="close-ads" @click="showAds = false" v-show="adsRight.length > 0"><b-icon-x-lg /></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            // adsLeft: [],
            // adsCenter: [],
            // adsRight: [],
            showAds: true,
        };
    },
    created() {
        // this.getAds();
    },
    computed: {
        ...mapState({
            adsLeft: (state) => state.adsLeft,
            adsCenter: (state) => state.adsCenter,
            adsRight: (state) => state.adsRight,
        }),
    },
    mounted() {},
    methods: {
        async getAds() {
            const data = await this.$axios.$get("movie/ads?pagename=all");
            if (data.code == 200) {
                // console.log(data);
                this.adsLeft = data.result["Top-Left"];
                this.adsCenter = data.result["Top-Center"];
                this.adsRight = data.result["Top-Right"];
            }
        },
    },
};
</script>

<style>
</style>
