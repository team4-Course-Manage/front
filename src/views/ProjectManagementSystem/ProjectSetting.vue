<template>
  <top/>
  <div class="container0">
    <Sidebar3/>
    <div class="container1">
    
      <h3>名称</h3>
      <input type="text" class="project-name-input" placeholder="请输入项目名称">
      <h3>描述</h3>
      <textarea class="project-description-input" placeholder="请输入项目描述"></textarea>
      <h3>项目状态</h3>
      <select class="project-status-select">
        <option value="按计划进行">按计划进行</option>
        <option value="有风险">有风险</option>
        <option value="偏离计划">偏离计划</option>
        <option value="已中断">已中断</option>
        <option value="未开始">未开始</option>
        <option value="已完成">已完成</option>
      </select>
      <h3>项目状态描述</h3>
      <textarea class="project-status-description-input" placeholder="请输入项目状态描述"></textarea>
      <button class="save-button">保存</button>
    </div>
  </div>
</template>

<script>
  import top from "../../components/topofstudent.vue";
  import Sidebar3 from "../../components/Sidebar3.vue";
  export default {
    components: {
      top,
      Sidebar3
    },
    
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
   .project-name-input {
     width: 300px;
     height: 20px;
     padding: 10px;
     border: 2px solid #999;
     border-radius: 5px;
     font-size: 16px;
     color:#333;
     outline: none;
     transition: border - color 0.3s ease;
   }
   #project-name-input:focus {
     border-color: #0056b3;
   }
   .project-description-input,
   .project-status-description-input {
     width: 1000px;
     height: 100px;
     padding: 10px;
     border: 2px solid #999;
     border-radius: 5px;
     font-size: 16px;
     color: #333;
     outline: none;
     transition: border - color 0.3s ease;
   }
   .project-description-input:focus,
   .project-status-description-input:focus {
     border-color: #0056b3;
   }
   .project-status-select {
     width: 300px;
     height: 40px;
     padding: 10px;
     border: 2px solid #007BFF;
     border-radius:5px;
     font-size: 16px;
     color:#333;
     outline:none;
     transition: border - color 0.3s ease;
   }
   #project-status-select:focus {
     border-color: #0056b3;
   }
   .save-button {
      width: 100px;
      height: 40px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 20px;
      position: relative;
      bottom: 17px;
    }
</style>