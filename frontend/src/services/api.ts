import axios from 'axios';
import { AccountCreate } from '../types/types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const createAccount = async (accountData: AccountCreate) => {
  return await axios.post(`${API_URL}/accounts/`, accountData);
};

export const getAccounts = async () => {
  return await axios.get(`${API_URL}/accounts/`);
};

export const deposit = async (accountId: number, amount: number) => {
  return await axios.post(`${API_URL}/accounts/${accountId}/deposit`, { amount });
};

export const withdraw = async (accountId: number, amount: number) => {
  return await axios.post(`${API_URL}/accounts/${accountId}/withdraw`, { amount });
};