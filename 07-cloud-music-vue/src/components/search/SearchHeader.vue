<template>
    <div class="search-header">
        <van-icon
            name="arrow-left"
            class="back"
            tag="div"
            size="30"
            @click="back"
        />
        <input
            type="text"
            v-model="_keywords"
            class="input"
            @blur="active = false"
            @focus="keywords ? (active = true) : (active = false)"
            @input="cheack($event)"
            :placeholder="defaultShowKeywords"
            @keydown.enter="search"
        />
        <van-icon name="friends-o" tag="div" size="30" @click="toSingerList" />
        <search-advice
            class="advice"
            :keywords="keywords"
            @clickAdvice="search"
            :active="active"
        />
    </div>
</template>

<script>
import api from '@/api'
import { mapMutations } from 'vuex'
import { addLocalStorage } from '@/common/localStorage'
import SearchAdvice from './SearchAdvice'
export default {
    components: { SearchAdvice },
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            defaultShowKeywords: '',
            defaultRealKeywords: '',
            active: false,
        }
    },
    computed: {
        _keywords: {
            get() {
                return this.keywords
            },
            set(val) {
                this.setKeywords(val)
            }
        }
    },
    methods: {
        cheack(e) {
            e.target.value ? (this.active = true) : (this.active = false)
        },
        back() {
            this.$emit('back');
        },
        toSingerList() {
            this.$router.push('/singer')
        },
        async search() {

            try {
                !this._keywords && (this._keywords = this.defaultRealKeywords)
                await console.log(); //延时
                const res = await api.searchFn({
                    keywords: this._keywords,
                    type: 1
                })
                const songs = res.data.result.songs.map(item => ({
                    id: item.id,
                    url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                    name: item.name,
                    artists: item.artists.map(item => ([
                        item.name
                    ])),
                    album: {
                        name: item.album.name,
                        id: item.album.id,
                        picUrl: '',
                    },
                    duration: Math.floor(item.duration / 1000)
                }))
                this.setKeywords(this._keywords)
                this.setSearchSongs(songs)
                addLocalStorage('search_history', { keywords: this._keywords })
                this.$router.push(`/search/${this._keywords}`)
            } catch (error) {
                console.error(error);

            }
        },
        async getDefaultSearchKeywords() {
            const res = await api.defaultSearchFn();
            this.defaultShowKeywords = res.data.data.showKeyword;
            this.defaultRealKeywords = res.data.data.realkeyword;
        },
        ...mapMutations({
            setSearchSongs: 'SET_SEARCH_SONGS',
            setKeywords: 'SET_KEYWORDS'
        })
    },
    created() {
        this.getDefaultSearchKeywords();
    }
}
</script>

<style lang="scss" scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    position: relative;
    .input {
        border: none;
        border-bottom: 1px solid #333;
        width: 70%;
        height: 30px;
        font-size: 1.4em;
    }
    .advice {
        background-color: #fff;
        position: absolute;
        z-index: 999;
        top: 33px;
        left: 30px;
    }
}
</style>