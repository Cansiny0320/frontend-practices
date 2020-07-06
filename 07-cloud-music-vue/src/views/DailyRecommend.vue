<template>
    <div class="daily-recommend">
        <Loading class="loading" v-show="!recSongs" />
        <list-view
            title="每日推荐"
            :bgUrl="recSongs[0].album.picUrl"
            :tracks="recSongs"
            @select="selectItem"
        >
            <div class="banner">
                <div class="date">
                    <span class="day">{{ day }}</span>
                    <span>/</span>
                    <span class="month">{{ month }}</span>
                </div>
            </div>
        </list-view>
    </div>
</template>

<script>
import api from '@/api'
import ListView from '@/components/base/ListView'
import { mapActions } from 'vuex'
import Loading from '@/components/base/Loading'
import { createSong } from '@/common/js/Song'
export default {
    components: { ListView, Loading },
    data() {
        return {
            recSongs: [],
        }
    },
    computed: {
        day() {
            return this.$_pad(new Date().getDate())
        },
        month() {
            return this.$_pad(new Date().getMonth() + 1)
        }
    },
    created() {
        this.getRecSongs()
    },
    methods: {
        async getRecSongs() {
            try {
                const user = JSON.parse(localStorage.getItem('user_info'))
                const res = await api.recSongsFn(user.cookie);
                this.recSongs = res.data.data.dailySongs.map(item => createSong(item))
            } catch (err) {
                console.error(err)
                this.$router.back(-1)
            }

        },
        $_pad(num, n = 2) {
            let len = num.toString().length
            while (len < n) {
                num = '0' + num
                len++
            }
            return num
        },
        selectItem(track, index) {
            this.selectPlay({
                list: this.recSongs,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ]),
    }
}
</script>

<style lang="scss" scoped>
.daily-recommend {
    position: relative;
    .loading {
        position: fixed;
        left: 50%;
        top: 50vh;
        transform: translate(-30%, -50%);
        z-index: 10;
    }

    .banner {
        height: 20vh;
        width: 100vw;
        position: relative;
        .date {
            font-size: 20px;
            color: #fff;
            letter-spacing: 1px;
            position: absolute;
            bottom: 20px;
            left: 20px;
            text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
            .day {
                font-size: 32px;
                padding-right: 2px;
            }
            .month {
                padding-left: 2px;
            }
        }
    }
}
</style>