import React, {
    useState,
    useEffect
}
from 'react';

//Component
import {
    Page,
    Post,
    Redirector,
    RedirectorInfo,
    RedirectorText,
    RedirectorBanner
} from '../components';

//Services
import {fetchFromBackEnd} from '../services';

const Podcasts = () => {
    const [podcasts,setPodcasts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('podcasts', '', {method: 'GET'})
        .then(data => {
            setPodcasts(data.podcasts);
            setIsLoading(false);
        })
    },[]);

    return(
        <Page
            isLoading={isLoading}
            pageTitle="Podcasts"
        spinner>
            <Post>
                {podcasts.map((element,index) => {
                    return(
                        <Redirector 
                            key={index}
                            redirectorType='podcast'
                            redirectorID={element.id}
                        >
                            <RedirectorInfo>
                                <RedirectorText
                                    infoType="title"
                                    color="dark"
                                >
                                    {element.title}
                                </RedirectorText>
                                <RedirectorText
                                    infoType="user"
                                    color="grey"
                                >
                                    {element.podcastAuthor} #{element.id}
                                </RedirectorText>  
                            </RedirectorInfo>
                            <RedirectorBanner
                                url={`data:image/png;base64,${element.image}`}
                                alt={element.title}
                                type='podcast'
                            />
                        </Redirector >
                    );
                })}
            </Post>
        </Page>
    );
}

export default Podcasts;