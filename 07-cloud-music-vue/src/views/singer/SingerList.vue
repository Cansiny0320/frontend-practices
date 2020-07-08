<template>
    <div class="singer-list">
        <div class="header">
            <van-icon
                name="arrow-left"
                class="back"
                tag="div"
                size="30"
                @click="back"
            />
            <h2 class="title">歌手分类</h2>
        </div>
        <div class="list">
            <div class="list__title">
                热门歌手
            </div>
            <ul class="list__content">
                <li
                    v-for="(item, index) of singerList"
                    :key="index"
                    class="item"
                >
                    <div class="item__avatar">
                        <img v-lazy="item.picUrl" />
                    </div>
                    <div class="item__name">{{ item.name }}</div>
                    <div class="item__followed">
                        <van-icon name="plus" size="5" v-if="!item.followed" />
                        <van-icon
                            name="success"
                            size="5"
                            v-if="item.followed"
                        />
                        <span class="text">
                            {{ item.followed ? '已关注' : '关 注' }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import api from '@/api'
export default {
    data() {
        return {
            singerList: [],
            area: '',
        }
    },
    methods: {
        back() {
            this.$router.back(-1);
        },
        async getSingerList() {
            try {
                const res = await api.singerClassFn();
                this.singerList = res.data.artists.map(item => ({
                    picUrl: `${item.picUrl}?param=300y300`,
                    followed: item.followed,
                    name: item.name,
                    id: item.id,
                }))
            } catch (error) {
                console.error(error)
            }
        }
    },
    created() {
        this.getSingerList()
    },
}
</script>

<style lang="scss" scoped>
@import '@assets/styles/variable.scss';
.singer-list {
    .header {
        padding: 10px;
        display: flex;
        align-items: center;
        .back {
            margin-right: 10px;
        }
    }
    .list {
        &__title {
            background-color: #ddd;
            padding: 5px;
        }
        &__content {
            padding: 10px;
            .item {
                display: flex;
                align-items: center;
                padding: 10px 0;
                &__avatar {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
                &__name {
                    font-size: 16px;
                }
                &__followed {
                    margin-left: auto;
                    color: $color-sub-theme;
                    padding: 5px 10px;
                    border: 1px solid $color-sub-theme;
                    border-radius: 14px;
                }
            }
        }
    }
}
</style>