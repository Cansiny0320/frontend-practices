<template>
    <div class="player" v-show="playList.length">
        <transition name="van-slide-up">
            <div class="player--full" v-show="fullScreen">
                <div
                    class="player--full__bg"
                    :style="{
                        backgroundImage: `url(${currentSong.album.picUrl})`
                    }"
                ></div>
                <div
                    class="player--full__disc rotate"
                    :class="{ play: playing, pause: !playing }"
                >
                    <img
                        :src="currentSong.album.picUrl"
                        v-show="currentSong.album.picUrl"
                    />
                </div>

                <div class="player--full__header">
                    <div class="back" @click="back">
                        <i class="iconfont">&#xe666;</i>
                    </div>
                    <div class="info">
                        <div class="info__name van-ellipsis">
                            {{ currentSong.name }}
                        </div>
                        <div class="info__artists van-ellipsis">
                            {{ currentSong.artists }}
                        </div>
                    </div>
                </div>
                <div class="player--full__bottom">
                    <div class="action">
                        <div class="like" @click="like">
                            <i class="iconfont unliked" v-show="isLiked === -1"
                                >&#xe674;</i
                            >
                            <i
                                class="iconfont liked"
                                v-show="isLiked > -1"
                                :style="{ color: 'red' }"
                                >&#xe673;</i
                            >
                        </div>
                        <div class="download">
                            <i class="iconfont">&#xe663;</i>
                        </div>
                        <div class="comment" @click="handleCommentClick">
                            <i class="iconfont">&#xe675;</i>
                            <span class="num">{{
                                commentsNumber | filterCommentsNumber
                            }}</span>
                        </div>
                        <div class="info"><i class="iconfont">&#xe676;</i></div>
                    </div>
                    <div class="progress">
                        <span class="current-time">{{
                            formatTime(currentTime)
                        }}</span>
                        <van-slider
                            v-model="progress"
                            @change="onChange"
                            active-color="#eee"
                            inactive-color="#999"
                            button-size="10px"
                            class="progress__bar"
                        />
                        <span class="duration">{{ formatTime(duration) }}</span>
                    </div>
                    <div class="control">
                        <div class="play-mode">
                            <i class="iconfont" v-show="mode === 0">&#xe66f;</i>
                            <i class="iconfont" v-show="mode === 1">&#xe672;</i>
                            <i class="iconfont" v-show="mode === 2">&#xe66f;</i>
                        </div>
                        <div class="prev" @click="prev">
                            <i class="iconfont">&#xe66b;</i>
                        </div>

                        <div class="playing" @click="togglePlaying">
                            <i class="iconfont" v-show="!playing">&#xe66e;</i>
                            <i class="iconfont" v-show="playing">&#xe66d;</i>
                        </div>
                        <div class="next" @click="next">
                            <i class="iconfont">&#xe66a;</i>
                        </div>
                        <div class="play-list" @click="show = true">
                            <i class="iconfont">&#xe66c;</i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div
            class="player--mini"
            v-show="!fullScreen"
            @click="toggleFullScreen"
        >
            <div class="player--mini__cover">
                <img :src="currentSong.album.picUrl" />
            </div>
            <div class="info">
                <div class="info__name van-ellipsis">
                    {{ currentSong.name }}
                </div>
                <div class="info__artists van-ellipsis">
                    {{ currentSong.artists }}
                </div>
            </div>
            <div class="player--mini__control">
                <div class="playing" @click.stop="togglePlaying">
                    <div class="circle">
                        <van-circle
                            v-model="progress"
                            :rate="100"
                            :speed="100"
                            size="27"
                            color="red"
                            stroke-width="30"
                        />
                    </div>
                    <i class="iconfont" v-show="!playing">&#xe66e;</i>
                    <i class="iconfont" v-show="playing">&#xe66d;</i>
                </div>
                <div class="play-list" @click.stop="show = true">
                    <i class="iconfont">&#xe66c;</i>
                </div>
            </div>
        </div>
        <audio
            :src="currentSong.url"
            ref="audio"
            @error="next"
            @canplay="canplay"
            @timeupdate="onPlay"
            @ended="next"
        ></audio>
        <van-popup
            v-model="show"
            position="bottom"
            round
            class="play-list-container"
            ><play-list
        /></van-popup>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PlayList from './PlayList'
import api from '@/api'
export default {
    components: {
        PlayList
    },
    data() {
        return {
            show: false,
            duration: '',
            progress: 0,
            currentTime: '',
            likeList: [],
            commentsNumber: '',
        }
    },
    computed: {
        isLiked() {
            return this.likeList.indexOf(this.currentSong.id);
        },
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'mode',
            'currentIndex'
        ])
    },
    watch: {
        currentSong() {

            this.getComments();
            this.$nextTick(() => {
                this.$refs.audio.play()
            })
        },
        playing(newPlaying) {
            const audio = this.$refs.audio
            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause()
            })
        }
    },
    created() {
        this.getLikeList()
    },
    methods: {
        back() {
            this.setFullScreen(false)
        },
        togglePlaying() {
            this.setPlayingState(!this.playing)
        },
        toggleFullScreen() {
            this.setFullScreen(true)
        },
        prev() {
            this.setPlayingState(true)
            if (this.currentIndex > 0) {
                this.setCurrentIndex(this.currentIndex - 1)
            } else {
                this.setCurrentIndex(this.playList.length - 1)
            }
        },
        next() {
            this.setPlayingState(true)
            if (this.currentIndex < this.playList.length - 1) {
                this.setCurrentIndex(this.currentIndex + 1)
            } else {
                this.setCurrentIndex(0)
            }
        },
        canplay() {
            this.duration = this.currentSong.duration || Math.floor(this.$refs.audio.duration)
        },
        onPlay() {
            this.currentTime = Math.floor(this.$refs.audio.currentTime)
            this.progress = this.currentTime / this.duration * 100
        },
        onChange() {
            this.$refs.audio.currentTime = Math.floor(this.progress / 100 * this.duration)
        },
        formatTime(interval) {
            const minute = this.$_pad(Math.floor(interval / 60))
            const second = this.$_pad(interval % 60)
            return `${minute}:${second}`
        },
        $_pad(num, n = 2) {
            let len = num.toString().length
            while (len < n) {
                num = '0' + num
                len++
            }
            return num
        },
        async getLikeList() {
            const user = JSON.parse(localStorage.getItem('user_info'))
            const res = await api.likeMusicListFn(user.id, user.cookie)
            this.likeList = res.data.ids
        },
        like() {
            const user = JSON.parse(localStorage.getItem('user_info'))
            if (this.isLiked === -1) {
                api.likeMusicFn(this.currentSong.id, true, user.cookie)
                this.likeList.push(this.currentSong.id)
            } else {
                api.likeMusicFn(this.currentSong.id, false, user.cookie)
                this.$set(this.likeList, this.isLiked, 0)
            }
        },
        handleCommentClick() {

            this.$router.push({
                path: `/comment/${this.currentSong.id}`,
                params: {
                    id: this.currentSong.id
                }
            })
        },
        async getComments() {
            const res = await api.commentMusicFn({
                id: this.currentSong.id
            });
            let { total } = res.data;
            this.commentsNumber = total;

        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        })

    },
    filters: {
        filterCommentsNumber(commentsNumber) {
            if (commentsNumber > 10000) return '1w+ '
            else if (commentsNumber > 999) return '999+'
            else return commentsNumber + ' '
        }
    }
}   
</script>

<style lang="scss" scoped>
.player--full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #333;
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: 200%;
        filter: blur(40px);
        opacity: 0.7;
    }
    &__disc {
        position: absolute;
        background: url('~@assets/images/disc-o.png');
        background-size: 100% 100%;
        top: calc(40% - 40vw);
        left: calc(50% - 40vw);
        width: 80vw;
        height: 80vw;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 70%;
            height: 70%;
            border-radius: 100%;
        }
        &.rotate {
            animation: rotate 20s linear infinite;
        }
        &.play {
            animation-play-state: running;
        }
        &.pause {
            animation-play-state: paused;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        padding: 10px;
        .back {
            margin-right: 10px;
            .iconfont {
                font-size: 20px;
            }
        }
        .info {
            width: calc(100vw - 50px);
            &__name {
                font-size: 18px;
                line-height: 150%;
            }
            &__artists {
                color: #ddd;
                opacity: 0.7;
            }
        }
    }
    &__bottom {
        .action {
            display: flex;
            justify-content: space-between;
            margin: 0 50px 20px;
            .iconfont {
                font-size: 30px;
            }
            .comment {
                position: relative;
                .num {
                    position: absolute;
                    top: -3px;
                    right: calc(-100% + 8px);
                    width: 32px;
                }
            }
        }
        .control {
            padding: 10px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .iconfont {
                font-size: 30px;
            }
            .playing {
                .iconfont {
                    font-size: 45px;
                }
            }
        }
        .progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 10px;
            &__bar {
                width: 75vw;
            }
        }
    }
}
.player--mini {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 8vh;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.95);
    border-top: 1px solid #ddd;
    &__cover {
        width: calc(8vh - 10px);
        height: calc(8vh - 10px);
        margin-right: 5px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
    .info {
        &__name {
            font-size: 16px;
            line-height: 150%;
        }
        &__artists {
            color: #777;
        }
    }
    &__control {
        margin-left: auto;
        display: flex;
        .playing {
            position: relative;
            .circle {
                position: absolute;
                top: 1px;
                left: 7px;
            }
        }
        .iconfont {
            font-size: 30px;
            margin: 0 5px;
        }
    }
}
.play-list-container {
    height: 50vh;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>