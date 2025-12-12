export default function formatTotalPrice(items) {
  if (!items || items.length === 0) return "$0";

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return `$${total.toFixed(2)}`;
}
