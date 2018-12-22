import React from 'react';
import Logo from '../../component/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import {Redirect} from "react-router-dom";
import imoocForm from '../../component/imooc-form';

@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     user:'',
        //     pwd:''
        // };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        console.log(this.props.state)
        this.props.login(this.props.state)
    }
    register(){
        console.log(this.props.history);
        this.props.history.push('/register');
    }
    render(){
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;