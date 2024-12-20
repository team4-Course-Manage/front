<template>
    <top />
    <div class="container0">
        <SidebarForStu />
        <div class="container1">
            <div class="main">
                    <div class="main-content">
                        <div class="announcements">
                            <h2 class="announcements-title">公告</h2>
                            <div class="announcement-card">
                                <div class="announcement-content">
                                    <h3>组队通知</h3>
                                    <p class="course">课程: 岗位实践</p>
                                    <p>请大家及时组队完成实验，确保每个小组有至少三名成员。请在本周五之前完成组队，并在系统中提交组队信息。</p>
                                    <span class="date">2024/12/7</span>
                                </div>
                                <el-button @click="viewDetails('group-notice-1')" class="view-details-btn">查看详情</el-button>
                            </div>
                            <div class="announcement-card">
                                <div class="announcement-content">
                                    <h3>实验报告提交截止日期</h3>
                                    <p class="course">课程: 岗位实践</p>
                                    <p>请注意，所有实验报告的提交截止日期为2024年12月15日。请确保在此日期前提交报告，逾期提交将不予接受。</p>
                                    <span class="date">2024/12/8</span>
                                </div>
                                <el-button @click="viewDetails('report-deadline-notice')" class="view-details-btn">查看详情</el-button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";
export default {
    components: {
        top,
        SidebarForStu
    }
}
</script>

<style scoped>
.container0 {
    width: 100%;
    display: flex;
}
.container1{
    width:100%;
    height: 70vh;
    border: 1px solid #999;
}
.box1 {
    display: flex;
    align-items: center;
    height: 150px;
    border: 2px solid rgba(0, 0, 0,.1);
    background-color: white;
}
.box1 img {
    margin-left: 40px;
    height: 100px;
}
.title {
    width: 200px;
    margin-left: 20px;
    font-size: 30px;
    font-weight: bold;
}
.box1 button {
    width: 100px;
    height: 50px;
    background-color: rgba(80, 0, 0);
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: white;
}
.box2 {
    flex: 1;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.left {
    background-color: white;
    border: 2px solid rgba(0, 0, 0,.1);
    width: 200px;
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
}
.square label {
    padding: 10px;
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
}.announcements {
     display: flex;
     flex-direction: column;
     gap: 20px;
     padding: 20px;
 }
.announcements-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}
.announcement-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.announcement-content {
    flex: 1;
}
.announcement-card h3 {
    margin: 0 0 10px;
    font-size: 24px;
}
.announcement-card p {
    margin: 0 0 10px;
    font-size: 16px;
}
.announcement-card .course {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
}
.announcement-card .date {
    font-size: 14px;
    color: #888;
}
.view-details-btn {
    margin-left: 20px;
}

</style>
