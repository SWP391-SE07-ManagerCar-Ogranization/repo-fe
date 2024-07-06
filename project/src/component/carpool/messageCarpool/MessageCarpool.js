import React from 'react';
import { Button, message, Space } from 'antd';
const [messageApi, contextHolder] = message.useMessage();
  export const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  export const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  export const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };


