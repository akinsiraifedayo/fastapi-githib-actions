export interface Account {
  id: number;
  account_number: string;
  owner_name: string;
  balance: number;
}

export interface Transaction {
  amount: number;
  description?: string;
}

export interface AccountCreate {
  account_number: string;
  owner_name: string;
  initial_balance: number;
}