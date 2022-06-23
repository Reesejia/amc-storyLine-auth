const loginUrl = "https://newbanker.aaeasy.cn"
const validateUsername = (rule, value, callback) => {
    if (!isPhone(value)) {
        callback(new Error("Please enter the correct user name"));
    } else {
        callback();
    }
}

const validatePassword =(rule, value, callback) => {
    if (value.length < 4) {
        callback(new Error("请输入密码"));
    } else {
        callback();
    }
}
const loginRules = {
    credential: [
        {
            validator: validateUsername,
            trigger: "blur",
            message: "请输入正确的手机号",
        },
        {
            validator: validateUsername,
            trigger: "change",
            message: "请输入正确的手机号",
        },
    ],
    password: [
        { validator: validatePassword, trigger: "blur" },
        { validator: validatePassword, trigger: "change" },
    ],
    code: [
        { required: true, trigger: "blur", message: "请输入手机验证码" },
        { required: true, trigger: "change", message: "请输入手机验证码" },
    ],
};

const isPhone = (phone) => {
    return /^1[0-9]{10}$/.test(phone);
};


/**
 * 发送手机验证码
 */
const sendPhoneCode = (code) =>
service({
   url: `/blackcat/sms/send?mobile=${code}`,
   method: "get",
 });

const login = (data = {}) => {
    const p = `credential=${data.credential}&password=${data.password}&code=${data.code}`
    return service({
      url: `/blackcat/login?${p}`,
      method: "post",
      headers: {
        "Blackcat-Host": loginUrl.replace("https://", ""),
      },
    });
};

const redirectToStory = (data) =>{
    console.log('redirectToStory',data)
    const p = `credential=${data.credential}&password=${data.password}&code=${data.code}`
    return  axios({
        url: `/storyApi/user/login2?${p}`,
        method: "POST",
      });
};

const getStorage = (key) =>{
    return JSON.parse(sessionStorage.getItem(key))
};

const setStorage = (key,value) =>{
    return sessionStorage.setItem(key, JSON.stringify(value))
};