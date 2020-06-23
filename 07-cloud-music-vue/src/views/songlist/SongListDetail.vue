<template>
    <div class="song-list-detail">
        <list-view :list="songList" title="歌单">
            <Banner :list="songList" />
        </list-view>
    </div>
</template>

<script>
import ListView from '@/components/base/ListView'
import Banner from '@/components/songlist/SongListBanner'
import { mapGetters } from 'vuex'
export default {
    components: { ListView, Banner },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'songList'
        ])
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