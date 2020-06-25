<template>
    <div class="daily-recommend">
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
export default {
    components: { ListView },
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
            const user = JSON.parse(localStorage.getItem('user_info'))
            const res = await api.recSongsFn(user.cookie);
            this.recSongs = res.data.recommend.map(item => ({
                name: item.name,
                id: item.id,
                url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                alia: item.alias,
                duration: '',
                album: {
                    id: item.album.id,
                    name: item.album.name,
                    picUrl: item.album.blurPicUrl
                },
                artists: item.artists.map(item => (
                    item.name
                )),
                mv: item.mvid,
            }))
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
</style>