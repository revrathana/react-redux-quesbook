import React, {Component} from 'react';
import './QbHeader.scss';
import logo from '../assets/image/logo/dark.png';
import eClassIcon from '../assets/image/icon/eclass-handraising.png';
import QbSideBar from './QbSideBar';
import {Link} from 'react-router';
import QbMessageCard from '../QbMessageCard';
import QbAvatar from './QbAvatar';
import IdleTimer from 'react-idle-timer'


class QbHeader extends Component {
    constructor() {
        super();
        this.idleTimer = null
        this.onUnload = this.onUnload.bind(this); 

        this.state = {
            activeClass: '',
            currentUser: null,
            linkItems: [],
            isShowSideBar: false,
            showMessageCard: false,
            messageTitle: '',
            messageContent: '',
            timeOnPlatform:0,
        };
    }

    componentWillMount() {
        const {client, messageId} = this.props;
        if (messageId !== null && messageId !== undefined) {
            // query message content
            client.query({query: gql `
              query {

              }
            `, fetchPolicy: 'network-only'}).then((res) => {
                this.setState((prevState, props) => ({
                    showMessageCard: !prevState.showMessageCard,
                    currentUser: props.currentUser,
                    linkItems: props.navItemList
                }), () => this.resetNavLinkItem_Active(window.location.hash));
            }).catch((e) => {
                console.info(e);
            });
        } else {
            this.setState({
                currentUser: this.props.currentUser,
                linkItems: this.props.navItemList
            }, () => this.resetNavLinkItem_Active(window.location.hash));
        }
    }

    componentWillReceiveProps(newProps) {
        let currentUser = newProps.currentUser;
        this.setState({
            currentUser: currentUser,
            linkItems: newProps.navItemList
        }, () => this.resetNavLinkItem_Active(window.location.hash));
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
        // window.addEventListener('scroll', (event) => {
        //     var doc = document.documentElement;
        //     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        //     let classScroll = '';
        //     if (top > 50) {
        //         classScroll = 'navbar-scroll-over';
        //     } else {
        //         classScroll = '';
        //     }
        //
        //     this.setState({activeClass: classScroll});
        // });
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }


    onUnload(event) {
        let timeOnPlatform =  this.idleTimer ?  Math.ceil(this.idleTimer.getElapsedTime()/1000) : 0;
        this.sendTimeOnPlatform(timeOnPlatform)
    }


    onClick_NavLinkItem(item, e) {
        if (item && item.isRedirect) {
            e.preventDefault();
            window.location.href = window.location.origin + item.href;
        }

        this.resetNavLinkItem_Active(e.target.hash);
    }

    resetNavLinkItem_Active(hashName) {
        // console.log('resetNavLinkItem_Active', hashName);
        hashName = this.resetHashName(hashName);

        this.setState({isShowSideBar: false});
        let linkItems = this.state.linkItems;

        if (linkItems.length && linkItems.length > 0) {
            linkItems.map((item, index) => {
                item.isActive = hashName.indexOf(item.href) !== -1;
            });

            this.setState({linkItems: linkItems});
        }
    }

    resetHashName(hashName){
        let ret = hashName;

        if (ret === '#/') {
            ret = '#/getStart';
        } else if (ret.indexOf('#/diagnostic') === 0 ||
            ret.indexOf('#/myClasses') === 0
        ) {
            ret = '#/studyPlan';
        }

        ret = ret.replace('#', '')

        return ret;
    }

    onHover_Signed() {
        this.setState({isShowSideBar: true});
    }

    onClick_SignOut() {
        let timeOnPlatform =   this.idleTimer ?  Math.ceil(this.idleTimer.getElapsedTime()/1000) : 0;
        this.sendTimeOnPlatform(timeOnPlatform)
        this.props.onClick_SignOut();
    }

    sendTimeOnPlatform(time) {
        this.props.sendTimeOnPlatform(time);
    }

    hideSideBar() {
        this.setState({isShowSideBar: false});
    }

    renderLinkItems(currentUser) {
        let ret = [];
        let linkItemsFiltered = [];

        this.state.linkItems.map((item, index) => {
            if (!(currentUser.one_of_section_part1_finished && item.href === '/getStart')) {
                linkItemsFiltered.push(item);
            }
        });

        linkItemsFiltered = linkItemsFiltered.filter(item=>item.userType.indexOf(currentUser.type)!==-1);

        ret = linkItemsFiltered.map((item, index) => {
            if (currentUser.type === 'Tutor' && item.href === '/eclass') {
                item.label = 'E-classes';
            }
            return (item.isRedirect
                ? this.renderExternalLink(item, index)
                : this.renderInnerLink(item, index));
        });

        return (
            <ul className="navbar-ct-center">
                {ret}
            </ul>
        );
    }

    renderSignedLink(currentUser) {
        if (currentUser && this.state.linkItems) {
            return (
                <div className='section-ct-link box-cursor'>
                    {this.renderLinkItems(currentUser)}
                </div>
            );
        }
    }

    renderInnerLink(item, index) {
        if (item.href === '/eclass' && item.label.toUpperCase() === 'LIVE E-CLASSES') {
            return (
                <li key={index} className={item.isActive
                    ? 'box-font-narrow active'
                    : 'box-font-narrow'}>
                    {this.renderEClassHand(item)}
                </li>
            );
        } else {
            return (
                <li key={index} className={item.isActive
                    ? 'box-font-narrow active'
                    : 'box-font-narrow'}>
                    <Link to={item.href} onClick={this.onClick_NavLinkItem.bind(this, item)}>
                        {item.label}
                    </Link>
                </li>
            );
        }
        //
        // return (
        //     <li key={index} className={item.isActive
        //         ? 'box-font-narrow active'
        //         : 'box-font-narrow'}>
        //         <Link to={item.href} onClick={this.onClick_NavLinkItem.bind(this, item)}>
        //             {item.label}
        //         </Link>
        //     </li>
        // );
    }

    renderEClassHand(item){
        return (
            <div className='eclass-hand-ct'>
                <img src={eClassIcon} alt=""/>
                <Link to={item.href} onClick={this.onClick_NavLinkItem.bind(this, item)}>
                    {item.label}
                </Link>
            </div>
        );
    }

    renderComingSoon(item){
        let style = {
            backgroundColor: '#faee67',
            borderRadius: '8px',
            color: '#192230',
            fontSize: '12px',
            marginLeft: '7px',
            padding: '3px 8px',
            fontWeight: 'bold',
        };

        return (
            <div style={{
                cursor: 'default',
                minWidth: '175px'
            }}>
                <span style={{
                    color: '#fff',
                    opacity: 0.5,
                    fontWeight: 'bold'
                }}>{item.label}</span>
                <span style={style}>Coming soon!</span>
            </div>
        );
    }

    renderExternalLink(item, index) {
        return (
            <li key={index} className={item.isActive
                ? 'box-font-narrow active'
                : 'box-font-narrow'}>
                <a href='/eclass' onClick={this.onClick_NavLinkItem.bind(this, item)}>
                    {item.label}
                </a>
            </li>
        );
    }

    messageToggle() {
        const {client} = this.props;
        // update message read record while close message card

        // client.query({query: gql `
        //   query {
        //
        //   }
        // `, fetchPolicy: 'network-only'}).then((res) => {
        this.setState((prevState, props) => ({
            showMessageCard: !prevState.showMessageCard
        }));
        // }).catch((e) => {
        //     console.info(e);
        // });
    }

    onClick_Logo() {
        window.location.href = "/";
    }

    renderSign(currentUser) {
        if (currentUser) {
            let userName = currentUser.name;

            return (
                <div className='navbar-signed box-flex-center'>
                    <IdleTimer
                      ref={ref => { this.idleTimer = ref }}
                      element={document}
                      stopOnIdle={true}
                      debounce={250}
                      timeout={1000 * 60 * 30} />

                    <div className='signed-text'>
                        Welcome, {userName}!
                    </div>
                    <div className='signed-avatar' onClick={this.onHover_Signed.bind(this)} onMouseOver={this.onHover_Signed.bind(this)}>
                        <QbAvatar user={currentUser}></QbAvatar>
                    </div>
                    <div className='signed-arrowdown'  onClick={this.onHover_Signed.bind(this)} onMouseOver={this.onHover_Signed.bind(this)}></div>
                </div>
            );
        } else {
            return (
                <div className='navbar-unsigned box-flex-center'>
                    <a href="/users/sign_in">Log in</a>
                    <a className='navbar-unsigned-signup' href="/users/sign_up">Sign up</a>
                </div>
            );
        }
    }

    renderTargetExam(currentUser) {
        if (this.props.currentTest ) {
            return this.props.currentTest;
        } else if (currentUser && currentUser.current_test) {
            return currentUser.current_test;            
        } else  if (currentUser && currentUser.exam_type_names.length > 0) {
            return currentUser.exam_type_names[0];
        } else {
            return null;
        }
    }

    renderQbSideBar(currentUser) {
        if (this.state.isShowSideBar) {
            return (
                <QbSideBar
                    currentUser={currentUser}
                    isShow={this.state.isShowSideBar}
                    onHideSideBar={this.hideSideBar.bind(this)}
                    onClick_MyClass={this.props.onClick_MyClass}
                    onClick_Setting={this.props.onClick_Setting}
                    onClick_SignOut={this.onClick_SignOut.bind(this)}
                    updateUser={this.props.updateUser}
                    />);
        }
    }

    render() {
        let currentUser = this.state.currentUser;
        return (
            <div className="box-a-nostyle">
                <div className="navbar-ct">
                    <div className='section-ct-navbar box-flex box-font-narrow navbar-ct-center'>
                        <div onClick={this.onClick_Logo.bind(this)} className="navbar-logo box-cursor">
                            <img src={logo} alt=""/>
                            <span>{this.renderTargetExam(currentUser)}</span>
                        </div>
                        {this.renderSign(currentUser)}
                    </div>
                    {this.renderSignedLink(currentUser)}
                    <QbMessageCard option={{display: this.state.showMessageCard}}
                                   title={this.state.messageTitle} content={this.state.messageContent}
                                   onCancelClick={this.messageToggle.bind(this)}/>
                </div>
                {this.renderQbSideBar(currentUser)}
            </div>
        );
    }
}

export default QbHeader;
