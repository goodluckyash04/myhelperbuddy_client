import TransactionData from './TransactionData';

export default function index({ current_month }) {
  return <TransactionData current_month={current_month} />;
}
