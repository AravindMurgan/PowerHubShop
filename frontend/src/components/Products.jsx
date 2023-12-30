import React from 'react'
import { Card } from 'react-bootstrap'

const Products = ({ product }) => {
    return (
        <Card>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'>

                </Card.Img>
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as={'div'}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            </Card.Body>

            <Card.Text as={'h3'}>
                {product.price}
            </Card.Text>
        </Card>

    )
}

export default Products