<template>
    <div class="recommend">
        <Title
            :titles="titles"
            btnName="歌单广场"
            @btnClick="handleMoreBtnClick"
            class="title"
        ></Title>
        <ul class="container">
            <li v-for="(item, index) of songList" :key="index">
                <div class="img">
                    <img v-lazy="item.picUrl" />
                    <div class="count">
                        <i class="iconfont">&#xe656;</i>
                        <span class="count__number">
                            {{ item.playCount | formatPlayCount }}</span
                        >
                    </div>
                </div>
                <div class="name" v-html="item.name"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from '@/components/find/Title'
export default {
    props: {
        songList: {
            type: Array,
            required: true
        }
    },
    components: { Title },
    data() {
        return {
            titles: ["推荐歌单"]
        }
    },
    methods: {
        handleMoreBtnClick() {
            this.$router.push('/listsquare')
        }
    },
    filters: {
        formatPlayCount(num) {
            if (num >= 1e5) {
                return `${Math.round(num / 10000)}万`
            } else if (num >= 1e8) {
                return `${Math.round(num / 1e8)}亿`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recommend {
    .title {
        padding-bottom: 10px;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        height: 340px;
        li {
            flex: 30%;
            margin: 0 5px;
            &:nth-child(3n + 1) {
                margin-left: 0;
            }
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
        .img {
            position: relative;
            img {
                width: 100%;
            }
            .count {
                position: absolute;
                top: 0.22rem;
                right: 0.22rem;
                font-size: 0.8rem;
                color: #fff;
                i {
                    font-size: 0.75rem;
                }
            }
        }
        .name {
            color: #333;
            padding: 5px 0;
        }
    }
}
</style>