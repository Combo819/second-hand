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
  Modal,
  Popconfirm
} from "antd";
import history from "./history";
import axios from "axios";
import { store, setUser, detailTitle, setUserAv,setEdit } from "./redux/index.js";
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const _ = require("lodash");
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
      messageLoading: false,
      avatar: "",
      owner: "",
      email: "",
      comments: "",
      openClose: true,
      wantRent: true,
      title: "",
      content: "",
      postId: "",
      emailContent:'',
      user: store.getState().user.username
    };
    this.messageClick = this.messageClick.bind(this);
    this.messageCancel = this.messageCancel.bind(this);
    this.messageConfirm = this.messageConfirm.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.backMain = this.backMain.bind(this);
    this.listener = this.listener.bind(this);
    this.emailChange = this.emailChange.bind(this)
  }
  componentDidMount() {
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

    store.subscribe(this.listener);

    
    axios({
      url: "/get_detail",
      
      params:{
        'postId':store.getState().postId
      }
    })
      .then(res => {
        if (res.data.status) {
          const images = _.map(res.data.detail.images, function(image, key) {
            return { index: key, url: image };
          });
          const {
            avatar,
            owner,
            comments,
            email,
            openClose,
            wantRent,
            content,
            title,
            postId
          } = res.data.detail;
          this.setState({
            images,
            avatar,
            owner,
            comments,
            email,
            openClose,
            wantRent,
            title,
            content,
            postId
          });
         
        } else {
          message.error("can not get detail");
        }
      })
      .catch(err => {
        message.error("Error Network: can not get detail");
      });
  }
  listener(){
    this.setState({
      user:store.getState().user.username
    })
  }
  emailChange(e){
   const value = e.target.value
    this.setState({
      emailContent:value
    })
  }
  backMain() {
    history.push("/mainpage");
  }
  editClick() {
    console.log(this.state.postId);
    
    store.dispatch(setEdit(this.state.postId))
    console.log(store.getState());
    history.push("/edit");
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
    const form = new FormData()
    form.append('email_content',this.state.emailContent)
    form.append('postId',this.state.postId)
    axios({
      url:'/send_email',
      method:'post',
      data:form
    }).then(res=>{
      if(res.data.status){
        message.success('email sent!');
        this.setState({
          messageLoading: false,
          messageVisible: false
        });
      }else{
        message.error('can not send the email')
        this.setState({
          messageLoading: false,
        });
      }
    }).catch(err=>{
      message.error('Error Network:can not send the email')
      this.setState({
        messageLoading: false,
      });
    })
  }
  deleteConfirm() {
    history.push("/mainpage");
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
                <Button onClick={this.backMain}>
                  <Icon type="left" />
                  Mainpage
                </Button>
              </Col>
              {this.state.owner === this.state.user && (
                <Col span={4}>
                  <Row type="flex" justify="space-between">
                    <Button onClick={this.editClick.bind(this)}>
                      <Icon type="edit" />
                      Edit
                    </Button>
                    <Popconfirm
                      placement="top"
                      title={"Are you sure to Delete this post?"}
                      onConfirm={this.deleteConfirm}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type={"danger"}>
                        <Icon type="delete" />
                        Delete
                      </Button>
                    </Popconfirm>
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Row gutter={20} type="flex" justify="start" align="middle">
              <Col>
                <Avatar
                  src={this.state.avatar}
                  shape="square"
                  size={64}
                  icon="user"
                />
              </Col>
              <Col>
                <Title style={{ marginTop: "7px" }} level={4}>
                  {this.state.owner}
                </Title>
              </Col>{
                (this.state.user!==this.state.owner)&&(<Col>
                  <Button onClick={this.messageClick}>Message</Button>
                  <Modal
                    visible={this.state.messageVisible}
                    title="Send an email to the poster"
                    onCancel={this.messageCancel}
                    footer={[
                      <Button key="back" onClick={this.messageCancel}>
                        Cancel
                      </Button>,
                      <Tooltip
                        title={
                          "The message will be sent directly to the poster's private mailbox"
                        }
                        placement={"bottom"}
                      >
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
                      value={this.state.emailContent}
                      style={{ resize: "none" }}
                      autosize={{ minRows: 6 }}
                      onChange={this.emailChange}
                    />
                  </Modal>
                </Col>)
              }
              
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Title level={2}>{this.state.title}</Title>
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
              {this.state.content}
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
                {_.map(this.state.comments, (comment,index) => (
                  <Comment  key={index}
                    author={<a>{comment.user}</a>}
                    avatar={<Avatar src={comment.avatar} alt={comment.user} />}
                    content={<p>{comment.content}</p>}
                  />
                ))}
               
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
