<template>
    <div id="poster-slider-container">
        <div class="d-flex align-items-center justify-content-between">
            <h1>หนังยอดนิยม</h1>
            <div class="d-flex align-items-center">
                <div class="mr-3" id="home-slide-prev"><b-icon-arrow-left style="width: 24px; height: 36px" aria-hidden="true" /></div>
                <div id="home-slide-next"><b-icon-arrow-right style="width: 24px; height: 36px" aria-hidden="true" /></div>
            </div>
        </div>
        <div class="poster-slider" v-swiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(value, index) in slideData" :key="index">
                    <SingleMovieBlock :_obj="value" _fetchMode="eager" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { directive } from "vue-awesome-swiper";
// export default {
//     directives: {
//         swiper: directive,
//     },
//     data() {
//         return {
//             slideData: [],
//             swiperOption: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,

//                 breakpoints: {
//                     768: {
//                         slidesPerView: 3,
//                         spaceBetween: 30,
//                     },
//                     992: {
//                         slidesPerView: 4,
//                         spaceBetween: 40,
//                     },
//                     1200: {
//                         slidesPerView: 5,
//                         spaceBetween: 20,
//                     },
//                 },

//                 navigation: {
//                     nextEl: "#home-slide-next",
//                     prevEl: "#home-slide-prev",
//                 },
//                 loop: true,
//             },
//         };
//     },
//     computed: {},
//     created() {
//         this.getData();
//     },
//     methods: {
//         async getData() {
//             const data = await this.$axios.$post("moviehot", {
//                 perpage: 20,
//                 page: 1,
//             });
//             if (data.code == 200) this.slideData = data.result;
//         },
//     },
// };
</script>
