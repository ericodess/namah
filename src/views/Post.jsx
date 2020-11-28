import React, {
    useState,
    useEffect
} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

//Components
import {Page} from '../components';

//Services
import {
    getCurrentPageID,
    fetchFromBlob,
    fetchFromBackEnd
} from '../services';

const Post = (props) => {
    const [postHeaders, setPostHeaders] = useState({});
    const [postMarkdown, setPostMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const currentPageId = getCurrentPageID(props.location.search);

    useEffect(() => {
        fetchFromBackEnd('posts', `id=${currentPageId}`, {method: 'GET'})
        .then(data => {
            if(data.sucess === false){
                setPostMarkdown(-1);
            }else{
                setPostHeaders({
                    postTitle: data.posts[0].post_title,
                    postTheme: data.posts[0].post_theme.toUpperCase(),
                    postAuthor: data.posts[0].post_author
                });
                fetchFromBlob(data.posts[0].post_id, 'markdown', 'posts', 'id', 'md')
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    setPostMarkdown(data);
                    setIsLoading(false);
                })
            }
        });
    },[currentPageId]);

    if(postMarkdown !== -1 && currentPageId !== null){
        return(
            <Page isLoading={isLoading}>
                <div className="page__post --central">
                    <img 
                        className="page__post-banner"
                        src={`${process.env.REACT_APP_BLOB_HOST}/jpeg/post/bg-${currentPageId}.jpg`}
                        alt={postHeaders.postTitle}
                    />
                    <div className="page__post-title">{postHeaders.postTitle}</div>
                    <div className="page__post-info">
                        <span className="page__post-type --grey-text --bottom-thin-borders">{postHeaders.postTheme}</span>
                        <span className="page__post-onwership --grey-text --bottom-thin-borders">por <Link to={`/user/${postHeaders.postAuthor}`}>{postHeaders.postAuthor}</Link></span>
                    </div>
                    <div className="page__post-article --dark-grey-text">
                        <ReactMarkdown source={postMarkdown}/>
                    </div>
                </div>
            </Page>
        );
    }else return <Redirect to="/error/404" />
}

export default Post;