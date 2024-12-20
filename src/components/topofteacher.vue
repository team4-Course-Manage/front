<template>
 
        <div class="box1">
            <img src="../components/icon/Logo.jpg">
            <div class="title">课程管理系统(教师段)</div>
            <RouterLink to="/" @click="toggleShow">登录</RouterLink>
            <hr>
            <RouterLink to="/HomeForStu">前往学生端</RouterLink>
        </div>

</template>

<script>
    export default{
        methods:{
            toggleShow(){
                this.$emit('change-show')
            }
        }
    }
</script>

<style scoped>
    .container{
        height: auto;
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        background-color: rgba(0,0,0,.05);
    }
    .box1{
        display: flex;
        align-items: center;
        height: 150px;
        border: 2px,solid,rgba(0,0,0,.1);
        background-color: white;
    }
    .box1 img{
        margin-left: 40px;
        height: 100px;
    }
    .title{
        width: 200px;
        margin-left: 20px;

        font-size: 30px;
        font-weight: bold;
    }
    .box1 button{
        width: 100px;
        height: 50px;
        background-color: rgba(80,0,0);
        border: none;

        font-size: 20px;
        font-weight: bold;
        color: white;
    }
    .box2{
        flex: 1;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .left{
        background-color: white;
        border: 2px,solid,rgba(0,0,0,.1);
        margin-right: 20px;

        width: 200px;
    }
    .square{
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
    .right{
        border: 2px,solid,rgba(0,0,0,.1);
        background-color: white;

        flex: 1;
        padding: 30px;

        display: grid;
        grid-template-columns: repeat(6,200px);
    }
    .right button{
        height: 150px;
        width: 150px;
        background-color: white;
        font-size: 30px;
        font-weight: bold;
    }
</style>