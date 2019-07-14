import React, { Component } from 'react';
import QbAvatar from './QbAvatar';
import QbTutorSideBar from './QbTutorSideBar';
import './QbHeader.scss';
import logo from '../assets/image/logo/dark.png';

class QbSimpleHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isShowSideBar: false,
        };
    }

    componentWillReceiveProps(newProps) {
        let currentUser = newProps.currentUser;
        this.setState({
            currentUser: currentUser,
        });
    }

    onClick_Logo(){
        window.location.href = "/";
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className="box-a-nostyle">
                <div className="navbar-ct">
                    <div className="section-ct-navbar box-flex box-font-narrow navbar-ct-center">
                        <div onClick={this.onClick_Logo.bind(this)} className="navbar-logo box-cursor">
                            <img src={logo} alt=""/>
                        </div>
                        {this.renderSign(currentUser)}
                    </div>
                </div>
                {this.renderQbSideBar(currentUser)}
            </div>
        );
    }

    onHover_Signed() {
        this.setState({isShowSideBar: true});
    }

    onClick_SignOut() {
        this.props.onClick_SignOut();
    }

    hideSideBar() {
        this.setState({isShowSideBar: false});
    }

    renderQbSideBar(currentUser) {
        if (this.state.isShowSideBar) {
            return (<QbTutorSideBar
                currentUser={currentUser}
                isShow={this.state.isShowSideBar}
                onHideSideBar={this.hideSideBar.bind(this)}
                onClick_Setting={this.props.onClick_Setting}
                onClick_SignOut={this.onClick_SignOut.bind(this)}/>);
        }
    }

    renderSign(currentUser) {
        if (currentUser) {
            let userName = currentUser.name;

            return (
                <div className='navbar-signed box-flex-center'>
                    <div className='signed-text'>
                        Welcome, {userName}!
                    </div>
                    <div className='signed-avatar' >

                    </div>
                    <div className='signed-arrowdown' onClick={this.onHover_Signed.bind(this)} onMouseOver={this.onHover_Signed.bind(this)}></div>
                </div>
            );
        } else {
            return (
                <div className='navbar-unsigned box-flex-center'>
                    <a href="/">Log in</a>
                    <a className='navbar-unsigned-signup' href="/">Sign up</a>
                </div>
            );
        }
    }
}


export default QbSimpleHeader;
