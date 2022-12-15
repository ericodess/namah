import React, {
    useState,
    useEffect
} from 'react';
import {Redirect} from 'react-router-dom';

//Components
import {
    Page,
    Post,
    ProfilePosts
} from '../components';

//Services
import {
    getCurrentPageUser,
    fetchFromBackEnd
} from '../services';

const Profile = (props) => {
    const [responseData,setResponseData] = useState('');
    const [isLoading,setIsloading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('users', `name=${getCurrentPageUser(props.location.pathname)}`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(data => {
            if(!data.wasSuccessful){
                setResponseData(404);
            }else{
                setResponseData(data.users[0].userName);
                setIsloading(false);
            }
        })
    },[props.location.pathname]);

    if(responseData === 404){
        return (
            <Redirect to="/error/404" />
        );
    }else{
        return(
            <Page isLoading={isLoading}>
                <Post>
                    <div className="profile">
                        <div className="profile__picture">
                            <span>{responseData[0]}</span>
                        </div>
                        <div className="profile__name">
                            <div className="--hoverable">{responseData}</div>
                        </div>
                    </div>
                    <ProfilePosts
                        postType="post"
                        postAuthor={getCurrentPageUser(props.location.pathname)}
                    />
                    <ProfilePosts
                        postType="podcast"
                        postAuthor={getCurrentPageUser(props.location.pathname)}
                    />
                    <ProfilePosts
                        postType="course"
                        postAuthor={getCurrentPageUser(props.location.pathname)}
                    />
                </Post>
            </Page>
        );
    }
}

export default Profile;