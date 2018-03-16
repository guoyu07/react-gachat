import React from 'react'
import {Button, List, InputItem, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {register, recvMsg, monitorFriendReq} from './../redux/user.redux'
import {loginSocket} from '../redux/chat.redux'
import {Redirect, Link} from 'react-router-dom'
import Logo from '../component/logo'
import {registerApi} from "../fetch/user.api";


@connect(
    state=>state.user,
    {register, recvMsg, loginSocket, monitorFriendReq}
)
class Register extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            nickName: 'dasda',
            password: '11112',
            mobile: '212121'
        }

        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    change (key, val) {
        this.setState({
            [key]:val
        })
    }
    submit () {
        // this.props.register(this.state)
        const {mobile, password, nickName} = this.state
        registerApi({
            mobile,
            password,
            nickName
        }).then(res=> {
            console.log(res)
        })
    }
    componentWillUnmount () {
        // 处理注册成功后跳转
        if (this.props._id) {
            // 重新连接
            this.props.loginSocket()
            // 接收消息
            this.props.recvMsg()
            // 好友请求
            this.props.monitorFriendReq()
        }
    }
    render () {

        if (this.props.redirectTo && !this.props.redirectTo.includes('login')) {
            return <Redirect to={this.props.redirectTo}/>
        }
        return (
            <div>
                <Logo/>
                <WhiteSpace/>

                <List>
                    <InputItem placeholder="起一个尴尬的昵称" value={this.state.nickName} onChange={v => {this.change('nickName', v)}}>昵称</InputItem>
                    <WhiteSpace/>
                    <InputItem type="number" placeholder="请输入尬聊号" value={this.state.mobile} onChange={v => {this.change('mobile', v)}}>尬聊号</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="密码" value={this.state.password} onChange={v => {this.change('password', v)}}>密码</InputItem>
                </List>
                <WhiteSpace/>

                <WingBlank>
                    <p style={{textAlign:'right', fontSize: '16px'}}>已有账号? <Link to={'login'}>登陆</Link></p>
                </WingBlank>

                <WhiteSpace/>
                <WingBlank><Button type='primary' onClick={this.submit}>注册</Button></WingBlank>
            </div>
        )
    }
}

export default Register