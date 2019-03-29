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
  Icon,
  Tag,
  Card,
  Comment,
  Tooltip,
  Modal,Popconfirm
} from "antd";
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          index: 0,
          url:
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Van_Darkholme_1.JPG"
        },
        {
          index: 1,
          url:
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Van_Darkholme_1.JPG"
        },
        {
          index: 2,
          url:
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Van_Darkholme_1.JPG"
        },
        {
          index: 3,
          url:
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Van_Darkholme_1.JPG"
        },
        {
          index: 4,
          url:
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Van_Darkholme_1.JPG"
        }
      ],
      messageVisible: false,
      messageLoading: false
    };
    this.messageClick = this.messageClick.bind(this);
    this.messageCancel = this.messageCancel.bind(this);
    this.messageConfirm = this.messageConfirm.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this)
    
  }

  messageClick() {
    console.log("messageClick");

    this.setState({
      messageVisible: true
    });
  }
  messageCancel() {
    this.setState({
      messageVisible: false
    });
  }

  messageConfirm() {
    this.setState({
      messageLoading: true
    });
    setTimeout(() => {
      this.setState({
        messageLoading: false,
        messageVisible: false
      });
    }, 2000);
  }
  deleteConfirm(){
      console.log('delete');
      
  }
  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={20}>
            <Row
              style={{ marginTop: "35px" }}
              type="flex"
              justify="space-between"
            >
              <Col span={2}>
                <Button>
                  <Icon type="left" />
                  Back
                </Button>
              </Col>
              <Col span={4}>
                <Row type="flex" justify="space-between">
                  <Button>
                    <Icon type="edit" />
                    Edit
                  </Button>
                  <Popconfirm placement="top" title={'Are you sure to Delete this post?'} onConfirm={this.deleteConfirm} okText="Yes" cancelText="No">
                  <Button type={"danger"}>
                    <Icon type="delete" />
                    Delete
                  </Button>
      </Popconfirm>
                  
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Row gutter={20} type="flex" justify="start" align="middle">
              <Col>
                <Avatar
                  src={
                    "https://ch.mathworks.com/matlabcentral/profiles/12606575_1529306722027.jpg"
                  }
                  shape="square"
                  size={64}
                  icon="user"
                />
              </Col>
              <Col>
                <Title style={{ marginTop: "7px" }} level={4}>
                  Van Darkholme
                </Title>
              </Col>
              <Col>
                <Button onClick={this.messageClick}>Message</Button>
                <Modal
                  visible={this.state.messageVisible}
                  title="Send an email to the poster"
                  onCancel={this.messageCancel}
                  footer={[
                    <Button key="back" onClick={this.messageCancel}>
                      Cancel
                    </Button>,
                    <Tooltip title={"The message will be sent directly to the poster's private mailbox"} placement={'bottom'}>
                      <Button
                        key="submit"
                        type="primary"
                        loading={this.state.messageLoading}
                        onClick={this.messageConfirm}
                      >
                        Submit
                      </Button>
                    </Tooltip>
                  ]}
                >
                  <TextArea
                    style={{ resize: "none" }}
                    autosize={{ minRows: 6 }}
                  />
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Title level={2}>I want to rent a dungeon</Title>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "5px" }}>
          <Col span={20}>
            <Tag color="green">open</Tag>
            <Tag color="blue">want</Tag>
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Paragraph style={{ fontSize: "18px" }}>
              Four score and seven years ago our fathers brought forth on this
              continent, a new nation, conceived in Liberty, and dedicated to
              the proposition that all men are created equal.
            </Paragraph>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Row gutter={20} type="flex" justify="space-around">
              {this.state.images.map(image => {
                return (
                  <Col style={{ marginTop: "25px" }} key={image.index} span={6}>
                    <img width={"100%"} src={image.url} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={20}>
            <Divider>
              <Title level={3}>Comments</Title>
            </Divider>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={20}>
            <Row type="flex" justify="start">
              <Col>
                <Comment
                  author={<a>Billy Herrington</a>}
                  avatar={
                    <Avatar
                      src="https://vignette.wikia.nocookie.net/unanything/images/e/e1/Billy.jpg/revision/latest?cb=20160817140541"
                      alt="billy herrington"
                    />
                  }
                  content={
                    <p>
                      We supply a series of design principles, practical
                      patterns and high quality design resources (Sketch and
                      Axure), to help people create their product prototypes
                      beautifully and efficiently.
                    </p>
                  }
                />
                <Comment
                  author={<a>Ricardo Milos</a>}
                  avatar={
                    <Avatar
                      src="https://pbs.twimg.com/media/Dxcrkq9XcAIAFxW.jpg"
                      alt="billy herrington"
                    />
                  }
                  content={
                    <p>
                      I may be late but never absent
                    </p>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={16}>
            <TextArea style={{ resize: "none" }} autosize={{ minRows: 6 }} />
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }} type="flex" justify="center">
          <Col span={16}>
            <Row type="flex" justify="end">
              <Col>
                <Button>Submit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Detail;
