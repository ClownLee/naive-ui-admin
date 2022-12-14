import Mock from 'mockjs';
import { resultSuccess } from '../_util';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  token: '',
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console',
    },
    {
      label: '监控页',
      value: 'dashboard_monitor',
    },
    {
      label: '工作台',
      value: 'dashboard_workplace',
    },
    {
      label: '基础列表',
      value: 'basic_list',
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete',
    },
  ],
};

const keys = {
  key: Random.string('upper', 16, 16),
  publicKey: 'm2dn!#y6*l44*o2q',
  privateKey: '$c%e5vrb3i+f190t',
}

export default [
  // 轮询获取登录信息
  {
    url: '/api/confirm_login',
    timeout: 1000,
    method: 'post',
    response: () => {
      adminInfo.token = token;
      return resultSuccess(adminInfo);
    },
  },
  {
    url: '/api/admin_info',
    timeout: 1000,
    method: 'get',
    response: () => {
      // const token = getRequestToken(request);
      // if (!token) return resultError('Invalid token');
      return resultSuccess(adminInfo);
    },
  },
  // 获取加密的key
  {
    url: '/api/get_keys',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(keys);
    },
  },
];
