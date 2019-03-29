import React, { Component } from "react";
import {
  Row,
  Switch,
  Col,
  Typography,
  Input,
  Button,
  Divider,
  message,
  List,
  Avatar,
  Icon,Tag
} from "antd";
const Search = Input.Search;
const { Title } = Typography;
class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: "http://ant.design",
        title: `ant design part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div >
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={3}>
            <Title>Filters</Title>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="top">
          <Col offset={3} span={24}>
            <Row type="flex" justify="space-around" align="top">
            
              <Col span={3}>
                <Row type="flex" justify="start" align="bottom">
                  <Col>
                    <Title level={3}> Want </Title>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </Col>
              <Col span={3}>
                <Row type="flex" justify="start" align="bottom">
                  <Col>
                    <Title level={3}> Rent </Title>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </Col>
              <Col span={3}>
                <Row type="flex" justify="start" align="bottom">
                  <Col>
                    <Title level={3}> Open </Title>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </Col>
              <Col span={3}>
                <Row type="flex" justify="start" align="bottom">
                  <Col>
                    <Title level={3}> Closed </Title>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                  <Col>
                    <Switch defaultChecked />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="start" align="bottom">
                  <Col>
                    <Title level={3}> Closed </Title>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                  <Col>
                    <Button>Clear All</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={3}>
            <Search
              placeholder="search title or description"
              onSearch={value => console.log(value)}
              style={{ width: 250 }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "45px" }} type="flex"
          justify="center"
          align="top">
          <Col span={18}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5
              }}
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      width={230}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={<Tag color="red">red</Tag>}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Mainpage;
