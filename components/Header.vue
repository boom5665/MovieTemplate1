<template>
    <div id="header">
        <b-navbar toggleable="lg" type="dark" variant="transparent">
            <b-navbar-nav class="menu-list">
                <b-nav-item class="menu-btn"><CategoryList :_isAV="true" /></b-nav-item>
            </b-navbar-nav>

            <b-navbar-brand to="/"><nuxt-img format="webp" :src="logo" height="40" width="155" :alt="SEOTitle" /></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" v-model="isCollapseOpen" is-nav>
                <b-navbar-nav class="menu-list">
                    <b-nav-item to="/" class="menu-btn">หน้าหลัก</b-nav-item>
                    <b-nav-item to="/movie/type/inter-movie" class="menu-btn">หนังฝรั่ง</b-nav-item>
                    <b-nav-item @click="showRequestPopup = true" class="menu-btn">ขอหนัง | ติดต่อโฆษณา</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <div class="search-container input-container">
                        <input class="input-control" :maxlength="maxserch" v-model="searchInput" @keyup.enter="search()" @keyup="isLetter" placeholder="ค้นหา" />
                        <div class="input-submit" @click="search()" data-toggle="collapse" data-target="#nav-collapse"><b-icon-search aria-hidden="true" /></div>
                        <div class="search-button" @click="search()">ส่ง</div>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="popup-container" id="request-popup" v-show="showRequestPopup" @click.self="showRequestPopup = false">
            <div class="popup-content">
                <div class="text-right"><b-icon-x-circle-fill class="popup-close-btn" @click="showRequestPopup = false" /></div>
                <div class="tab-btn-list">
                    <div class="tab-btn" @click="activeTab = 0" :class="{ active: activeTab == 0 }">ขอหนัง</div>
                    <div class="tab-btn" @click="activeTab = 1" :class="{ active: activeTab == 1 }">ติดต่อโฆษณา</div>
                </div>
                <div class="tab-content-list">
                    <transition-group name="fade" mode="out-in">
                        <div class="tab-content" v-show="activeTab == 0" key="1">
                            <textarea id="request-detail" style="height: 150px;" class="popup-input" v-model="requestDetail" @keyup="isLetter"></textarea>
                            <div class="text-center">
                                <div class="submit-btn" @click="saverequestMovie(requestDetail)">ส่งข้อความ</div>
                            </div>
                        </div>
                        <div class="tab-content" v-show="activeTab == 1" key="2">
                            <b-row>
                                <b-col cols="3" lg="3" xl="3" class="dis-colum-center">
                                    <label class="popup-label">ชื่อ สกุล *:</label>
                                    <input type="text" class="popup-input" v-model="contactName" @keyup="isLetter" />
                                </b-col>
                                <b-col cols="3" lg="3" xl="3" class="dis-colum-center">
                                    <label class="popup-label">อีเมล์ *:</label>
                                    <input type="email" class="popup-input" v-model="contactEmail" @keyup="isEmail" />
                                </b-col>
                                <b-col cols="3" lg="3" xl="3" class="dis-colum-center">
                                    <label class="popup-label">ไอดีไลน์ *:</label>
                                    <input type="text" class="popup-input" v-model="contactLine" @keyup="isline" />
                                </b-col>
                                <b-col cols="3" lg="3" xl="3" class="dis-colum-center">
                                    <label class="popup-label">เบอร์โทรศัพท์</label>
                                    <input type="text" :maxlength="max" class="popup-input" v-model="contactPhone" @keyup="isNum" />
                                </b-col>
                                 <b-col cols="12" lg="12" xl="12" class="dis-colum-center">
                                <label class="popup-label" >รายละเอียด</label>
                                <input type="text" class="popup-input" style="height: 150px;" v-model="contactDetail" @keyup="isLetter" />
                                </b-col>
                            </b-row>
                            <div class="text-center">
                                <div class="submit-btn" @click="save()">ส่งข้อความ</div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
        <div class="loader-container fixed" v-show="showLoader">
            <nuxt-img format="webp" src="/loader.png" alt="loader" />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: {
        _isAV: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            activeTab: 0,
            searchInput: "",
            showLoader: false,
            showRequestPopup: false,
            requestDetail: "",
            contactName: "",
            contactEmail: "",
            contactLine: "",
            contactPhone: "",
            contactDetail: "",
            isCollapseOpen: false,
            max: 10,
            maxserch: 40,
        };
    },
    computed: {
        ...mapState({
            SEOTitle: (state) => state.SEOTitle,
            logo: (state) => state.logo,
        }),
    },
    watch: {
        $route(to, from) {
            if (this.isCollapseOpen) {
                this.$root.$emit("bv::toggle::collapse", "nav-collapse");
            }
        },
        showRequestPopup(val) {
            if (val == false) {
                this.requestDetail = "";
                this.contactName = "";
                this.contactEmail = "";
                this.contactLine = "";
                this.contactPhone = "";
                this.contactDetail = "";
            }
        },
        requestDetail(val) {
            var tn = /w+[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            var tw = /^\s+|\s+$/gm;
            if (tn.test(val) == true || tw.test(val) == true) {
                this.requestDetail = "";
            }
        },
        contactName(val) {
            var tn = /w+[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            if (tn.test(val) == true) {
                this.contactName = "";
            }
        },
        contactLine(val) {
            var tn = /^\w+[\{\}:-=|?&;$%"<>()#^!\*+,]/;
            if (tn.test(val) == true) {
                this.contactLine = "";
            }
        },
        contactDetail(val) {
            var tn = /[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            if (tn.test(val) == true) {
                this.contactDetail = "";
            }
        },
        contactPhone(val) {
            var tn = /[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            var nm = /^[1-9]\d*$/;
            if (tn.test(val) == true || nm.test(val) == true) {
                // console.log(nm.test(val));
                this.contactPhone = "";
            }
        },
        searchInput(val) {
            var tn = /[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            if (tn.test(val) == true) {
                this.searchInput = "";
            }
        },
    },
    methods: {
        saverequestMovie(requestDetail) {
            if (this.requestDetail == "") {
                alert("กรุณากรอกข้อมูลให้ครบ");
            } else {
                if (requestDetail) {
                    if (requestDetail) {
                        // this.requestMovie();
                             alert("กรุณาซื้อแพ็กเกจ");
                    } else {
                        alert("email ไม่ถูกต้อง");
                        this.requestDetail = "";
                    }
                }
            }
        },

        save() {
            if (
                this.contactName.trim() == "" ||
                this.contactName == "-" ||
                this.contactEmail.trim() == "" ||
                this.contactLine.trim() == "" ||
                this.contactPhone.length < 10 ||
                this.contactPhone == "" ||
                this.contactDetail.trim() == ""
            ) {
                alert("กรุณากรอกข้อมูลให้ครบ");
            } else {
                   alert("กรุณาซื้อแพ็กเกจ");
                // this.contactAds();
                // alert(" สำเร็จ");
            }
        },
        requestMovie() {
            const detail = this.requestDetail;
            if (detail.trim() == "") {
                alert("กรุณากรอกข้อมูลให้ครบ");
                return;
            }
            const self = this;
            this.showLoader = true;
            this.$axios
                .$post("requestmovie", {
                    title_request: detail,
                })
                .then(function (response) {
                    self.showRequestPopup = false;
                    self.showLoader = false;
                    self.requestDetail = "";
                    if (response.code == 200) {
                        alert("สำเร็จ");
                    }
                });
        },
        contactAds() {
            const name = this.contactName;
            const tel = this.contactPhone;
            const email = this.contactEmail;
            const lineid = this.contactLine;
            const detail = this.contactDetail;
            if (name.trim() == "" || tel.trim() == "" || lineid.trim() == "" || detail.trim() == "") {
                alert("กรุณากรอกข้อมูลให้ครบ");
                return;
            }
            if (!this.validateEmail(email)) {
                alert("อีเมล์ไม่ถูกต้อง");
                return;
            }
            const self = this;
            this.showLoader = true;
            this.$axios
                .$post("requestads", {
                    name: name,
                    tel: tel,
                    email: email,
                    lineid: lineid,
                    detail: detail,
                })
                .then(function (response) {
                    self.showContactPopup = false;
                    self.showLoader = false;
                    self.contactName = "";
                    self.contactPhone = "";
                    self.contactEmail = "";
                    self.contactLine = "";
                    self.contactDetail = "";
                    if (response.code == 200) {
                        alert("สำเร็จ");
                    }
                });
        },
        search() {
            if (this.searchInput != "") {
                const self = this;
                this.showLoader = true;
                let path = "/search";
                if (this._isAV) path = "/av/search";
                this.$router.push({ path: path, query: { s: this.searchInput } });
                setTimeout(() => {
                    self.showLoader = false;
                }, 1000);
            } else {
                alert("กรุณาพิมชื่อหนัง");
            }
        },
    },
};
</script>

<style>
</style>
