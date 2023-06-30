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
            if(data.wasSuccessful === true){
                setProducts(data.products.slice(0, 3));
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
                        <Link to={`/store/post?id=${element.id}&type=product`}>
                            <img
                                className="page__filler-product-image"
                                src={`data:image/png;base64,${element.image}`}
                                alt={element.name}
                            />
                            <span className="page__filler-product-name --dark-text">{element.name}</span>
                            <p className="page__filler-product-info --grey-text">{element.description === null ? '\u00A0' : element.description}</p>
                            <span className="page__filler-product-price --dark-text">R$ {element.price.toFixed(2)}</span>
                        </Link>
                    </li>
                );
            })
        );
    }
}

export default FillerProduct;