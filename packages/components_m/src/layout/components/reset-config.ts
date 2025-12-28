export const resetFormDescriptions = {
  oldPassword: {
    key: 'oldPassword',
    label: '旧密码',
    inputType: 'password',
    rules: [
      { required: true, message: '旧密码是必填项' },
      { min: 5, message: '密码不能少于5位' },
      { max: 16, message: '密码不能超过16位' },
    ],
    inputProps: {
      
    },
  },
  password: {
    key: 'password',
    label: '新密码',
    inputType: 'password',
    rules: [
      { required: true, message: '新密码是必填项' },
      { min: 5, message: '密码不能少于5位' },
      { max: 16, message: '密码不能超过16位' },
    ],
    inputProps: {
      
    },
  },
  passwordConfirm: {
    key: 'passwordConfirm',
    label: '确认密码',
    inputType: 'password',
    rules: [
      { required: true, message: '确认密码是必填项' },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('确认密码与新密码不一致');
        },
      }),
    ],
    inputProps: {
      
      dependencies: ['password'],
    },
  },
};
