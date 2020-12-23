<template>
  <div class="updata-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbor">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { Form } from "vant";

export default {
  name: "UpdataPhoto",
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
    });
  },
  methods: {
    onConfirm() {
      //基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData());

      //纯客户端的裁切使用 getCroppedCanvas 获取裁切的文章对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updataUserPhoto(blob);
      });
    },

    async updataUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        //错误的用法
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通 JavaScript 对象
        // updateUserPhoto({
        //   photo: blob
        // })

        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则你必须传递 FormData 对象
        const FormData = new FormData();
        FormData.append("photo", blob);

        const { data } = await this.updataUserPhoto(FormData);
        console.log(data);
        // 关闭弹出层
        this.$emit("close");

        // 更新视图
        this.$emit("update-photo", data.data.photo);

        // 提示成功
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.updata-photo {
  background-color: #000;
  height: 100%;
  .toolbor {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  max-width: 100%;
}
</style>
