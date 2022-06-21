  
  // vue3的对象
  const App = {

    setup() { // 传说中的setup
      console.log('Vue', Vue.reactive)
      const {reactive, ref} = Vue
      const { FormInstance } = ElementPlus
      
      const ruleFormRef = ref() 
      const loginForm = reactive({
        credential: "",
        password: "",
        tenantId: "",
        code: "",
      })

      const isPhone = (phone) => {
        return /^1[0-9]{10}$/.test(phone);
      };

      const validatePassword = (rule, value, callback) => {
        if (value.length < 4) {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      const  validateUsername = (rule, value, callback) => {
        console.log('rule',rule)
        console.log('value',value)
        console.log('callback',callback)

        setTimeout(() => {
          if (!isPhone(value)) {
            callback(new Error("Please enter the correct user name"));
          } else {
            callback();
          }
  
        }, 0);
    
      
      };
       const loginRules = {
        credential: [
          {
            required: true,
            trigger: "blur",
            message: "请输入正确的手机号1",
          },
          {
            max:11,
            trigger: "change",
            message: "请输入正确的手机号2",
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
      
      const checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the age'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
          }
          callback()
        }
      }
  
      
      const ruleForm = reactive({
        pass: '',
        checkPass: '',
        age: '',
      })
      
      const rules = reactive({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
      })
      
      const submitForm = (formEl) => {
        console.log('222')
        // if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
      
      const resetForm = (formEl) => {
        if (!formEl) return
        formEl.resetFields()
      }
      return {
        loginRules,
        loginForm,
        ruleFormRef,
        checkAge,
        validatePass,
        ruleForm,
        rules,
        submitForm,
        resetForm
      };
    }
  }

  export default App
