<template>
  <div class="updata-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updataUserProfile } from "@/api/user";

export default {
  name: "UpdataGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止背景点击
        duration: 0, // 持续展示 toast
      });

      try {
        const localGender = this.localGender;
        await updataUserProfile({
          gender: localGender,
        });

        //更新视图
        this.$emit("input", localGender);

        // 关闭弹层
        this.$emit("close");

        //提示成功
        this.$toast("更新成功");
      } catch (err) {
        this.$toast("更新失败");
      }
    },

    onPickerChange(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>

<style scoped lang='less'>
</style>
