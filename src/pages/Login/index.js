import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'
import { login } from '../../utils/api/User'

import styles from './index.module.css'
import { HKZF_TOKEN } from '../../utils/index.js'

import { withFormik } from 'formik';

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {

  // 设置状态数据
  // state = {
  //   // 用户名
  //   username:'test2',
  //   // 密码
  //   password:'test2'
  // }


  // // 受控组件(双向绑定) => 一个事件，处理多个表单元素
  // handlerChange = (e) => {
  //   // console.log(e.target.name) // username password
  //   this.setState({
  //     [e.target.name]:e.target.value
  //   })
  // }

  // 登录
  login = async (e) => {
    // 阻止默认事件
    e.preventDefault();
    // 获取用户名和密码
    const {username,password} = this.state
    console.log(username,password)
    // 调用接口 => 校验用户名和密码
    const {status,data,description} = await login({username,password})
    // debugger
    if (status === 200) {
      Toast.success(description, 2)  // 2秒后，关闭提示框
      // 存储token
      localStorage.setItem(HKZF_TOKEN, data.token)
      // 跳转页面到首页
      this.props.history.push('/') 
    } else {
      Toast.fail(description, 2)  // 2秒后，关闭提示框
    }
  }

  render() {

    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.login}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 返回了增强的新组件 => 基础表单处理和校验
const NewLogin = withFormik({
  mapPropsToValues: () => ({ username: '111',password:'222' }),

  // Custom sync validation
  // validate: values => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = 'Required';
  //   }

  //   return errors;
  // },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
})(Login);

export default NewLogin
