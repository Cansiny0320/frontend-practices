<template>
    <div class="list-view">
        <div class="header">
            <div class="left">
                <van-icon
                    name="arrow-down"
                    class="arrow"
                    :class="{ active: active }"
                    @click="active = !active"
                />
                <h3 class="title">{{ title }}({{ list.length }})</h3>
            </div>
            <div class="right">
                <van-icon name="plus" />
                <van-icon name="ellipsis" class="action" />
            </div>
        </div>
        <ul class="container" v-show="active">
            <li
                v-for="(item, index) of list"
                :key="index"
                class="item"
                @click="toDetail(item.id)"
            >
                <div class="left">
                    <div class="cover">
                        <img v-lazy="item.coverImgUrl" />
                    </div>
                    <div class="info  van-ellipsis">
                        <div class="name" v-html="item.name"></div>
                        <div class="bottom">
                            <span class="tracks-num">
                                {{ item.trackCount + '首' }}
                            </span>
                            <span class="creator" v-if="item.creator">{{
                                ' by ' + item.creator
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <van-icon name="ellipsis" class="action" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '@/api'
export default {
    props: {
        title: {
            type: String,
            default: "Title"
        },
        created: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            active: true
        }
    },
    methods: {
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
                coverImgUrl: `${playlist.coverImgUrl}?param=300y300`,
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
    }
}
</script>

<style lang="scss" scoped>
.list-view {
    padding: 0 10px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            .arrow {
                padding: 1px 5px 5px 0;
                transform: rotate(-90deg);
                transition: 0.4s all ease-in-out;
            }
            .arrow.active {
                transform: rotate(0);
            }
        }
        .right {
            .action {
                transform: rotate(90deg);
                margin-left: 5px;
            }
        }
    }
    .container {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            .left {
                display: flex;
                .cover {
                    flex: 0 0 50px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 52px;
                    line-height: 26px;
                    width: calc(100vw - 100px);
                    font-size: 14px;
                    .bottom {
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>