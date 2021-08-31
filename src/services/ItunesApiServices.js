import { IPodcast } from "../types/Podcast";

class ItunesApiServices {
    baseUrl = 'https://itunes.apple.com/search';
    async searchPodcast(term) {
        const url = `${this.baseUrl}?entity=podcast&term=${term}`;
        const res = await fetch(url, { method: 'GET', });
        const resJson = await res.json();
        return resJson.results;
    }
    async searchPodcastEpisode(term) {
        const url = `${this.baseUrl}?entity=podcastEpidose&term=${term}`;
        const res = await fetch(url, { method: 'GET', });
        const resJson = await res.json();
        return resJson.results;
    }

};
export const itunesApiServices = new ItunesApiServices();