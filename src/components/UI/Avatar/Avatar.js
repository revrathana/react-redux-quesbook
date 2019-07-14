import React, {Component} from 'react';

const styleMain = {
  'borderRadius': '100px',
  'width': '38px',
  'height': '38px',
  'backgroundColor': 'rgba(93, 144, 227, 1)',
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
  'height': '78px'
}

const styleNoImg = {
}

const styleWithImg = {}

class Avatar extends Component {
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
            ...styleSize,
            ...style
          }} src={user.avatar} alt={user.name.charAt(0)}/>);

        } else {
          return (
            <div style={{
            ...styleMain,
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

export default Avatar;
