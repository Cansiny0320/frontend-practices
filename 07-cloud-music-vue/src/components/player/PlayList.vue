<template>
    <div class="play-list">
        <ul class="container">
            <li
                v-for="(item, index) of playList"
                :key="index"
                class="item"
                :class="{ active: index === currentIndex }"
                @click="select(index)"
            >
                <div class="info van-ellipsis">
                    <div class="name">{{ item.name }}</div>
                    <div class="alia" v-if="item.alia[0]">
                        ({{ item.alia[0] }})
                    </div>
                    <div
                        class="artists"
                        :class="{ active: index === currentIndex }"
                    >
                        {{ '-' + item.artists.join('/') }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {

    computed: {
        ...mapGetters([
            'playList',
            'currentIndex'
        ])
    },
    created() {
        console.log(this.playList);

    },
    methods: {
        select(index) {
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX'
        })
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 10px 10px 0;
    .active {
        color: #e83c3c !important;
    }
    .item {
        margin: 20px 0;
    }
    .info {
        width: 90vw;
        display: flex;
        align-items: center;
        letter-spacing: 1px;
        .name,
        .alia {
            font-size: 20px;
            line-height: 120%;
        }
        .artists {
            margin-left: 5px;
            font-size: 16px;
            color: #777;
        }
    }
}
</style>
