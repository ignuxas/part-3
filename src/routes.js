import Details from './pages/Details.vue'
import posts from './pages/Posts.vue'
import notFound from './pages/NotFound.vue'

export default [
    {
        path: '/',
        redirect: '/posts'
    },
    {
        path: '/posts',
        component: posts,
    },
    {
        path: '/posts/details/:id',
        component: Details,
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