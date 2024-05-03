import { Footer, Question, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import {currentUser as queryCurrentUser } from '@/services/users/api';
import React from 'react';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
const NO_NEED_LOGIN_WHITE_LIST = [registerPath, loginPath];
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const result = await queryCurrentUser({
        skipErrorHandler: true,
      });
      const currentUser = result.data;
      // console.log("app.tsx.fetchUserInfo:",currentUser);
      
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果是无需登录的页面，不执行
  const { location } = history;
  if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
    return {
      fetchUserInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  return {
    actionsRender: () => [<Question key="doc" />],
    // 头像props
    avatarProps: {
      src: initialState?.currentUser?.avatarUrl?initialState?.currentUser?.avatarUrl:"http://www.baidu.com/link?url=SZsUkTGyuU8wjEopVrENLRRfgN65JmBENF0d3MTDLRuNwZ6-pJBTVVoqVhaQ6Ry_7j8vShKpVeItWlS2lowlHqzwc31lG-JsMFUmfRune3u-JP3bfUdmu3DqGgJujSiAdHtUn6qb-gm7sMP18nefgxCEOZ-ZIXaL0koRA2wRtLsFSed6ArLgrdjNZdrhAIQW3YqpJqtEAGKaOeYNykhkbvt9YNruyoPn--lvZ0UjuHjkr8nKjUc1Tt3qISHbxhdwNF9RCqmcEOKqgimEHuRtAmLVQwosDIP80n7aW-GK-PRvcRXXOmhP8_33yeNsUjxaNBkelGnWwL3H95iFgTpg3N8LunZZonJgtqsatby5Z0HcLqDoPvk_K7piV64QUr8sUDAUCrUKwDS1LjPFENjJA-dgkCe8zDW6l8kI7L05QPIbvrQdLy0qALzkbUgZEbKSWiiPIBPtsSEAoW2wB6xad515CUVDJ_o05RS4zzjxZ5IxSqsV5I3krEFCMc4WWqH0zp9mZbtSrELln8zriIGYvCp65zPJUmgkV9uNUKFWpioyKCDbOLLE4g_WKaaFSeKvAWHTFsW8D9vzKIOdQAD2tENJqhV7Drg7H9D1mM_Nv43QKcBv7QicxIqND4AhXtw7UZ9AbqByG9W2ve70naN1h5lszaUsrhZJxcAMy4-vYESp8WlBZHbWKAFjnwb-KJp569l5R79w4PIFKXb5vGOdKa&wd=&eqid=b0b9f632022e77f9000000026610baac",
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 水印
    waterMarkProps: {
      content: initialState?.currentUser?.username?initialState?.currentUser?.username:`user_${initialState?.currentUser?.userAccount}`,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      
      const { location } = history;
      // 如果是登录页面或注册页面不强制跳转
      if (location.pathname === loginPath || location.pathname === registerPath) {
        return;
      }
      // 如果没有登录，重定向到 login，会话过期或销毁后如果切换页面查询不到当前用户就跳转
      if (!initialState?.currentUser) {
        message.error("未登录")
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/welcome" target="_blank">
            <LinkOutlined />
            <span>welcome</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理，直接在requestErrorConfig.ts中配置
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL: process.env.NODE_ENV==='production'?"https://user-center-101402-5-1325587012.sh.run.tcloudbase.com":"http://localhost:8080",
  ...errorConfig,
};
