import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`} style={{display:'flex',justifyContent:'center'}}>
                <Card.Img src={product.image} style={{  width: '175px',height: '175px',objectFit: 'contain' }} 
                 variant='top'>

                </Card.Img>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as={'div'} className='product-title'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>

            <Card.Text as={'div'}>
                <Rating value={product.rating}
                    text={`${product.numReviews} reviews`}
                />
            </Card.Text>

            <Card.Text as={'h3'}>
            £{product.price}
            </Card.Text>
        </Card>

    )
}

export default Product