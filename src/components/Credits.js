/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  const { credits = [], addCredit, accountBalance = 0 } = props;

  const creditsView = () => (
    <ul>
      {credits.map((credit) => (
        <li key={credit.id ?? `${credit.description}-${credit.date}`}>
          ${Number(credit.amount).toFixed(2)} — {credit.description} — {credit.date}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1>Credits</h1>
      <p><strong>Account Balance:</strong> ${Number(accountBalance).toFixed(2)}</p>

      {creditsView()}

      <form onSubmit={addCredit} style={{ marginTop: '1rem' }}>
        <input type="text" name="description" placeholder="Description" required />
        <input type="number" name="amount" step="0.01" placeholder="Amount" required />
        <button type="submit">Add Credit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};
export default Credits;