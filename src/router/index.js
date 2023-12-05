import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'

import listPacientes from  '@/components/Paciente/List'
import editPaciente   from  '@/components/Paciente/Edit'
import novoPaciente   from  '@/components/Paciente/Add'

import listAtividades from  '@/components/Atividades/List'
import editAtividade   from  '@/components/Paciente/Edit'
import novoAtividade   from  '@/components/Paciente/Add'


Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/pacientes',
      name: 'pacientes-list',
      component: listPacientes    
    },
    {
      path: '/paciente/:cpf',
      name: "paciente-edit",
      component: editPaciente
    },
    {
      path: '/addpaciente',
      name: "paciente-add",
      component: novoPaciente
    },
    {
      path: '/atividades',
      name: 'atividade-list',
      component: listAtividades  
    },
    {
      path: '/atividade/:id',
      name: "atividade-edit",
      component: editAtividade
    },
    {
      path: '/addatividade',
      name: "atividade-add",
      component: novoAtividade
    },
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;