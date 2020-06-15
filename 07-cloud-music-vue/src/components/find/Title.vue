<template>
    <div class="title">
        <h2 v-for="(title, index) of titles" :key="index">{{ title }}</h2>
        <button class="more" @click="click">{{ btnName }}</button>
    </div>
</template>

<script>
export default {
    props: {
        titles: {
            type: Array,
            required: true
        },
        btnName: {
            type: String,
            required: true
        }
    },
    methods: {
        click() {
            this.$emit("btnClick")
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    h2 {
        padding: 0 5px;
    }
    .more {
        border: 1px solid rgba(211, 208, 208, 0.5);
        border-radius: 10px;
        height: 100%;
        background-color: #fff;
    }
}
</style>