/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {
  render() {
    const display = Number(this.props.accountBalance).toFixed(2);
    return (
      <div>
        <strong>Balance:</strong> ${display}
      </div>
    );
  }
}

export default AccountBalance;