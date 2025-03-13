import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const total = cart.items.reduce((sum, item) => sum + (item.precio ?? 0) * item.quantity, 0);
  const navigate = useNavigate();
  const handleLogout = (showSwal: boolean) => {
    if (showSwal) {
      Swal.fire({
        icon: "success",
        title: "Pago exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate("/products");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Productos en el carrito</h2>
        {cart.items.length === 0 ? (<>
          <p className="text-center text-gray-500">Tu carrito esta vacio</p>
          <button
           onClick={() => handleLogout(false)}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Regresar
        </button>
        </>
        ) : (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900"> {item.nombre}</h3>
                      <p className="mt-1 text-sm text-gray-500"> {item.precio}</p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <span className="text-gray-900 mr-4">${item.precio}</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => dispatch(updateQuantity({ id: Number(item.id), quantity: parseInt(e.target.value, 10) }))}
                        className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={() => dispatch(removeFromCart(Number(item.id)))}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-lg font-medium text-gray-900">
                <p>Total</p>
                <p>${total.toLocaleString('es-ES')}</p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleLogout(true)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;