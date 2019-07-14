import React, {Component} from 'react';

// props:  user, size
// Example
// <QbImgSection sectionType="Math" style={{'borderColor': '#b9cff3', 'color': '#b9cff3', 'fontSize': '40px'}}></QbImgSection>
class QbAvatar extends Component {
    render() {
        let {user, size, style} = this.props;
        let renderMain = this.renderMain(user, size, style);
        return (
            <div>
                {renderMain}
            </div>
        );
    }

    renderMain(user, size, style) {
        if (user && user.name) {
            let styleSize = size === 'big'
                ? styleSizeBig
                : {};

            if (user.avatar && user.avatar !== '') {
                return (<img style={{
                    ...styleMain,
                    ...styleWithImg,
                    ...styleSize,
                    ...style
                }} src={user.avatar} alt={user.name.charAt(0)}/>);
                // if (size === 'big') {
                //     return (<img style={{
                //         ...styleMain,
                //         ...styleWithImg,
                //         ...styleSize,
                //         ...style
                //     }} src={user.avatar} alt={user.name.charAt(0)}/>);
                // } else {
                //     let styleBGUrl = {
                //         'background': `url(${user.avatar}) no-repeat center`
                //     };
                //
                //     return (
                //         <div style={{...styleBGUrl, ...styleAvatarNav}}></div>
                //     )
                // }
            } else {
                return (
                    <div style={{
                        ...styleMain,
                        ...styleNoImg,
                        ...styleSize,
                        ...style
                    }}>
                        {user.name.charAt(0)}
                    </div>
                )
            }
        }
    }
}

export default QbAvatar;

const styleMain = {
    'borderRadius': '100px',
    'width': '38px',
    'height': '38px',
    'backgroundColor': '#192230',
    'display': 'block',
    'textAlign': 'center',
    'color': '#fff',
}

const styleAvatarNav = {
    'borderRadius': '100px',
    'width': '38px',
    'height': '38px',
    'backgroundSize': '38px',
}

const styleSizeBig = {
    'fontSize': '44.8px',
    'lineHeight': '78px',
    'width': '78px',
    'height': '78px',
    'boxShadow': '0 1px 15px 0 rgba(25, 34, 48, 0.27)'
}

const styleNoImg = {
}

const styleWithImg = {}
