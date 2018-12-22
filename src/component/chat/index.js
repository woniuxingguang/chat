import React from 'react';
import {List,InputItem,NavBar,Grid} from "antd-mobile";
import {connect} from 'react-redux';
import {getMsgList,recvMsg,sendMsg} from "../../redux/chat.redux";
import Icon from "antd-mobile/es/icon";
import {getChatId} from "../../utils/util";

@connect(
    state=>state,
    {getMsgList,recvMsg,sendMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            showEmoji:false
        }
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg()
        }
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text});
        // this.setState({text:''})
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''})
    }
    render() {
        const emoji = '🤩 🤨 🤯 🤪 🤬 🤮 🤫 🤭 🧐 🧒 🧑 🧓 🤟 🧡 🥦 🥧'
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        const Item = List.Item;
        if(!users[userid]){
            return null
        }
        const chatid=getChatId(userid,this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(v=>{
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from===userid?(
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item className='chat-me'
                                    extra={<img src={avatar} alt=""/>}
                                >{v.content}</Item>
                            </List>
                        )
                    })
                }
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:10}}
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            });
                                            this.fixCarousel()
                                        }}
                                    >🥧</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {
                        this.state.showEmoji ?<Grid
                            data={emoji}
                            columnNum={6}
                            carouselMaxRow={2}
                            isCarousel={true}
                            onClick={elm=>{
                                this.setState({
                                    text:this.state.text+elm.text
                                })
                            }}
                        />:null
                    }
                </div>
            </div>

        )
    }
}
export default Chat;