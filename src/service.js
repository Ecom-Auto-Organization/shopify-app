import axios from "axios";
import Cookies from "js-cookie";

const prodEndpoint = {
  auth: 'https://auth.ecompal.io',
  pm: 'https://api.ecompal.io'
};

const devEndpoint = {
  auth: 'https://iiz52mz2le.execute-api.us-east-2.amazonaws.com/dev',
  pm: 'https://8p5lt3lu1b.execute-api.us-east-2.amazonaws.com/dev'
};

const endPoint = { ...prodEndpoint };

const authInstance = axios.create({
  baseURL: endPoint.auth
})

const pmInstance = axios.create({
  baseURL: endPoint.pm
})

pmInstance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('tkn');
    const auth = (accessToken != null && accessToken != undefined) ? accessToken : 'auth';
    config.headers.Authorization = `Bearer ${auth}`;
    return config;
  }, 
  error => {
    return Promise.reject(error);
  }
);

const ProductManagerAPI = () => ({
  
  // takes in the user Id to retrieve the token and refresh token for user
  authenticateUser: (userId) => authInstance.post(
    '/auth',
    { userId }
  ).then(response => {
    const thirtyMin = 1/48;
    Cookies.set('tkn', response.data.accessToken, {expires: thirtyMin});
    Cookies.set('rfsh', response.data.refreshToken, {expires: 5});
  }),

  // gets the user details 
  getUserDetails: () => pmInstance.post(
    '/users'
  ).then(response => response.data),

  // gets the list of jobs for the user
  getJobs: () => pmInstance.post(
    '/jobs'
  ).then(response => response.data),

  // uploads a file and returns the file details
  uploadFile: (formData) => pmInstance.post(
    '/upload',
    formData
  ).then(response => response.data),

  //get the details of a job
  getJobDetails: (jobId) => pmInstance.get(
    '/jobs/' + jobId
  ).then(response => response.data),

  //import the file details to create job
  importProduct: (taskType, fileId, options, fileColumnDetails) => pmInstance.post(
    '/run',
    {
      taskType,
      fileId,
      options,
      fileColumnDetails
    }
  ).then(response => response.data),
});

export default ProductManagerAPI()