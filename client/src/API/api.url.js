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

    jobApplicationfORM: {
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
        editLead: {
            url: '/api/leads',
            method: 'get',
        },
        updateLead: {
            url: '/api/leads',
            method: 'put',
        },
        updateStatus: {
            url: '/api/leads',
            method: 'patch',
        },
        deleteLead: {
            url: '/api/leads',
            method: 'delete',
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
    portfolio: {
        getAllPortfolios: {
            url: '/api/portfolio/get-all',
            method: 'get',
        },
        createPortfolio: {
            url: '/api/portfolio/create',
            method: 'post',
        },
        getportfolioBySlug: {
            url: '/api/portfolio/:slug',
            method: 'get',
        },
        deletePortfolio: {
            url: '/api/portfolio/delete/:id',
            method: 'delete',
        },

        updatePortfolio: {
            url: '/api/portfolio/update/:id',
            method: 'delete',
        },
    },
    quotation: {
        getQuotations: {
            url: '/api/quotations',
            method: 'get',
        },
        createQuotation: {
            url: '/api/quotations',
            method: 'post',
        },
        genrateQuotation: {
            url: '/api/quotations',
            method: 'get',
        },
        deleteQuotation: {
            url: '/api/quotations',
            method: 'delete',
        },
    },
    milestone: {
        milestoneGet: {
            url: `${baseURL}/api/milestone/get`,
            method: "get",
        },
        milestoneCreate: {
            url: `${baseURL}/api/milestone/create`,
            method: "post",
        },
        milestoneGetByID: {
            url: (id) => `${baseURL}/api/milestone/${id}`,
            method: "get",
        },
        milestoneUpdate: {
            url: (id) => `${baseURL}/api/milestone/update/${id}`,
            method: "put",
        },
        milestoneDelete: {
            url: (id) => `${baseURL}/api/milestone/delete/${id}`,
            method: "delete",
        },
    },
    projectAPI: {
        projectGet: {
            url: `${baseURL}/api/project/get`,
            method: "get",
        },
        projectCreate: {
            url: `${baseURL}/api/project/create`,
            method: "post",
        },
        projectGetByID: {
            url: (subject) => `${baseURL}/api/project/get-project/${subject}`,
            method: "get",
        },
        projectUpdate: {
            url: (id) => `${baseURL}/api/project/update/${id}`,
            method: "put",
        },
        projectDelete: {
            url: (id) => `${baseURL}/api/project/delete/${id}`,
            method: "delete",
        },
    },


    jobApplicationForm: {
        createJobApplication: {
            url: `${baseURL}/api/jobApplicationForm/create`,
            method: "post"
        },
        getJobApplications: {
            url: `${baseURL}/api/jobApplicationForm/get`,
            method: "get"
        },
        getJobApplicationById: {
            url: `${baseURL}/api/jobApplicationForm/:id`,
            method: "get"
        },
        updateJobApplicationRemark: {
            url: `${baseURL}/api/jobApplicationForm/update-remark/:id`,
            method: "put"
        },
        updateJobApplicationStatus: {
            url: `${baseURL}/api/jobApplicationForm/update/:id`,
            method: "put"
        },
        deleteJobApplication: {
            url: `${baseURL}/api/jobApplicationForm/:id`,
            method: "delete"
        },
    }
};

export default api;
