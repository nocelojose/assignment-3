/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
/*==================================================
src/App.js
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,      // compute from data
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
addCredit = (e) => {
  e.preventDefault();
  const description = e.target.description.value;
  const amount = Number(e.target.amount.value);
  const entry = {
    description,
    amount,
    date: new Date().toISOString().slice(0,10), 
  };
  const creditList = [entry, ...this.state.creditList];
  this.setState({
    creditList,
    accountBalance: this.calcBalance(creditList, this.state.debitList),
  });
  e.target.reset();
};

  // Balance = total credits - total debits
  calcBalance = (credits = this.state.creditList, debits = this.state.debitList) => {
    const creditTotal = credits.reduce((s, c) => s + Number(c.amount || 0), 0);
    const debitTotal  = debits.reduce((s, d) => s + Number(d.amount || 0), 0);
    return creditTotal - debitTotal;
  };

  async componentDidMount() {
    try {
      const [crRes, dbRes] = await Promise.all([
        fetch('https://johnnylaicode.github.io/api/credits.json'),
        fetch('https://johnnylaicode.github.io/api/debits.json'),
      ]);
      const [crData, dbData] = await Promise.all([crRes.json(), dbRes.json()]);

      // Normalize: { id, description, amount:Number, date:'yyyy-mm-dd' }
      const normalize = (arr) =>
        arr.map(item => ({
          id: item.id,
          description: item.description,
          amount: Number(item.amount),
          date: (item.date || new Date().toISOString()).slice(0, 10),
        }));

      const creditList = normalize(crData);
      const debitList  = normalize(dbData);

      this.setState({
        creditList,
        debitList,
        accountBalance: this.calcBalance(creditList, debitList),
      });
    } catch (err) {
      console.error('Failed to fetch data:', err);
      // leave lists empty; balance stays 0
    }
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);

    // Pass lists to pages (forms come in later branches)
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent  = () => (<Debits  debits={this.state.debitList}  />);

    return (
      <Router basename="/assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
