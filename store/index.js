export const state = () => ({
    webTitle: "",
    logo: "/logo.png",
    icon: "/favicon.ico",
    titleHeader: "",
    slogan: "",
    descriptionFooter: "",
    SEOTitle: "",
    SEODescription: "",
    adsLeft: [],
    adsCenter: [],
    adsRight: [],
    adsBottom: [],
});

export const mutations = {
    setWebTitle(state, obj) {
        state.webTitle = obj;
    },
    setSetting(state, obj) {
        state.logo = obj.logo;
        state.icon = obj.icon;
        state.titleHeader = obj.title_header;
        state.slogan = obj.slogan;
        state.descriptionFooter = obj.description_footer;
        state.SEOTitle = obj.seo_title;
        state.SEODescription = obj.seo_description;
    },
    setAds(state, obj) {
        state.adsLeft = obj["All-Top-Left"] ? obj["All-Top-Left"] : [];
        state.adsCenter = obj["All-Top-Center"] ? obj["All-Top-Center"] : [];
        state.adsRight = obj["All-Top-Right"] ? obj["All-Top-Right"] : [];
        state.adsBottom = obj["All-Bottom"] ? obj["All-Bottom"] : [];
    },
};

export const actions = {
    async nuxtServerInit(vuexContext) {
        await vuexContext.dispatch("getSetting");
        await vuexContext.dispatch("getAds");
    },
    getSetting({ commit }) {
        return this.$axios.$get("settingweb").then((res) => {
            if (res.code == 200) commit("setSetting", res.result);
        });
    },
    getAds({ commit }) {
        return this.$axios.$get("movie/ads?pagename=All").then((res) => {
            if (res.code == 200) {
                commit("setAds", res.result);
            }
        });
    },
};
