import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { validationRegister } from '../../helpers/validationRegister';
import Swal from 'sweetalert2';

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      role: 0,
    },
    validationSchema: validationRegister,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        await authAPI.register(values.email, values.name,  values.password, Number(values.role));
        Swal.fire({
          icon: "success",
          title: "Registro completado",
          showConfirmButton: false,
          timer: 1500
        });
        onClose();
        navigate('/login');
      } catch (error) {
        setServerError('No se pudo registrar el usuario. Intente nuevamente.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-auto flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">Registro</h2>
        
        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <select
              id="role"
              {...formik.getFieldProps('role')}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                ${formik.touched.role && formik.errors.role ? 'border-red-500' : ''}`}
            >
              <option value="">Seleccione un rol</option>
              <option value="2">Vendedor</option>
              <option value="3">Cliente</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.role}</p>
            )}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {formik.isSubmitting ? 'Registrando...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
