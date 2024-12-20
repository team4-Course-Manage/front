<template>
  <top />
  <div class="container0">
    <Sidebar3 />
    <div class="container1">
      <div class="right">
        <label>{{ activeTab === 'weeklyReports' ? '周报' : activeTab }}</label>
        <div class="main">
          <div class="main-content">
            <!-- 根据 activeTab 动态显示内容 -->
            <div v-if="activeTab === 'overview'" class="tab-content">
              <h2>项目概述</h2>
              <p>这里是项目概述的内容。</p>
            </div>
            <div v-else-if="activeTab === 'workPackages'" class="tab-content">
              <h2>工作包</h2>
              <p>这里是工作包的内容。</p>
            </div>
            <div v-else-if="activeTab === 'weeklyReports'" class="tab-content">
              <!-- 上传周报的表单 -->
              <div class="upload-form">
                <el-input v-model="reportTitle" placeholder="请输入周报标题" class="report-title-input"></el-input>
                <el-input v-model="reportDescription" placeholder="请输入周报描述" class="report-description-input"></el-input>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="text">
                  <el-button type="primary">上传文件</el-button>
                </el-upload>
              </div>
              <!-- 周报列表 -->
              <div class="report-list">
                <label>历史上传</label>
                <div class="report-card" v-for="(report, index) in reports" :key="index">
                  <div class="report-content">
                    <h3>{{ report.title }}</h3>
                    <p class="description">{{ report.description }}</p>
                    <span class="file-type">文件类型: {{ report.fileType }}</span>
                  </div>
                  <el-button @click="viewReport(report.id)" class="view-details-btn">查看</el-button>
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === '成员管理'" class="tab-content">
              <div class="right">
                <!-- "+"成员"按钮 -->
                <div class="create">
                  <el-button type="primary" @click="showAddMemberModal">+成员</el-button>
                </div>

                <!-- 添加的成员信息表格 -->
                <div class="member-table" v-if="addedMembers.length > 0">
                  <table class="form-table">
                    <thead>
                      <tr>
                        <th>名称</th>
                        <th>角色</th>
                        <th>组</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(member, index) in addedMembers" :key="index">
                        <td>{{ member.name }}</td>
                        <td>{{ member.role }}</td>
                        <td>{{ member.group }}</td>
                        <td>{{ member.status }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 添加成员弹窗 -->
                <div v-if="addMemberModalVisible" class="modal-container">
                  <div class="modal-content">
                    <h3>添加成员</h3>
                    <div class="form-group">
                      <label for="existing-user">添加现有用户或组</label>
                      <select v-model="form.existingUser" id="existing-user">
                        <option value="" disabled>请选择</option>
                        <option value="Chris">Chris</option>
                        <option value="Adam">Adam</option>
                        <option value="John">John</option>
                        <option value="课程组123">课程组123</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="new-role">将角色分配给新成员</label>
                      <select v-model="form.newRole" id="new-role">
                        <option value="" disabled>请选择</option>
                        <option value="成员">成员</option>
                        <option value="阅读者">阅读者</option>
                        <option value="项目管理员">项目管理员</option>
                      </select>
                    </div>

                    <div class="form-buttons">
                      <button type="button" @click="addMember">添加</button>
                      <button type="button" @click="closeAddMemberModal">取消</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === 'projectSettings'" class="tab-content">
              <h2>项目设置</h2>
              <p>这里是项目设置的内容。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/topofstudent.vue"
import Sidebar3 from "../../components/Sidebar3.vue";
export default {
  components: {
    top,
    Sidebar3
  },
  data() {
    return {
      selectedProject: 'project1', // 默认选择项目1
      activeTab: 'weeklyReports', // 默认显示周报内容
      reportTitle: '',
      reportDescription: '',
      fileList: [],
      reports: [
        { id: 1, title: '第一周周报', description: '这是第一周的实验报告', fileType: 'Word' },
        { id: 2, title: '第二周周报', description: '这是第二周的实验报告', fileType: 'PDF' },
        { id: 3, title: '第三周周报', description: '这是第三周的实验报告', fileType: 'PPT' },
      ],
      form: {
        project: '',
        existingUser: '',
        newRole: ''
      },
      addMemberModalVisible: false, // 控制弹窗显示
      addedMembers: [], // 存储添加的成员信息
    }
  },
  created() {
    // 从 query 参数中获取要激活的标签页
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab;
    }
  },
  methods: {
    // 文件预览
    handlePreview(file) {
      console.log('预览文件:', file);
    },
    // 文件移除
    handleRemove(file, fileList) {
      console.log('移除文件:', file, fileList);
    },
    // 查看周报
    viewReport(reportId) {
      console.log(`查看周报: ${reportId}`);
    },
    // 显示添加成员弹窗
    showAddMemberModal() {
      this.addMemberModalVisible = true;
    },

    // 关闭添加成员弹窗
    closeAddMemberModal() {
      this.addMemberModalVisible = false;
      this.resetForm();
    },

    // 添加成员
    addMember() {
      if (this.form.existingUser || this.form.newRole) {
        this.addedMembers.push({
          name: this.form.existingUser || '新成员',
          role: this.form.newRole || '未分配',
          group: this.form.existingUser.includes('课程组') ? this.form.existingUser : '未分配',
          status: '已添加'
        });
        this.closeAddMemberModal();
      } else {
        alert('请选择用户或角色');
      }
    },
    // 重置表单
    resetForm() {
      this.form.existingUser = '';
      this.form.newRole = '';
    },

  }
}
</script>

<style scoped>
.container0 {
  width: 100%;
  display: flex;
}

.container1 {
  width: 1800px;
  border: 1px solid #999;
  padding: 5px;
}

.right {
  flex: 1;
  padding: 20px;
}

.right label {
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
}

.main {
  border: 2px solid rgba(0, 0, 0, .1);
  background-color: white;
  margin-top: 20px;
  flex: 1;
  height: 700px;
}

.tab-content {
  padding: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.report-title-input,
.report-description-input {
  width: 50%;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.report-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-content {
  flex: 1;
}

.report-card h3 {
  margin: 0 0 10px;
  font-size: 24px;
}

.report-card p {
  margin: 0 0 10px;
  font-size: 16px;
}

.report-card .description {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.report-card .file-type {
  font-size: 14px;
  color: #888;
}

.view-details-btn {
  margin-left: 20px;
}

/* 添加成员弹窗样式 */
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
}

.modal-content h3 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-buttons button:first-child {
  background-color: #4CAF50;
  color: white;
}

.form-buttons button:last-child {
  background-color: #f44336;
  color: white;
}

/* 成员表格样式 */
.member-table {
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.form-table th,
.form-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.form-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.form-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.form-table tbody tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}
</style>