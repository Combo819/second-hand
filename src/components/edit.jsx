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
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const Option = Select.Option;
const _ = require('lodash')
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultType: "want",
      defaultStatus: "open",
      type: "want",
      status: "open",
      defaultTitle: "title",
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
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
          }
      ]
    };
    this.typeChange = this.typeChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.cusRequest = this.cusRequest.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
    this.modalCancel = this.modalCancel.bind(this)
  }

  componentDidMount() {
    console.log("edit");
  }
  typeChange(value) {
    this.setState({
      type: value
    });
  }
  statusChange(value) {
    this.setState({
      status: value
    });
  }
  imageChange({ fileList }){
      console.log('filelist',fileList);
      console.log('state.filelist',this.state.fileList);
      
     const diffArray =_.difference(this.state.fileList,fileList)
     console.log(diffArray);
   this.setState({
       fileList
   })
  }
  cusRequest(e){
      console.log(e);
      console.log(this.state.fileList);
  }
  imagePreview(file){
    this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    
  }
  modalCancel(){
    this.setState({
        previewVisible:false
    })
    
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
                  defaultValue={this.state.defaultType}
                  style={{ width: 120 }}
                  onChange={value => this.typeChange(value)}
                >
                  <Option value="want">want</Option>
                  <Option value="rent">rent</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  defaultValue={this.state.defaultStatus}
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
                  defaultValue={this.state.defaultTitle}
                  placeholder="Basic usage"
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
                  {fileList.length >= 3 ? null : uploadButton}
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
          style={{ marginTop: "45px", textAlign: "left",marginBottom:'35px' }}
        >
        <Col span={2}><Button>Cancel</Button></Col>
        <Col span={2}><Button type={'primary'}>Submit</Button></Col>
        </Row>
      </div>
    );
  }
}

export default Edit;
