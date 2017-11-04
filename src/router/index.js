import Utils from 'src/libs/utils.js'
const mainLayout = Utils.getPath('layout/mainLayout')
const serviceLayout = Utils.getPath('service/index')

export default [
  {
    path: '/',
    component: mainLayout,
    children: [
      {
        path: '',
        redirect: '/service/getExpress/create'
        // component: Utils.getPath('index/index')
      }
    ]
  },
  {
    path: '/auth',
    component: Utils.getPath('auth/auth')
  },
  {
    path: '/member',
    component: Utils.getPath('member/index')
  },
  {
    path: '/member/point',
    component: Utils.getPath('member/point')
  },
  {
    path: '/member/mission',
    component: Utils.getPath('member/mission/list')
  },
  {
    path: '/member/mission/detail',
    component: Utils.getPath('member/mission/detail')
  },
  {
    path: '/member/address/list',
    component: Utils.getPath('member/address/list')
  },
  {
    path: '/member/address/edit',
    component: Utils.getPath('member/address/edit')
  },
  {
    path: '/member/profile',
    component: Utils.getPath('member/profile')
  },
  {
    path: '/member/identify',
    component: Utils.getPath('member/identify')
  },
  {
    path: '/service',
    component: serviceLayout,
    children: [
      {
        path: 'getExpress/create',
        component: Utils.getPath('service/getExpress/create')
      },
      {
        path: 'getExpress/list',
        component: Utils.getPath('staff/mission/list')
      },
      {
        path: 'freeMarket',
        component: Utils.getPath('service/freeMarket/index')
      },
      {
        path: 'usedBook',
        component: Utils.getPath('service/usedBook/index')
      }
    ]
  },
  {
    path: '/service/getExpress/pay',
    component: Utils.getPath('service/getExpress/pay')
  },
  {
    path: '/service/getExpress/result',
    component: Utils.getPath('service/getExpress/result')
  },
  {
    path: '/service/getExpress/acceptResult',
    component: Utils.getPath('service/getExpress/acceptResult')
  },
  {
    path: '/address',
    component: Utils.getPath('address/list')
  },
  {
    path: '/address/edit',
    component: Utils.getPath('address/edit')
  },
  {
    path: '/staff',
    component: Utils.getPath('staff/index')
  },
  {
    path: '/staff/identify',
    component: Utils.getPath('staff/identify')
  },
  {
    path: '/staff/mission/list',
    component: Utils.getPath('staff/mission/list')
  },
  {
    path: '/staff/mission/detail',
    component: Utils.getPath('staff/mission/detail')
  }
]

