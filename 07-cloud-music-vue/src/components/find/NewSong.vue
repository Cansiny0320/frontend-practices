<template>
    <div class="new-song">
        <div class="title">
            <div class="recommended">
                <h2 :class="{ active: type === 'dish' }" @click="type = 'dish'">
                    新碟
                </h2>
                <h2
                    :class="{ active: type === 'newSong' }"
                    @click="type = 'newSong'"
                >
                    新歌
                </h2>
            </div>
            <div class="square">
                <router-link
                    tag="button"
                    to="/newdish"
                    v-show="type === 'dish'"
                    @click.stop="moreNewDish"
                    class="more"
                >
                    更多新碟
                </router-link>
                <router-link
                    tag="button"
                    to="/newsong"
                    v-show="type === 'newSong'"
                    @click.stop="moreNewSongs"
                    class="more"
                >
                    新歌推荐
                </router-link>
            </div>
        </div>
        <div class="content" v-show="type === 'dish'">
            <div
                class="content__img"
                v-for="(item, index) of newDishs"
                :key="index"
            >
                <img v-lazy="item.picUrl" />
                <div class="info">
                    <div class="name" v-html="item.name"></div>
                    <div class="artists van-ellipsis">
                        {{ item.artists.join('/') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-show="type === 'newSong'">
            <div
                class="content__img"
                v-for="(item, index) of newSongs"
                :key="index"
            >
                <img v-lazy="item.picUrl" />
                <div class="info">
                    <div class="name" v-html="item.name"></div>
                    <div class="artists van-ellipsis">
                        {{ item.artists.join('/') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



export default {
    data() {
        return {
            type: 'dish',
        }
    },
    props: {
        newDishs: {
            type: Array,
            required: true
        },
        newSongs: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding-bottom: 10px;
    h2 {
        padding: 0 5px;
        &:not(:last-child) {
            border-right: 1px solid #ddd;
        }
    }
    .recommended {
        display: flex;
        color: #999;
        .active {
            font-weight: 700;
            color: #333;
            transform: scale(1.1);
        }
    }
    .square {
        height: 100%;
        .more {
            border: 1px solid rgba(211, 208, 208, 0.5);
            border-radius: 10px;
            height: 100%;
            background-color: #fff;
        }
    }
}
.content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__img {
        flex: 30%;
        margin-right: 5px;
        width: 104px;
        &:nth-child(3) {
            margin-right: 0;
        }
        img {
            width: 100%;
        }
        .info {
            color: #333;
            .name {
                padding: 5px 0;
            }
            .artists {
                color: #999;
            }
        }
    }
}
</style>