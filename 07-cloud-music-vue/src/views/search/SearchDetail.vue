<template>
    <div class="search-detail">
        <van-tabs v-model="active" sticky swipeable animated offset-top="33">
            <van-tab title="综合">综合</van-tab>
            <van-tab title="单曲">
                <div class="song">
                    <play-all></play-all>
                    <ul>
                        <li
                            v-for="(item, index) of searchSongs"
                            :key="index"
                            class="item"
                            @click="selectItem(item, index)"
                        >
                            <div class="item__left">
                                <div class="item__left__name">
                                    {{ item.name }}
                                </div>
                                <div class="item__left__artists">
                                    {{ item.artists }} -
                                    {{ item.album.name }}
                                </div>
                            </div>
                            <div class="item__right">
                                <i class="iconfont">&#xe600;</i>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="云村">云村</van-tab>
            <van-tab title="视频">视频</van-tab>
            <van-tab title="歌手">歌手</van-tab>
            <van-tab title="专辑">专辑</van-tab>
            <van-tab title="歌单">歌单</van-tab>
            <van-tab title="主播电台">主播电台</van-tab>
            <van-tab title="用户">用户</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import PlayAll from '@/components/base/play/PlayAll'
import api from '@/api'
export default {
    components: { PlayAll },
    data() {
        return {
            active: 1,
        }
    },
    computed: {
        ...mapGetters([
            'searchSongs',
            'keywords',
            'currentSong',
            'currentIndex',
            'playList',
        ])
    },
    watch: {
        async currentSong() {
            if (!this.currentSong.album.picUrl) {
                const currentSong = JSON.parse(JSON.stringify(this.currentSong));
                const playList = JSON.parse(JSON.stringify(this.playList));
                const res = await api.getDishInfoFn(currentSong.album.id)
                currentSong.album.picUrl = res.data.album.picUrl;
                playList[this.currentIndex] = currentSong
                this.setPlayList(playList);
            }
        }
    },
    methods: {
        selectItem(track, index) {
            this.selectPlay({
                list: this.searchSongs,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ]),
        ...mapMutations({
            setCurrentSong: 'SET_CURRENT_SONG',
            setPlayList: 'SET_PLAY_LIST',
        })
    }
}
</script>

<style lang="scss" scoped>
.song {
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        &__left {
            &__name {
                padding: 0 0 5px;
                font-size: 16px;
            }
            &__artists {
                color: #888;
            }
        }
        &__right {
            i {
                font-size: 20px;
                color: #999;
            }
        }
    }
}
</style>