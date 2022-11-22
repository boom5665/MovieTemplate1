import Vue from "vue";
import VueGtag from "vue-gtag";
import axios from "axios";

export default async ({ app, $config: { baseApiUrl } }) => {
    const response = await axios.get((baseApiUrl || "https://dev-movie-api.pirate168.com/api/v1/") + "settingweb", {
        headers: {
            domain: "devmovie",
        },
    });
    Vue.use(
        VueGtag,
        {
            config: { id: response.data.result.track_id },
        },
        app.router
    );
};
