// import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from './Paginate';
import ProductCarousel from '../components/ProductCarousel';
// import axios from 'axios'

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();

    // }, []);
    const {pageNumber,keyword}= useParams();
    const { data, isLoading, error } = useGetProductsQuery({pageNumber,keyword});
    return (
        <>
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            {isLoading ?<Loader />: error ? <Message variant={'danger'}>
                {error?.data?.message || error.error}
            </Message> : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {
                            data?.products?.map((product) => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Paginate pages={data?.pages} 
                    page={data?.page} 
                    keyword={keyword ? keyword : ''}
                    />
                </>
            )}

        </>
    )
}

export default HomeScreen