<template>
    <div class="login">
        <van-icon
            name="arrow-left"
            class="back"
            tag="div"
            size="30"
            @click="back"
        />
        <h2 class="title">手机号登录</h2>
        <van-form
            @submit="onSubmit"
            class="form"
            validate-first
            @failed="onFailed"
        >
            <van-field
                v-model="phoneNumber"
                type="tel"
                clearable
                size="large"
                maxlength="11"
                name="phoneNumber"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[
                    {
                        required: true,
                        pattern: /^1[345678]\d{9}$/,
                        message: '请输入正确手机号'
                    }
                ]"
            />
            <van-field
                v-model="password"
                clearable
                size="large"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import api from '@/api'
export default {
    data() {
        return {
            phoneNumber: '',
            password: '',
        };
    },
    methods: {
        back() {
            this.$router.back(-1);
        },
        async onSubmit(values) {
            const { phoneNumber, password } = values;
            const res = await api.phoneLoginFn(phoneNumber, password);
            const profile = res.data.profile;
            const user = {
                nickname: profile.nickname,
                avatarUrl: profile.avatarUrl,
                id: profile.userId,
                cookie: res.data.cookie
            };
            localStorage.setItem("user_info", JSON.stringify(user));
            this.$router.push('/find');
        },
        onFailed(errorInfo) {
            console.log(errorInfo);

        },
    },

}
</script>

<style lang="scss" scoped>
.login {
    position: relative;
    .back {
        position: absolute;
        top: 20px;
        left: 20px;
    }
    .title {
        margin-top: 200px;
        padding: 20px 0;
    }
    .form {
        width: 80vw;
    }
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
}
</style>