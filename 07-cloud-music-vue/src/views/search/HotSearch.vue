<template>
    <div class="hot-search">
        <h3 class="title">热搜榜</h3>
        <ol>
            <li
                v-for="(item, index) of hotSearchList"
                :key="index"
                class="item"
                @click="handleItemClick(item.keywords)"
            >
                <h3 class="item__index" :class="{ red: index + 1 <= 3 }">
                    {{ index + 1 }}
                </h3>
                <div class="item__info">
                    <h3 class="keywords">
                        {{ item.keywords }}
                        <img
                            class="icon"
                            :src="item.iconUrl"
                            v-if="item.iconUrl"
                            :class="{
                                size:
                                    item.iconUrl ===
                                    'https://p1.music.126.net/PtgUJbcvDAY0HKWpmOB2HA==/109951163967988470.png'
                            }"
                        />
                    </h3>
                    <p class="desc">{{ item.desc }}</p>
                </div>
                <div class="item__score">{{ item.score }}</div>
            </li>
        </ol>
    </div>
</template>

<script>
import api from '@/api'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            hotSearchList: []
        }
    },
    methods: {
        async getHotSearch() {
            const res = await api.hotSearchListFn()
            this.hotSearchList = res.data.data.map(item => ({
                keywords: item.searchWord,
                score: item.score,
                desc: item.content,
                iconUrl: item.iconUrl
            }))
        },
        async handleItemClick(keywords) {
            this.setKeywords(keywords);
            const res = await api.searchFn({
                keywords,
                type: 1
            })
            console.log(res.data);
            this.$router.push(`/search/${keywords}`)
        },
        ...mapMutations({
            setKeywords: 'SET_KEYWORDS'
        })
    },
    created() {
        this.getHotSearch()
    }
}
</script>

<style lang="scss" scoped>
.red {
    color: red;
}
.size {
    height: 18px !important;
    width: 15px !important;
}
.hot-search {
    margin-top: 20px;
    .title {
        padding-bottom: 10px;
    }
    ol {
        list-style-type: none;
    }
    .item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        &__index {
            text-align: center;
            padding: 0 20px 0 5px;
        }
        &__info {
            display: flex;
            flex-direction: column;
            .keywords {
                padding: 0 0 5px 0;
                font-weight: normal;

                .icon {
                    top: 0;
                    right: 0;
                    width: 30px;
                    height: 15px;
                    z-index: 100;
                }
            }
            .desc {
                color: #888;
            }
        }
        &__score {
            margin-left: auto;
            color: #999;
        }
    }
}
</style>