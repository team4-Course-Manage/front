<template>
    <top />
    <div class="container1">
        <Sidebar />
        <div class="container">
            <!-- 标题 -->
            <h2 class="title">学生名单</h2>

            <!-- 添加按钮 -->
            <RouterLink to="/infoImport"> <el-button class="import-button" type="primary" icon="el-icon-upload2"
                    @click="handleImportClick">
                    批量导入
                </el-button></RouterLink>


            <!-- 表格 -->
            <el-table :data="students" style="width: 100%">
                <!-- 序号列 -->
                <el-table-column label="序号" width="180">
                    <template #default="{ $index }">
                        {{ $index + 1 }}
                    </template>
                </el-table-column>

                <!-- 学生姓名列 -->
                <el-table-column prop="name" label="学生" width="280"></el-table-column>

                <!-- 学号列 -->
                <el-table-column prop="id" label="学号" width="280"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import top from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';

export default {
    components: {
        top,
        Sidebar
    },
    data() {
        return {
            students: [

            ],
        };
    },
    mounted() {
        // 加载组件时调用接口
        this.fetchStudentData();
    },

    methods: {
        async fetchStudentData() {
            try {
                const response = await axios.get("http://127.0.0.1:4523/m1/5394050-5067403-default/getStudentInfo");
                if (response.status === 200) {
                    this.students = response.data.data;
                    console.log("成功获取了数据")
                }

            }
            catch (error) {
                console.error("网络错误或接口异常:", error);
                this.$message.error("网络错误，请稍后重试！");
            }
        }
    }
};
</script>

<style scoped>
.container1 {
    width: 100%;
    display: flex;
   
}
.container {
    width: 89%;
    height: 76vh;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
}

.el-table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

.el-table th {
    background-color: #409EFF;
    color: white;
    font-weight: bold;
}

.el-table td {
    background-color: white;
    color: #555;
}

.el-table-column {
    padding: 8px;
}

.el-table .el-table__header {
    border-bottom: 2px solid #409EFF;
}

/* 批量导入按钮样式 */
.import-button {
    position: fixed;
    top: 180px;
    right: 30px;
    background-color: #409EFF;
    /* 默认背景色 */
    border: 1px solid #409EFF;
    /* 默认边框颜色 */
    font-size: 16px;
    /* 字体大小 */
    padding: 10px 20px;
    /* 按钮内边距 */
    border-radius: 5px;
    /* 按钮圆角 */
    transition: all 0.3s ease;
    /* 平滑过渡效果 */
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.import-button:hover {
    background-color: #66b1ff;
    /* 悬停时的背景色 */
    border-color: #66b1ff;
    /* 悬停时的边框颜色 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 悬停时的阴影效果 */
}

.import-button:active {
    background-color: #4081e1;
    /* 按下时的背景色 */
    border-color: #4081e1;
    /* 按下时的边框颜色 */
}

.import-button .el-icon-upload2 {
    margin-right: 8px;
    /* 图标和文字之间的间距 */
}
</style>