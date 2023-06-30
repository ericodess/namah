import React, {
    useEffect,
    useState
}from 'react';
import {
    Link,
    Redirect
} from 'react-router-dom';

//Place Holder
import PlaceHolderAudio from "../assets/audio/podcast-place-holder.mp3";

//Component
import {
    Page,
    Post,
    AudioPlayer
} from '../components';

//Services
import {
    getCurrentPageID,
    fetchFromBackEnd
} from '../services';

export const Podcast = (props) => {
    const [podcast,setPodcast] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const currentPageId = getCurrentPageID(props.location.search);

    useEffect(() => {
        fetchFromBackEnd('podcasts', `id=${currentPageId}`, {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful !== true){
                setPodcast(-1);
            }else{
                setPodcast(data.podcasts[0]);
                setIsLoading(false);
            }
        })
    },[currentPageId]);

    if(podcast !== -1 && currentPageId !== null){
        return(
            <Page isLoading={isLoading}>
                <Post>
                    <img 
                        className="page__post-banner"
                        src={`data:image/png;base64,${podcast.image}`} 
                        alt={podcast.title ? podcast.title : 'Loading'}  
                    />
                    <div className="page__podcast">
                        <AudioPlayer audio={PlaceHolderAudio} />   
                    </div>
                    <p className="page__post-title --centralized-text">{podcast.title ? podcast.title : 'Loading'}</p>
                    <div className="page__post-info">
                            <Link 
                                to={`/user/${podcast.author}`}
                                className="page__post-onwership --grey-text">{podcast.author ? podcast.author : 'Loading'} #{currentPageId}
                            </Link>
                    </div>
                </Post>
            </Page>
        );
    }else return <Redirect to="/error/404" />
}

export default Podcast;