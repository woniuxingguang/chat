import React from 'react';
import Logo from '../../component/logo';
import { List, InputItem, Radio, Button } from "antd-mobile";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from "../../redux/user.redux";
import imoocForm from '../../component/imooc-form';

const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props) {
        super(props);
        // this.state={
        //     user:'',
        //     pwd:'',
        //     repeatPwd:'',
        //     type:'genius'
        // };
        this.handleRegister = this.handleRegister.bind(this);
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    componentDidMount() {
        this.props.handleChange('type','genius')
    }

    handleRegister(){
        this.props.register(this.props.state)
        console.log(this.props.state)
    }
    render(){
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <List>
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('repeatPwd',v)}
                    >确认密码</InputItem>
                    <RadioItem checked={this.props.state.type === 'genius'}
                               onClick={()=>this.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.props.state.type === 'boss'}
                               onClick={()=>this.props.handleChange('type','boss')}
                    >
                        Boss
                    </RadioItem>
                    <Button type="primary"
                            onClick={this.handleRegister}
                    >注册</Button>
                </List>
            </div>
        )
    }
}

export default Register;