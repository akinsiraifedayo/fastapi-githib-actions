import React, { useState, useEffect } from 'react';
import { 
  createAccount, 
  getAccounts, 
  deposit, 
  withdraw 
} from './services/api';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    account_number: '',
    owner_name: '',
    initial_balance: 0
  });
  const [transaction, setTransaction] = useState({
    account_id: '',
    amount: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await getAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createAccount(newAccount);
      setNewAccount({
        account_number: '',
        owner_name: '',
        initial_balance: 0
      });
      fetchAccounts();
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      await deposit(transaction.account_id, parseFloat(transaction.amount));
      setTransaction({
        account_id: '',
        amount: 0
      });
      fetchAccounts();
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await withdraw(transaction.account_id, parseFloat(transaction.amount));
      setTransaction({
        account_id: '',
        amount: 0
      });
      fetchAccounts();
    } catch (error) {
      console.error('Error making withdrawal:', error);
    }
  };

  return (
    <div className="App">
      <h1>Banking App</h1>
      
      <div className="section">
        <h2>Create Account</h2>
        <form onSubmit={handleCreateAccount}>
          <input
            type="text"
            placeholder="Account Number"
            value={newAccount.account_number}
            onChange={(e) => setNewAccount({...newAccount, account_number: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={newAccount.owner_name}
            onChange={(e) => setNewAccount({...newAccount, owner_name: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Initial Balance"
            value={newAccount.initial_balance}
            onChange={(e) => setNewAccount({...newAccount, initial_balance: e.target.value})}
            step="0.01"
            min="0"
          />
          <button type="submit">Create Account</button>
        </form>
      </div>

      <div className="section">
        <h2>Transaction</h2>
        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Account ID"
            value={transaction.account_id}
            onChange={(e) => setTransaction({...transaction, account_id: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={transaction.amount}
            onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
            step="0.01"
            min="0.01"
            required
          />
          <button type="submit">Deposit</button>
          <button type="button" onClick={handleWithdraw}>Withdraw</button>
        </form>
      </div>

      <div className="section">
        <h2>Accounts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Account Number</th>
                <th>Owner Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.account_number}</td>
                  <td>{account.owner_name}</td>
                  <td>${account.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;