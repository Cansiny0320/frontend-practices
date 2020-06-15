<template>
    <div class="loading">
        <div class="animation">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <p class="tip">{{ tip }}</p>
    </div>
</template>

<script>
export default {
    props: {
        tip: {
            type: String,
            default: '努力加载中...'
        }
    }
}
</script>

<style lang="scss" scoped>
.loading {
    display: flex;
    justify-content: space-between;
    width: 60vw;
    align-items: flex-end;
    .tip {
        flex-grow: 2;
        font-size: 14px;
        color: #333;
    }
    .animation {
        flex: 1;
        width: 60%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        span {
            background-color: red;
            display: inline-block;
            margin: 2px;
            transform-origin: bottom;
        }
        span:nth-child(1) {
            width: 5px;
            height: 7px;
            margin-left: 0;
            animation: grow 1s 0.15s ease-in-out infinite;
        }
        span:nth-child(2) {
            width: 5px;
            height: 15px;
            animation: grow 1s 0.3s ease-in-out infinite;
        }
        span:nth-child(3) {
            width: 5px;
            height: 3px;
            animation: grow 1s 0.45s ease-in-out infinite;
        }
        span:nth-child(4) {
            width: 5px;
            height: 10px;
            margin-right: 0;
            animation: grow 1s ease-in-out infinite;
        }
    }
    @keyframes grow {
        0%,
        100% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(2);
        }
    }
}
</style>