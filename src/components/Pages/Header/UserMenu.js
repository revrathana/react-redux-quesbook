import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '../../UI/Avatar/Avatar';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <ul className="nav navbar-nav navbar-right">
        <li className="schoolStyle">
          <span>Welcome, </span><span className="schoolNameStyle" >{this.props.name}</span>
        </li>
      </ul>
    </div>
  }
}

UserMenu.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string
}

UserMenu.defaultProps = {
  name: '',
  avatar: '',
}

const actions = {

}

export default connect(null, actions)(UserMenu);
