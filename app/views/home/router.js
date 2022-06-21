import conext from '@/middleware/conext'
import authenticateMiddle from '@/middleware/ldap'
import {LOGIN_PAGE} from '@/middleware/auth'

export default router => {
  // 登录页
  router.get('/', LOGIN_PAGE, conext(async (req, res) => {

    if (res.locals.isLogin) {
      return res.redirect(req.query.continue || '/profile')
    }

    res.render('home/index', {})
  }))

  // 处理登录
  router.post('/access', authenticateMiddle)
}
