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
            v-model="keywords"
            class="input"
            @blur="active = false"
            @input="active = true"
            :placeholder="defaultShowKeywords"
            @keydown.enter="search"
        />
        <van-icon name="friends-o" tag="div" size="30" />
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
            active: false
        }
    },

    methods: {
        back() {
            this.$emit('back');
        },
        async search() {
            !this.keywords && (this.keywords = this.defaultRealKeywords)
            const res = await api.searchFn({
                keywords: this.keywords,
                type: 1
            })
            const songs = res.data.result.songs.map(item => ({
                id: item.id,
                name: item.name,
                artists: item.artists.map(item => ([
                    item.name
                ])),
                album: item.album.name,
                albumID: item.album.id,
                time: item.duration
            }))
            this.setKeywords(this.keywords)
            this.setSearchSongs(songs)
            this.$router.push(`/search/${this.keywords}`)
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