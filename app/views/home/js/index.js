new Vue({
  el: '#app',
  data: function () {
    return {
      username: 'lou',
      password: 'Passw0rd',
      disabled: true,
      loading: true,
      submiting: false
    }
  },
  created: function () {
    console.log('xxx')
    this.loading = false
  },
  watch: {
    username: {
      handler: function () {
        this.validator()
      },
      immediate: true
    },
    password: {
      handler: function () {
        this.validator()
      },
      immediate: true
    }
  },
  methods: {
    validator () {
      this.disabled = this.username === '' || this.password === ''
    },
    parseHash () {
      let searchs = window.location.search.split('&')
      let cntue = null
      for (let n = 0; n <= searchs.length - 1; n++) {
        let key = searchs[n]
        if (key === '') continue
      	if (key.indexOf('?continue=') > -1 || key.indexOf('continue=') > -1) {
          cntue = key.replace(/^\?continue=/g, '')
          break
      	}
      }
      window.location.href = cntue ? cntue : '/profile'
    },
    success (res) {
      if (res.data.success) {
        this.parseHash()
      } else {
        this.disabled = false
        this.submiting = false
        this.$message.warning(
          res.data.msg.message === 'PASSPORT_INVALID'
            ? '账号密码有误'
            : `登录失败：${res.data.error || res.data.msg}`
        )
      }
    },
    submit () {
      this.disabled = true
      this.submiting = true
      const body = {
        username: this.username,
        password: this.password
      }
      console.log('body', body)
      axios.post('/access', body)
        .then(this.success)
        .catch(err => {
          this.disabled = false
          this.submiting = false
          this.$message.error(err)
        })
    }
  }
})
