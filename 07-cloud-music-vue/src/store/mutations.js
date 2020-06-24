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
    [MutationTypes.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [MutationTypes.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [MutationTypes.SET_PLAY_LIST](state, list) {
        state.playList = list;
    },
    [MutationTypes.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list;
    },
    [MutationTypes.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [MutationTypes.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    },
    [MutationTypes.SET_CURRENT_SONG](state, song) {
        state.currentSong = song;
    },
};
