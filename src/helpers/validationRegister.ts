import * as Yup from "yup";
import { authAPI } from "../services/api";

export const validationRegister =  Yup.object({
      email: Yup.string()
        .email('Correo inválido')
        .required('El correo es obligatorio')
        .test('email-exists', 'Este email ya está registrado', async function (value) {
          if (!value || value.length < 5) return true;
          try {
            const response = await authAPI.checkEmail(value);
            return !response;
          } catch {
            return true;
          }
        }),
      name: Yup.string().required('El nombre es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Debes confirmar tu contraseña'),
      role: Yup.string().required('El rol es obligatorio'),
    })