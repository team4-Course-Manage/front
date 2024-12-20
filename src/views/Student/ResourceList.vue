<template>
    <top />
    <div class="container0">
        <SidebarForStu />
        <div class="container1">
            <div class="right">
                <div class="class-selection">
                    <el-button
                            v-for="(classItem, index) in classList"
                            :key="index"
                            @click="selectClass(classItem)"
                    >
                        {{ classItem }}
                    </el-button>
                </div>
                <div class="resource-search">
                    <input type="text" v-model="searchText" placeholder="请输入内容" />
                    <select v-model="selectedType">
                        <option value="">请选择类型</option>
                        <option value="通知">通知</option>
                        <option value="作业">作业</option>
                        <option value="学习资料">学习资料</option>
                    </select>
                    <el-button type="primary" @click="searchResources">点击搜索</el-button>
                </div>
                <div class="resource-list">
                    <table>
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>标题</th>
                            <th>时间</th>
                            <th>类型</th>
                            <th>状态</th>
                            <th>编辑</th>
                            <th>查看</th>
                            <th>删除</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(resource, index) in filteredResources" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ resource.title }}</td>
                            <td>{{ resource.time }}</td>
                            <td>{{ resource.type }}</td>
                            <td>{{ resource.status }}</td>
                            <td><el-button @click="editResource(resource)">编辑</el-button></td>
                            <td><el-button @click="viewResource(resource)">查看</el-button></td>
                            <td><el-button type="danger" @click="deleteResource(resource)">删除</el-button></td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next"
                            :total="totalResources"
                    />
                </div>
                <el-button type="primary" class="publish-button" @click="showPublishModal">发布内容</el-button>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";

import { ref } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

const classList = ref(['班级一', '班级二', '班级三', '班级四', '班级五']);
const selectedClass = ref(classList.value[0]);
const searchText = ref('');
const selectedType = ref('');
const resources = ref([
    { title: '班级群-微信群邀请码', time: '2024/09/02', type: '通知', status: '已发送' },
    { title: '实验一', time: '2024/09/02', type: '作业', status: '已过期' },
]);
const currentPage = ref(1);
const pageSize = ref(10);
const filteredResources = computed(() => {
    return resources.value.filter(resource => {
        let titleMatch = true;
        if (searchText.value) {
            titleMatch = resource.title.includes(searchText.value);
        }
        let typeMatch = true;
        if (selectedType.value) {
            typeMatch = resource.type === selectedType.value;
        }
        return titleMatch && typeMatch;
    });
});
const totalResources = computed(() => filteredResources.value.length);
const selectClass = (classItem) => {
    selectedClass.value = classItem;
};
const searchResources = () => {
    // 这里可以添加搜索逻辑，目前过滤是通过计算属性完成的
};
const handleCurrentChange = (page) => {
    currentPage.value = page;
};
const editResource = (resource) => {
    const editResourceModal = ref(true);
    const editedResource = reactive({...resource });
    const rules = {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择类型', trigger: 'change' }
        ]
    };
    const editForm = ref(null);

    const handleEditSave = () => {
        editForm.value.validate((valid) => {
            if (valid) {
                // 这里假设resources是存储所有资源的数组，找到要编辑的资源并更新
                const index = resources.value.findIndex(r => r === resource);
                resources.value[index] = {...editedResource };
                editResourceModal.value = false;
            }
        });
    };

    const handleEditCancel = () => {
        editResourceModal.value = false;
    };

    return {
        editResourceModal,
        editedResource,
        rules,
        editForm,
        handleEditSave,
        handleEditCancel
    };
};
const viewResource = (resource) => {
    const viewResourceModal = ref(true);
    const resourceToView = reactive({...resource });

    const handleViewClose = () => {
        viewResourceModal.value = false;
    };

    return {
        viewResourceModal,
        resourceToView,
        handleViewClose
    };
};
const deleteResource = (resource) => {
    ElMessageBox.confirm('确定要删除此资源吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const index = resources.value.findIndex(r => r === resource);
        resources.value.splice(index, 1);
    }).catch(() => {
        // 用户取消删除操作，不做处理
    });
};
const showPublishModal = () => {
    const publishResourceModal = ref(true);
    const newResource = reactive({
        title: '',
        type: '',
        time: new Date().toISOString().substring(0, 10)
    });
    const publishRules = {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择类型', trigger: 'change' }
        ]
    };
    const publishForm = ref(null);

    const handlePublishSave = () => {
        publishForm.value.validate((valid) => {
            if (valid) {
                resources.value.push({...newResource });
                publishResourceModal.value = false;
            }
        });
    };

    const handlePublishCancel = () => {
        publishResourceModal.value = false;
    };

    return {
        publishResourceModal,
        newResource,
        publishRules,
        publishForm,
        handlePublishSave,
        handlePublishCancel
    };
};
// 跳转相关方法
const GoHome = () => {
    router.push({ name: 'Home' });
};
const GoToLogin = () => {
    router.push({ name: 'Login' });
};
const GoToTeacherReport = () => {
    router.push({ name: 'TeacherReport' });
};
const GoToTeacherGroup = () => {
    router.push({ name: 'TeacherGroup' });
};
const GoToTeacherResource = () => {
    router.push({ name: 'TeacherResource' });
};

</script>

<style scoped>
.container0 {
    width: 100%;
    display: flex;
}
.container1{
    width: 100%;
    height: 80vh;
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
    flex-direction: row; /* 左右排列 */
}
.left {
    background-color: white;
    border: 2px solid rgba(0, 0, 0,.1);
    margin-right: 20px;
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
    justify-content: center;
}
.right {
    flex: 1;
    display: flex;
    flex-direction: column; /* 修改为垂直排列 */
    padding: 20px;
    background-color: white;
    border: 2px solid rgba(0, 0, 0,.1);
}
.resource-content {
    padding: 20px;
}
.class-selection {
    display: flex;
    margin-bottom: 10px;
}
.class-selection button {
    margin-right: 10px;
}
.class-selection,
.resource-search {
    display: flex;
}
.resource-search input,
.resource-search select {
    margin-right: 10px;
}
.resource-list table {
    width: 100%;
    border-collapse: collapse;
}
.resource-list table th,
.resource-list table td {
    border: 1px solid #ccc;
    padding: 5px;
}
.resource-list.el-pagination {
    margin-top: 10px;
}
.publish-button {
    margin-bottom: 10px;
    background-color: #409EFF;
    color: white;
}
</style>
