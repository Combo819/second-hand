import React, { Component } from "react";
import { Row, Col, Avatar, Typography, Button, List, Upload, message } from "antd";
import history from "./history";
import axios from "axios";
import { store, setUser, detailTitle,setUserAv ,setNewPost} from './redux/index.js'
const { Title } = Typography;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      email: "",
      postList: [
      ],
      avatar: ""
    };
    this.postClick = this.postClick.bind(this);
  }
  componentDidMount(){
    axios({
      url:'/check_signin',
      withCredentials:true
    }).then(res=>{
      if(res.data.signin){

        store.dispatch(setUser(res.data.name))
        store.dispatch(setUserAv(res.data.avaSrc))
      }else{
        message.error('you have logged out')
        history.push('/')
        return false
      }
    }).catch(err=>{
      console.log(err);
      message.error('Error Network: Fail to check the sign in status')
      history.push('/')
      return false
    })

    axios({
      url:'/get_profile',
      params:{
        'owner':store.getState().Profile||store.getState().user.username
      }
    }).then(res=>{
      const {owner,email,avatar,postList} = res.data
      this.setState({
        owner,email,avatar,postList
      })
    }).catch(err=>{
      console.log(err);
      message.error('Error Network: fail to fetch profile')
    })
  }
  postClick(postId) {
    store.dispatch(detailTitle(postId))
    store.dispatch(setNewPost(false))
    history.push("/detail");
  }
  render() {
    return (
      <div>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={20}>
            <Row type="flex" justify="left">
              <Title level={2}>Profile</Title>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "35px" }} type="flex" justify="center">
          <Col span={20}>
            <Avatar
              src={
                this.state.avatar
              }
              shape="square"
              size={100}
              icon="user"
            />
          </Col>
        </Row>
        {/* <Row style={{ marginTop: "10px" }} type="flex" justify="center">
          <Col span={20}>
            <Upload name="avatar" action="" withCredentials={true}>
              {" "}
              <Button onClick={this.uploadClick}>upload</Button>
            </Upload>
          </Col>
        </Row> */}
        <Row style={{ marginTop: "35px" }} type="flex" justify="center">
          <Col span={20}>
            <Title level={4}>User:&nbsp; {this.state.owner}</Title>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }} type="flex" justify="center">
          <Col span={20}>
            <Title level={4}>Email:&nbsp; {this.state.email}</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "20px", textAlign: "left" }}
          type="flex"
          justify="center"
        >
          <Col span={20}>
            <List
              size="large"
              header={
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                  Posts
                </div>
              }
              bordered
              dataSource={this.state.postList}
              renderItem={item => (
                <List.Item
                  style={{ cursor: "pointer" }}
                  onClick={()=>this.postClick(item.postId)}
                >
                  {item.title}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
