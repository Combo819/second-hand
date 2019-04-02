import React, { Component } from "react";
import { Row, Col, Input, Button, Divider, message } from "antd";
import history from "./history";
import { store, setUser, detailTitle, setUserAv } from "./redux/index.js";
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:5000";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatNotif: false,
      formatContent: {
        wrongACC: "mistake account or password"
      },
      inputValue: {
        email: "",
        password: ""
      }
    };
    this.emailOn = this.emailOn.bind(this);
    this.passwordOn = this.passwordOn.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  componentDidMount() {
    axios({
      url: "/check_signin",
      withCredentials:true
    })
      .then(res => {
        console.log('signin page',res);
        
        if (res.data.signin) {
          history.push("/mainpage");
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
  toRegister(e) {
    e.preventDefault();
    history.push("/signup");
  }
  signIn(e) {
    if (!(this.state.inputValue.email && this.state.inputValue.password)) {
      message.error("you must type in both useranme and password");
    } else {
      const form = new FormData();
      form.append("email", this.state.inputValue.email);
      form.append("password", this.state.inputValue.password);
      axios({
        url: "/signin",
        method: "POST",
        data: form,
        withCredentials:true
      })
        .then(res => {
          console.log(res.data);
          if (res.data.login) {
            store.dispatch(setUser(res.data.name));
            store.dispatch(setUserAv(res.data.avaSrc));
            history.push("/mainpage");
          } else {
            console.log("not login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  emailOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        email: targetValue
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
  }
  render() {
    return (
      <div>
        <Row>
          <span style={{ fontSize: 30 }}>Welcome to Second Hand Platform</span>
        </Row>
        <Row style={{ padding: "30px 0px" }}>
          {this.state.formatNotif && (
            <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
              <h3 style={{ color: "red" }}>
                {this.state.formatContent.wrongAcc}
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
                allowClear
                value={this.state.inputValue.email}
                onChange={e => this.emailOn(e)}
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
                allowClear
                value={this.state.inputValue.password}
                onChange={e => this.passwordOn(e)}
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.signIn(e)} type="primary" size="large">
                sign in
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={18}>
              <Divider>Don't have an account?</Divider>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.toRegister(e)} size="large">
                sign up
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default Signin;
