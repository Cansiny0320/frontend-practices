<template>
    <div class="swiper">
        <van-swipe
            :autoplay="5000"
            indicator-color="#dd001b"
            :stop-propagation="false"
        >
            <van-swipe-item v-for="(item, index) of swiperList" :key="index">
                <img class="banner-img" :src="item.pic" />
                <span class="title" :style="{ background: item.titleColor }">{{
                    item.typeTitle
                }}</span>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import api from '@/api'
export default {
    name: 'findSwiper',
    data() {
        return {
            swiperList: [],
        }
    },
    methods: {
        async getSweiper() {
            const res = await api.bannerSwiperFn();
            this.swiperList = res.data.banners.map(item => ({
                pic: item.pic,
                typeTitle: item.typeTitle,
                titleColor: item.titleColor,
            }))

        }
    },
    mounted() {
        this.getSweiper();
    }
}
</script>

<style lang="scss" scoped>
@import '@assets/styles/variable';
.swiper {
    box-sizing: border-box;
    padding: 0.2rem;
    width: 100%;
    height: 0;
    padding-bottom: 40%;
    .banner-img {
        width: 100%;
        height: 100%;
        border-radius: $imgBorderRadius;
    }
    .title {
        position: absolute;
        right: 0;
        bottom: 4px;
        color: #fff;
        font-size: smaller;
        padding: 3px 6px;
        opacity: 0.8;
        border-top-left-radius: 0.11rem;
    }
}
</style>