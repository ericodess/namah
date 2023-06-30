import React, {
    useEffect,
    useState
} from 'react';
import {Link} from 'react-router-dom';

//Components
import {
    CardContent,
    Loader
} from './index';

//Services
import {fetchFromBackEnd} from '../services';

const CardList = (props) => {
    const [cardList,setCardList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd(`${props.cardListingType}s`, `limit=${props.cardMaxListing}`, {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful){
                setCardList(data[`${props.cardListingType}s`]);
                setIsLoading(false);
            }
        })
    },[props.cardListingType,props.cardMaxListing]);

    if(isLoading){
        return(
            <Loader isLoading={true} />
        );  
    }else{
        return(
            cardList.map((element,index) => {
                return(
                    <Link
                        key={index}
                        className="card-course"
                        to={`/${props.cardListingType}s/post?id=${element.id}&type=${props.cardListingType}`}
                    >
                        <CardContent
                            cardType={props.cardListingType}
                            card={element}
                        />
                    </Link>
                );
            })
        );
    }
};

export default CardList;