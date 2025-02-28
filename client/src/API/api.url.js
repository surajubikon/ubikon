// export const baseURL = "http://localhost:8000";
export const baseURL = "http://localhost:8000";
// export const baseURL = "http://localhost:8000/api/admin/register";
const api = {
    register: {
        url: '/api/admin/register',
        method: 'post',
    },
    login: {
        url: '/api/admin/login',
        method: 'post',
    },
    // Admin Routes
    admin: {
        createAdmin: {
            url: '/api/admin/create',
            method: 'post',
        },
        // Add other admin routes here as needed
    },
    // Categories Routes
    categories: {
        createCategory: {
            url: '/api/categories/create',
            method: 'post',
        },
        getAllCategories: {
            url: '/api/categories/all',
            method: 'get',
        },
        updateBlogPost: {
            url: '/api/categories/update/:id',
            method: 'put',
        },
        deleteBlogPost: {
            url: '/api/categories/delete/:id',
            method: 'delete',
        },

    },
    // Posts Routes
    posts: {
        createPost: {
            url: '/api/posts/create',
            method: 'post',
        },
        getPosts: {
            url: '/api/posts/create',
            method: 'get',
        },
        getPostById: {
            url: '/api/posts/:id',  // dynamic route, replace :id with actual post ID
            method: 'get',
        },
        updatePost: {
            url: '/api/posts/update/:id',  // dynamic route
            method: 'put',
        },
        deletePost: {
            url: '/api/posts/delete/:id',  // dynamic route
            method: 'delete',
        },
    },
    // Contact Routes
    contact: {
        createContact: {
            url: '/api/contact/create',
            method: 'post',
        },
        getContacts: {
            url: '/api/contact/create',
            method: 'get',
        },
    },
    //job application routes
    jobApplication: {
        createJobApplication: {
            url: '/api/jobApplicationForm/create',
            method: 'post',
        },
        getJobApplications: {
            url: '/api/jobApplicationForm/get',
            method: 'get',
        },
    },
    // AI Chat Routes
    aiChat: {
        sendMessage: {
            url: '/api/aichat/bot',
            method: 'post',
        },
        getAssistant: {
            url: '/api/aichat/get',
            method: 'get',
        },
    },

    lead: {
        getLeads: {
            url: '/api/leads',
            method: 'get',
        },
    },
};

export default api;
