<template>
    <div class="main">
        <van-sticky>
            <main-header
                @menu-click="handleMenuClick"
                @search-click="handleSearchClick"
            />
        </van-sticky>
        <aside class="user" ref="user">
            <van-popup v-model="show" position="left" :style="{ width: '80%' }"
                ><div class="content">
                    <User :login="login" :user="user" /></div
            ></van-popup>
        </aside>
        <keep-alive>
            <router-view> </router-view>
        </keep-alive>
    </div>
</template>

<script>
import MainHeader from '@/components/base/MainHeader'
import User from '@/components/base/user/User'

export default {
    components: {
        MainHeader, User
    },
    created() {
        this.cheackLogin();
    },
    methods: {
        cheackLogin() {
            this.user = JSON.parse(localStorage.getItem('user_info'));
        },
        handleMenuClick() {
            this.show = true;
        },
        handleSearchClick() {
            this.$router.push('/search')
        },
        getUserInfo() {

        },
    },
    data() {
        return {
            show: false,
            user: () => ({}),
        }
    },
    computed: {
        login() {
            return this.user !== null;
        }
    }
}
</script>

<style lang="scss" scored>
.main {
    .user {
        .content {
            box-sizing: border-box;
            width: 100%;
            height: 100vh;
            padding: 10px 10px 0;
        }
    }
}
</style>