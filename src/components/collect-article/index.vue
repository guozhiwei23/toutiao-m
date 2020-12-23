<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";

export default {
  name: "CollectArticle",
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true;
      let r;
      try {
        if (this.value) {
          //已收藏,取消收藏
          r = await deleteCollect(this.articleId);
        } else {
          //没有收藏,添加收藏
          r = await addCollect(this.articleId);
        }
        if (!f) {
          return this.$toast.fail("操作失败,请重试");
        }

        //更新视图
        //自定义事件修改数据并不是立即的
        this.$emit("input", !this.value);

        tihs.$toast.success(!tihs.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败,请重试!");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
