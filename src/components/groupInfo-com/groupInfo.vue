<template>
  <div class="group-card">
    <div class="group-info">
      <h3 style="margin: auto;">分组管理</h3>
      <div class="input-group">
        <label><strong>分组名称：</strong></label>
        <input type="text" v-model="group.name" placeholder="输入分组名称" class="input1"/>
      </div>
      <div class="input-group">
        <label><strong>项目名称：</strong></label>
        <input type="text" v-model="group.projectName" placeholder="输入项目名称"  class="input1"/>
      </div>
      <div class="textarea-group">
        <label><strong>项目简介：</strong></label>
        <textarea v-model="group.projectDescription" placeholder="输入项目简介"></textarea>
      </div>
    </div>
    <div class="button-group">
      <button class="edit-button" @click="editGroup">保存</button>
      <button class="delete-button" @click="deleteGroup">清空</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      group: {
        name: "",               // 分组名称
        projectName: "",        // 项目名称
        projectDescription: ""  // 项目简介
      }
    };
  },
  created() {
    // 在组件创建时从 localStorage 中获取已保存的数据
    const savedGroup = localStorage.getItem('groupData');
    if (savedGroup) {
      this.group = JSON.parse(savedGroup);
    }
  },
  methods: {
    editGroup() {
      // 保存 group 数据到 localStorage
      localStorage.setItem('groupData', JSON.stringify(this.group));
      alert("信息已保存");
    },
    deleteGroup() {
      // 清空输入框并从 localStorage 中移除数据
      this.group = {
        name: "",
        projectName: "",
        projectDescription: ""
      };
      localStorage.removeItem('groupData');
      alert("信息已清空");
    }
  }
};
</script>

  
  <style scoped>
  .group-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    max-width: 800px;
    border: 1px solid #e0e0e0;
    margin: auto;
    gap: 10px;
  }
  
  .group-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
  }
  
  .input-group {
    display: flex;
   
    
  }
  .input1{
    width: 30%;
  }
  .textarea-group {
    display: flex;
    align-items: center;
  }
  
  label {
    width: 100px;
    font-size: 16px;
    color: #333;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #c2c8d1;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    outline: none;
  }
  
  input:focus, textarea:focus {
    border-color: #00aaff;
    box-shadow: 0 0 6px rgba(0, 170, 255, 0.3);
  }
  
  textarea {
    resize: vertical;
    min-height: 50px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-left: auto;
    margin-top: auto;
  }
  
  .edit-button,
  .delete-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    font-size: 14px;
  }
  
  .edit-button {
    background-color: #4CAF50;
  }
  
  .delete-button {
    background-color: #f44336;
  }
  
  .edit-button:hover {
    background-color: #45a049;
  }
  
  .delete-button:hover {
    background-color: #e53935;
  }
  </style>
  