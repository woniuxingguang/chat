import React from 'react';
import {List} from 'antd-mobile';
import {connect} from 'react-redux';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state=>state
)
class Msg extends React.Component{

    //获取最后一条信息
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        //当前登录用户的id
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup);
        console.log(msgGroup)
        console.log(chatList)

        return(
            <div>
                <List>
                        {
                            chatList.map(v=>{
                                const lastItem = this.getLast(v);
                                const targetId = v[0].form === userid?v[0].to:v[0].from;
                                if(!userinfo[targetId]){
                                    return null
                                }
                                // const name = userinfo[targetId] && userinfo[targetId].name;
                                return (
                                    <Item key={lastItem._id}
                                        thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                    >
                                        {lastItem.content}
                                        <Brief>{userinfo[targetId].name}</Brief>
                                    </Item>
                                )
                            })
                        }
                </List>
            </div>
        )
    }
}
export default Msg;