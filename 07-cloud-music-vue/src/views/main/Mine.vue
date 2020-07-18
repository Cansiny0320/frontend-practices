<template>
    <div class="mine">
        <list-view created title="创建的歌单" :list="createdList"></list-view>
        <list-view created title="收藏的歌单" :list="collectedList"></list-view>
    </div>
</template>

<script>
import ListView from '@/components/mine/ListView'
import api from '@/api'
export default {
    components: { ListView },
    data() {
        return {
            createdList: [],
            collectedList: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            const user = JSON.parse(localStorage.getItem('user_info'))
            const { id } = user
            const res = await api.playlistFn(id)
            const [createdList, collectedList] = this.$_filterList(res.data.playlist, id)
            this.createdList = createdList;
            this.collectedList = collectedList;
        },
        /**
         *  返回一个数组 第一个值为创建的歌单 第二个值为收藏的歌单
         */
        $_filterList(playlist, uid) {
            const createdList = [];
            const collectedList = [];
            playlist = playlist.map(item => ({
                id: item.id,
                name: item.name,
                coverImgUrl: `${item.coverImgUrl}?param=300y300`,
                creator: item.userId === uid ? '' : item.creator.nickname,
                created: item.userId === uid ? true : false,
                trackCount: item.trackCount
            }))
            playlist.forEach(item => {
                item.created ? createdList.push(item) : collectedList.push(item)
            })
            return [createdList, collectedList]
        }
    }
}
</script>

<style lang="scss" scoped >
.mine {
}
</style>