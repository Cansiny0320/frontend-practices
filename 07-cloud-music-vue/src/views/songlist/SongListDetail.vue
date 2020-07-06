<template>
    <div class="song-list-detail">
        <list-view
            :tracks="tracks"
            :bgUrl="songList.coverImgUrl"
            title="歌单"
            @select="selectItem"
        >
            <Banner :list="songList" />
        </list-view>
    </div>
</template>

<script>
import ListView from '@/components/base/ListView'
import Banner from '@/components/songlist/SongListBanner'
import api from '@/api'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { createSong } from '@/common/js/Song'
export default {
    components: { ListView, Banner },
    data() {
        return {
            tracks: [],
        }
    },
    computed: {
        ...mapGetters([
            'songList',
            'currentSong'
        ])
    },
    activated() {
        this.getTracks()
    },
    methods: {
        async getTracks() {
            try {
                this.tracks = [];
                const res = await api.songDetailFn(this.songList.trackIds.join(','))
                this.tracks = res.data.songs.map(item => createSong(item))
            } catch (err) {
                console.error(err)
                this.$router.back(-1)
            }

        },
        selectItem(track, index) {
            this.selectPlay({
                list: this.tracks,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ]),
        ...mapMutations({
            setCurrentSong: 'SET_CURRENT_SONG'
        })
    }

}
</script>

<style lang="scss" scoped>
.song-list-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}
</style>