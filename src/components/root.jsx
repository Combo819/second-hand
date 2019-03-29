import React from "react";
import { Layout, Row, Col, Avatar, Icon, Menu, Dropdown, message } from "antd";

import { Router, Route } from "react-router-dom";
import history from "./history";
import Signin from "./signin";
import Signup from "./signup";
import Profile from './profile'
import Mainpage from "./mainpage";
import Detail from "./detail"
const { Header, Content, Footer } = Layout;
const axios = require("axios");
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSrc: "",
      username: "",
      dropdownDisable: true
    };
    this.logoutItem = this.logoutItem.bind(this);
    this.setProfile= this.setProfile.bind(this)
  }
  componentDidMount() {
  }
  setProfile(nextState){
    this.setState(preState => (nextState));
  }
  logoutItem(e) {
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={e => this.logoutItem(e)}
          disabled={this.state.dropdownDisable}
        >
          log out
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{ backgroundColor: "rgba(240,242,245)" }}>
        <Layout className="layout " style={{ minHeight: 820 }}>
          <Header
            style={{ backgroundColor: "#fff", boxShadow: "1px 1px 15px grey" }}
          >
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <img width={110} style={{
                  marginTop:-26
                }} src={'https://combo819.github.io/myPhotoBlog/images/homepage/logo.png'}></img>
                {/* <span style={{ fontSize: 30 }}>LOGO</span> */}
              </Col>
              <Col lg={6}>
                {this.state.avatarSrc ? (
                  <Avatar
                    size={48}
                    src={this.state.avatarSrc}
                    style={{ marginRight: "20px", marginBottom: "8px" }}
                  />
                ) : (
                  <Avatar
                    size={48}
                    icon="user"
                    style={{ marginRight: "20px", marginBottom: "8px" }}
                  />
                )}
                <Dropdown overlay={menu}>
                  <span style={{ fontSize: 22 }}>
                    {this.state.username || "Not Login"} <Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Router history={history}>
                <div>
                    {/* <Route exact path='/' component={Signin} />
                    <Route path='/signup' component={Signup} /> */}
                    <Detail></Detail>
                </div>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Second Hand ©2019 Created by Kang
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default Welcome;
