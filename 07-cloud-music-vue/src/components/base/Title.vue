<template>
    <div class="title" :style="{ color: `${color}` }">
        <i class="iconfont back" @click="back">&#xe666;</i>
        <span class="title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        color: {
            type: String,
            default: '#fff'
        }
    },
    methods: {
        back() {
            this.$router.back(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    .back {
        padding: 10px;
        font-size: 20px;
    }
    .title {
        font-size: 18px;
    }
}
</style>