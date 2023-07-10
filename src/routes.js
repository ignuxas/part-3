import Details from './pages/Details.vue'
import posts from './pages/Posts.vue'
import notFound from './pages/NotFound.vue'

export default [
    {
        path: '/',
        redirect: '/posts'
    },
    {
        path: '/details/:id',
        component: Details,
    },
    {
        path: '/posts',
        component: posts,
    },
    {
        path: '/404',
        component: notFound
    },
    {
        path: '*',
        redirect: "/404"
    },
]