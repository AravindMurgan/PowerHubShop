import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Products = ({ product }) => {
    return (
        <Card>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'>

                </Card.Img>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as={'div'}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>

            <Card.Text as={'h3'}>
                {product.price}
            </Card.Text>
        </Card>

    )
}

export default Products