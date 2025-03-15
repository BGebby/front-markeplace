Marketplace UI 

Descripción

Este proyecto implementa una UI para un Marketplace que permite a vendedores registrar productos, a compradores buscar y agregar productos a su carrito y a administradores gestionar los productos disponibles en la plataforma.

Tecnologías Utilizadas

Frontend: React con Vite, TailwindCSS


Base de datos: Mysql

Autenticación: JSON Web Tokens (JWT)

Contenedores: Docker y Docker Compose

Instalación y Configuración

Requisitos previos

Docker y Docker Compose instalados

Instalación

Clonar el repositorio:

git clone https://github.com/tu_usuario/marketplace.git
cd marketplace

Configurar las variables de entorno en un archivo .env 

Ejecución del Proyecto con Docker

Para iniciar el proyecto con Docker Compose:

docker-compose up -d

Esto iniciará los contenedores del backend, frontend y base de datos.

Si deseas detener los contenedores:

docker-compose down

Funcionalidades

Vendedores

Crear cuenta con email y contraseña

Registrar productos con nombre, SKU, cantidad y precio

Ver la lista de productos registrados

Compradores

Buscar productos por nombre, SKU y rango de precios

Agregar productos al carrito de compras

Administradores

email:admin@admin.com 
contraseña:admin123

Ver todos los productos registrados

Filtrar productos por vendedor


