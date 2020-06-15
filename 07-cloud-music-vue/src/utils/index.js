export default {
    /**
     * 从推荐列表中随机获取几个
     * @param {Array} List  推荐列表
     * @param {Number} limit 要获取的数目
     */
    getRandomRecList(List, limit) {
        const result = [];
        const indexs = [];
        for (let i = 0; i < limit; i++) {
            let index = Math.floor(Math.random() * List.length);
            if (!indexs.includes(index)) {
                indexs.push(index);
                result.push(List[index]);
            } else {
                i--;
            }
        }
        return result;
    },
};
