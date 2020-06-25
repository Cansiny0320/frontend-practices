<template>
    <div class="song-list">
        <div class="header">
            <Title title="歌单广场" color="#000" />
            <van-tabs v-model="active" swipeable animated>
                <van-tab
                    v-for="(item, index) of catList"
                    :key="index"
                    :title="catList[index].name"
                >
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <ul class="container">
                            <Loading
                                class="loading"
                                v-show="!catList[index].songList"
                            />
                            <li
                                v-for="(item, index) of catList[index].songList"
                                :key="index"
                                @click="toDetail(item.id)"
                            >
                                <div class="img">
                                    <img v-lazy="item.picUrl" />
                                    <div class="count">
                                        <i class="iconfont">&#xe656;</i>
                                        <span class="count__number">
                                            {{
                                                item.playCount | formatPlayCount
                                            }}</span
                                        >
                                    </div>
                                </div>
                                <div class="name" v-html="item.name"></div>
                            </li>
                        </ul>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import Title from '@/components/base/Title'
import api from '@/api'
import { mapMutations } from 'vuex'
export default {
    components: {
        Title
    },
    data() {
        return {
            loading: false,
            finished: false,
            active: 0,
            catList: [
                { name: '推荐', songList: [], page: 1 },
                { name: '华语', songList: [], page: 1 },
                { name: '欧美', songList: [], page: 1 },
                { name: '摇滚', songList: [], page: 1 },
                { name: '民谣', songList: [], page: 1 },
                { name: '电子', songList: [], page: 1 },
            ],
        };
    },
    computed: {
        currentList() {
            return this.catList[this.active]
        }
    },
    watch: {
        currentList() {
            this.initSongList(this.currentList)
        }
    },
    methods: {
        async initSongList(item) {
            const playLists = await this.getSongList({
                page: item.page,
                cat: item.name === '推荐' ? '全部' : item.name,
            })
            item.page++
            if (playLists.length > 0) {
                for (let i = 0; i < playLists.length; i++) {
                    const name = playLists[i].name
                    const id = playLists[i].id
                    const picUrl = playLists[i].coverImgUrl
                    const playCount = playLists[i].playCount
                    item.songList.push({
                        name,
                        id,
                        picUrl,
                        playCount
                    })
                }
            }
        },
        async getSongList({ page, cat = '全部' } = {}) {
            const limit = 30;
            const offset = (page - 1) * limit
            const res = await api.playListFn({
                offset,
                cat
            })
            return res.data.playlists
            // .map(item => ({
            //     name: item.name,
            //     id: item.id,
            //     picUrl: item.coverImgUrl,
            //     playCount: item.playCount
            // }))
        },
        async onLoad() {
            await this.initSongList(this.currentList)
            this.loading = false;
        },
        async toDetail(id) {
            const user = JSON.parse(localStorage.getItem('user_info'))
            const res = await api.albumDetailFn({
                id,
                cookie: user.cookie
            });
            const playlist = res.data.playlist;
            const songList = {
                id: playlist.id,
                name: playlist.name,
                coverImgUrl: playlist.coverImgUrl,
                description: playlist.description,
                playCount: playlist.playCount,
                trackCount: playlist.trackCount,
                creator: {
                    avatarUrl: playlist.creator.avatarUrl,
                    nickname: playlist.creator.nickname
                },
                trackIds: playlist.trackIds.map(item => ([
                    item.id,
                ]))
            }
            this.setSongList(songList);
            this.$router.push({
                path: `/songlists/${id}`,
                params: {
                    id
                }
            })
        },
        ...mapMutations({
            setSongList: 'SET_SONG_LIST'
        })
    },
    filters: {
        formatPlayCount(num) {
            if (num >= 1e8) {
                return `${(num / 1e8).toFixed(1)}亿`
            } else if (num >= 1e4) {
                return `${Math.round(num / 1e4)}万`
            }
            return num
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    position: relative;
    padding: 10px 10px 0;
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-30%, -50%);
        z-index: 10;
    }
    li {
        flex: 30%;
        margin: 0 5px;
    }
    li:nth-child(3n + 1) {
        margin-right: 0;
    }
    li:nth-child(3n - 1) {
        margin-left: 0;
    }
    .img {
        position: relative;
        img {
            width: 100%;
        }
        .count {
            position: absolute;
            top: 0.22rem;
            right: 0.22rem;
            font-size: 0.8rem;
            color: #fff;
            i {
                font-size: 0.75rem;
            }
        }
    }
    .name {
        color: #333;
        padding: 5px 0;
        line-height: 18px;
    }
}
</style>