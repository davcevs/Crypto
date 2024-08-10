// OrderList.tsx
const OrderList = ({ orders, title, color }) => {
  return (
    <div className="order-section mb-4">
      <h3 className={`text-lg font-bold mb-2 ${color}`}>{title}</h3>
      <ul
        id={`${title.toLowerCase()}-orders`}
        className="max-h-96 overflow-hidden"
      >
        {orders.slice(0, 15).map((order, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-gray-700 py-1"
          >
            <span className={`text-${color}-500`}>{order.price}</span>
            <span>{order.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
