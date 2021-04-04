import React from 'react';
import { logout } from './actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

export default function(ComposedClass){

    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          warningTime: 1100000,
          signoutTime: 1200000
        };
      }

      componentDidMount() {
        this.setTimeout();
      }

      clearTimeoutFunc = () => {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
      };

      setTimeout = () => {
        this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
        this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
      };

      resetTimeout = () => {
        this.clearTimeoutFunc();
        this.setTimeout();
      };

      warn = () => {
        if(this.props.userInfo){
            alert('Session Timeout. Your session is about to expire in 1 mintue');
        }
      };

      logout = () => {
          console.log(this.props.userInfo);
          if(this.props.userInfo){
            this.props.logout();
            <Redirect to='/signin' />
          }
      };

      render() {

        return (
          <div>
            <ComposedClass {...this.props} />
          </div>
        );

      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(Component)
}


const mapStateToProps = state => {
    return {
        userInfo: state.userSignin.userInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};