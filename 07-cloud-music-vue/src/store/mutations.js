import * as MutationTypes from './mutationTypes';

export default {
    [MutationTypes.SET_USER](state, user) {
        state.user = user;
    },
    [MutationTypes.SET_KEYWORDS](state, keywords) {
        state.keywords = keywords;
    },
    [MutationTypes.SET_SEARCH_SONGS](state, searchSongs) {
        state.searchSongs = searchSongs;
    },
};
