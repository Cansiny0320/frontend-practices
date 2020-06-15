<template>
    <div class="search">
        <search-header
            class="search__header"
            :keywords="keywords"
            @back="back"
        />
        <router-view></router-view>
    </div>
</template>

<script>
// import api from '@/api'
import SearchHeader from '@/components/base/search/SearchHeader'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: { SearchHeader },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'keywords'
        ]),
    },
    methods: {
        back() {

            if (this.$route.path === '/search/hot') {
                this.$router.push('/find');
            } else {
                this.$router.push('/search/hot')
            }
            this.setKeywords('')
        }
        ,
        ...mapMutations({
            setKeywords: 'SET_KEYWORDS'
        })
    }
}
</script>

<style lang="scss" scoped>
.search {
    box-sizing: border-box;
    padding: 10px 10px 0;
    width: 100vw;
    &__header {
        width: 100%;
    }
    .hot-search {
    }
}
</style>