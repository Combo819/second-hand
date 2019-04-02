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
  Popconfirm,
  Select,
  Upload
} from "antd";
import history from "./history.js";
import { store, setUser, detailTitle, setUserAv } from "./redux/index.js";
const axios = require("axios");
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const Option = Select.Option;
const _ = require("lodash");
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "want",
      status: "open",
      defaultTitle: "",
      previewVisible: false,
      previewImage: "",
      fileList: [
        /* {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
            uid: "-2",
            name: "xxx.png",
            status: "done",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          } */
      ]
    };
    this.typeChange = this.typeChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.cusRequest = this.cusRequest.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.submit =this.submit.bind(this)
  }
  cancelClick() {
    history.push("/mainpage");
  }
  componentDidMount() {
    axios({
      url: "/check_signin",
      withCredentials: true
    })
      .then(res => {
        if (res.data.signin) {
          store.dispatch(setUser(res.data.name));
          store.dispatch(setUserAv(res.data.avaSrc));
        } else {
          message.error("you have logged out");
          history.push("/");
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        message.error("Error Network: Fail to check the sign in status");
        history.push("/");
        return false;
      });
    console.log(store.getState().edit);

    if (store.getState().edit) {
      axios({
        url: "/get_detail",
        params: {
          postId: store.getState().edit
        }
      })
        .then(res => {
          const {
            title,
            content,
            openClose,
            wantRent,
            images
          } = res.data.detail;

          const imagesObject = _.map(images, function(image, index) {
            return { uid: "-" + index, status: "done", url: image };
          });
          this.setState({
            type: wantRent ? "want" : "rent",
            status: openClose ? "open" : "close",
            title,
            content,
            fileList: imagesObject
          });
          setTimeout(() => {
            console.log(this.state);
          }, 0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  submit(){
      const form = new FormData()
      form.append('title',this.state.title)
      form.append('content',this.state.content)
      form.append('type',this.state.type)
      form.append('status',this.state.status)
      form.append('postId',store.getState().edit)
      axios({
          url:'/edit_submit',
          method:'POST',
          withCredentials:true,
          data:form
      }).then(res=>{
          if(res.data.submit){
            history.push('/mainpage')
            message.success('Post updated!')
          }else{
              message.error('fail to update the post')
          }
      }).catch(err=>{
          console.log(err);
          message.error('Error Network: Fail to submit')
      })
  }
  typeChange(value) {
    this.setState({
      type: value
    });
  }
  titleChange(e) {
    const value = e.target.value;
    this.setState({
      title: value
    });
  }
  contentChange(e) {
    const value = e.target.value;

    this.setState({
      content: value
    });
  }
  statusChange(value) {
    this.setState({
      status: value
    });
  }
  imageChange({ fileList }) {
    console.log("filelist", fileList);
    console.log("state.filelist", this.state.fileList);

    const diffArray = _.difference(this.state.fileList, fileList);
    console.log(diffArray);
    
    if (!diffArray.length) {
      this.setState({
        fileList
      });
    }
    _.forEach(diffArray, (remove)=> {
      if ((!_.has(remove, "type")) && remove.status === "removed") {
        const form = new FormData();
        form.append("remove", remove.url);
        form.append("postId", store.getState().edit);
        axios({
          url: "/delete_photo",
          method: "post",
          data: form
        })
          .then(res => {
            if (res.data.delete) {
              this.setState({
                fileList
              });
            } else {
              message.error("cannot delete the image");
              return false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.setState({
          fileList
        });
      }
    });
  }
  cusRequest(e) {
    console.log(e);
    console.log(this.state.fileList);
  }
  imagePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }
  modalCancel() {
    this.setState({
      previewVisible: false
    });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
          <Col span={20}>
            <Title level={2}>Editor</Title>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "35px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="start">
              <Col span={4}>
                <Select
                  value={this.state.type}
                  style={{ width: 120 }}
                  onChange={value => this.typeChange(value)}
                >
                  <Option value="want">want</Option>
                  <Option value="rent">rent</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  value={this.state.status}
                  style={{ width: 120 }}
                  onChange={value => this.statusChange(value)}
                >
                  <Option value="open">open</Option>
                  <Option value="close">close</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "35px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="left">
              <Col span={2}>
                <Title level={3}>Title: </Title>
              </Col>
              <Col span={3}>
                <Input
                  value={this.state.title}
                  onChange={e => this.titleChange(e)}
                  placeholder="title"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "35px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="left">
              <Title level={3}>Description: </Title>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "5px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="left">
              <Col span={16}>
                <TextArea
                  value={this.state.content}
                  onChange={e => this.contentChange(e)}
                  autosize={{ minRows: 6, maxRows: 10 }}
                  style={{ resize: "none" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "35px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="left">
              <Title level={3}>Images: </Title>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "5px", textAlign: "left" }}
        >
          <Col span={20}>
            <Row type="flex" justify="left">
              <Col span={16}>
                <Upload
                  withCredentials={true}
                  action=""
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.imagePreview}
                  onChange={this.imageChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.modalCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "45px", textAlign: "left", marginBottom: "35px" }}
        >
          <Col span={2}>
            <Button onClick={this.cancelClick}>Cancel</Button>
          </Col>
          <Col span={2}>
            <Button onClick={this.submit} type={"primary"}>Submit</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Edit;
