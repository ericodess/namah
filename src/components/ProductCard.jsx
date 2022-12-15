import React, {
    useState,
    useEffect
} from 'react';
import {Link} from 'react-router-dom';

//Components
import {
    Loader,
    LikeButton
} from './index';

//Services
import {fetchFromBackEnd} from '../services';

const ProductCard = (props) => {
    const [product,setProduct] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('products', `id=${props.productID}`, {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful === true){
                setProduct(data.products[0]);
                setIsLoading(false);
            }
        })
    },[props.productID]);

    if(isLoading === true){
        return (
            <Loader isLoading={true} />
        );
    }else{
        return(
            <div className="card__product">
                <div 
                    className="card__product-banner"
                    style={{backgroundImage: `url(data:image/png;base64,${product.productImage})`}}
                >
                    <LikeButton 
                        toBeLiked={product.productId}
                        itemType="product"
                    />
                </div>
                <Link
                    to={`/store/post?id=${product.productId}&type=product`}
                    className="card__product-info"
                >
                    <span className="card__product-title --dark-text">{product.productName}</span>
                    <span className="card__product-description --grey-text">{product.productDescription === '' ? '\u00A0' : product.productDescription}</span>
                    <span className="card__product-price --medium-grey-text">R$ {product.productPrice.toFixed(2)}</span>
                </Link>
            </div>
        );
    }
}

export default ProductCard;