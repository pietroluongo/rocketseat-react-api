import React, { Component } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css'

export default class Main extends Component {
    
    state = {
        products: [],
        productInfo: {},
        curPage: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    render() {
        const { products, curPage, productInfo } = this.state;
        return(
            <div className="product-list">
                {products.map(pr => (
                    <article key={pr._id}>
                        <strong>{pr.title}</strong>
                        <p>{pr.description}</p>
                        <Link to={`/products/${pr._id}`}>Acessar</Link>
                    </article>
            ))}
            <div className="actions">
                <button disabled={curPage===1} onClick={this.prevPage}>Anterior</button>
                <button disabled={curPage===productInfo.pages} onClick={this.nextPage}>Próximo</button>
            </div>
            </div>
   
        )
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;

        this.setState({products: docs, productInfo, curPage: page});
    }

    prevPage = () => {
        const { curPage } = this.state;
        if(curPage === 1) {
            return;
        }
        const pageNumberTgt = curPage - 1;
        this.loadProducts(pageNumberTgt);
    }

    nextPage = () => {
        const { curPage, productInfo } = this.state;
        if(curPage === productInfo.pages) {
            return;
        }

        const pageNumberTgt = curPage + 1;
        this.loadProducts(pageNumberTgt);
    }

}