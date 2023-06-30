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
    RedirectorBanner
} from '../components';

//Services
import {fetchFromBackEnd} from '../services';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('posts', '', {method: 'GET'})
        .then(data => {
            setPosts(data.posts);
            setIsLoading(false);
        });
    },[]);
    
    return(
        <Page 
            isLoading={isLoading}
            pageTitle="Blog"
        spinner>
            <Post>
                {posts.map((element,index) => {
                    return(
                        <Redirector 
                            key={index}
                            redirectorType='post'
                            redirectorID={element.id}    
                        >
                            <RedirectorInfo>
                                <RedirectorText 
                                    infoType="type"
                                    color="dark"
                                >
                                    {element.theme}
                                </RedirectorText>
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
                                    {element.author}
                                </RedirectorText>
                            </RedirectorInfo>
                            <RedirectorBanner
                                url={`data:image/png;base64,${element.image}`}
                                alt={element.title}
                            />
                        </Redirector>
                    );
                })}
            </Post>                    
        </Page>
    );
}

export default Blog;