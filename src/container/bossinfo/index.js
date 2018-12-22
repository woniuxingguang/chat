import React from 'react';
import {NavBar,InputItem,TextareaItem,Button } from "antd-mobile";
import AvatarSelector from '../../component/avatar-selector';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            company: '',
            money: '',
            desc:''
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">BOSS信息完善页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                />
                <InputItem onChange={v=>this.handleChange('title',v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v=>this.handleChange('company',v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v=>this.handleChange('money',v)}>
                    职位薪资
                </InputItem>
                <TextareaItem onChange={v=>this.handleChange('desc',v)}
                              rows={3}
                              title='职位简介'
                              autoHeight
                />
                <Button type='primary'
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}
export default BossInfo;