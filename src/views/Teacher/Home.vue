<template>
        <topteacher />
        <div class="container1">
            <Sidebar></Sidebar>
            <div class="container">
                <div class="title1">
                    <h3>已经发布的公告</h3>
                </div>
                <div class="announceInfo">
                    <el-scrollbar height="400px">
                        <!-- 循环显示公告 -->
                        <div v-for="item in announcements" :key="item.id" class="announcement-item">
                            <!-- 公告标题 -->
                            <p @click="toggleDetails(item.id)" class="announcement-title" style="cursor: pointer;">
                                {{ item.title }}
                            </p>

                            <!-- 展开框 -->
                            <transition name="slide">
                                <div v-if="expandedItem === item.id" class="announcement-details">
                                    <p><strong>内容：</strong>{{ item.content }}</p>
                                    <p><strong>日期：</strong>{{ item.date }}</p>
                                </div>
                            </transition>
                        </div>

                    </el-scrollbar>
                </div>
                <div class="addIcon">
                    <el-icon @click="openAddWindow" size="50px">
                        <CirclePlus />
                    </el-icon>
                </div>

                <!-- 添加公告窗口 -->
                <div v-if="addWindowVisible" class="add-announcement-window">
                    <div class="window-header">
                        <h4>添加新公告</h4>
                        <span @click="closeAddWindow" class="close-icon">&times;</span>
                    </div>
                    <div class="window-body">
                        <label for="new-title">标题：</label>
                        <input id="new-title" v-model="newTitle" type="text" style="width: 300px;">

                        <label for="new-content">内容：</label>
                        <textarea id="new-content" v-model="newContent" style="width: 350px;"></textarea>

                        <label for="new-date">日期：</label>
                        <input id="new-date" v-model="newDate" type="date" style="width: 300px;">

                        <label for="new-image">文件：</label>
                        <input id="new-image" type="file" @change="handleImageUpload" accept="image/*"
                            style="width: 300px;">

                        <div v-if="imagePreview" class="image-preview">
                            <p>图片预览：</p>
                            <img :src="imagePreview" alt="图片预览" style="max-width: 100%; max-height: 200px;">
                        </div>
                    </div>
                    <div class="window-footer">
                        <button @click="closeAddWindow">取消</button>
                        <button @click="submitNewAnnouncement">提交</button>
                    </div>
                </div>
            </div>
        </div>

</template>


<script>
import { ElScrollbar, ElIcon } from 'element-plus';
import { CirclePlus } from '@element-plus/icons-vue';
import topteacher from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';
import axios from 'axios';

export default {
    components: {
        ElScrollbar,
        ElIcon,
        CirclePlus,
        topteacher,
        Sidebar,
    },
    data() {
        return {
            announcements: [

            ], // 公告列表
            newTitle: '',
            newContent: '',
            newDate: '',
            newImage: null,
            imagePreview: null,
            addWindowVisible: false,
            expandedItem: null, // 当前展开的公告项
        };
    },
    methods: {
        async fetchAnnouncementList() {
            try {
                const response = await axios.get("http://127.0.0.1:4523/m1/5394050-5067403-default/announcement/get");
                if (response.status === 200) {
                    this.announcements = response.data.data;
                    console.log(response.data.message)
                }
            }
            catch (error) {
                console.error("网络错误或接口异常:", error);
                this.$message.error("网络错误，请稍后重试！");
            }
        },
        openAddWindow() {
            this.addWindowVisible = true;
        },
        closeAddWindow() {
            this.addWindowVisible = false;
            this.resetForm();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newImage = file;
                this.imagePreview = URL.createObjectURL(file); // 生成预览地址
            }
        },
        async submitNewAnnouncement() {
            const formData = new FormData();
            formData.append('title', this.newTitle);
            formData.append('content', this.newContent);
            formData.append('date', this.newDate);
            if (this.newImage) {
                formData.append('image', this.newImage); // 将文件对象添加到 FormData
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:4523/m1/5394050-5067403-default/announcement/post",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                if (response.status === 200) {
                    this.$message.success("公告添加成功！");
                    console.log(response.data.message)
                    this.fetchAnnouncementList(); // 刷新公告列表
                }
            } catch (error) {
                console.error("提交失败:", error);
                this.$message.error("提交失败，请稍后重试！");
            }

            this.resetForm();
            this.addWindowVisible = false;
        },

        resetForm() {
            this.newTitle = '';
            this.newContent = '';
            this.newDate = '';
            this.newImage = null;
            this.imagePreview = null;
        },
        toggleDetails(itemId) {
            this.expandedItem = this.expandedItem === itemId ? null : itemId; // 切换展开项
        },
        methods: {
            toggleDetails(itemId) {
                this.expandedItem = this.expandedItem === itemId ? null : itemId; // 切换展开项
            },
        },


    },
    mounted() {
        this.fetchAnnouncementList(); //加载获取公告列表
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

.title1 {
    margin-bottom: 20px;
}

.announceInfo {
    float: left;
    width: 60%;
    border: 5px solid #999;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.addIcon {
    position: absolute;
    top: 10px;
    right: 40px;
}

/* 弹窗样式 */
.add-announcement-window {
    position: fixed;
    top: 55%;
    left: 83%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 12px;
    /* 圆角 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    /* 阴影 */
    padding: 20px;
    z-index: 1000;
    width: 400px;
    animation: fadeIn 0.3s ease-out;
    /* 动画 */
    backdrop-filter: blur(10px);
    /* 背景模糊 */
    border: 1px solid rgba(0, 0, 0, 0.1);
    /* 边框 */
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

.window-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
    /* 底部边框 */
    padding-bottom: 10px;
}

.window-header h4 {
    margin: 0;
    font-size: 18px;
    color: #333;
    /* 标题颜色 */
    font-weight: bold;
}

.close-icon {
    cursor: pointer;
    font-size: 20px;
    color: #999;
    transition: color 0.2s;
}

.close-icon:hover {
    color: #ff5f5f;
    /* 悬停颜色 */
}

.window-body {
    margin-bottom: 20px;
    font-size: 14px;
    color: #555;
}

.window-body label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #444;
}

.window-body input,
.window-body textarea {
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.window-body input:focus,
.window-body textarea:focus {
    border-color: #409eff;
    outline: none;
    box-shadow: 0 0 4px rgba(64, 158, 255, 0.3);
    /* 聚焦效果 */
}

.window-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.window-footer button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.window-footer button:first-of-type {
    background-color: #f5f5f5;
    color: #666;
}

.window-footer button:first-of-type:hover {
    background-color: #e2e2e2;
}

.window-footer button:last-of-type {
    background-color: #409eff;
    /* 主色调 */
    color: #fff;
}

.window-footer button:last-of-type:hover {
    background-color: #66b1ff;
}

.announcement-item {
    margin-bottom: 10px;
    /* 每个公告之间的间距 */
}

.announcement-title {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
}

.announcement-details {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-top: none;
    /* 去掉与标题之间的边框 */
}

/* Vue 过渡动画 */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
    max-height: 200px;
    /* 根据需要调整最大高度 */
    opacity: 1;
}
</style>
