
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/HomeForTeacher',
      name: 'HomeForStuTeacher',
      component: () => import('../views/Teacher/Home.vue'),
    },


    {
      path: '/stumanagement',
      name: 'stumanagement',
      component: () => import('../views/Teacher/stumanagement.vue'),
    },
    {
      path: '/groupInfo',
      name: 'groupInfo',
      component: () => import('../views/Teacher/groupInfo.vue'),
    },
   
    {
      path: '/Infoimport',
      name: 'Infoimport',
      component: () => import('../views/Teacher/InfoImport.vue')
    },
    {
      path: '/studentReport',
      name: 'studentReport',
      component: () => import('../views/Teacher/studentReport.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/HomeForStu',
      name: 'HomeForStu',
      component: () => import('../views/Student/Home.vue')
    },

    {
      path: '/ResourceList',
      name: 'ResourceList',
      component: () => import('../views/Student/ResourceList.vue')
    },
    {
      path: '/GroupChoose',
      name: 'GroupChoose',
      component: () => import('../views/Student/GroupChoose.vue')
    },
    {
      path: '/ReportTime',
      name: 'ReportTime',
      component: () => import('../views/Student/ReportTime.vue')
    },
   
   
   
    {
      path: '/Introduce',
      name: 'Introduce',
      component: () => import('../views/ProjectManagementSystem/Introduce.vue')
    },
    {
      path: '/WorkPackage',
      name: 'WorkPackage',
      component: () => import('../views/ProjectManagementSystem/WorkPackage.vue')
    },
    {
      path: '/WeekReport',
      name: 'WeekReport',
      component: () => import('../views/ProjectManagementSystem/WeekReport.vue')
    },
    {
      path: '/Member',
      name: 'Member',
      component: () => import('../views/ProjectManagementSystem/Member.vue')
    },
    {
      path: '/ProjectSetting',
      name: 'ProjectSetting',
      component: () => import('../views/ProjectManagementSystem/ProjectSetting.vue')
    },
    {
      path: '/Test',
      name: 'Test',
      component: () => import('../views/ProjectManagementSystem/Test.vue')
    },
  ]
})


export default router
