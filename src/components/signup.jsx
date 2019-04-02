import React, { Component } from "react";
import { Row, Col, Input, Button, Divider, message } from "antd";
import history from "./history";
import { store, setUser, detailTitle,setUserAv } from './redux/index.js'
const axios = require("axios");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatNotif: false,
      formatContent: {
        currentShown: "",
        userLength: "The length of username must be between 6 to 12",
        inconsist: "Password and confirm password are not consistent",
        passwordLength: "The length of password must be between 6 to 12"
      },
      inputValue: {
        username: "",
        password: "",
        coPassword: "",
        email:''
      }
    };
    this.usernameOn = this.usernameOn.bind(this);
    this.passwordOn = this.passwordOn.bind(this);
    this.coPasswordOn = this.coPasswordOn.bind(this);
    this.signUP = this.signUP.bind(this);
    this.emailOn = this.emailOn.bind(this)
  }
  componentDidMount(){
    axios({
      url: "/check_signin",
      withCredentials:true
    })
      .then(res => {
        
        if (res.data.signin) {

          store.dispatch(setUser(res.data.name));
          store.dispatch(setUserAv(res.data.avaSrc));
          return true;
        }
      })
      .catch(err => {
        console.log(err);
        message.error("Error Network: Fail to check the sign in status");
      });
  }
  toLogin(e) {
    e.preventDefault();
    history.push("/");
  }
  signUP(e) {
    //possible character checking function

    if (
      this.state.inputValue.username.length > 16 ||
      this.state.inputValue.username.length < 6
    ) {
      message.error(this.state.formatContent.userLength);
    } else if (
      this.state.inputValue.password.length > 16 ||
      this.state.inputValue.password.length < 6
    ) {
      message.error(this.state.formatContent.passwordLength);
    } else if (
      this.state.inputValue.password !== this.state.inputValue.coPassword
    ) {
      message.error(this.state.formatContent.inconsist);
    } else {
      const form = new FormData()
      form.append('username',this.state.inputValue.username)
      form.append('password',this.state.inputValue.password)
      form.append('email',this.state.inputValue.email)
      axios({
        url:'/signup_new',
        method:'post',
        withCredentials:true,
        data:form
      }).then(res=>{
        if (res.data.status) {
          store.dispatch(setUser(res.data.name));
          store.dispatch(setUserAv(res.data.avaSrc));
          history.push("/mainpage");
        } else {
          message.error('cannot sign up')
        }
      }).then(err=>{
        console.log(err);
       // message.error('Error Network: Cannot Sign up')
      })

    }
  }
  emailOn(event){
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        email: targetValue
      }
    }));
  }
  usernameOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        username: targetValue
      }
    }));
  }
  passwordOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;

    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        password: targetValue
      }
    }));
    console.log(this.state.inputValue);
  }
  coPasswordOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        coPassword: targetValue
      }
    }));
  }
  render() {
    return (
      <div>
        <Row>
          <span style={{ fontSize: 30 }}>Sign up for an account</span>
        </Row>
        <Row style={{ padding: "30px 0px" }}>
          {this.state.formatNotif && (
            <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
              <h3 style={{ color: "red" }}>
                {this.state.formatContent.currentShown}
              </h3>
            </Row>
          )}
        <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Email:
            </Col>
            <Col span={6}>
              <Input
                value={this.state.inputValue.email}
                onChange={e => this.emailOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Username:
            </Col>
            <Col span={6}>
              <Input
                value={this.state.inputValue.username}
                onChange={e => this.usernameOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Password:
            </Col>
            <Col span={6}>
              <Input.Password
                value={this.state.inputValue.password}
                onChange={e => this.passwordOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Confirm Password:
            </Col>
            <Col span={6}>
              <Input.Password
                value={this.state.inputValue.coPassword}
                onChange={e => this.coPasswordOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.signUP(e)} type="primary" size="large">
                sign up
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={18}>
              <Divider>Already have an account?</Divider>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.toLogin(e)} size="large">
                sign in
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default Signup;
