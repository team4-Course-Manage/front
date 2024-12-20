<template>
  <div class="box2">
    <div class="left">
      <RouterLink to="/Introduce" class="square">概述</RouterLink>
      <RouterLink to="/WorkPackage" class="square">工作包</RouterLink>
      <RouterLink to="/WeekReport" class="square">周报</RouterLink>
      <RouterLink to="/Member" class="square">成员</RouterLink>
      <RouterLink to="/ProjectSetting" class="square">项目设置</RouterLink>
      <RouterLink to="/Test" class="square">测试页面</RouterLink>
    </div>
  </div>
</template>
<style></style>
<style scoped>
.box2 {
  width: 200px;
  height: 80vh;
  margin-top: 0px;
  display: flex;
}

.left {
  background-color: white;
  border: 2px solid rgba(0, 0, 0, .1);

  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: stretch;
}

.square {
  display: inline-block;
  width: 80%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 12px;
  color: #333;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.square:hover {
  background-color: #409eff;
  color: white;
}
</style>