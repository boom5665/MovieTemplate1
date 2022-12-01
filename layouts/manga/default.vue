<template>
    <div>
        <b-container>
            <!-- <Banner /> -->
            <div class="text-center">
                <b-navbar-brand to="/"><nuxt-img format="webp" :src="logo" width="286" height="150" :alt="SEOTitle" /></b-navbar-brand>
                <!-- <h2 class="web-title">หนังใหม่ล่าสุด</h2> -->
                <!-- <h3 class="web-slogan">{{ slogan }}</h3> -->
            </div>
            <!-- <Poster /> -->
            <HeaderManga />
            <BannerManga />
        </b-container>

        <!-- <div class="full-category-line">
            <nuxt-link to="/" class="cat-btn active">หนังยอดนิยม</nuxt-link>
            <nuxt-link to="/movie/category/action" class="cat-btn">หนังบู๊</nuxt-link>
            <nuxt-link to="/movie/category/comedy" class="cat-btn">หนังตลก</nuxt-link>
            <nuxt-link to="/movie/category/drama" class="cat-btn">หนังดราม่า</nuxt-link>
            <nuxt-link to="/movie/category/horror" class="cat-btn">หนังสยองขวัญ</nuxt-link>
            <nuxt-link to="/movie/category/adventure" class="cat-btn">หนังผจญภัย</nuxt-link>
        </div> -->
        <div style="background-color: #000000ad">
            <b-container>
                <b-row>
                    <!-- <b-col cols="12" md="3" lg="2">
                    <div class="d-none d-sm-block">
                        <CategoryList />
                    </div>
                </b-col> -->
                    <b-col cols="12" md="12" lg="12">
                        <Nuxt />
                    </b-col>
                </b-row>
                <div class="footer-text">
                    <div class="footer-title">{{ slogan }}</div>
                    <div class="footer-content">{{ descriptionFooter }}</div>
                </div>
            </b-container>
        </div>

        <Footer />
        <div class="footer-ads-container" v-show="showAds" v-if="adsBottom.length > 0">
            <div class="inner-container">
                <a class="ads-image" :href="value.url" target="_blank" v-for="(value, index) in adsBottom" :key="index" @click="updateAdsImageClick(value)">
                    <nuxt-img :src="value.picture" :alt="value.name" />
                </a>
                <div class="close-ads" @click="showAds = false">X</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    head() {
        return {
            title: this.SEOTitle,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.SEODescription,
                },
                {
                    name: "keywords",
                    content: ["อ่านหนัง"],
                },
                {
                    property: "og:title",
                    name: "og:title",
                    content: this.SEOTitle,
                },
                {
                    property: "og:description",
                    name: "og:description",
                    content: this.SEODescription,
                },
                {
                    property: "og:url",
                    name: "og:url",
                    content: "https://www.ruaycartoon.com",
                },
                {
                    property: "og:site_name",
                    name: "og:site_name",
                    content: "ruaycartoon",
                },
                {
                    property: "og:image",
                    name: "og:image",
                    content: this.logo,
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: this.icon }],
        };
    },
    data() {
        return {
            menuType: [],
            menuCategory: [],
            menuYear: [],
            showAds: true,
        };
    },
    created() {
        this.getMenuMovies();
    },
    computed: {
        ...mapState({
            descriptionFooter: (state) => state.descriptionFooter,
            logo: (state) => state.logo,
            icon: (state) => state.icon,
            slogan: (state) => state.slogan,
            SEOTitle: (state) => state.SEOTitle,
            SEODescription: (state) => state.SEODescription,
            adsBottom: (state) => state.adsBottom,
        }),
    },
    mounted() {},
    methods: {
        async getMenuMovies() {
            const data = await this.$axios.$get("movie/listtypeandcate");
            if (data.code == 200) {
                this.menuType = data.result.Listdata_type;
                this.menuCategory = data.result.Listdata_cate;
            }
        },
    },
};
</script>
