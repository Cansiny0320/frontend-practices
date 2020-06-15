<template>
    <div class="main-header">
        <div class="menu" @click="handleMenuClick">
            <i class="iconfont">&#xe668;</i>
        </div>
        <nav>
            <router-link
                tag="div"
                v-for="item of navList"
                :key="item.name"
                :to="item.path"
            >
                <span class="nav-link" :class="{ 'link-active': true }">
                    {{ item.name }}
                </span>
            </router-link>
        </nav>
        <div class="search" @click="handleSearchClick">
            <i class="iconfont">&#xe667;</i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navList: [
                { path: '/mine', name: '我的' },
                { path: '/find', name: '发现' },
                { path: '/country', name: '云村' },
                { path: '/video', name: '视频' },
            ]
        }
    },
    methods: {
        handleMenuClick() {
            this.$emit('menu-click')
        },
        handleSearchClick() {
            this.$emit('search-click')
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@assets/styles/variable';
.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    background-color: #fff;
    .iconfont {
        color: $blackTextColor;
        font-size: $font-size-large;
    }
    nav {
        width: 70%;
        display: flex;
        justify-content: space-between;
        font-size: $font-size-large;
        font-weight: bold;
        color: $garyTextColor;
        .router-link-active {
            transform: scale(1.2);
            transition: all 0.1s ease-in-out;
            color: $blackTextColor;
        }
    }
}
</style>