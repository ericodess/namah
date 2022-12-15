import React, {
    useState,
    useEffect
} from 'react';

//Components
import {Loader} from './index';

//Services
import {fetchFromBackEnd} from '../services';

const Banner = (props) => {
    const [banner,setBanner] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('banners', `id=${props.ID}`, {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful === true){
                setBanner(data.banners[0]);
                setIsLoading(false);
            };
        })
    },[props.ID]);

    if(isLoading === true){
        return(
            <Loader isLoading={true} />
        );
    }else{
        return(
            <div 
                className="page__banner --thin-borders"
                style={{backgroundImage: `url(data:image/png;base64,${banner.bannerImage})`}}
            >
                <div className="page__banner-headline --flex-end-self">
                    <p className="page__banner-title --centralized-text --dark-text">
                        {banner.bannerTitle}
                    </p>
                    <p className="page__banner-text --centralized-text --grey-text">
                        {banner.bannerDescription}
                    </p>
                    {props.children}
                </div>
            </div>
        );
    }
}

export default Banner;