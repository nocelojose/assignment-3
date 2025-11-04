/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
  const { debits = [], addDebit, accountBalance = 0 } = props;

  const debitsView = () => (
    <ul>
      {debits.map((debit) => (
        <li key={debit.id ?? `${debit.description}-${debit.date}`}>
          ${Number(debit.amount).toFixed(2)} — {debit.description} — {debit.date}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1>Debits</h1>
      <p><strong>Account Balance:</strong> ${Number(accountBalance).toFixed(2)}</p>

      {debitsView()}

      <form onSubmit={addDebit} style={{marginTop: '1rem'}}>
        <input type="text" name="description" placeholder="Description" required />
        <input type="number" name="amount" step="0.01" placeholder="Amount" required />
        <button type="submit">Add Debit</button>
      </form>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;