<template>
    <div class="nav-link">
        <div class="container">
            <router-link
                tag="div"
                :to="item.path"
                class="container__item"
                v-for="(item, index) of navLinks"
                :key="index"
            >
                <div class="bg">
                    <i class="iconfont" v-html="item.icon"></i>
                    <span class="date" v-if="item.date"> {{ item.date }}</span>
                </div>
                <span class="text"> {{ item.text }} </span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navLinks: [
                {
                    text: '每日推荐',
                    date: new Date().getDate(),
                    path: '/dailyrecommend',
                    icon: '&#xe685;'
                },
                {
                    text: '歌单',
                    path: '/list',
                    icon: '&#xe60a;'
                },
                {
                    text: '排行榜',
                    path: '/rank',
                    icon: '&#xe608;'
                },
                {
                    text: '电台',
                    path: '/radio',
                    icon: '&#xe6f4;'
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-bottom: 1px solid rgba(211, 208, 208, 0.3);
    &__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .bg {
        height: 50px;
        width: 50px;
        background: linear-gradient(to right, #ff5a4c, #ff1d11);
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        position: relative;
        .iconfont {
            color: #fff;
            font-size: 24px;
        }
    }
    .text {
        margin-top: 10px;
        font-size: 14px;
    }
    .date {
        position: absolute;
        font-size: 14px;
        top: 3px;
        left: calc(50% - 8px);
        color: #fff;
    }
}
</style>