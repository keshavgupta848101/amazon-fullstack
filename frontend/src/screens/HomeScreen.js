import React, { useEffect, useState } from 'react'
import data from '../data'
import { Link } from "react-router-dom";
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const restult = await axios.get('/api/products')
            setProducts(restult.data)
        }
        fetchData();
    }, [])
    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {products.map((product) => (
                    <div key={product.slug} className="product">
                        <Link to={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <Link to={`/product/${product.slug}`} className="product-info">
                            <p>{product.name}</p>
                        </Link>
                        <p>
                            <strong>${product.price}</strong>
                        </p>
                        <button>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeScreen