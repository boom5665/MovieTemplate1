<template>
    <div class="list-container">
        <h2 class="list-title">
            {{ _movieObj.full_name }}
        </h2>
        <div class="movie-list-container">
            <b-row>
                <b-col cols="12" lg="12" xl="12">
                    <b-container class="bv-example-row con-color">
                        <b-col cols="12" lg="12" xl="12" class="dis-between">
                            <div>
                                <span class="meta-i">
                                    <i class="fa fa-eye"></i>
                                    {{ _movieObj.view }} Views
                                </span>
                            </div>

                            <div><button @click="showRequestPopup = true" class="btn-danger">แจ้งเสีย</button></div>
                        </b-col>
                        <b-col cols="12" lg="12" xl="12" class="dis-even">
                            <div v-if="epmanga == firstEP">
                                <a type="button" class="btn-next disabled">ตอนก่อนหน้า</a>
                            </div>
                            <div v-else>
                                <a @click="back(epmanga)" type="button" class="btn-next">ตอนก่อนหน้า</a>
                            </div>
                            <div class="col-md-6 col-xs-12" style="text-align: center">
                                <select class="select-border-color border-warning" v-model="epmanga">
                                    <option :value="value" v-for="(value, index) in episode" :key="index">ตอนที่ {{ value }}</option>
                                </select>
                            </div>
                            <div v-if="epmanga == lastEP">
                                <a type="button" class="btn-next disabled">ตอนถัดไป</a>
                            </div>
                            <div v-else>
                                <a @click="next(epmanga)" type="button" class="btn-next">ตอนถัดไป</a>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="12" xl="12" class="dis-even-mobile">
                            <div class="col-md-12 col-xs-12">
                                <div style="text-align: center">
                                    <select class="select-border-color border-warning" v-model="epmanga">
                                        <option :value="value" v-for="(value, index) in episode" :key="index">ตอนที่ {{ value }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12 dis-space">
                                <div>
                                    <div v-if="epmanga == firstEP">
                                        <a type="button" class="btn-next disabled">ตอนก่อนหน้า</a>
                                    </div>
                                    <div v-else>
                                        <a @click="back(epmanga)" type="button" class="btn-next">ตอนก่อนหน้า</a>
                                    </div>
                                </div>

                                <div>
                                    <div v-if="epmanga == lastEP">
                                        <a type="button" class="btn-next disabled">ตอนถัดไป</a>
                                    </div>
                                    <div v-else>
                                        <a @click="next(epmanga)" type="button" class="btn-next">ตอนถัดไป</a>
                                    </div>
                                </div>
                            </div>
                        </b-col>

                        <b-col cols="12" lg="12" xl="12">
                            <h3>{{ _mangaObj.episode }}</h3>
                        </b-col>

                        <b-row style="justify-content: center" v-for="(value, index) in _mangaObj.path" :key="index">
                            <img class="img-responsive" :src="value" alt="#" />
                        </b-row>

                        <b-col cols="12" lg="12" xl="12" class="dis-between">
                            <div>
                                <span class="meta-i">
                                    <i class="fa fa-eye"></i>
                                    {{ _movieObj.view }} Views
                                </span>
                            </div>
                            <div><button @click="showRequestPopup = true" class="btn-danger">แจ้งเสีย</button></div>
                        </b-col>
                        <b-col cols="12" lg="12" xl="12" class="dis-even">
                            <div v-if="epmanga == firstEP">
                                <a type="button" class="btn-next disabled">ตอนก่อนหน้า</a>
                            </div>
                            <div v-else>
                                <a @click="back(epmanga)" type="button" class="btn-next">ตอนก่อนหน้า</a>
                            </div>
                            <div class="col-md-6 col-xs-12" style="text-align: center">
                                <select class="select-border-color border-warning" v-model="epmanga">
                                    <option :value="value" v-for="(value, index) in episode" :key="index">ตอนที่ {{ value }}</option>
                                </select>
                            </div>
                            <div v-if="epmanga == lastEP">
                                <a type="button" class="btn-next disabled">ตอนถัดไป</a>
                            </div>
                            <div v-else>
                                <a @click="next(epmanga)" type="button" class="btn-next">ตอนถัดไป</a>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="12" xl="12" class="dis-even-mobile">
                            <div class="col-md-12 col-xs-12">
                                <div style="text-align: center">
                                    <select class="select-border-color border-warning" v-model="epmanga">
                                        <option :value="value" v-for="(value, index) in episode" :key="index">ตอนที่ {{ value }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12 dis-space">
                                <div>
                                    <div v-if="epmanga == firstEP">
                                        <a type="button" class="btn-next disabled">ตอนก่อนหน้า</a>
                                    </div>
                                    <div v-else>
                                        <a @click="back(epmanga)" type="button" class="btn-next">ตอนก่อนหน้า</a>
                                    </div>
                                </div>

                                <div>
                                    <div v-if="epmanga == lastEP">
                                        <a type="button" class="btn-next disabled">ตอนถัดไป</a>
                                    </div>
                                    <div v-else>
                                        <a @click="next(epmanga)" type="button" class="btn-next">ตอนถัดไป</a>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-container>
                </b-col>
            </b-row>

            <div class="back-to-top" @click="scrollToTop()"><b-icon-arrow-up class="icon" /></div>
            <div class="popup-container" id="request-popup" v-show="showRequestPopup" @click.self="showRequestPopup = false">
                <div class="popup-content">
                    <div class="text-right"><b-icon-x-circle-fill class="popup-close-btn" @click="showRequestPopup = false" /></div>
                    <div class="tab-btn-list">
                        <div class="tab-btn" @click="activeTab = 0" :class="{ active: activeTab == 0 }">แจ้งมังงะเสีย</div>
                    </div>
                    <div class="tab-content-list">
                        <transition-group name="fade" mode="out-in">
                            <div class="tab-content" v-show="activeTab == 0" key="1">
                                <textarea id="request-detail" class="popup-input" v-model="requestDetail" @keyup="isSearch"></textarea>
                                <div class="text-center">
                                    <div class="submit-btn" @click="saverequestMovie(requestDetail)">ส่งข้อความ</div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
            <div class="loader-container fixed" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _movieObj: {
            type: Object,
            required: true,
        },
        _mangaObj: {
            type: Object,
            required: true,
        },
        _episodeObj: {
            type: Array,
            required: true,
        },
        _category: {
            type: String,
            required: false,
            default: "",
        },
    },
    data() {
        return {
            loadingList: false,
            movieList: [this._mangaObj],
            episode: this._episodeObj,
            currentPage: 1,
            maxPage: 1,
            showRequestPopup: false,
            requestDetail: "",
            activeTab: 0,
            epmanga: this._mangaObj.episode.replace("ตอนที่ ", ""),
            value: "",
            selected: "",

            movieID: this._movieObj.id,
            firstEP: this._episodeObj[0],
            lastEP: this._episodeObj.slice(-1),
        };
    },
    created() {},
    mounted() {
        // console.log(this.firstEP);
        // console.log(this.lastEP);
    },
    watch: {
        _search() {
            this.getSearchMovie();
        },
        epmanga(val) {
            this.$router.push("/" + this._movieObj.typemovie.toLowerCase() + "/" + this._movieObj.id + "/" + this.convertToUrlFriendly(this._movieObj.full_name) + "/" + val);
        },
        requestDetail(val) {
            var tn = /[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            if (tn.test(val) == true) {
                this.requestDetail = "";
            }
            // console.log(val);
        },
    },
    methods: {

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        next(epmanga) {
            if (this._mangaObj) {
                let url = this._movieObj.typemovie.toLowerCase() + "/" + this._movieObj.id + "/" + this.convertToUrlFriendly(this._movieObj.full_name);
                const text = this.episode;
                for (let index = 0; index < text.length; index++) {
                    const element = text[index];
                    if (epmanga == element) {
                        var toplam = parseInt(index) + 1;
                    }
                }
                return this.$router.push("/" + url + "/" + text[toplam]);
            }
        },
        back(epmanga) {
            if (this._mangaObj) {
                let url = this._movieObj.typemovie.toLowerCase() + "/" + this._movieObj.id + "/" + this.convertToUrlFriendly(this._movieObj.full_name);
                const text = this.episode;
                for (let index = 0; index < text.length; index++) {
                    const element = text[index];
                    if (epmanga == element) {
                        var toplam = parseInt(index) - 1;
                    }
                }
                return this.$router.push("/" + url + "/" + text[toplam]);
            }
        },
        saverequestMovie(requestDetail) {
            if (this.requestDetail.trim() == "") {
                alert("กรุณากรอกข้อมูลให้ครบ");
            } else {
                if (requestDetail) {
                    this.requestMovie();
                } else {
                    alert("แจ้งเสียไม่ถูกต้อง");
                    this.requestDetail = "";
                }
            }
        },
        requestMovie() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("moviebroken", {
                    movie_id: this.movieID,
                    movie_type: 3,
                    reason: this.requestDetail.trim(),
                })
                .then(function (response) {
                    self.showRequestPopup = false;
                    self.loadingList = false;
                    self.movie_id = self.movieID;
                    self.movie_type = 3;
                    self.reason = "";
                    self.requestDetail = "";
                    if (response.code == 200) {
                        alert("สำเร็จ");
                    }
                });
        },
    },
};
</script>

<style>
</style>
