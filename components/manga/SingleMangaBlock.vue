<template>
    <nuxt-link :to="getPlayUrl(_obj)" class="single-movie-block">
        <div class="poster-container">
            <nuxt-img class="poster" :loading="_fetchMode" :src="_obj.picture" height="287" :alt="_obj.full_name" />
            <!-- <div class="rating" v-show="_obj.ratescore">{{ _obj.ratescore }}</div> -->
            <div class="poster-overlay">
                <div class="poster-play">อ่าน</div>
            </div>
            <div class="content-color">
                <div class="title">{{ _obj.full_name }}</div>
                <div class="d-flex align-items-center">
                    <!-- <div class="resolution">{{ _obj.quality }}</div>
                    <div class="sound flex-grow-1" v-show="_obj.sound_main">เสียง : {{ _obj.sound_main }}</div> -->
                    <div class="view"><b-icon-eye class="view-icon" /> {{ _obj.view }}</div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        _obj: {
            type: Object,
            required: true,
        },
        _fetchMode: {
            type: String,
            required: false,
            default: "lazy",
        },
    },
};
</script>

<style>
</style>
