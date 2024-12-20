<script>
import top from './components/topofstudent.vue'
import Sidebar from './components/SidebarForTeacher.vue';
import { RouterView } from 'vue-router';


export default {    
    components: {
        top,
        Sidebar
    },
    data() {
        return {
            isShow: true
        }
    }
}
</script>

<template>
    <div class="container">
        <RouterView/>
    </div>
</template>


<style>

.container{
    width: 100%;
    height: 100vh;
}
</style>