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
            :placeholder="placeholder"
            @keydown.enter="search"
        />
        <van-icon name="friends-o" tag="div" size="30" />
    </div>
</template>

<script>
import api from '@/api'
export default {
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            placeholder: '中国话-SHE'
        }
    },

    methods: {
        back() {
            this.$emit('back');
        },
        async search() {
            !this.keywords && (this.keywords = this.placeholder)
            const res = await api.searchFn({
                keywords: this.keywords,
                type: 1
            })
            console.log(res.data);

            this.$router.push(`/search/${this.keywords}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    .input {
        border: none;
        border-bottom: 1px solid #333;
        width: 70%;
        height: 30px;
        font-size: 1.4em;
    }
}
</style>