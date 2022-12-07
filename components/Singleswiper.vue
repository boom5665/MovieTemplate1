<template>
    <div  class="single-movie-block">
        <div class="poster-container">
            <nuxt-img class="poster" :loading="_fetchMode" :src="_obj.imageslide" height="1000" :alt="_obj.full_name" />

            <div class="poster-overlay">
                <div class="rating" v-show="_obj.ratescore">{{ _obj.ratescore }}</div>
                <nuxt-link :to="getPlayUrl(_obj)">
                    <b-icon-play-circle class="poster-play" />
                </nuxt-link>
                <div class="title">{{ _obj.full_name }}</div>
            </div>
        </div>

        <!-- <div class="d-flex align-items-center">
            <div class="resolution">{{ _obj.quality }}</div>
            <div class="sound flex-grow-1" v-show="_obj.sound_main">เสียง : {{ _obj.sound_main }}</div>
            <div class="view"><b-icon-eye class="view-icon" /> {{ _obj.view }}</div>
        </div> -->
    </div>
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

<style lang="css" scoped>
.poster {
    height: 500px !important;
}
.title {
    font-size: 30px;
}
</style>
