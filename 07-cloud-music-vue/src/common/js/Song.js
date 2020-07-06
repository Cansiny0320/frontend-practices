export default class Song {
    constructor({
        name = '',
        id = 0,
        url = '',
        alia = [],
        duration = '',
        album = {
            id: '',
            name: '',
            picUrl: '',
        },
        artists = [],
        mv = 0,
    }) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.alia = alia;
        this.duration = duration;
        this.album = album;
        this.artists = artists;
        this.mv = mv;
    }
}

export function createSong(songData, mode = 0) {
    if (mode === 1) {
        const { artists: ar, album: al, alias: alia } = songData;
        songData.ar = ar;
        songData.al = al;
        songData.alia = alia;
    }
    return new Song({
        name: songData.name,
        id: songData.id,
        url: `https://music.163.com/song/media/outer/url?id=${songData.id}.mp3`,
        alia: songData.alia.length > 0 ? songData.alia[0] : '',
        // eslint-disable-next-line no-prototype-builtins
        duration: songData.hasOwnProperty('duration') ? Math.floor(songData.duration / 1000) : '',
        album: {
            id: songData.al.id,
            name: songData.al.name,
            picUrl: songData.al.picUrl ? `${songData.al.picUrl}?param=300y300` : '',
        },
        artists: filterArtists(songData.ar),
        mv: songData.mv,
    });
}

function filterArtists(artists) {
    const ret = artists.map(item => item.name);
    return ret.join('/');
}
