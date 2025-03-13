# Etapa de construcción
FROM node:18 AS build

WORKDIR /app
RUN chmod -R 777 /app

# Copiar archivos de entorno y dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar el código fuente y construir el proyecto
COPY . .
RUN npm run build

# Etapa de producción (usando Nginx)
FROM nginx:alpine

# Copiar archivos generados por Vite (en dist/)
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
