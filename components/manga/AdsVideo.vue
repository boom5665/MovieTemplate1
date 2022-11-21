<template>
    <div class="ads-container">
        <div id="adsplayer"></div>
        <a :href="_adsArray[currentAds].url" target="_blank" class="adsclick" v-show="showAdsClick" @click="updateAdsVideoClick(_adsArray[currentAds])"></a>
        <div class="registerads" v-show="showAdsClick">
            <a :href="_adsArray[currentAds].url" target="_blank" @click="updateAdsVideoClick(_adsArray[currentAds])"><span id="register">สมัครสมาชิก</span></a>
        </div>
        <div class="skipads" v-if="showAdsClick && currentTime > 0">กรุณารอ {{ currentTime }} วิ</div>
        <div class="skipads" v-if="showAdsClick && currentTime == 0" @click="skipAds()">กดเพื่อข้าม</div>
    </div>
</template>

<script>
export default {
    model: {
        prop: "value",
        event: "status",
    },
    props: {
        _adsArray: {
            type: Array,
            required: true,
        },
    },
    head() {
        return {
            script: [
                {
                    hid: "jwplayer",
                    src: "https://cdn.jwplayer.com/libraries/rYlCdkEJ.js",
                    defer: true,
                    callback: () => {
                        this.initAds();
                    },
                },
            ],
        };
    },
    data() {
        return {
            currentAds: 0,
            showAdsClick: false,
            currentTime: 0,
            countdownFunc: null,
        };
    },
    mounted() {},
    methods: {
        initAds() {
            const self = this;
            const player = jwplayer("adsplayer").setup({
                file: self._adsArray[self.currentAds].video,
                height: "100%",
                width: "100%",
                preload: "auto",
                allowFullscreen: false,
            });
            player.on("play", (event) => {
                self.showAdsClick = true;
                self.currentTime = self._adsArray[self.currentAds].skip;
                self.countdownFunc = setInterval(() => {
                    self.currentTime--;
                    if (self.currentTime == 0) clearInterval(self.countdownFunc);
                }, 1000);
            });
            player.on("completeCancelled", (event) => {
                self.onComplete();
            });
            player.on("complete", (event) => {
                self.onComplete();
            });
            this.showAdsClick = false;
        },
        onComplete() {
            const self = this;
            clearInterval(self.countdownFunc);
            if (self._adsArray.length == self.currentAds + 1) {
                self.$emit("status", false);
            } else {
                self.currentAds++;
                self.initAds();
            }
        },
        skipAds() {
            clearInterval(self.countdownFunc);
            if (this._adsArray.length == this.currentAds + 1) {
                this.$emit("status", false);
            } else {
                this.currentAds++;
                this.initAds();
            }
        },
    },
};
</script>