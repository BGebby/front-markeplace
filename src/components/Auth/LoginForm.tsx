import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { setCredentials } from "../../store/slices/authSlice";
import { validationLogin } from "../../helpers/validationLogin";
import { useEffect, useRef } from "react";

const LoginForm = ({switchAuthModal,onClose,}: {
  switchAuthModal: (type: "login" | "register" | null) => void;
  onClose: () => void;
  }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus(); 
    }
  
    return () => {
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && typeof activeElement.blur === "function") {
        activeElement.blur(); 
      }
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLogin,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await authAPI.login(values.email, values.password);
        dispatch(setCredentials(data));
        onClose();
        navigate("/products");
      } catch (error) {
        setErrors({
          password: "Error al iniciar sesión. Verifica tus credenciales.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
   // useEffect(() => {
  //   console.log("Formik errors:", formik.errors);
  // }, [formik.errors]);

  return (
    <div ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
      <div className="h-auto flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Inicie sesión
          </h2>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className={`mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className={`mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? "Ingresando..." : "Login"}
            </button>

            {/* Link de Registro */}
            <div className="text-center text-sm">
              No tienes una cuenta?
              <button
                onClick={() => {
                  onClose(); 
                  switchAuthModal("register");
                }} 
                className="text-indigo-600 hover:underline ml-2"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
