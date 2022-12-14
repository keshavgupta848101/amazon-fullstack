import React, { useEffect, useReducer, useState } from 'react'
import data from '../data'
import { Link } from "react-router-dom";
import axios from 'axios'
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap'
import Product from '../Component/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loadding: false, error: action.payload };
        default:
            return state
    }

}

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            <Helmet>
                <title>Amazon</title>
            </Helmet>
            <div className="products">
                {loading ? (
                    <LoadingBox />
                )
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                        :
                        (
                            <Row>
                                {products.map((product) => (
                                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                        <Product product={product}></Product>
                                    </Col>
                                ))}
                            </Row>
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen