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
</style>

