import Vue from "vue";

Vue.mixin({
  data() {
    return {};
  },
  mounted() {},
  computed: {
    currentDate() {
      let today = new Date();
      let month = today.getMonth() + 1;
      if (month < 10) month = "0" + (today.getMonth() + 1);
      return today.getFullYear() + "-" + month + "-" + today.getDate();
    },
    currentYear() {
      let today = new Date();
      return today.getFullYear();
    },
  },
  methods: {
    isLetter(e) {
      e.target.value = e.target.value.replace(/^[\{\}:-=_|?&;$%@"<>()#^!\*+,]/g, "");
    },
    isSearch(e) {
      e.target.value = e.target.value.trim();
    },
    isEmail(e) {
      e.target.value = e.target.value.replace(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{20})+$/g, "@gmail.com");
    },
    isline(e) {
      e.target.value = e.target.value.replace(/[\{\}:-=|?&;$%"<>()#^!\*+,]/g, "");
    },
    isNum(e) {
      e.target.value = e.target.value.replace(/([^0-9.]+)/g, "");
    },
    // isNumber(e) {
    //   e.target.value = e.target.value.replace(/\D/g, "");
    // },
    validateEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    getCatUrl(val) {
      return "/" + val.typemovie.toLowerCase() + "/category/" + val.name_slug;
    },
    getTypeUrl(val) {
      return "/" + val.typemovie.toLowerCase() + "/type/" + val.name_slug;
    },
    getPlayUrl(val) {
      let url = "/" + val.typemovie.toLowerCase() + "/" + val.id + "/" + this.convertToUrlFriendly(val.full_name);
      if (this.convertToUrlFriendly(val.full_name) == "") url += "1";
      return val.typemovie == "series" ? url + "/1" : url;
    },
    convertToUrlFriendly(val) {
      const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      return val
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    updateAdsImageClick(val) {
      this.$axios.$post("adsclicker", {
        id_ads: val.id,
        ads_type: 0,
      });
    },
    updateAdsVideoClick(val) {
      this.$axios.$post("adsclicker", {
        id_ads: val.id,
        ads_type: 1,
      });
    },
  },
});
