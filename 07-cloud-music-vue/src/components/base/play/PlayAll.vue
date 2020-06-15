<template>
    <div class="play-all">
        <van-icon name="play-circle-o" class="play-all__btn" size="20" />
        <div class="play-all__title">
            <span>播放全部</span>
            <span class="song-number" v-if="songNumber !== 0">
                {{ songNumber }}
            </span>
        </div>
        <div class="play-all__select">
            <van-icon name="bars" size="20" />
            <span>多选</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        songNumber: {
            type: Number,
            default: 0
        }
    }

}
</script>

<style lang="scss" scoped>
.play-all {
    padding-top: 10px;
    display: flex;
    align-items: center;
    &__btn {
        margin-right: 10px;
    }
    &__title {
        font-size: 18px;
    }
    &__select {
        display: flex;
        align-items: center;
        margin-left: auto;
        span {
            margin-left: 5px;
        }
    }
}
</style>