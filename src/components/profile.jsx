import React, { Component } from "react";
import { Row, Col, Avatar, Typography, Button, List } from "antd";
const { Title } = Typography;
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        postList:[{
            id:'1234567',
            user:'van',
            title:'rent a dungeon'
        }]
    };
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
                "https://ch.mathworks.com/matlabcentral/profiles/12606575_1529306722027.jpg"
              }
              shape="square"
              size={100}
              icon="user"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }} type="flex" justify="center">
          <Col span={20}>
            <Button>Edit</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "35px" }} type="flex" justify="center">
          <Col span={20}>
            <Title level={4}>User:&nbsp; Van Darkhomle</Title>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }} type="flex" justify="center">
          <Col span={20}>
            <Title level={4}>Email:&nbsp; 1234567@mail.utoronto.ca</Title>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px",textAlign:'left' }} type="flex" justify="center">
          <Col span={20}>
            <List
              size="large"
              header={<div style={{fontSize:"28px",fontWeight:'bold'}}>Posts</div>}
              bordered
              dataSource={this.state.postList}
              renderItem={item => <List.Item>{item.title}</List.Item>}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
