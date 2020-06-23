import * as MutationTypes from './mutationTypes';

export default {
    [MutationTypes.SET_KEYWORDS](state, keywords) {
        state.keywords = keywords;
    },
    [MutationTypes.SET_SEARCH_SONGS](state, searchSongs) {
        state.searchSongs = searchSongs;
    },
    [MutationTypes.SET_SONG_LIST](state, songList) {
        state.songList = songList;
    },
};
