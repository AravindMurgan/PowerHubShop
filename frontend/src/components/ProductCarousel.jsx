import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4' fluid>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <Image src={product.image} alt={product.name} fluid
             style={{ maxWidth: '80%'}}  />

                  
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Carousel.Caption className='carousel-caption' style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className='text-white text-center product-name-xs product-name-sm product-name-md product-name-lg product-name-xl'>
                    {product.name} (£{product.price})
                  </h2>
                </Carousel.Caption>
              </div>
            </div>

          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;