const Message = ELEMENT.Message;
const service =  axios.create({
    baseURL: `/fetchPrefix/aap/api/v1`,
    timeout: 600000,
});

service.interceptors.request.use((config) =>{
    const token = window.sessionStorage.getItem("token");
    const tenantId = "1001";
    config.headers.tenantId = tenantId;
    config.headers.Authorization = "bearer " + token;
    return config;
},err =>{
    Promise.reject(err)
})

service.interceptors.response.use(
    (response) => {
    const resData = response.data;
    const { statusCode, errorMsg } = resData;
    console.log('response', response)
    if(statusCode !== 0){
        Message.error(errorMsg)
    };
    return resData;
},
(error) => {
    console.log(error)
    //报告页面不阻止
    Message.error(error)
    return Promise.reject(error);
  }
)