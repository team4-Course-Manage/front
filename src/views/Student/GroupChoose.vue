<template>
    <top/>
    <div class="container0">
        <SidebarForStu/>
        <div class="container1">
            <div class="right">
          <!-- 加号按钮 -->
          <el-button class="add-button" @click="addGroup">+</el-button>
  
          <!-- 动态生成的组信息容器 -->
          <div
            v-for="(group, index) in groups"
            :key="index"
            class="group-container"
            :class="{ joined: group.isJoined, created: group.isCreated }"
          >
            <div class="group-info">
              <!-- 组名和输入框放在同一行 -->
              <div class="row">
                <label>组名:</label>
                <input
                  type="text"
                  v-model="group.name"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 组号和输入框放在同一行 -->
              <div class="row">
                <label>组号:</label>
                <input
                  type="text"
                  v-model="group.number"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 人数和输入框放在同一行 -->
              <div class="row">
                <label>人数:</label>
                <input
                  type="number"
                  v-model="group.count"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 创建/加入按钮 -->
              <button
                @click="group.isCreated ? joinGroup(group) : createGroup(group)"
                class="join-button"
                :disabled="group.isJoined"
              >
                {{ group.isJoined ? '已加入' : group.isCreated ? '加入' : '创建' }}
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';  // 引入 useRouter
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";
import axios from 'axios';  // 确保已安装并导入 axios

// 移除 export default，直接声明组件
const components = {
  top,
  SidebarForStu
}

const groups = ref([]);
  
  // 添加组
  const addGroup = () => {
    groups.value.push({
      name: '',
      number: '',
      count: 0,
      isJoined: false,
      isCreated: false,
    });
  };
  
  // 创建组
  const createGroup = async (group) => {
    try {
      const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/gruopInfo', {
        groupName: group.name,
        groupNumber: group.number
      });
      
      if (response.data.success) {
        group.isCreated = true;
        console.log("创建组成功:", response.data);
      } else {
        console.error("创建组失败:", response.data.message || '未知错误');
      }
    } catch (error) {
      console.error("创建组请求失败:", error.response?.data?.message || error.message);
    }
  };
  
  // 加入组
  const joinGroup = (group) => {
    console.log("加入组:", group);
    group.isJoined = true;
  };
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
  
  /* 组容器样式 */
  .group-container {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 180px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    position: absolute; /* 绝对定位，确保组容器可以自由定位 */
    top: 50px; /* 距离容器顶部50px */
    right: 40px; /* 距离容器右边20px */
  }
  
  .group-container.created {
    transform: translateX(-650%);
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
  }
  
  /* 禁用输入框样式 */
  input:disabled {
    background-color: #f0f0f0;
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
    margin: 0 auto; /* 水平方向 margin 自动分配，实现水平居中 */
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
  </style>
