<template>
    <div class="list-view">
        <div
            class="bg"
            :style="{
                backgroundImage: `url(${bgUrl})`,
                filter: `blur(100px)`,
                backgroundSize: 'cover'
            }"
        ></div>
        <div class="list-view__header">
            <Title :title="title"></Title>
            <div class="list-view__banner">
                <slot></slot>
            </div>
        </div>
        <div class="content">
            <Loading class="loading" v-show="!Object.keys(tracks).length" />
            <ul>
                <li
                    v-for="(item, index) of tracks"
                    :key="index"
                    class="item"
                    @click="selectItem(item, index)"
                >
                    <div class="index">
                        {{ index + 1 }}
                    </div>
                    <div class="item__left">
                        <div class="item__left__name van-ellipsis">
                            <span v-html="item.name"></span>
                            <span class="alia" v-if="item.alia"
                                >({{ item.alia }})</span
                            >
                        </div>
                        <div class="item__left__artists van-ellipsis">
                            {{ item.artists }} -
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
import Title from './Title'
export default {
    components: { Title },
    props: {
        tracks: {
            type: Array,
            required: true
        },
        bgUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: 'title'
        }
    },
    methods: {
        selectItem(track, index) {
            this.$emit('select', track, index);
        }
    }
}
</script>

<style lang="scss" scoped>
.list-view {
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
        min-height: calc(100vh - 245px);
        border-radius: 14px;
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
                    line-height: 120%;
                    .alia {
                        color: #888;
                    }
                }
                &__artists {
                    line-height: 120%;
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