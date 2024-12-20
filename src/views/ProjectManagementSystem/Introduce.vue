<template>
  <top />
  <div class="container0">
    <Sidebar3 />
    <div class="container1">
      <div class="introduce">
        <h3>描述</h3>
        <textarea class="project-description-input" placeholder="请输入项目描述"></textarea>
      </div>
      <div class="container2">
        <h3>项目状态</h3>
        <select class="project-status-select">
          <option value="按计划进行">按计划进行</option>
          <option value="有风险">有风险</option>
          <option value="偏离计划">偏离计划</option>
          <option value="已中断">已中断</option>
          <option value="未开始">未开始</option>
          <option value="已完成">已完成</option>
        </select>
        <button class="save-button">保存</button>
      </div>
      <div class="container3">
        <label for="members">成员</label>
        <br>
        <label for="teamMembers">组员</label>
        <div>
          <ul>
            <li>组员1</li>
            <li>组员2</li>
          </ul>
        </div>
        <label for="projectManager">项目管理员</label>
        <input type="text" v-model="projectManager" placeholder="上同">
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
  float: right;
  display: flex;
}

.container2 {
  width: 500;
  height: 20vh;
  border: 1px solid #999;
  margin-left: 20px;
  padding: 10px;
}

.container3 {
  width: 300px;
  border: 3px solid #999;
  height: 20vh;
  position: absolute;
  bottom: 20px;
  margin: 20px;
}

.introduce {
  width: 600px;
  height: 300px;
  border: 5px solid #999;
  padding: 10px;
}

.project-description-input {
  width: 500px;
  height: 200px;
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
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: border - color 0.3s ease;
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
  bottom: 7px;
}
</style>