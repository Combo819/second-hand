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
  Tag
} from "antd";
import history from './history'
import axios from "axios";
import { store, setUser, detailTitle,setUserAv,setEdit } from './redux/index.js'
const Search = Input.Search;
const { Title } = Typography;
const _ = require("lodash");


class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      want: true,
      rent: true,
      open: true,
      close: true,
      search: "",
      postOrigin:[],
      postSelected:[]
      /* postOrigin: [
        {
          title: "as we can",
          user: "billy herrington",
          postId: "123456",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: true,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "as we cannot",
          user: "billy herrington",
          postId: "1234567",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: true,
          openClose: false,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "as we can do",
          user: "billy herrington",
          postId: "1234568",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: false,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "i am an artist",
          user: "billy herrington",
          postId: "1234569",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: false,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        }
      ],
      postSelected:[
        {
          title: "as we can",
          user: "billy herrington",
          postId: "123456",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: true,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "as we cannot",
          user: "billy herrington",
          postId: "1234567",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: true,
          openClose: false,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "as we can do",
          user: "billy herrington",
          postId: "1234568",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: false,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        },
        {
          title: "i am an artist",
          user: "billy herrington",
          postId: "1234569",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw",
          wantRent: false,
          openClose: true,
          content: "my name is van. I am an artist, a performance artist",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3RWAZiYjGHj4Hv_RjtpqL64lpHs4-qaLshz0Er7IpeV8S4qdrw"
        }
      ], */
    };
    this.switchChange = this.switchChange.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.newPost = this.newPost.bind(this)
    //use _.takeRightWhile to generate filtered posts
  }
  componentDidMount(){

    axios({
      url:'/check_signin',
      withCredentials:true
    }).then(res=>{
      console.log(res.data.signin);
      
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
      url:'/get_all_list'
    }).then(res=>{
      if(res.data.status){
        this.setState({
          postOrigin:res.data.posts,
          postSelected:res.data.posts
        })
      }else{
        message.error('can not get posts')
      }
    }).catch(err=>{
      console.log(err);
      message.error('Error Network: can not get posts')
    })
  }
  newPost(){
    store.dispatch(setEdit(''))
    history.push('/edit')
  }
  titleClick(e,postId){
    
    store.dispatch(detailTitle(postId))
    
    history.push('/detail')
  }
  switchChange(checked, type) {
    // I dont know why the call back doesn't work
    switch (type) {
      case "want": {
        this.setState({
          want: checked
        },this.applyFilter()
        );
        break;
      }
      case "rent": {
        this.setState({
          rent: checked
        },this.applyFilter()
        );
        break;
      }
      case "open": {
        this.setState({
          open: checked
        },this.applyFilter());
        break;
      }
      case "close": {
        this.setState({
          close: checked
        },this.applyFilter());
        break;
      }
    }
  }

  searchChange(e){
    this.setState({
      search:e.target.value
    },this.applyFilter())
  }
  applyFilter(){
    setTimeout(() => {
      const  postSelected = _.filter(this.state.postOrigin,(item)=>{

        let [wantRent,openClose] = [false,false]
        //I don't know why this.state.want is reverse to
        if((this.state.want&&item.wantRent)||(this.state.rent&&!item.wantRent)){
          {wantRent = true}
        }
        if((this.state.open&&item.openClose)||(this.state.close&&!item.openClose))
          {openClose = true}
        const search = _.includes(item.title+item.content,this.state.search)
        
        return (wantRent&&openClose)&&search
      });
      this.setState({
        postSelected
      })
    }, 0);
   
    
  }
  clearAll() {
    console.log('clear all');
    
    this.setState({
      want: true,
      rent: true,
      open: true,
      close: true
    },this.applyFilter());
  }
  render() {

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div>
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
                    <Switch
                      checked={this.state.want}
                      onChange={(checked, event) =>
                        this.switchChange(checked, "want")
                      }
                    />
                    
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
                    <Switch checked={this.state.rent}
                      onChange={(checked, event) =>
                        this.switchChange(checked, "rent")
                      } />
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
                    <Switch checked={this.state.open}
                      onChange={(checked, event) =>
                        this.switchChange(checked, "open")
                      } />
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
                    <Switch checked={this.state.close}
                      onChange={(checked, event) =>
                        this.switchChange(checked, "close")
                      } />
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
                    <Button onClick={this.clearAll}>Clear All</Button>
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
              value={this.state.search}
              onChange={e=>this.searchChange(e)}
            />
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={3}>
            <Button onClick={this.newPost} size="large">
              <Icon type="plus" />
              New Post
            </Button>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "45px" }}
          type="flex"
          justify="center"
          align="top"
        >
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
              dataSource={this.state.postSelected}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={<img height={160} alt="logo" src={item.image} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<Title style={{cursor:'pointer'}} onClick={e=>this.titleClick(e,item.postId)} level={3}>{item.title}</Title>}
                    description={
                      <div>
                        {item.wantRent ? (
                          <Tag color="blue">want</Tag>
                        ) : (
                          <Tag color="orange">rent</Tag>
                        )}
                        {item.openClose ? (
                          <Tag color="green">open</Tag>
                        ) : (
                          <Tag color="red">closed</Tag>
                        )}
                      </div>
                    }
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
