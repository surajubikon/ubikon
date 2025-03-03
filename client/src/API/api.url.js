import Portfolio from "../pages/admin/PortFolio";

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
        getStates: {
            url: '/api/leads/states/IN',
            method: 'get',
        },
        createLead: {
            url: '/api/leads',
            method: 'post',
        },
    },

    activity: {
        getAllActivities: {
            url: '/api/activity/get',
            method: 'get',
        },
        getAllActivitiesById: {
            url: '/api/activity/get-activity/:subject',
            method: 'get',
        },
        
        createActivity: {
            url: '/api/activity/create',
            method: 'post',
        },
        updateActivity: {
            url: '/api/activity/:id',
            method: 'put',
        },
        deleteActivity: {
            url: '/api/activity/:id',
            method: 'delete',
        },
    },
    portfolio:{
        getAllPortfolios: {
            url: '/api/portfolio/get-all',
            method: 'get',
        },
        createPortfolio: {
            url: '/api/portfolio/create',
            method: 'post',
            },
            getportfolioBySlug:{
                url: '/api/portfolio/:slug',
                method: 'get',
            },
            deletePortfolio:{
                url: '/api/portfolio/delete/:id',
                method: 'delete',
            },
            
            updatePortfolio: {
            url: '/api/portfolio/update/:id',
            method: 'delete',
        },
    }
};

export default api;
