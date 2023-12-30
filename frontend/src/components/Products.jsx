import React from 'react'
import { Card } from 'react-bootstrap'

const Products = ({ product }) => {
    return (
        <Card>
            <a href={`/product/${product.id}`}>
                <Card.Img src={product.image} variant='top'>

                </Card.Img>
            </a>

            <Card.Body>
                <a href={`/product/${product.id}`}>
                    <Card.Title as={'div'}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            </Card.Body>
        </Card>
    )
}

export default Products