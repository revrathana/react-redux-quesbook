import React, {Component} from 'react';
import './QbButton.css';

class QbButton extends Component {
    constructor(props) {
        super(props);
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.state = {
            className : props.className?props.className.trim().split(/ +/):[],
        };
    }
    addClass(name) {
        let classNow = this.state.className;
        classNow.push(name);
        this.setState({
            className: classNow
        });
    }
    removeClass(name) {
        let classNow = this.state.className;
        let index =this.state.className.indexOf(name);
        classNow.splice(index,1);
        this.setState({
            className: classNow
        });
    }
    mouseOverHandler() {
        this.addClass('hover');
    }
    mouseOutHandler() {
        this.removeClass('hover');
    }
    mouseUpHandler() {
        this.removeClass('click');
    }
    mouseDownHandler() {
        this.addClass('click');
    }
    iconClick(e) {
        const {iconClick} = this.props;
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return iconClick(e);
    }
    render() {
        const {label, clickHandler, style, fontStyle, dataTarget, dataToggle, id, children, disabled, isSubmit} = this.props;
        let className = '';
        this.state.className.forEach((name)=> {
            className = className +' ' + name;
        });
        let icon = null;
        if(children) {
            icon = (
                <div style={{width: 12, height: 12, marginLeft: 10}} onClick={(e)=> this.iconClick(e)}>
                    {children}
                </div>
            )
        }
        if (disabled) {
            className = className +' disabled';
        }
        return (
            <button onMouseOver={this.mouseOverHandler}
                    onMouseOut={this.mouseOutHandler}
                    onMouseDown={this.mouseDownHandler}
                    onMouseUp={this.mouseUpHandler}
                    onClick={clickHandler?(e)=> clickHandler(e):()=>{}}
                    className={className}
                    id={id?id:null}
                    disabled={disabled}
                    type={isSubmit?'submit': 'button'}
                    style={{...style}}
                    data-target={dataTarget?dataTarget:''}
                    data-toggle={dataToggle?dataToggle:''}>
                <div style={{...privateStyle.content, ...fontStyle}}>
                    {label}
                </div>
                {icon}
            </button>
        );
    }
}

const privateStyle = {
    frame: {
        borderRadius: '100rem',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Gotham Narrow A, Gotham Narrow B',
    },
    content: {
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flex: 1,
        fontFamily: 'Gotham Narrow A, Gotham Narrow B',
    }
};

export default QbButton;
