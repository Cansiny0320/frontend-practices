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
                    <User
                        :login="login"
                        :user="user"
                        :cheack="cheack"
                        @cheackIn="handleCheackIn"
                    /></div
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
import api from '@/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        MainHeader, User
    },
    created() {
        this.cheackLogin();
    },
    methods: {
        async cheackLogin() {
            const user_login = this.$cookies.get("user_login");
            if (user_login) {
                const { phoneNumber, password } = user_login;
                const res = await api.phoneLoginFn(phoneNumber, password);
                const profile = res.data.profile;
                const user = {
                    nickname: profile.nickname,
                    avatarUrl: profile.avatarUrl,
                    id: profile.userId,
                    cookie: res.data.cookie
                };
                this.setUser(user);
            }
            else {
                return
            }
        },
        handleMenuClick() {
            this.show = true;
        },
        handleSearchClick() {
            this.$router.push('/search')
        },
        getUserInfo() {

        },
        async handleCheackIn() {
            api.signInFn();
            this.cheack = "已签到"
        },
        ...mapMutations({
            setUser: 'SET_USER'
        })
    },
    data() {
        return {
            show: false,
            cheack: "签到",
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
        login() {
            return !!this.user.id
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