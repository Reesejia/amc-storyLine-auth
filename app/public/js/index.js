new Vue({
    el: '#app',
    data() {
        errObj = {
            9110: () => {
                this.$message.error("请输入有效的手机号");
            },
            9001: () => {
                this.$message.error("请输入正确的手机号/验证码");
            },
            9101: () => {
                this.$message.error("短信服务中断，请联系您的客服");
            },
            9102: () => {
                this.$message.error("手机号有误，请重新输入");
            },
            9109: () => {
                this.$message.error("请于一分钟后重新获取");
            },
        }
        return {
            loading: false,
            clickAble: true,
            timeNum: 60,
            timer: null,
            passwordType: "password",
            loading: false,
            showDialog: false,
            otherQuery: {},
            hasValid: true,
            loginRules,
            errObj,
            loginForm: {
                credential: "",
                password: "",
                tenantId: "",
                code: "",
            },
            homeLogo: "https://aaeasy-file.oss-cn-beijing.aliyuncs.com/pic/NB%E9%85%8D%E7%BD%AE%E6%98%93%E5%A4%9A%E7%A7%9F%E6%88%B7%E7%94%A8/%E9%A6%96%E9%A1%B5%E5%B0%81%E9%9D%A2/V8.png"
        };
    },
    methods: {
        async getCode() {
            if (!this.loginForm.credential) {
                this.$message.error("请输入手机号");
                return;
            }

            if (!isPhone(this.loginForm.credential)) {
                this.$message.error("请输入正确的手机号");
                return;
            }
            this.clickAble = false;
            this.timeNum = 60;
            this.beganTime();
            const res = await sendPhoneCode(this.loginForm.credential);
            if (res.statusCode === 0 && res.data) {
            } else {
                const statusCode = res.statusCode;
                if (Object.keys(this.errObj).includes(String(statusCode))) {
                    this.errObj[statusCode]();
                } else {
                    this.$message.error(res.errorMsg);
                }
            }
        },
        beganTime() {
            this.timer = setInterval(() => {
                this.timeNum--;
                if (this.timeNum === 0) {
                    clearInterval(this.timer);
                    this.clickAble = true;
                    this.timeNum = 60;
                }
            }, 1000);
        },
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                (this.$refs.password).focus();
            });
        },

        handleLogin() {
            (this.$refs.loginForm).validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    const form = {
                        credential: this.loginForm.credential,
                        password: md5(this.loginForm.password.trim()),
                        code: this.loginForm.code,
                        tenantId: "",
                    };
                    const ret = await login(form).catch(() => {
                        this.loading = false;
                    });
                    if (ret.statusCode === 0 && ret.data) {
                        console.log('ret.data', ret.data)
                        this.$message({
                            type: "success",
                            message: "登录成功",
                        });
                        //   await redirectToStory(form)
                        const map = {
                            "fundCompass": "/pic/homepage/罗盘更新0602/start.html#id=hux8kd&p=目录页&g=1"
                        }
                        window.location.href = `/storyLine/amc/project/static/files${map["fundCompass"]}`
                    }
                    this.loading = false;
                } else {
                    this.loading = false;
                    return false;
                }
            });
        }
    }
})
