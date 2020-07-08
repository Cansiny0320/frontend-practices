<template>
    <div class="comment-list">
        <div class="header">{{ title }}</div>
        <ul class="container">
            <li v-for="(item, index) of commentList" :key="index" class="item">
                <div class="left avatar">
                    <img
                        v-lazy="item.user.avatarUrl"
                        style="background-color:#eee"
                    />
                </div>
                <div class="right">
                    <div class="top">
                        <div class="top__left">
                            <div class="nickname">{{ item.user.nickname }}</div>
                            <div class="time">{{ item.time }}</div>
                        </div>

                        <div class="like">{{ item.likeNumber }}</div>
                    </div>
                    <div class="content" v-html="item.content"></div>
                    <div class="bereplied" v-if="item.beReplied">
                        <span class="nickname"
                            >@{{ item.beReplied.user.nickname }}:</span
                        >
                        <span
                            class="content"
                            v-html="item.beReplied.content"
                        ></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "评论标题"
        },
        commentList: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style lang="scss" scoped>
.comment-list {
    padding: 0 10px;
    .header {
        font-weight: bold;
    }
    .container {
        .item {
            padding: 10px 0;
            display: flex;
            .avatar {
                flex: 0 0 30px;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                margin-right: 10px;
            }
            .right {
                display: flex;
                flex-direction: column;
                width: calc(100vw - 80px);
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
                .top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    &__left {
                        color: #666;
                        font-size: 14px;
                        .time {
                            margin-top: 2px;
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
                .content {
                    line-height: 120%;
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                .bereplied {
                    font-size: 14px;
                    padding: 5px 0 5px 5px;
                    border-left: 2px solid #dfe2e5;
                    color: #777;
                    .nickname {
                        color: #00a1d6;
                        cursor: pointer;
                    }
                    .content {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>