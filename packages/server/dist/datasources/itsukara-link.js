"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class ItsukaraLinkAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor(baseURL = 'https://api.itsukaralink.jp/app') {
        super();
        this.reduceYoutubeChannel = (liverYoutubeChannel) => ({
            id: liverYoutubeChannel.id.toString(),
            source: liverYoutubeChannel.liver_id.toString(),
            channel: liverYoutubeChannel.channel,
            channelName: liverYoutubeChannel.channel_name,
            creationOrder: liverYoutubeChannel.creation_order,
        });
        this.reduceTwitterAccount = (liverTwitterAccount) => ({
            id: liverTwitterAccount.id.toString(),
            source: liverTwitterAccount.liver_id.toString(),
            screenName: liverTwitterAccount.screen_name,
        });
        this.reduceSource = (liver, youtube, twitter) => ({
            id: liver.id.toString(),
            name: liver.name,
            latinName: liver.english_name,
            ruby: liver.furigana,
            avatar: liver.avatar,
            color: liver.color,
            description: liver.description || '',
            public: liver.public || 1,
            position: liver.public || 0,
            association: {
                youtube: youtube && this.reduceYoutubeChannel(youtube),
                twitter: twitter && this.reduceTwitterAccount(twitter),
            },
        });
        this.reduceContent = (event) => ({
            id: event.id.toString(),
            name: event.name,
            description: event.description,
            public: event.public,
            url: event.url,
            startDate: event.start_date,
            endDate: event.end_date,
            recommend: event.recommend,
            source: this.reduceSource(event.liver),
        });
        this.fetchContents = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get('events.json');
            return res.data.events.map(this.reduceContent);
        });
        this.fetchContent = (id) => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get(`events/${id}.json`);
            return this.reduceContent(res.data.event);
        });
        this.fetchSources = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get('livers.json');
            return res.data.liver_relationships.map(data => this.reduceSource(data.liver, data.liver_youtube_channel, data.liver_twitter_account));
        });
        this.fetchSource = (id) => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get(`livers/${id}.json`);
            const data = res.data;
            return this.reduceSource(data.liver, data.liver_youtube_channel, data.liver_twitter_account);
        });
        this.baseURL = baseURL;
    }
}
exports.ItsukaraLinkAPI = ItsukaraLinkAPI;
