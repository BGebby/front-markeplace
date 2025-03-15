import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsAPI } from "../../services/api";
import { RootState } from "../../store";
import { Product } from "../../types";
import { addToCart } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =
          user && user.rol_id !== 3
            ? await productsAPI.getUserProducts(user.id)
            : await productsAPI.getAllProducts();
        setProducts(response.product);
        setFilteredProducts(response.product);
      } catch (error) {
        console.error("Fallo al traer productos:", error);
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase().trim();
    const numericSearch = parseFloat(search);

    const filtered = products.filter((product) => {
      const matchName =
        product.nombre?.toLowerCase().includes(lowerSearch) ?? false;
      const matchSku =
        !isNaN(numericSearch) && Number(product.sku) === numericSearch;
      const matchPrice =
        !isNaN(numericSearch) && product.precio === numericSearch;

      return matchName || matchSku || matchPrice;
    });

    setFilteredProducts(filtered);
  }, [search, products]);

  const handleAddToCart = (product: Product) => {
   
    toast("Producto agregado", {
      type: "success",
      draggable: true,
      position: "top-right",
    });
    dispatch(addToCart(product));
  };
 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center w-full gap-4">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 shadow-lg p-3 rounded-md w-full sm:w-auto">
            {user && user.rol_id !== 1
              ? "Productos"
              : "Productos de los vendedores"}
          </h2>
          <div className="flex justify-between sm:flex-row sm:items-center w-full gap-4">
            {user?.rol_id === 2 && (
              <div className="inline-flex items-center px-6 py-3 border rounded-md shadow-md focus:outline-none focus:ring-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 w-[200px] h-[50px]">
                <Link
                  to="/products/new"
                  role="menuitem"
                  className="w-full h-full flex items-center justify-center"
                >
                  Nuevo producto
                </Link>
              </div>
            )}
            <div className="flex justify-end w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-[700px] lg:max-w-[900px] px-6 py-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {product.nombre}
              </h3>

              <div className="mt-4 flex flex-col items-start">
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt="Imagen del producto"
                    className="w-full h-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px]"
                  />
                )}

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {product.descripcion}
                </p>
              </div>
              <div className="mt-4 flex flex-col items-start">
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  sku: {product.sku}
                </p>
                {product.user && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    Vendedor:{" "}
                    <span className="font-medium">{product.user}</span>
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-col items-start">
                <p className="text-lg sm:text-xl font-bold text-indigo-600">
                  ${product.precio}
                </p>
                {user && user.rol_id !== 1 && user.rol_id !== 2 && (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <>
            <div>
              <p className="text-center text-gray-500 mt-8">
                Producto no encontrado.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
