import React from "react";
import { Layout, Row, Col, Avatar, Icon, Menu, Dropdown, message } from "antd";

import { Router, Route } from "react-router-dom";
import history from "./history";
import Signin from "./signin";
import Signup from "./signup";
import Profile from "./profile";
import Mainpage from "./mainpage";
import Detail from "./detail";
import Edit from "./edit";
import { store, setUser, detailTitle,setUserAv,setProfile } from './redux/index.js'
const { Header, Content, Footer } = Layout;
const axios = require("axios");

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSrc: "",
      username: '',
      dropdownDisable: true
      
    };
    this.logoutItem = this.logoutItem.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.profileItem = this.profileItem.bind(this);
    this.toMain = this.toMain.bind(this);
    this.listener = this.listener.bind(this);
    this.logout = this.logout.bind(this)
  }
  componentDidMount() {
    store.subscribe(this.listener);
    
  }
  listener(){
    this.setState({
      username:store.getState().user.username,
      avatarSrc:store.getState().user.avatar,
      dropdownDisable:!Boolean(store.getState().user.username)
    })
    
  }
  logout(){

    axios({
      url:'/logout',
      withCredentials:true
    }).then(res=>{
      if(res.data.logout){
        store.dispatch(setUser(''))
        store.dispatch(setUserAv(''))
        history.push('/')
      }else{
        message.error('can not logout')
      }
    }).catch(err=>{
      console.log(err);
      message.error('error network: can not logout')
    })
  }
  setProfile(nextState) {
    this.setState(preState => nextState);
  }
  toMain(){
    history.push('/mainpage')
  }
  logoutItem(e) {}
  profileItem(){

    
    store.dispatch(setProfile(store.getState().user.username))

    history.push('/profile')
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={e => this.toMain(e)}
          disabled={this.state.dropdownDisable }
        >
          mainpage
        </Menu.Item>
        <Menu.Item
          onClick={e => this.profileItem(e)}
          disabled={this.state.dropdownDisable}
        >
          profile
        </Menu.Item>
        <Menu.Item
          onClick={ this.logout}
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
                <img
                  width={110}
                  style={{
                    marginTop: -26
                  }}
                  src={
                    "https://combo819.github.io/myPhotoBlog/images/homepage/logo.png"
                  }
                />
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
                    {this.state.username || "Not Login"} 
                    <Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Router history={history}>
                <div>
                  <Route exact path="/" component={Signin} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/mainpage" component={Mainpage} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/detail" component={Detail} />
                  <Route path="/edit" component={Edit} />
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
