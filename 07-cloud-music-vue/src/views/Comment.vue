<template>
    <div class="comment">
        <Title :title="`评论(${commentsNumber})`" color="#000"></Title>
        <Loading class="loading" v-show="!commentsNumber" />
        <comment-list
            title="精彩评论"
            :commentList="hotComments"
        ></comment-list>
        <comment-list
            title="最新评论"
            :commentList="newComments"
        ></comment-list>
    </div>
</template>

<script>
import api from '@/api'
import CommentList from '@/components/base/CommentList'
import Title from '@/components/base/Title'
import Loading from '@/components/base/Loading'
import emoji from '@/common/js/emoji'
export default {
    components: { Title, CommentList, Loading },
    data() {
        return {
            newComments: [],
            hotComments: [],
            commentsNumber: '',
        }
    },
    created() {
        this.getComments()
    },
    activated() {
        this.getComments(this.$route.params.id)

    },
    methods: {
        async getComments(id) {
            this.newComments = [];
            this.hotComments = [];
            this.commentsNumber = '';
            try {
                const res = await api.commentMusicFn({
                    id,
                    limit: 30
                });
                let { hotComments, comments, total } = res.data;
                this.hotComments = this.$_filterComment(hotComments);
                this.newComments = this.$_filterComment(comments);
                this.commentsNumber = total;
            } catch (error) {
                console.error(error)
            }


        },
        $_filterComment(comments) {
            return comments.map(item => ({
                user: {
                    avatarUrl: `${item.user.avatarUrl}?param=150y150`,
                    nickname: item.user.nickname,
                },
                beReplied: item.beReplied.length > 0 ? {
                    user: {
                        nickname: item.beReplied[0].user.nickname
                    },
                    content: this.$_filterContent(item.beReplied[0].content),
                } : null,
                content: this.$_filterContent(item.content),
                time: this.$_filterTime(item.time),
                liked: item.liked,
                likeNumber: ''
            }))
        },
        $_filterTime(time) {
            const date = new Date(time)
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}年${month}月${day}日`
        },
        $_filterContent(content) {
            const reg = /\[[\u4e00-\u9fa5]{1,4}]/g;
            try {
                const emojiTextArr = content.match(reg) || []
                for (let i = 0; i < emojiTextArr.length; i++) {
                    const text = emojiTextArr[i]
                    // eslint-disable-next-line no-prototype-builtins
                    !emoji.hasOwnProperty(text) && console.log(text);
                    content = content.replace(text, emoji[text])
                }
            } catch (error) {
                console.error(error)
                content = ''
            }

            return content
        }
    }
}
</script>

<style lang="scss" scoped>
.comment {
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    overflow-y: auto;
    .loading {
        position: absolute;
        left: 50%;
        transform: translateX(-30%);
    }
}
</style>