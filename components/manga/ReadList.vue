<template>
    <div class="list-container">
        <h2 class="list-title">
            {{ _title }}
            {{ _isSearch ? " : " + _search : "" }}
        </h2>
        <div class="movie-list-container" v-if="movieList.length">
            <b-row>
                <b-col cols="6" lg="3" xl="2" v-for="(value, index) in movieList" :key="index">
                    <SingleMangaBlock :_obj="value" />
                </b-col>
            </b-row>
            <div class="loader-container" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
        <div class="movie-not-found" v-else>
            <span v-show="!loadingList">ไม่พบหนังที่คุณค้นหา</span>
            <div class="loader-container" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
        <div class="paginaion-container" v-show="maxPage > 1">
            <div class="pagination-btn first d-none d-sm-flex" @click="currentPage = 1">‹‹</div>
            <div class="pagination-btn prev" v-show="currentPage > 1" @click="currentPage--">&lsaquo;</div>
            <div class="pagination-btn" :class="{ active: currentPage == index }" v-show="checkIndex(index)" v-for="index in maxPage" :key="index" @click="currentPage = index">{{ index }}</div>
            <div class="pagination-btn next" v-show="currentPage < maxPage" @click="currentPage++">&rsaquo;</div>
            <div class="pagination-btn last d-none d-sm-flex" @click="currentPage = maxPage">››</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _title: {
            type: String,
            required: true,
        },
        _type: {
            type: String,
            required: false,
            default: "",
        },
        _category: {
            type: String,
            required: false,
            default: "",
        },
        _isHot: {
            type: Boolean,
            required: false,
            default: false,
        },
        _isSearch: {
            type: Boolean,
            required: false,
            default: false,
        },
        _search: {
            type: String,
            required: false,
            default: "",
        },
        _isAV: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            loadingList: false,
            movieList: [],
            currentPage: 1,
            maxPage: 1,
            category: this._category,
        };
    },
    created() {
        if (this._isHot) {
            this.getHotMovies();
        } else if (this._isSearch) {
            this.getSearchMovie();
        } else {
            this.getMovies();
        }
    },
    watch: {
        currentPage() {
            if (this._isHot) {
                this.getHotMovies();
            } else if (this._isSearch) {
                this.getSearchMovie();
            } else {
                this.getMovies();
            }
        },
        _search() {
            this.getSearchMovie();
        },
    },
    methods: {
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("manga/listmovie", {
                    order: "ID",
                    orderby: "DESC",
                    types: "",
                    category: this.category,
                    year: 0,
                    perpage: 24,
                    page: this.currentPage,
                    search: this._search,
                })
                .then(function (response) {
                    if (response.code == 200) {
                        self.movieList = response.result;
                        self.maxPage = response.page_total;
                    }
                    self.loadingList = false;
                });
        },
        getSearchMovie() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("manga/listmovie", {
                    order: "ID",
                    orderby: "DESC",
                    types: "",
                    category: "",
                    year: 0,
                    perpage: 24,
                    page: this.currentPage,
                    search: this._search,
                })
                .then(function (response) {
                    if (response.code == 200) {
                        self.movieList = response.result;
                        self.maxPage = response.page_total;
                    }
                    self.loadingList = false;
                });
        },
        checkIndex(index) {
            if ((index >= this.currentPage && index - 3 < this.currentPage) || (index <= this.currentPage && index + 3 > this.currentPage)) return true;
            return false;
        },
    },
};
</script>

<style>
</style>
