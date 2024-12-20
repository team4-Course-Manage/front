<template>
    <topteacher />
    <div class="container1">
        <Sidebar/>
        <div class="container" id="app" v-show="!(path === '/login')">

            <div class="line"></div>
            <div class="box2">

                <div class="right">
                    <el-button @click="showGroup(1)">第1组</el-button>
                    <el-button @click="showGroup(2)">第2组</el-button>
                    <el-button @click="showGroup(3)">第3组</el-button>
                    <el-button @click="showGroup(4)">第4组</el-button>
                    <el-button @click="showGroup(5)">第5组</el-button>
                    <el-button @click="showGroup(6)">第6组</el-button>
                </div>
            </div>
        </div>


        <el-dialog v-model="dialogTableVisible" width="540">
            <el-table :data="gridData">
                <el-table-column property="id" label="学号" width="300" />
                <el-table-column property="name" label="姓名" width="200" />
            </el-table>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialogTableVisible = false">关闭</el-button>
                </div>
            </template>
        </el-dialog>
        <router-view />
    </div>
</template>

<script>
import topteacher from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';

export default {
    components:{
        topteacher,
        Sidebar
    },
    data() {
        return {
            path: '',
            dialogTableVisible: false,
            groupName:'',
            gridData: [
                {
                    id: '20241129',
                    name: '张三',
                },
                {
                    id: '20241130',
                    name: '张三',
                },
                {
                    id: '20241201',
                    name: '张三',
                },
                {
                    id: '20241202',
                    name: '张三',
                },
            ]
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
        GoHome() {
            this.$router.push({ name: 'Home' }); // 跳转到登录页面
        },
        GoToLogin() {
            this.$router.push({ name: 'Login' }); // 跳转到登录页面
        },
        GoToStudentGroup() {
            this.$router.push({ name: 'StudentGroup' }); //
        },
        GoToStudentReport() {
            this.$router.push({ name: 'StudentReport' }); //
        },
        async showGroup(num){
            dialogTableVisible = true;
            try{
                // 接口
                const response = await axios.get('http://127.0.0.1:4523/m2/5394050-5067403-default/246845626',
                {
                    group: num
                },
                {
                    headers: {'Content-Type': 'application/json'},
                })
                this.gridData = response.data
                console.log(this.gridData)
            }
            catch(error)
            {
                console.error(error);
            }
        }
    }
}
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

    display: grid;
    grid-template-columns: repeat(6, 200px);
}

.right button {
    height: 100px;
    width: 100px;
    background-color: white;
    font-size: 30px;
    font-weight: bold;
}
</style>