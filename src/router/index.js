import Vue from 'vue'
import Router from 'vue-router'
//import Meta from 'vue-meta'
import HomePage from '@/views/HomePage'
import Works from '@/views/Works'
import LeaveWords from '@/views/LeaveWords'
import Sign from '@/views/Sign'
import Login from '@/views/Login'
import LostPass from '@/views/LostPass'
import ChangePass from '@/views/ChangePass'
import ChatGroup from '@/views/ChatGroup'
import Personal from '@/views/Personal'
import PersonalNews from '@/views/PersonalNews'
import NewsDetails from '@/views/NewsDetails'
import Blog from '@/views/Blog'
import BlogDetails from '@/views/BlogDetails'

Vue.use(Router)
//Vue.use(Meta)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/works',
          name: 'Works',
          component: Works
        },
        {
            path: '/leavewords',
            name: 'LeaveWords',
            component: LeaveWords
        },
        {
            path: '/sign',
            name: 'Sign',
            component: Sign
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/lostpass',
            name: 'LostPass',
            component: LostPass
        },
        {
            path: '/changepass',
            name: 'ChangePass',
            component: ChangePass
        },
        {
            path: '/chatgroup',
            name: 'ChatGroup',
            component: ChatGroup
        },
        {
            path: '/personal',
            name: 'Personal',
            component: Personal
        },
        {
            path: '/personal/news',
            name: 'PersonalNews',
            component: PersonalNews
        },
        {
            path: '/personal/news/newsdetails/:id',
            name: 'NewsDetails',
            component: NewsDetails
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/blog/BlogDetails/:id',
            name: 'BlogDetails',
            component: BlogDetails
        }
     ]
})
