import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Statistics from './components/Statistics/Statistics';
import YearlyStatistics from './components/Statistics/YearlyStatistics';
import ActionList from './components/Actions/ActionList';
import CreateAction from './components/Actions/CreateAction';
import CreateMovement from './components/Actions/CreateMovement';
import Login from './components/Login/Login';
import firebase from './firebase';

class App extends Component {
    state = {
        authenticated: false,
        loading: true
    }

    componentWillMount() {
        this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false
                });
            }
        });
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }
    render() {
        return (
            <div className="app">
                { this.state.loading && <div className="loading"></div> }

                { !this.state.loading && this.state.authenticated && 
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Menu></Menu>
                            </div>
                        </div>
                        <div className="row">
                            <Switch>
                                <Route exact path="/" component={ Home }></Route>
                                <Route exact path="/yearly-stats" component={ YearlyStatistics }></Route>
                                <Route exact path="/stats" component={ Statistics }></Route>
                                <Route exact path="/actions" component={ ActionList }></Route>
                                <Route exact path="/create-action" component={ CreateAction }></Route>
                                <Route exact path="/create-movement" component={ CreateMovement }></Route>
                                <Route exact path="/login" component={ Login }></Route>
                            </Switch>
                        </div>
                    </div> 
                }
                { !this.state.loading && !this.state.authenticated && <Login></Login> }
                
            </div>
        );
    }
}

export default App;