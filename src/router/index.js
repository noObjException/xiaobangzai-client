import Utils from 'src/libs/utils.js'
const mainLayout = Utils.getPath('layout/mainLayout')

export default [
  {
    path: '/',
    component: mainLayout,
    children: [
      {
        path: '',
        component: Utils.getPath('index/index')
      },
      {
        path: 'member',
        component: Utils.getPath('member/index')
      }
    ]
  }
]

