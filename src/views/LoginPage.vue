<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: "",
            password: "",
            isShow: false,
            tips: "",
        }
    },
    methods: {
        async Login() {
            if (this.name === "" || this.password === "") {
                this.tips = "账号或密码为空！";
                this.isShow = true;
                return;
            }
            // 这里填写将账号密码传入后端并接收返回值的情况
            try {
                const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/login', {
                    user_id: this.name,
                    password: this.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('登陆成功');
                this.$router.push({name: 'HomeForStuTeacher'})
            } catch (error) {
                console.error('登录请求失败：', error);
            }
        }
    }
}
</script>


<template>
    <router-view></router-view>
    <div class="container">
        <RouterLink to="/HomeForTeacher" class="teacher-link-button">教师端</RouterLink>
        <RouterLink to="/HomeForStu" class="student-link-button">学生端</RouterLink>
        <div class="Box">
            <h1>登录</h1>
            <div class="InputBox">
                <input s type="text" v-model.trim="name" @keyup.enter="Login" placeholder="请输入账号">
            </div>
            <div class="line1"></div>

            <div class="InputBox">
                <input type="password" v-model.trim="password" @keyup.enter="Login" placeholder="请输入密码">
            </div>
            <div class="line2"></div>

            <div class="btnBox">
                <el-button class="loginBtn" @click="Login">登录</el-button>
            </div>

            <div :class="{ tip: isShow }">
                {{ tips }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Box {
    width: 480px;
    height: 350px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 20px;
    /* 添加适当的内边距 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.Box h1 {
    color: black;
    text-align: center;
    font-size: 40px;
    font-family: "StSong";
}

.InputBox {
    width: 450px;
    /* 使容器宽度充满 */
    height: 100px;
    /* 设置合适的高度 */
    padding: 0;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Box input {
    width: 100%;
    /* 让输入框填满父容器 */
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    font-size: 16px;
    border-radius: 15px;
    padding-left: 10px;
    /* 给输入框添加内边距 */
    background-color: white;
    /* 设置背景色为白色 */
}

.logo {
    width: 28px;
    height: 28px;
    margin-right: 10px;
}

.btnBox {
    margin-top: 30px;
    display: flex;
    /* 设置为 Flex 容器 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.loginBtn {
    width: 260px;
    height: 45px;
    border-radius: 15px;
    background-color: rgba(80, 0, 0);
    color: white;
    font-size: 25px;
    font-weight: bold;
}


.tip {
    color: red;
    font-weight: bolder;
    font-size: 15px;
    text-align: center;
}

.line1 {
    width: 100%;

    margin-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.line2 {
    width: 100%;

    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.teacher-link-button {
    position: absolute;
    bottom: 50px;
    right: 50px;
    text-decoration: none;
    color: white;
    background-color: #409eff;
    padding: 10px 20px;
    border-radius: 5px;
    display: inline-block;
    transition: background-color 0.3s ease;
    /* 添加过渡效果，鼠标悬停时背景色变化更平滑 */
}

.teacher-link-button:hover {
    background-color: #66b1ff;
    /* 鼠标悬停时的背景色 */
}

.student-link-button{
    position: absolute;
    bottom: 100px;
    right: 50px;
    text-decoration: none;
    color: white;
    background-color: #409eff;
    padding: 10px 20px;
    border-radius: 5px;
    display: inline-block;
    transition: background-color 0.3s ease;
  
}
.student-link-button:hover {
    background-color: #66b1ff;
    /* 鼠标悬停时的背景色 */
}
</style>