import React from "react";
import AppNavbar from "./components/layout/AppNavbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/layout/Dashboard";
import AddCourse from "./components/courses/AddCourse";
import EditCourse from "./components/courses/EditCourse";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";
import Register from "./components/auth/Register";
import AddOffer from "./components/offer/AddOffer";
import Students from "./components/students/Students";
import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from "./components/util/auth";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router basename="/cms">
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/courses" />
                </Route>
                <Route
                  exact
                  path="/courses"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/courses/add"
                  component={UserIsAuthenticated(AddCourse)}
                />
                <Route
                  exact
                  path="/courses/edit/:id"
                  component={UserIsAuthenticated(EditCourse)}
                />
                <Route
                  exact
                  path="/Students"
                  component={UserIsAuthenticated(Students)}
                />
                <Route
                  exact
                  path="/offer/add"
                  component={UserIsAuthenticated(AddOffer)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
