<template>
    <div class="recommend">
        <Title
            :titles="titles"
            btnName="歌单广场"
            @btnClick="handleMoreBtnClick"
            class="title"
        ></Title>
        <ul class="container">
            <Loading class="loading" v-show="!recSongList" />
            <li
                v-for="(item, index) of recSongList"
                :key="index"
                @click="toDetail(item.id)"
            >
                <div class="img">
                    <img v-lazy="item.picUrl" />
                    <div class="count">
                        <i class="iconfont">&#xe656;</i>
                        <span class="count__number">
                            {{ item.playCount | formatPlayCount }}</span
                        >
                    </div>
                </div>
                <div class="name" v-html="item.name"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from '@/components/find/Title'
import { mapMutations } from 'vuex'
import api from '@/api'
import Loading from '@/components/base/Loading'
export default {
    components: { Title, Loading },
    props: {
        recSongList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            titles: ["推荐歌单"]
        }
    },
    methods: {
        handleMoreBtnClick() {
            this.$router.push('/songlists')
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
                coverImgUrl: `${playlist.coverImgUrl}?param=80y80`,
                description: playlist.description,
                playCount: playlist.playCount,
                trackCount: playlist.trackCount,
                creator: {
                    avatarUrl: `${playlist.creator.avatarUrl}?param=80y80`,
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
.recommend {
    .title {
        padding-bottom: 10px;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        position: relative;
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
}
</style>