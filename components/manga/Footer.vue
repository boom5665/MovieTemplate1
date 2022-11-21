<template>
    <div id="footer">
        <b-container class="h-100">
            <div class="d-flex align-items-center justify-content-center h-100">
                <nuxt-img format="webp" class="" :src="logo" width="381" height="200" :alt="SEOTitle" />
            </div>
        </b-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            SEOTitle: (state) => state.SEOTitle,
            logo: (state) => state.logo,
        }),
    },
    methods: {

    },
};
</script>
