<template>
    <div class="banner">
        <div class="cover">
            <img :src="list.coverImgUrl" />
            <div class="count">
                <i class="iconfont">&#xe656;</i>
                <span class="count__number">
                    {{ list.playCount | formatPlayCount }}</span
                >
            </div>
        </div>
        <div class="info">
            <div class="title" v-html="list.name"></div>
            <div class="creator">
                <div class="avatar"><img :src="list.creator.avatarUrl" /></div>
                <div class="name" v-html="list.creator.nickname"></div>
            </div>
            <div
                class="des van-multi-ellipsis--l2"
                v-html="list.description"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            required: true
        }
    },
    filters: {
        formatPlayCount(num) {
            if (num >= 1e5) {
                return `${Math.round(num / 10000)}万`
            } else if (num >= 1e8) {
                return `${Math.round(num / 1e8)}亿`
            }
            return num
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    display: flex;
    height: 190px;
    padding: 20px 10px;
    .cover {
        height: 150px;
        width: 150px;
        position: relative;
        img {
            width: 150px;
            height: 150px;
        }
        .count {
            position: absolute;
            top: 0.22rem;
            right: 0.22rem;
            font-size: 1rem;
            color: #fff;
            i {
                font-size: 0.9rem;
            }
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        color: #fff;
        .title {
            line-height: 130%;
            font-size: 18px;
        }
        .creator {
            margin: 10px 0;
            height: 40px;
            display: flex;
            align-items: center;
            .name {
                margin-left: 5px;
                color: #ddd;
                opacity: 0.8;
            }
            img {
                height: 40px;
                width: 40px;
                border-radius: 100%;
            }
        }
        .des {
            width: 50vw;
            color: #ddd;
            opacity: 0.8;
            margin-bottom: 5px;
            line-height: 110%;
        }
    }
}
</style>