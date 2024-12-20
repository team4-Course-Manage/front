<template>
    <top />
    <div class="container1">
        <Sidebar/>
        <div class="container" id="app" v-show="!(path === '/login')">

            <div class="line"></div>
            <div class="box2">

                <div class="right">
                    <el-scrollbar height="700px">
                        <el-button v-for="item in 20" :key="item" @click="getStu(item)" class="scrollbar-demo-item">第{{ item }}周</el-button>
                    </el-scrollbar>
                    <div class="main">
                        <div class="right-buttons-container">
                            <div class="right-buttons-back" v-for="student in Stu" :key="student.ID">
                                <div class="week-label">第{{ this.week }}周</div>
                                <div class="order-label">顺序{{ student.Order }}</div>
                                <div class="choose-label">{{ getName(student) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <router-view />
    </div>
</template>

<script>
import top from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';
import axios from 'axios'

export default {
    components: {
        top,
        Sidebar
    },
    data() {
        return {
            path: '',
            week: 1,
            Stu:[
                {
                    ID: 1,
                    Week: 1,
                    Order: 1,
                    Student: null
                },
                {
                    ID: 2,
                    Week: 1,
                    Order: 2,
                    Student: {
                        StudentID: "20230101",
                        Name: "Alice",
                        Institute: "CS",
                        Password: "123456"
                    }
                },
            ],
        }
    },
    mounted() {
        this.path = this.$route.path
        console.log(this.$route.path)
    },
    watch: {
        $route(to, from) {
            this.path = to.path
        }
    },
    methods: {
        getName(student) {
            if (student && student.Student) {
                return student.Student.Name;
            }
            return '未填写'; // 返回一个默认值
        },
        GoHome() {
            this.$router.push({ name: 'Home' }); // 跳转到登录页面
        },
        GoToLogin() {
            this.$router.push({ name: 'Login' }); // 跳转到登录页面
        },
        GoToStudentGroup() {
            this.$router.push({ name: 'StudentGroup' }); // 跳转到学生分组情况页面
        },
        GoToStudentReport() {
            this.$router.push({ name: 'StudentReport' }); // 跳转到学生汇报时间页面
        },
        async getStu(num) {
            this.week = num;
            // 从后端获取对应周数的学生信息
            try{
                const response = await axios.get('http://127.0.0.1:4523/m1/5394050-5067403-default/report/weekly',
                {
                    week: num
                },
                {
                    headers: {'Content-Type': 'application/json'},
                })
                this.Stu = response.data
                console.log(this.Stu)
            }
            catch(error)
            {
                console.error(error);
            }
        },
    }
}
</script>

<style scoped>
.container1 {
    width: 100%;
    display: flex;
}
.container {
    height: 100vh;
    width: 1500px;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, .05);
}

.box1 {
    display: flex;
    align-items: center;
    height: 150px;
    border: 2px, solid, rgba(0, 0, 0, .1);
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

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left {
    background-color: white;
    border: 2px, solid, rgba(0, 0, 0, .1);
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
    text-align: left;

}

.right {
    border: 2px, solid, rgba(0, 0, 0, .1);
    background-color: white;

    flex: 1;
    padding: 30px;

    display: flex;
    flex-flow: row;

}

.student {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    width: 150px;
    border: 1px solid black;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 170px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: black;
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