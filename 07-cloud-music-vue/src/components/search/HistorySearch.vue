<template>
    <div class="history-search">
        <div class="history-search__title">
            <h3 class="history-search__title__name">历史记录</h3>
            <van-icon
                name="delete"
                class="clear-btn"
                size="20"
                @click="clear"
            />
        </div>
        <ul class="history-search__ul">
            <li
                v-for="(item, index) of historySearch"
                :key="index"
                class="item"
                @click="click(item.keywords)"
            >
                {{ item.keywords }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '@/api'
import { createSong } from '@/common/js/Song'
export default {
    data() {
        return {
            historySearch: [],
        }
    },
    methods: {
        clear() {
            localStorage.clear('search_history')
            this.historySearch = []
        },
        getHistorySearch() {
            this.historySearch = JSON.parse(localStorage.getItem('search_history'))
        },
        async click(keywords) {
            try {
                const res = await api.searchFn({
                    keywords,
                    type: 1
                })
                const songs = res.data.result.songs.map(item => createSong(item, 1))
                this.setKeywords(keywords);
                this.setSearchSongs(songs)
                this.$router.push(`/search/${keywords}`)
            } catch (error) {
                console.error(error)
            }

        },
        ...mapMutations({
            setKeywords: 'SET_KEYWORDS',
            setSearchSongs: 'SET_SEARCH_SONGS'
        })
    },
    created() {
        this.getHistorySearch();
    }
}
</script>

<style lang="scss" scoped>
.history-search {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    &__ul {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        align-items: center;
        list-style-type: none;
        .item {
            white-space: nowrap;
            display: block;
            box-sizing: content-box;
            text-align: center;
            width: fit-content;
            width: -webkit-fit-content;
            width: -moz-fit-content;
            margin: 0 5px;
            padding: 5px 10px;
            background-color: #eee;
            border-radius: 14px;
            font-size: 16px;
        }
    }
}
</style>