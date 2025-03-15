import { useFormik } from "formik";
import { productsAPI } from "../../services/api";
import { validationProduct } from "../../helpers/validationProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios, { AxiosError } from "axios"; 

const ProductForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      sku: "",
      descripcion: "",
      imagen: "",
      cantidad: "",
      precio: "",
    },
    validationSchema: validationProduct,
    onSubmit: async (values, { resetForm }) => {
      
      try {
        if (user) {
          const formData = new FormData();
          formData.append("nombre", values.nombre);
          formData.append("sku", values.sku.toString());
          formData.append("cantidad", values.cantidad.toString());
          formData.append("precio", values.precio.toString());
          formData.append("descripcion", values.descripcion);
          formData.append("user_id", user.id.toString());

          if (values.imagen) {
            formData.append("imagen", values.imagen);
          }

          await productsAPI.register(formData);
          resetForm();
          Swal.fire({
            icon: "success",
            title: "Registro completado",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/products");
        }
      } catch (error: unknown) {
        let errorMessage = "No se pudo registrar el producto. Intente nuevamente.";

        if (axios.isAxiosError(error)) {
          
          errorMessage = error.response?.data?.message || errorMessage;
        }
        setServerError(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
          Registrar producto
        </h2>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-6">
        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                nombre
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md bg-gray-50  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...formik.getFieldProps("nombre")}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <p className="text-red-500 text-xs">{formik.errors.nombre}</p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SKU
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...formik.getFieldProps("sku")}
              />
              {formik.touched.sku && formik.errors.sku && (
                <p className="text-red-500 text-xs">{formik.errors.sku}</p>
              )}
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...formik.getFieldProps("cantidad")}
              />
              {formik.touched.cantidad && formik.errors.cantidad && (
                <p className="text-red-500 text-xs">{formik.errors.cantidad}</p>
              )}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="text"
                name="precio"
                value={
                  formik.values.precio
                    ? formik.values.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : ""
                }
                onChange={(e) => {
                  let rawValue = e.target.value.replace(/\./g, "");
                  formik.setFieldValue("precio", rawValue);
                }}
                onBlur={() => {
                  let formattedValue = formik.values.precio.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  );
                  formik.setFieldValue("precio", formattedValue);
                }}
                className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {formik.touched.precio && formik.errors.precio && (
                <p className="text-red-500 text-xs">{formik.errors.precio}</p>
              )}
            </div>

            {/* Descripción (Opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...formik.getFieldProps("descripcion")}
              />
            </div>

            {/* Imagen (Opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen
              </label>
              <input
                type="file"
                className="mt-1 block w-full rounded-md  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  formik.setFieldValue("imagen", file);
                }}
              />
              {formik.errors.imagen && (
                <p className="text-red-500">{formik.errors.imagen}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
