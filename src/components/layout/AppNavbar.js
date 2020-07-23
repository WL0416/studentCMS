import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchBox from "./SearchBox";

class AppNavBar extends Component {
  state = {
    isAuthenticated: false,
    searchWith: "sid",
    showSearchBox: false,
    searchContent: "",
    searchResults: "",
  };

  // this is the new way the update the state from the props,
  // recommended to use this instead of componentWillReceiveProps
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  setSearchShow = () => {
    const { searchContent } = this.state;
    const { firestore } = this.props;
    if (searchContent != null) {
      this.setState({
        showSearchBox: !this.state.showSearchBox,
      });
    } else {
      alert("Please type in sid or name in the search bar");
    }
  };

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      isAuthenticated,
      searchWith,
      showSearchBox,
      searchResults,
    } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Student CMS
          </Link>

          <div className="collapse navbar-collapse" id="navbarMain">
            {isAuthenticated ? (
              <>
                <form className="form-inline ml-auto">
                  <div className="input-group">
                    <select
                      className="form-control w-auto"
                      onChange={this.onChange}
                      name="searchWith"
                    >
                      <option value="sid">SID</option>
                      <option value="name">Name</option>
                    </select>
                    <input
                      type="search"
                      className="form-control mr-sm-2 w-auto"
                      name="searchContent"
                      aria-label="Search"
                      onChange={this.onChange}
                      value={this.state.searchContent}
                    />
                  </div>
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                    onClick={this.setSearchShow}
                  >
                    Search
                  </button>
                </form>
                <SearchBox
                  showSearchBox={showSearchBox}
                  setSearchShow={this.setSearchShow}
                  searchWith={searchWith}
                  searchResults={searchResults}
                />
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#!" className="nav-link">
                      {auth.email}
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      Settings
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="nav-link"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </>
            ) : null}
            {allowRegistration && !isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(),
  connect((state) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }))
)(AppNavBar);
