import { playMode } from '@/common/config';
const state = {
    keywords: '',
    searchSongs: {},
    songList: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    currentSong: {},
};

export default state;
