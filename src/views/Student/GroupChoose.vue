<template>
  <top/>
  <div class="container0">
      <SidebarForStu/>
      <div class="container1">
          <div class="right">
        <!-- 加号按钮 -->
        <el-button class="add-button" @click="addGroup">+</el-button>

        <!-- 组列表 -->
        <div class="group-list">
          <!-- 已有的组（左侧） -->
          <div class="existing-groups">
            <div v-for="group in groups" 
                 :key="group.number" 
                 class="group-container"
                 :class="{ created: group.isCreated }">
              <div class="group-info">
                <div class="row">
                  <label>组名:</label>
                  <span>{{ group.name }}</span>
                </div>
                <div class="row">
                  <label>组号:</label>
                  <span>{{ group.number }}</span>
                </div>
                <div class="row">
                  <label>人数:</label>
                  <span>{{ group.currentCount || 0 }}/{{ group.maxCount || 10 }}</span>
                </div>
                <button
                  class="join-button"
                  :disabled="group.isJoined || group.currentCount >= group.maxCount"
                  @click="joinGroup(group)"
                  :class="{ 'full': group.currentCount >= group.maxCount }"
                >
                  {{ group.isJoined ? '已加入' : 
                     group.currentCount >= group.maxCount ? '已满' : '加入' }}
                </button>
              </div>
            </div>
          </div>

          <!-- 新创建的组（右侧） -->
          <div v-if="newGroup" 
               class="group-container"
               :class="{ 'new-group': !newGroup.isCreated, 'created': newGroup.isCreated }">
            <div class="group-info">
              <div class="row">
                <label>组名:</label>
                <input v-if="!newGroup.isCreated" 
                       v-model="newGroup.name" 
                       placeholder="请输入组名"/>
                <span v-else>{{ newGroup.name }}</span>
              </div>
              <div class="row">
                <label>组号:</label>
                <span>{{ newGroup.number }}</span>
              </div>
              <div class="row">
                <label>人数:</label>
                <span>{{ newGroup.currentCount || 1 }}/{{ newGroup.maxCount || 10 }}</span>
              </div>
              <button
                class="join-button"
                @click="createGroup(newGroup)"
                :disabled="!newGroup.name || newGroup.isCreated"
              >
                {{ newGroup.isCreated ? '已加入' : '创建' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";
import { ElMessage } from 'element-plus';  

const groups = ref([]);
const newGroup = ref(null);  
const studentId = ref('123'); 

// 获取所有组信息
const fetchGroupInfo = async () => {
try {
  const response = await axios.get('http://localhost:8080/group/get_group');
  console.log("获取到的组信息:", response.data);
  
  // 处理单个组对象的情况
  if (!Array.isArray(response.data)) {
    const group = response.data;
    groups.value = [{
      name: group.GroupName,
      number: group.GroupID,
      currentCount: Number(group.GroupMemberNumber),  
      maxCount: Number(group.GroupMaxMember),          
      isJoined: false,
      isCreated: true
    }];
  } else {
    // 处理数组情况
    groups.value = response.data
      .map(group => ({
        name: group.GroupName,
        number: group.GroupID,
        currentCount: Number(group.GroupCurrentMember),  
        maxCount: Number(group.GroupMaxMember),          
        isJoined: false,
        isCreated: true
      }))
      .sort((a, b) => a.number - b.number);
  }
  console.log("处理后的组信息:", groups.value);  
} catch (error) {
  console.error("获取组信息失败:", error);
}
};

// 添加新组
const addGroup = () => {
const maxGroupNumber = groups.value.length > 0 
  ? Math.max(...groups.value.map(g => Number(g.number))) 
  : 0;
  
newGroup.value = {
  name: '',
  number: maxGroupNumber + 1,
  currentCount: 1,
  maxCount: 10,
  isJoined: false,
  isCreated: false
};
};

// 修改创建组的方法
const createGroup = async (group) => {
try {
  if (!group.name) {
    ElMessage({
      message: '请输入组名',
      type: 'warning'
    });
    return;
  }

  const requestBody = {
    GroupName: group.name,
    GroupID: String(group.number),
    GroupMaxMember: 10,
    GroupCurrentMember: 1
  };

  console.log("发送的请求数据:", requestBody);

  const response = await axios.post('http://localhost:8080/group/add_group', requestBody);
  
  if (response.data && response.data.GroupID) {  
    ElMessage({
      message: '创建组成功！',
      type: 'success'
    });

    // 使用返回的数据更新组状态
    group.isCreated = true;
    group.name = response.data.GroupName;
    group.number = response.data.GroupID;
    group.currentCount = response.data.GroupCurrentMember;
    group.maxCount = response.data.GroupMaxMember;
    group.isJoined = true;
    
    setTimeout(() => {
      groups.value.push({...group});
      groups.value.sort((a, b) => Number(a.number) - Number(b.number));
      newGroup.value = null;
    }, 500);
    
    console.log("创建组成功，返回数据:", response.data);
  } else {
    ElMessage({
      message: '创建组失败',
      type: 'error'
    });
    console.error("创建组失败，返回数据:", response.data);
  }
} catch (error) {
  ElMessage({
    message: error.response?.data?.message || '创建组请求失败',
    type: 'error'
  });
  console.error("创建组失败:", error.response || error);
}
};

// 修改加入组的方法
const joinGroup = async (group) => {
if (group.currentCount >= group.maxCount) {
  ElMessage({
    message: '该组已满',
    type: 'warning'
  });
  return;
}

try {
  // 修改请求体格式
  const requestBody = {
    GroupMemberNumber: group.currentCount + 1,  // 当前人数加1
    StuGroupID: String(group.number)           // 使用组号作为 StuGroupID
  };

  console.log("发送的加入组请求数据:", requestBody);

  const response = await axios.post('http://localhost:8080/group/join_group', requestBody);
  
  // 修改成功判断条件
  if (response.data) {
    ElMessage({
      message: '加入组成功！',
      type: 'success'
    });
    
    // 更新组状态
    group.isJoined = true;
    group.currentCount = response.data.GroupMemberNumber;  // 使用返回的人数
    
    console.log("加入组成功，返回数据:", response.data);
  } else {
    ElMessage({
      message: response.data?.message || '加入组失败',
      type: 'error'
    });
    console.error("加入组失败，返回数据:", response.data);
  }
} catch (error) {
  ElMessage({
    message: error.response?.data?.message || '加入组请求失败',
    type: 'error'
  });
  console.error("加入组失败:", error);
}
};

onMounted(() => {
fetchGroupInfo();
});
</script>

<style scoped>
  .container0{
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
  padding: 30px;
  position: relative;
  border: 2px,solid,rgba(0,0,0,.1);
  background-color: white;
  margin-left: 20px;
}

/* 加号按钮样式 */
.add-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid black;
  font-size: 20px;
  width: 50px;
  height: 50px;
  padding: 0;
  cursor: pointer;
  z-index: 10;
}

/* 组容器础样式 */
.group-container {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 180px;
  box-sizing: border-box;
  position: absolute;  /* 恢复为 absolute 定位 */
  right: 50px;
  top: 100px;
  transition: all 0.3s ease;
}

/* 新创建的组容器样式 */
.group-container.new-group {
  position: absolute;
  right: 50px;
  top: 100px;
  z-index: 100;
}

/* 已创建的组容器样式 */
.group-container.created {
  position: relative;
  right: auto;
  top: auto;
  background-color: #f0f8ff;
}

.group-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 180px;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  max-width: 100px;
  width: 100%;
  height: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 8px;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* 按钮样式 */
button {
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  
}

.join-button {
  background-color: #008cba;
  color: white;
  margin: 0 auto; /* 水平方向 margin 自分配，实现水平居中 */
  width:75px;
  height: 35px;
}

.join-button:hover {
  background-color: #005f6b;
  margin: 0 auto; /* 水平方向 margin 自动分配，实现水平居中 */
  width:75px;

}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.group-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 60px;
  justify-content: flex-start;
}

.existing-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 20px;
  flex: 1;
  min-height: 300px;  /* 确保有足够的空间 */
}

/* 修改输入框样式 */
.row input {
  max-width: 100px;
  width: 100%;
  height: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 8px;
  background-color: white;
}

.row input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* 添加只读文本样式 */
.row span {
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  min-width: 60px;
  display: inline-block;
}

/* 确保右侧有足够空间放置新组 */
.right {
  padding-right: 250px;  /* 为右侧新组预留空间 */
}

/* 在 style 部分添加以下样式 */
.join-button.full {
  background-color: #999;
  cursor: not-allowed;
}

.join-button.full:hover {
  background-color: #999;
}
</style>
