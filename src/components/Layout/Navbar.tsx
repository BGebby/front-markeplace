import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [authModalType, setAuthModalType] = useState<"login" | "register" | null>(null);

  const handleCloseAuthModal = () => {
    setAuthModalType(null);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                Marketplace
              </span>
            </Link>
            {user && (
              <>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/products"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    <span className="text-l font-medium rounded-md text-indigo-500  hover:text-indigo-800 hover:shadow-xl">
                      Productos
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                {user.rol_id === 3 && (
                  <Link to="/cart" className="relative p-2">
                    <span className="sr-only">Cart</span>
                    <svg
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cart.items.length > 0 && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                        {cart.items.length}
                      </span>
                    )}
                  </Link>
                )}
                <div className="ml-4 relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-sm focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block text-gray-700">
                      {user.email}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Perfil
                        </Link>
                        {user.rol_id === 2 && (
                          <Link
                            to="/products/new"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Nuevo producto
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Cerrar sesion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalType("login")}
                  className="w-full mr-2 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-2 md:text-lg md:px-4"

                >
                  Acceder
                </button>
                <button
                  onClick={() => setAuthModalType("register")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-2 md:text-lg md:px-4"
                  
                >
                  Registrarse
                </button>

                <AuthModal
                  type="login"
                  open={authModalType === "login"}
                  onClose={handleCloseAuthModal}
                  switchAuthModal={setAuthModalType}
                />
                <AuthModal
                  type="register"
                  open={authModalType === "register"}
                  onClose={handleCloseAuthModal}
                  switchAuthModal={setAuthModalType}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
