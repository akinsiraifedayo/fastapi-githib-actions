import React from 'react';
import { Account } from '../types/types';

interface AccountListProps {
  accounts: Account[];
  loading: boolean;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, loading }) => {
  if (loading) return <div>Loading accounts...</div>;

  return (
    <table className="account-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Account Number</th>
          <th>Owner</th>
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
  );
};

export default AccountList;