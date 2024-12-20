<template>
    <top />
    <div class="container1">
        <Sidebar/>
        <div class="container2">
            666
        </div>
    </div>
</template>

<script>
import top from '../../components/topofteacher.vue';
import Sidebar from '../../components/SidebarForTeacher.vue';
export default {
    components: {
        top,
        Sidebar
    },
}
</script>

<style scoped>
.container1 {
    width: 100%;
    
}
    
</style>