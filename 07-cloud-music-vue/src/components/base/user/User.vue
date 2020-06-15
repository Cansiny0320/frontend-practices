<template>
    <div class="user">
        <div class="user__info" v-show="login === true">
            <div class="user__info__avatar">
                <img :src="user.avatarUrl" />
            </div>
            <div class="user__info__name">
                <div class="name">{{ user.nickname }}</div>
                <div class="cheack" @click="handleCheackIn">
                    {{ cheack }}
                </div>
            </div>
        </div>
        <div class="user__login" v-show="login === false">
            <h3 class="user__login__text">登录网易云音乐</h3>
            <router-link tag="button" to="/login" class="user__login__button"
                >立即登录</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        login: {
            type: Boolean,
            default: false
        },
        cheack: {
            type: String,
            required: true
        }
    },
    methods: {
        handleCheackIn() {
            this.$emit("cheackIn")
        }
    },
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