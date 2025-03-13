
import Slider from 'react-slick';
import { Box } from '@mui/material';

const Carousel = ({ images }:any) => {
  const settings = {
    autoplay: true,          
    autoplaySpeed: 1000,      
    dots: true,               
    infinite: true,           
    speed: 300,               
    slidesToShow: 1,          
    slidesToScroll: 1,       
  };

  return (
      <Box sx={{  maxWidth: '600px', margin: 'auto' }}>
      <Slider {...settings}>
        {images && images.map((image: any, index: number) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            {image && (
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{
                  width: '100%',             
                  height: '100%',            
                  objectFit: 'cover',        // Ajuste para cubrir el área sin distorsión
                  borderRadius: '20px',      
                  display: 'block',         
                  marginLeft: 'auto',        
                  marginRight: 'auto',      
                }}
              />
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
