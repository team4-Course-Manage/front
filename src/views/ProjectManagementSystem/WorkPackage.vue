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
                <tr v-for="(task, index) in tasks" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ task.theme }}</td>
                  <td>{{ task.status }}</td>
                  <td>{{ task.receiverId }}</td>
                  <td>{{ task.priority }}</td>
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
                  <option v-for="member in memberList" 
                          :key="member.id" 
                          :value="member.id">
                    {{ member.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="leader">负责人</label>
                <select v-model="form.leader" id="leader" required>
                  <option value="" disabled>请选择</option>
                  <option v-for="member in memberList" 
                          :key="member.id" 
                          :value="member.id">
                    {{ member.name }}
                  </option>
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

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';  // 确保导入 axios
import { ElMessage } from 'element-plus';  // 添加这行
import top from "../../components/topofstudent.vue"
import Sidebar3 from "../../components/Sidebar3.vue";

// 组件引用
const components = {
  top,
  Sidebar3
}

// 表单相关的数据
const formVisible = ref(false);
const formTitle = ref('');
const tasks = ref([]); // 用于存储任务列表数据

// 添加组员列表数据
const memberList = ref([]);

// 修改获取组员列表的方法
const fetchMemberList = async () => {
  try {
    // 获取组信息
    const groupResponse = await axios.get('http://127.0.0.1:4523/m2/5394050-5067403-default/246845626');
    
    if (groupResponse.data && Array.isArray(groupResponse.data)) {
      // 将组信息转换为成员列表格式
      memberList.value = groupResponse.data.map(group => ({
        id: group.GroupID,
        name: group.GroupName
      }));
      
      console.log("获取组员列表成功:", memberList.value);
    } else if (groupResponse.data) {
      // 处理单个组的情况
      memberList.value = [{
        id: groupResponse.data.GroupID,
        name: groupResponse.data.GroupName
      }];
      
      console.log("获取组员列表成功:", memberList.value);
    } else {
      ElMessage({
        message: '获取组员列表失败：数据为空',
        type: 'warning'
      });
      console.error("获取组员列表失败：数据为空");
    }
  } catch (error) {
    ElMessage({
      message: '获取组员列表失败',
      type: 'error'
    });
    console.error("获取组员列表失败:", error);
  }
};

// 添加创建任务的处理方法
const handleSelect = () => {
  formVisible.value = true;
  console.log("创建任务按钮被点击");
};

// 表单数据
const form = ref({
  subject: '',
  description: '',
  priority: '',
  responsiblePerson: '',
  leader: '',
  date: ''
});

// 提交表单方法，添加后端交互
const submitForm = async () => {
  try {
    // 生成随机ID作为projectID (整数类型)
    const randomProjectId = Math.floor(Math.random() * 1000) + 1;
    
    const requestBody = {
      taskName: String(form.value.subject),  // 字符串类型
      projectID: randomProjectId,  // 整数类型
      theme: String(form.value.subject),  // 字符串类型
      Description: String(form.value.description),  // 字符串类型
      receiverId: parseInt(form.value.responsiblePerson),  // 整数类型
      principalId: parseInt(form.value.leader),  // 整数类型
      priority: String(form.value.priority),  // 字符串类型
      taskDate: String(form.value.date),  // 字符串类型
      status: String('新建')  // 字符串类型
    };

    console.log("发送的请求数据:", requestBody);

    const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/Task/add_task', requestBody);

    if (response.data) {
      // 获取受理人姓名
      const receiverName = await getStuInfoById(form.value.responsiblePerson);
      
      // 添加到表格数据
      tasks.value.push({
        theme: form.value.subject,
        status: '新建',
        receiverId: receiverName,  // 使用获取到的姓名
        priority: form.value.priority
      });
      
      ElMessage({
        message: '创建任务成功',
        type: 'success'
      });
      
      console.log("创建任务成功:", response.data);
      resetForm();
      // 刷新任务列表
      fetchTasks();
    } else {
      throw new Error('创建任务失败：服务器返回数据为空');
    }
  } catch (error) {
    ElMessage({
      message: error.response?.data?.message || error.message || '创建任务失败',
      type: 'error'
    });
    console.error("创建任务失败:", error);
  }
};

// 添加获取学生信息的方法
const getStuInfoById = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:4523/m1/5394050-5067403-default/stuInfo/getStuInfoByID?id=${id}`);
    if (response.data) {
      return response.data.name;
    }
    return id; // 如果获取失败则返回原始ID
  } catch (error) {
    console.error(`获取学生信息失败(ID: ${id}):`, error);
    return id; // 如果获取失败则返回原始ID
  }
};

// 获取任务列表的方法
const fetchTasks = async () => {
  try {
    const requestBody = {
      projectID: projectId.value,
    };

    const response = await axios.get('http://127.0.0.1:4523/m1/5394050-5067403-default/Task/show_Task', requestBody);
    
    // 检查并处理返回的数据
    let taskList = [];
    if (response.data && response.data.data) {
      taskList = response.data.data;
    } else if (Array.isArray(response.data)) {
      taskList = response.data;
    } else if (response.data) {
      taskList = [response.data];
    }

    // 处理每个任务，获取受理人姓名
    tasks.value = await Promise.all(taskList.map(async task => {
      // 获取受理人姓名
      const receiverName = await getStuInfoById(task.receiverId);
      
      return {
        taskName: task.taskName,
        theme: task.theme,
        description: task.Description,
        receiverId: receiverName,  // 使用获取到的姓名
        priority: task.priority || '普通',
        status: task.status
      };
    }));

    console.log("获取到的任务列表:", tasks.value);
  } catch (error) {
    ElMessage({
      message: '获取任务列表失败',
      type: 'error'
    });
    console.error("获取任务列表失败:", error);
  }
};

// 在组件挂载时获取任务列表
onMounted(() => {
  fetchTasks(); // 获取任务列表
  fetchMemberList(); // 获取组员列表
});

// 重置表单方法
const resetForm = () => {
  form.value = {
    subject: '',
    description: '',
    priority: '',
    responsiblePerson: '',
    leader: '',
    date: ''
  };
  formVisible.value = false;
};

// 活动标签页
const activeTab = ref('workPackages');

const projectId = ref(null); // 在 setup 中定义项目ID
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
height: auto;
min-height: 500px;
padding-bottom: 60px;
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
bottom: 10px;
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