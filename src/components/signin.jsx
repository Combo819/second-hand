import React, { Component } from "react";
import { Row, Col, Input, Button, Divider, message } from "antd";
import history from "./history";
//const axios = require('axios')
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formatNotif: false,
          formatContent: {
            wrongACC: "mistake account or password"
          },
          inputValue: {
            username: "",
            password: ""
          }
        };
        this.usernameOn = this.usernameOn.bind(this);
        this.passwordOn = this.passwordOn.bind(this);
        this.signIn = this.signIn.bind(this);
      }
      toRegister(e) {
        e.preventDefault();
        history.push("/signup");
      }
      signIn(e) {
        if (!(this.state.inputValue.username && this.state.inputValue.password)) {
          message.error("you must type in both useranme and password");
        } else {
        }
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
                value={this.state.inputValue.username}
                onChange={e => this.usernameOn(e)}
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
