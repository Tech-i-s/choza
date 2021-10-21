import axios from 'axios';
const LOGIN_USER_KEY = 'WD_FORUM_LOGIN_USER_KEY';

/* var baseURL;
if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
    baseURL = 'http://127.0.0.1:8000';
} */
const baseURL = 'http://127.0.0.1:8000';
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Add requireToken: true in request config, for API that required Authorization token
 */
api.interceptors.request.use(
    config => {
        if (config.requireToken && localStorage.getItem(LOGIN_USER_KEY)) {
            config.headers.common['Authorization'] = JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token;
        }

        return config;
    },
    err => {
        console.error(err);
    }
);

export default class API {
    /////////////////////////
    // Users
    /////////////////////////
    signUp = async (username, email, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        console.log('password', password);
        const savedPost = await api
            .post('/user/signup/', formData)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return savedPost;
    };
    signIn = async (email, password) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const savedPost = await api
            .post('/user/signin/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return savedPost;
    };
    getUsers = async token => {
        const posts = await api
            .get('/user/', {
                data: {},
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return posts;
    };

    getPosts = params => {
        return api
            .get('/posts/', { params })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    addPost = postBody => {
        const formData = new FormData();

        for (const key in postBody) {
            formData.append(key, postBody[key]);
        }

        return api
            .post('/posts/add/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    deletePost = id => {
        return api.delete(`/posts/delete/${id}/`).catch(error => {
            throw new Error(error);
        });
    };
    getItems = async (page, category) => {
        // let url = "/items";
        // if (category) {
        //   url += "?category=" + category;
        // }
        console.log('category', category);
        console.log('page', page);
        const posts = await api
            .get('/items/', { params: { category, page } })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return posts;
    };
}
