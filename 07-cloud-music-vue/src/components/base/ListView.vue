<template>
    <div class="list-view">
        <div
            class="bg"
            :style="{
                backgroundImage: `url(${list.coverImgUrl})`,
                filter: `blur(100px)`,
                backgroundSize: 'cover'
            }"
        ></div>
        <div class="list-view__header">
            <div class="top">
                <van-icon name="arrow-left back" size="25" @click="back" />
                <span class="title">{{ title }}</span>
            </div>

            <div class="list-view__banner">
                <slot></slot>
            </div>
        </div>
        <div class="content">
            <Loading class="loading" v-show="!Object.keys(list).length" />
            <ul>
                <li
                    v-for="(item, index) of list.tracks"
                    :key="index"
                    class="item"
                >
                    <div class="index">
                        {{ index }}
                    </div>
                    <div class="item__left">
                        <div class="item__left__name van-ellipsis">
                            <span v-html="item.name"></span>
                            <span class="alia" v-if="item.alia[0]"
                                >({{ item.alia[0] }})</span
                            >
                        </div>
                        <div class="item__left__artists van-ellipsis">
                            {{ item.artists.join('/') }} -
                            {{ item.album.name }}
                        </div>
                    </div>
                    <div class="item__right">
                        <i class="iconfont">&#xe600;</i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true,
        }
    },
    methods: {
        back() {
            this.$router.back(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.list-view {
    &__header {
        .top {
            display: flex;
            align-items: center;
            .back {
                color: #fff;
                padding: 10px;
            }
            .title {
                color: #fff;
                font-size: 18px;
            }
        }
    }

    .bg {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -2;
    }
    .content {
        background-color: #fff;
        position: relative;
        padding: 10px;
        .item {
            display: flex;
            align-items: center;
            padding: 10px 0;

            .index {
                font-size: 18px;
                margin-right: 15px;
                color: #777;
            }
            &__left {
                width: 80vw;
                &__name {
                    padding: 0 0 5px;
                    font-size: 18px;
                    .alia {
                        color: #888;
                    }
                }
                &__artists {
                    color: #888;
                }
            }
            &__right {
                margin-left: auto;
                i {
                    font-size: 20px;
                    color: #999;
                }
            }
        }
        .loading {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-30%);
        }
    }
}
</style>