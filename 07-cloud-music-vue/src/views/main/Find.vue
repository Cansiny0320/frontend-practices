<template>
    <div class="find">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="swipe-container">
                <swiper />
            </div>
            <nav-link></nav-link>
            <div class="wrapper">
                <recommend :recSongList="songList" />
                <new-song
                    class="new-song"
                    :newDishs="newDishs"
                    :newSongs="newSongs"
                />
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import Swiper from '@/components/find/Swiper'
import NavLink from '@/components/find/NavLink'
import Recommend from '@/components/find/Recommend'
import NewSong from '@/components/find/NewSong'
import api from '@/api'
import utils from '@/utils'

export default {
    components: { Swiper, NavLink, Recommend, NewSong },
    created() {
        this.logined ? this.getLoginRecommendMusicList() : this.getRecommendMusicList();
        this.getNewDish();
        this.getNewSong();
    },
    data() {
        return {
            songList: [],
            newDishs: [],
            newSongs: [],
            isLoading: false,
            user: JSON.parse(localStorage.getItem('user_info')),
        }
    },
    computed: {
        logined() {
            return !!Object.keys(this.user).length
        }
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.logined ? this.getLoginRecommendMusicList() : this.getRecommendMusicList();
                this.getNewDish();
                this.getNewSong();
                this.isLoading = false;
            }, 1000);
        },
        async getLoginRecommendMusicList() {
            const limit = 6;
            const res = await api.recSongListLoginFn({
                cookie: this.user.cookie
            })
            const songList = res.data.recommend.map(item => ({
                id: item.id,
                name: item.name,
                picUrl: item.picUrl,
                playCount: item.playcount
            }))
            this.songList = utils.getRandomRecList(songList, limit);
        },
        async getRecommendMusicList() {
            const limit = 6;
            const res = await api.recSongListFn();
            const songList = res.data.result.map(item => ({
                id: item.id,
                name: item.name,
                picUrl: item.picUrl,
                playCount: item.playCount
            }))
            this.songList = utils.getRandomRecList(songList, limit);
        },
        async getNewDish() {
            const limit = 3;
            const res = await api.newDishFn(limit);
            this.newDishs = res.data.albums.map(item => ({
                picUrl: item.picUrl,
                name: item.name,
                artists: item.artists.map(item => ([
                    item.name
                ]))
            }))
        },
        async getNewSong() {
            const limit = 3;
            const res = await api.newSongsFn();
            const newSongs = res.data.result.map(item => ({
                id: item.id,
                name: item.name,
                picUrl: item.picUrl,
                artists: item.song.artists.map(item => ([
                    item.name
                ]))
            }))
            this.newSongs = utils.getRandomRecList(newSongs, limit)
        }

    }
}
</script>

<style lang="scss" scoped>
.find {
    // 防止轮播图上下抖动导致文字模糊
    position: relative;

    .swipe-container {
        transform: translateZ(0);
        overflow: hidden;
    }
    .wrapper {
        padding: 20px 15px;
        border-bottom: 10px solid #eee;
        .new-song {
            margin-top: 20px;
        }
    }
}
</style>