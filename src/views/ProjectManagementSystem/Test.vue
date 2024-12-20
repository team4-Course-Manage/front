<template>
    <top/>
    <div class="container0">
      <Sidebar3/>
      <div class="right">
        <label>{{ activeTab === 'workPackages' ? '工作包' : activeTab }}</label>
        <div class="main">
          <div class="main-content">
            <div class="create">
              <el-button type="primary" @click="handleSelect">创建任务</el-button>
            </div>
            <div class="packge">
              <table class="form-table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>主题</th>
                    <th>状态</th>
                    <th>受理人</th>
                    <th>优先级</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.subject }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.assignee }}</td>
                    <td>{{ item.priority }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 表单 -->
            <div v-if="formVisible" class="form-container">
              <h3>新增任务 {{ formTitle }}</h3>
              <form @submit.prevent="submitForm">
                <div class="theme">
                  <input v-model="form.subject" id="subject" type="text" placeholder="这里是主题（用户输入）" required />
                </div>
                <div class="descrip">
                  <input v-model="form.description" id="description" type="text" placeholder="这里是描述（用户输入）" required />
                </div>

                <label for="gang">人员</label>
                <div class="form-group">
                  <label for="responsible-person">受理人</label>
                  <select v-model="form.responsiblePerson" id="responsible-person" required>
                    <option value="" disabled>请选择</option>
                    <option value="组员1">组员1</option>
                    <option value="组员2">组员2</option>
                    <option value="组员3">组员3</option>
                    <option value="组员4">组员4</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="leader">负责人</label>
                  <select v-model="form.leader" id="leader" required>
                    <option value="" disabled>请选择</option>
                    <option value="组员1">组员1</option>
                    <option value="组员2">组员2</option>
                    <option value="组员3">组员3</option>
                    <option value="组员4">组员4</option>
                  </select>
                </div>

                <label for="gang">详细信息</label>
                <div class="form-group">
                  <label for="priority">优先级</label>
                  <select v-model="form.priority" id="priority" required>
                    <option value="" disabled>请选择优先级</option>
                    <option value="低">低</option>
                    <option value="普通">普通</option>
                    <option value="高">高</option>
                    <option value="立即">立即</option>
                  </select>
                </div>

                <div class="date">
                  <label for="description">日期</label>
                  <textarea v-model="form.date" id="date" placeholder="用户输入" required></textarea>
                </div>

                <div class="form-buttons">
                  <button type="submit">保存</button>
                  <button type="button" @click="resetForm">取消</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import top from "../../components/topofstudent.vue"
  import Sidebar3 from "../../components/Sidebar3.vue";
  export default{
      components:{
          top,
          Sidebar3
      }
  }
  </script>
  
  <style scoped>
    .container0{
      width: 100%;
      display: flex;
    }





.square {
  height: 45px;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 0;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
}

/* 修改 right 组件样式，移除白色背景 */
.right {
  width:70%;
  padding: 30px;
}

.create {
  position: absolute;
  right: 30px;
}

.create button {
  position: absolute;
  right: 30px;
  width: 100px;
  height: 40px;
}

.form-container {
  position: absolute;
  top: 36%;
  left: 25%;
  transform: translateX(-50%);
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  background-color: white;
  z-index: 10;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-right: 10px;
}

.form-group select {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
}

.theme {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.theme input {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
}

.descrip {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.descrip input {
  height: 60px;
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding-top: 0;
  text-align: left;
}

.date {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.date label {
  font-weight: bold;
  margin-right: 23px;
}

.date textarea {
  height: 20px;
  width: 74%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  resize: none;
}

form label[for="gang"] {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
  margin-top: 15px;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px;
}

.form-table th,
.form-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.form-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.form-buttons {
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: flex;
  gap: 10px;
}

form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  min-width: 70px;
}

form button:hover {
  background-color: #0056b3;
}

form button[type="button"] {
  background-color: #ccc;
}

form button[type="button"]:hover {
  background-color: #999;
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
  border: 2px solid rgba(0, 0, 0,.1);
  background-color: white;
  margin-top: 20px;
  flex: 1;
  height: 700px;
}

.main-content {
  padding: 20px;
}
  </style>