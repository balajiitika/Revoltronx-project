import CreatePost from "../components/create/CreatePost"

export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: "Loading...",
        message: 'Data is being loaded, please wait'
    },
    success: {
        title: 'success',
        message: 'Data successfully loaded'
    },
    responseFailure:{
        title: 'Error',
        message: 'An error Occured while fetching response from the server. please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'unable to connect with the server. please check internet connectivity and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup: {url:'/signup', method:'POST'},
    userLogin: {url: '/login', method:'POST'},
    uploadfile:{url:'/file/upload', method:'POST' },
    createPost:{url:'create', method: 'POST'},
    getAllPosts:{url:'/posts',method:'GET', params: true},
    getPostById:{url:'post', method:'GET', query:true },
    updatePost:{url:'update', method:'PUT', query:true}
}