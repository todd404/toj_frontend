import React from 'react';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={<Button type="primary" href="/">返回首页</Button>}
    />
  );
};

export default NotFoundPage;