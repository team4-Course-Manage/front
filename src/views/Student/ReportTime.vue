<template>
    <top />
    <div class="container0">
        <SidebarForStu />
        <div class="container1">
            <div class="right">
            <!-- 左侧按钮列 -->
            <div class="left-button">
              <button
                v-for="index in 14"
                :key="index"
                :class="{ active: activeButtonIndex === index - 1 }"
                @click="changeGroup(index)"
              >
                第{{ index }}周分享
              </button>
            </div>
  
            <!-- 右侧的大按钮容器 -->
            <div class="right-buttons-container">
              <div class="right-buttons-back" v-for="(button, index) in currentGroupButtons" :key="index">
                <div class="week-label">第{{ groupNumber }}周</div>
                <div class="order-label">顺序{{ index + 1 }}</div>
                <div class="choose-label">{{ button.selected ? button.username : '未选择' }}</div>
                <button
                  :class="{ 'right-buttons': true, selected: button.selected }"
                  :disabled="isAnyButtonSelected && !button.selected"
                  @click="toggleButtonSelection(index)"
                >
                  {{ button.selected ? '撤销' : '选择' }}
                </button>
              </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 移除 export default，改用 setup 语法
const components = {
  top,
  SidebarForStu
}

const activeButtonIndex = ref(0); // 当前活跃的按钮索引
const groupNumber = ref(1); // 当前组的周数
const username = ref(''); // 用户名
const stuid = ref(''); // 学号

// 定义14组，每组5个按钮的状态
const buttons = ref(
  Array.from({ length: 14 }, () =>
    Array.from({ length: 5 }, () => ({ selected: false, username: '' }))
  )
);

// 获取当前组的按钮
const currentGroupButtons = computed(() => buttons.value[activeButtonIndex.value]);

// 计算是否有按钮被选择
const isAnyButtonSelected = computed(() => {
  return buttons.value.flat().some(button => button.selected);
});

// 切换组的函数
function changeGroup(number) {
  activeButtonIndex.value = number - 1; // 更新当前按钮索引
  groupNumber.value = number; // 更新组的周数
}

// 切换按钮选择状态的函数
async function toggleButtonSelection(index) {
  const button = currentGroupButtons.value[index];
  
  if (button.selected) {
    button.selected = false;
    button.username = '';
  } else {
    if (!isAnyButtonSelected.value) {
      try {
        const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/report/choose?apifoxResponseId=undefined', {
          studentid: stuid.value || '123',
          week: groupNumber.value,
          order: index + 1
        });

        console.log('发送的数据:', {
          studentid: stuid.value || '123',
          week: groupNumber.value,
          order: index + 1
        });

        if (response.data.success) {
          button.selected = true;
          button.username = username.value || response.data.data.username;
          console.log("选择成功:", response.data);
        } else {
          console.error("选择失败:", response.data.message || '未知错误');
        }
      } catch (error) {
        console.error("请求失败:", error.response?.data?.message || error.message);
      }
    }
  }
}

//获取初始数据的方法
async function fetchInitialData() {
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/5394050-5067403-default/report/weekly');
    // 处理获取到的数据
    if (response.data.success) {
      // 更新按钮状态
      // ... 根据后端返回的数据更新 buttons
    }
  } catch (error) {
    console.error("获取数据失败:", error);
  }
}

// 在组件挂载时获取数据
onMounted(() => {
  fetchInitialData();
});
</script>

<style scoped>
.container0 {
  width: 100%;
  display: flex;
}

.container1 {
  width: 100%;
  border: 1px solid #999;
  overflow: auto;
  padding: 20px;
}

.right {
  display: flex;
  flex-direction: row; 
  flex-wrap: wrap;
  padding: 20px;
  background-color: white;
  gap: 20px;
}

/* 左侧按钮样式 */
.left-button button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: black;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s;
  min-width: 150px;
}

.left-button button:hover {
  background-color: #e0e0e0;
}

.left-button button.active {
  background-color: rgb(136, 183, 244);
  color: rgba(0, 0, 255, 0.906);
}

/* 左侧按钮列样式 */
.left-button {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

/* 右侧大按钮容器样式 */
.right-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 50px;
  flex: 1;
}

/* 单个按钮方块样式 */
.right-buttons-back {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  width: 220px;
  height: 300px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.right-buttons-back:hover {
  transform: translateY(-5px);
}

/* 标签样式 */
.week-label {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.order-label, .choose-label {
  font-size: 18px;
  margin-bottom: 15px;
  color: #555;
}

.choose-label {
  font-size: 20px;
  margin-bottom: 25px;
}

/* 大按钮样式 */
.right-buttons {
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: rgb(136, 183, 244);
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
}

.right-buttons.selected {
  background-color: #dc3545;
  color: blue;
}

.right-buttons:not(.selected):hover {
  background-color: #648fbc;
}
</style>