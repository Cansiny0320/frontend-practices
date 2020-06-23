<template>
    <div class="user">
        <div class="user__info" v-if="login === true">
            <div class="user__info__avatar">
                <img :src="user.avatarUrl" />
            </div>
            <div class="user__info__name">
                <div class="name">{{ user.nickname }}</div>
                <div class="cheack" @click="handleCheackIn">
                    {{ cheackIn ? '已签到' : '签到' }}
                </div>
            </div>
        </div>
        <div class="user__login" v-if="login === false">
            <h3 class="user__login__text">登录网易云音乐</h3>
            <router-link tag="button" to="/login" class="user__login__button"
                >立即登录</router-link
            >
        </div>
    </div>
</template>

<script>
import api from "@/api"
export default {
    props: {
        user: {
            type: Object,
            required: true,
            default: () => ({})
        },
        login: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            cheackIn: false
        }
    },
    created() {
        this.isCheackIn();
    },
    methods: {
        async isCheackIn() {
            try {
                const res = await api.userDetailFn(this.user.id);

                this.cheackIn = res.data.mobileSign;
            } catch (error) {
                console.error(error)
            }
        },
        async handleCheackIn() {
            if (this.cheackIn) return;
            try {
                const res = await api.signInFn({
                    type: 0,
                    cookie: this.user.cookie
                });
                res.data.code === 200 && (this.cheackIn = true)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.user {
    width: 100%;
    &__info,
    &__login {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
    }
    &__info {
        &__name {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .name {
                font-size: 1.5em;
            }
            .cheack,
            .name {
                padding: 10px;
                font-size: 1.2em;
            }
            .cheack {
                color: #333;
                border: 1px solid #ddd;
                border-radius: 14px;
            }
        }
        &__avatar {
            width: 100px;
            height: 100px;
            img {
                height: 100%;
                object-fit: cover;
                border-radius: 100px;
            }
        }
    }
    &__login {
        justify-content: center;
        &__text {
            color: #333;
            padding: 20px;
            text-align: center;
        }
        &__button {
            color: #444;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #999;
            border-radius: 14px;
        }
    }
}
</style>