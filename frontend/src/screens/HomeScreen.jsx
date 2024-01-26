// import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
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
    const { data: products, isLoading, isError } = useGetProductsQuery();
    return (
        <>
            {isLoading ? <h1>Loading...</h1> : isError ? <h1>Error</h1> : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {
                            products.map((product) => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </>
            )}

        </>
    )
}

export default HomeScreen