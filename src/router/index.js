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
        component: Utils.getPath('index/index')
      }
    ]
  },
  {
    path: '/member',
    component: Utils.getPath('member/index')
  },
  {
    path: '/member/credit',
    component: Utils.getPath('member/credit')
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
    path: '/service',
    component: serviceLayout,
    children: [
      {
        path: 'getExpress/create',
        component: Utils.getPath('service/getExpress/create')
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
    path: '/address',
    component: Utils.getPath('address/list')
  },
  {
    path: '/address/edit',
    component: Utils.getPath('address/edit')
  }
]

