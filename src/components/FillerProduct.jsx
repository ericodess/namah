import React, {
    useState,
    useEffect
} from 'react';
import {Link} from 'react-router-dom';

//Components
import {Loader} from './index';

//Services
import {fetchFromBackEnd} from '../services';

const FillerProduct = (props) => {
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('products', `limit=${props.productCount}`, {method: 'GET'})
        .then(data => {
            if(data.success === true){
                setProducts(data.products);
                setIsLoading(false);
            }
        })
    },[props.productCount]);

    if(isLoading === true){
        return <Loader isLoading={true} />
    }else{
        return(
            products.map((element,index) => {
                return(
                    <li 
                        key={index}
                        className="page__filler-product --centralized-text"
                    >
                        <Link to={`/store/post?id=${element.productId}&type=product`}>
                            <img
                                className="page__filler-product-image"
                                src={`${process.env.REACT_APP_BLOB_HOST}/jpeg/product/bg-${element.productId}.jpg`}
                                alt={element.productName}
                            />
                            <span className="page__filler-product-name --dark-text">{element.productName}</span>
                            <p className="page__filler-product-info --grey-text">{element.productDescription === null ? '\u00A0' : element.productDescription}</p>
                            <span className="page__filler-product-price --dark-text">R$ {element.productPrice.toFixed(2)}</span>
                        </Link>
                    </li>
                );
            })
        );
    }
}

export default FillerProduct;