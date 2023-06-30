import React, {
    useState,
    useEffect
} from 'react';

//Component
import {
    Page,
    Post,
    Redirector,
    RedirectorInfo,
    RedirectorText,
    RedirectorBanner,
} from '../components';

//Services
import {fetchFromBackEnd} from '../services';

const Store = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('products', '', {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful === true){
                setProducts(data.products);
                setIsLoading(false);
            }
        })
    },[]);

    return(
        <Page
            isLoading={isLoading}
            pageTitle="Store"
        spinner>
            <Post>
                {products.map((element,index) => {
                    return(
                        <Redirector 
                            key={index}
                            redirectorType='product'
                            redirectorID={element.id}
                        >
                            <RedirectorInfo>
                                <RedirectorText
                                    infoType="title"
                                    color="dark"
                                >
                                    {element.name}
                                </RedirectorText>
                                <RedirectorText
                                    infoType="price"
                                    color="grey"
                                >
                                    R$ {element.price.toFixed(2)}
                                </RedirectorText>
                            </RedirectorInfo>
                            <RedirectorBanner 
                                url={`data:image/png;base64,${element.image}`}
                                alt={element.name}
                            />
                        </Redirector>
                    );
                })}
            </Post>
        </Page>
    );
}

export default Store;