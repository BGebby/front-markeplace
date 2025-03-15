import { useEffect, useState } from "react";
import { productsAPI } from "../../services/api";
import Carousel from "../Layout/Carusuel";
import { Product } from "../../types";
import Footer from "../Layout/Footer";
import { placeholderImage } from "../../helpers/image";

const Home = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  
  const productImages = products.map((product) => {
    const imageUrl = product.imagen ?  product.imagen  : placeholderImage;
    return imageUrl;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAllProducts();
        setProducts(response.product);
      } catch (error) {
        console.error("Fallo al traer productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Bienvenido a Marketplace
          </h1>
          
          <div className="max-w-md mx-auto mt-4 mb-4 sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            <Carousel images={productImages} />
          </div>

          <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Encuentre los mejores productos de nuestros proveedores de confianza
            o empiece a vender sus propios productos hoy mismo.
          </p>
          <Footer/>
        </div>
       
      </div>
    </div>
  );
};

export default Home;
