import React from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';

//Components
import {
    Post,
    Page
} from '../components';

//Actions
import {
    insertToCart,
    removeFromCart
} from '../actions';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);

    if(Object.keys(cartItems).length === 0 && cartItems.constructor === Object){
        return(
            <Page pageTitle="Cart">
                <Post>
                   <span className="page__feedback">Your cart is empty</span>
                </Post>
            </Page>
        );
    }else{
        let cartItemsArray = [];

        for(let key of Object.keys(cartItems)){
            cartItemsArray.push({
                product: cartItems[key].product,
                productCartCount: cartItems[key].productCartCount
            });
        };

        const addProduct = (product) => {
            dispatch(insertToCart(product));
        };

        const removeProduct = (product, removalType) => {
            dispatch(removeFromCart(product, removalType));
        };

        return(
            <Page pageTitle="Cart">
                <Post>
                    <table className="products-listing">
                        <thead>
                            <tr className="products-listing__headers">
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unitary</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {
                            cartItemsArray.map((element, index) => {
                                return(
                                    <tbody  key={index}>
                                        <tr className="products-listing__items">
                                            <td>
                                                <div>
                                                    {element.product.name}
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        id="remove-from-cart"
                                                        onClick={(() => {removeProduct(element.product)})}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{element.productCartCount}</span>
                                                    <button
                                                        id="add-to-cart"
                                                        onClick={(() => {addProduct(element.product)})}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    {element.product.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    {(element.product.price * element.productCartCount).toFixed(2)}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                    </table>
                </Post>
            </Page>
        );
    }
};

export default Cart;