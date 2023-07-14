import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { getCurrentDate } from '../handlers/handlers'

export const api = {}

api.http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000,
})

api.getPosts = async function (posts) {
  const setTotalPosts = (total) => api.store.commit('pageData/setTotalPosts', total)
  const setPosts = (posts) => api.store.commit('postData/setPosts', posts)

  if(posts) { return {data: posts, ok: true} }

  const currentPage = api.store.getters['pageData/getCurrentPage']
  const postsPerPage = api.store.getters['pageData/getPostsPerPage']
  const search = api.store.getters['pageData/getSearch']

  try {
    const response = await api.http.get('/posts', {
      params: {
        _page: currentPage,
        _limit: postsPerPage,
        q: search,
      }
    })
    if(response.status === 200) {
      setTotalPosts(response.headers['x-total-count'])
      setPosts(response.data)
      return { data: response.data, ok: true }
    } else { return { data: response, ok: false } }
  } catch (error) {
    console.log(error)
    return { data: error, ok: false }
  }
}

api.getPost = async function (id) {
  const setCurrentPost = (post) => api.store.commit('postData/setCurrentPost', post)

  try{
    const response = await api.http.get(`/posts/${id}`)
    if(response.status === 200) {
      setCurrentPost(response.data)
      return { data: response.data, ok: true}
    } else {return {data: response, ok: false}}
  } catch (error) {
    console.log(error)
    return {data: error, ok: false}
  }
}

api.getAuthors = async function () {
  const setAuthors = (authors) => api.store.commit('postData/setAuthors', authors)
  
  try {
    const response = await api.http.get('/authors')
    if(response.status === 200) {
      setAuthors(response.data)
      return { data: response.data, ok: true}
    } else { return { data: response, ok: false } }
  } catch (error) {
    console.log(error)
    return { data: error, ok: false }
  }
}

api.getAuthor = async function (id) {
  const setCurrentAuthor = (author) => api.store.commit('postData/setCurrentAuthor', author)

  try {
    const response = await api.http.get(`/authors/${id}`)
    if(response.status === 200) {
      setCurrentAuthor(response.data)
      return { data: response.data, ok: true }
    } else { return { data: response, ok: false } }
  }
  catch (error) {
    console.log(error)
    return { data: error, ok: false }
  }
}

api.editPost = async function (reqData) {
  const setCurrentPost = (post) => api.store.commit('postData/setCurrentPost', post)
  const toggleStatus = (status) => api.store.commit('mutateData/toggleStatus', status)

  const id = reqData.id
  const DataToPost = {
    ...reqData,
    updated_at: getCurrentDate(),
  }

  try {
    const response = await api.http.put(`/posts/${id}`, DataToPost)
    toggleStatus(response.status)
    if(response.status == 200) {
      setCurrentPost(response.data)
      return { data: response.data, ok: true }
    } else {
      return { data: response, ok: false }
    }
  } catch (error) {
    toggleStatus(500)
    console.log(error)
    return { data: error, ok: false }
  }
}

api.deletePost = async function (id) {
  const lastItemOnPageCheck = () => api.store.commit('pageData/lastItemOnPageCheck')
  const toggleStatus = (status) => api.store.commit('mutateData/toggleStatus', status)
  
  try {
    const response = await api.http.delete(`/posts/${id}`)
    toggleStatus(response.status)
    if(response.status === 200) {
      lastItemOnPageCheck()
      return { data: response.data, ok: true }
    } else { return { data: response, ok: false } }
  } catch (error) {
    toggleStatus(500)
    console.log(error)
    return { data: error, ok: false }
  }
}

api.createPost = async function (reqData) {
  const setTotalPosts = (total) => api.store.commit('pageData/setTotalPosts', total)
  const toggleStatus = (status) => api.store.commit('mutateData/toggleStatus', status)
  let getTotalPosts = api.store.getters['pageData/getTotalPosts']
  
  const DataToPost = {
    ...reqData,
    created_at: getCurrentDate(),
    updated_at: getCurrentDate(),
  }

  try {
    const response = await api.http.post('/posts', DataToPost)
    toggleStatus(response.status)
    if(response.status === 201) {
      setTotalPosts(parseInt(getTotalPosts) + 1)
      return { data: response.data, ok: true }
    } else { return { data: response.data, ok: false } }
  } catch (error) {
    toggleStatus(500)
    console.log(error)
    return { data: error, ok: false }
  }
}

export default {
  install: (Vue, store) => {
    api.store = store
    Vue.prototype.$api = api
  }
}
