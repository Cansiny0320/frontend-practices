<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <Player />
    </div>
</template>
<script>
import Player from '@/components/player/Player'
export default {
    components: { Player }
}
</script>
<style lang="scss" scoped>
#app {
    // 播放器高度
    padding-bottom: 59px;
}
</style>

