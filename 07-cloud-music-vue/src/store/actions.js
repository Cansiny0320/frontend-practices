import * as MutationTypes from './mutationTypes';
export const selectPlay = ({ commit }, { list, index }) => {
    commit(MutationTypes.SET_SEQUENCE_LIST, list);
    commit(MutationTypes.SET_PLAY_LIST, list);
    commit(MutationTypes.SET_CURRENT_INDEX, index);
    commit(MutationTypes.SET_FULL_SCREEN, true);
    commit(MutationTypes.SET_PLAYING_STATE, true);
};
