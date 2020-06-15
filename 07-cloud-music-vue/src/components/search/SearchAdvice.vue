<template>
    <div class="search-advice">
        <ul v-show="keywords">
            <li class="search" @click="clickSearch('')">
                搜索"{{ keywords }}"
            </li>
            <li
                v-for="(item, index) of advice"
                :key="index"
                @click="clickSearch(item.keywords)"
            >
                <van-icon name="search" size="18" class="icon" />
                <span class="advice">{{ item.keywords }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/api'
import { mapMutations } from 'vuex'
export default {
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            advice: [],
        }
    },
    methods: {
        async getAdvice() {
            const res = await api.suggestSearchFn(this.keywords);
            this.advice = res.data.result.allMatch.map(item => ({
                keywords: item.keyword,
            }))
        },
        clickSearch(advice) {
            advice && (this.keywords = advice)
            this.setKeywords(this.keywords)
            this.advice = []
            this.$emit("clickAdvice");
        },
        ...mapMutations({
            setKeywords: 'SET_KEYWORDS'
        })
    },
    watch: {
        keywords() {
            this.getAdvice()
        }
    }

}
</script>

<style lang="scss" scoped>
.search-advice {
    width: 70vw;
    .search {
        color: blue;
        font-size: 18px;
        padding: 15px 0 10px 10px;
    }
    li {
        padding: 10px 0;
        line-height: 20px;
        border-bottom: 1px solid #eee;
        &:hover {
            background-color: #ddd;
        }
        .icon {
            margin-left: 5px;
            margin-right: 10px;
        }
        .advice {
            font-size: 18px;
        }
    }
}
</style>