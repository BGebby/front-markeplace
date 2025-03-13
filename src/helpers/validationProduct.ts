import * as Yup from "yup";

export const validationProduct = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    sku: Yup.number().required("El SKU es obligatorio").positive().integer(),
    cantidad: Yup.number().required("La cantidad es obligatoria").min(1),
    precio: Yup.string()
    .required("El campo precio es obligatorio"),
    descripcion: Yup.string(),
    imagen: Yup.mixed()
    .nullable()
    .test("fileType", "Solo se permiten imágenes (jpg, png)", (value) => {
      if (!value) return true; // Permite que la imagen sea opcional
      return value instanceof File && ["image/jpeg", "image/png"].includes(value.type);
    }),
  });