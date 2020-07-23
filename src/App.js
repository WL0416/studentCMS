import React from "react";
import AppNavbar from "./components/layout/AppNavbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/layout/Dashboard";
import AddCourse from "./components/courses/AddCourse";
import Calendar from "./components/courses/Calendar";
import EditCourse from "./components/courses/EditCourse";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";
import Register from "./components/auth/Register";
import AddStudent from "./components/students/AddStudent";
import EditStudent from "./components/students/EditStudent";
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
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router basename="/cms">
          <div className="App">
            <AppNavbar />
            <Container>
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
                  path="/courses/edit/:cid"
                  component={UserIsAuthenticated(EditCourse)}
                />
                <Route
                  exact
                  path="/courses/:cid/calendar"
                  component={UserIsAuthenticated(Calendar)}
                />
                <Route
                  exact
                  path="/courses/:cid/calendar/:pid/students"
                  component={UserIsAuthenticated(Students)}
                />
                <Route
                  exact
                  path="/courses/:cid/calendar/:pid/newstudent"
                  component={UserIsAuthenticated(AddStudent)}
                />
                <Route
                  exact
                  path="/courses/:cid/calendar/:pid/students/:sid"
                  component={UserIsAuthenticated(EditStudent)}
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
            </Container>
            <Footer />
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
