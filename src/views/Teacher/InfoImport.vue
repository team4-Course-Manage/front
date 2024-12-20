<template>
  <RouterLink to="/stumanagement"><button class="backButton">返回</button></RouterLink>
  <div class="container">
    <h3>学生信息批量导入界面</h3>
    <div class="uploadfile">
      <!-- 点击触发文件上传 -->

      <!-- 隐藏的文件上传组件 -->
      <el-upload ref="upload" class="upload-demo"
        action=http://127.0.0.1:4523/m1/5394050-5067403-default/import/students :auto-upload="true"
        :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError" :on-change="handleChange"
        accept=".xlsx" :show-file-list="false">
        <div class="import">
          <el-icon style="font-size: 24px;">
            <Upload />
          </el-icon>
          <p>上传文件</p>
          <p class="file-support">支持扩展名：.xlsx</p>
        </div>
      </el-upload>
    </div>
    <!-- 错误提示信息 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { Upload } from "@element-plus/icons-vue";
import { handleError } from "vue";
import topteacher from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';


export default {
  components: {
    topteacher,
    Sidebar
  },

  name: "BatchImport",
  components: {
    Upload,
  },
  data() {
    return {
      errorMessage: "", // 错误提示信息
    };
  },
  methods: {
    beforeUpload(file) {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        this.errorMessage = '只能上传 .xlsx 格式的文件';
        return false;
      }
      this.errorMessage = ''; // 清空错误信息
      return true;
    },
    handleSuccess(response, file, fileList) {
      if (response.status == 400) {
        console.log("成功使用response.status")
      }
      console.log(response.message)
      this.errorMessage = "";
    },
    handleError(error, file, fileList) {
      this.$message.error('文件上传失败');
      this.errorMessage = '上传过程中发生错误，请重试';
    },
    handleChange(file, fileList) {
      if (file.status === 'uploading') {
        console.log('文件上传中...', file);
      } else if (file.status === 'done') {
        console.log('上传成功', file);
      } else if (file.status === 'error') {
        console.log('上传失败', file);
      }
    },
  }
};
</script>

<style scoped>
.backButton{
  position: absolute;
  top:20px;
  right:20px
}

.container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  /* 标题水平居中 */
  margin-bottom: 20px;
}

.uploadfile {
  width: 60%;
  /* 文件上传区域宽度 */
  height: 30vh;
  /* 文件上传区域高度 */
  border: 3px dashed #999;
  /* 虚线边框 */
  margin: 0 auto;
  /* 水平居中 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  border-radius: 8px;
  /* 圆角边框 */
  background-color: #fff;
  /* 背景色 */
}

.import {
  text-align: center;
  /* 内容水平居中 */
  cursor: pointer;
  /* 鼠标指针变成手势 */
}

.import p {
  margin: 10px 0 0;
  /* 文本的上下边距 */
  font-size: 16px;
  color: #333;
  /* 文本颜色 */
}

.file-support {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  /* 辅助文本颜色 */
}

.error-message {
  color: #d9534f;
  /* 错误信息颜色 */
  text-align: center;
  margin-top: 10px;
}
</style>
