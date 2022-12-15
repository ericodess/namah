import React, {
    useState
} from 'react';
import {Link} from 'react-router-dom';

//Services
import {
    fetchFromBackEnd,
    translatePageType
} from '../services';

const ProfilePosts = (props) => {
    const [posts,setPosts] = useState([]);
    const [isHeaderActive,setIsHeaderActive] = useState(false);
    const [isFirstRender,setIsFirstRender] = useState(true);

    const fetchPostData = () => {
        const postList = document.getElementById(`${props.postType}-list`);
        const postButton = document.getElementById(`${props.postType}-button`);

        if(!isHeaderActive){
            setPosts([]);

            if(isFirstRender === true || props.postAuthor !== window.location.hash.split('/')[window.location.hash.split('/').length]){
                fetchFromBackEnd(`${props.postType}s`, `author=${props.postAuthor}`,{method: 'GET'})
                .then(data => {
                    if(data.wasSuccessful !== true){
                        setPosts([data]);
                    }else{
                        setPosts(data[`${props.postType}s`]);
                    }
                    setIsFirstRender(false);
                })
            }
            postList.classList.add('--visible');
            postButton.classList.add('--active-button');
            setIsHeaderActive(true);
        }else{
            postList.classList.remove('--visible');
            postButton.classList.remove('--active-button');
            setIsHeaderActive(false);
        }
    };

    return(
        <div className="profile-posts">
            <button
                className="profile-posts__header"
                onClick={fetchPostData}
            >
                <span>{props.postType.charAt(0).toUpperCase() + props.postType.slice(1).toLowerCase() + 's'}</span>
                <div
                    id={`${props.postType}-button`}
                    className="profile-posts__button"
                >
                    <svg
                        viewBox="0 0 478 253"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M248.544 248.732L473.644 23.6316C478.944 18.3316 478.944 9.83164 473.644 4.53164C468.344 -0.76836 459.844 -0.76836 454.544 4.53164L239.044 220.032L23.5441 4.53162C18.2441 -0.76838 9.74414 -0.76838 4.44415 4.53162C1.84415 7.13162 0.444152 10.6316 0.444152 14.0316C0.444152 17.4316 1.74414 20.9316 4.44415 23.5316L229.544 248.632C234.744 253.932 243.344 253.932 248.544 248.732Z"
                            fill="#707070"
                        />
                    </svg>
                </div>
            </button>
            <ul
                id={`${props.postType}-list`}
                className="profile-posts__list"
            >
                {posts.map((element, index) => {
                    if(element.description){
                        return(
                            <li 
                                key={index}
                                className="profile-posts__feedback"
                            >
                                <span>{element.description}</span>
                            </li>
                        );
                    }else{
                        return(
                            <li
                                key={index}
                                className="profile-posts__post"
                            >
                                <Link
                                    className="profile-posts__redirector"
                                    to={`/${translatePageType(props.postType)}/post?id=${element[`${props.postType}Id`]}&type=${props.postType}`}
                                >
                                    <span>{element[`${props.postType}Title`]}</span>
                                    <img
                                        src={`${process.env.REACT_APP_BLOB_HOST}/jpeg/${props.postType}/bg-${element[`${props.postType}Id`]}.jpg`}
                                        alt={props.postType.charAt(0).toUpperCase() + props.postType.slice(1).toLowerCase() + 's'}
                                    />
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default ProfilePosts;