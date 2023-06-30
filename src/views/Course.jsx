import React, {
    useEffect,
    useState
} from 'react';
import {Redirect} from 'react-router-dom';

//Components
import {
    Page,
    Post
} from '../components';

//Services
import {
    getCurrentPageID,
    calcDateDiff,
    fetchFromBackEnd
} from '../services';

const Course = (props) => {
    const [course,setCourse] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const currentPageId = getCurrentPageID(props.location.search);

    useEffect(() => {
        fetchFromBackEnd('courses', `id=${currentPageId}`, {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful === false){
                setCourse(-1);
            }else{
                setCourse(data.courses[0]);
                setIsLoading(false);
            }
        })
    },[currentPageId]);

    if(course !== -1 && currentPageId !== -1){
        return(
            <Page isLoading={isLoading}>
                <Post full>
                    <div className="page__course-banner">
                        <img 
                            className="page__course-image"
                            src={`data:image/png;base64,${course.image}`} 
                            alt={course.title ? course.title : 'Course'}  
                        />
                        <span className="page__course-info">
                            <h3 className="page__course-title">{course.title ? course.title : ''}</h3>
                            <p className="page__course-type">CURSO</p>
                            <p className="page__course-duration">
                                <svg
                                    viewBox="0 0 512 512"
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M256 0C114.844 0 0 114.844 0 256C0 397.156 114.844 512 256 512C397.156 512 512 397.156 512 256C512 114.844 397.156 0 256 0ZM256 480C132.484 480 32.0001 379.516 32.0001 256C32.0001 132.484 132.484 32.0001 256 32.0001C379.516 32.0001 480 132.484 480 256C480 379.516 379.516 480 256 480V480Z"
                                        fill="#73A8A0"
                                    />
                                    <path
                                        d="M272 96H240V262.625L340.687 363.312L363.312 340.687L272 249.375V96Z"
                                        fill="#73A8A0"
                                    />
                                </svg>
                                {calcDateDiff(course.startDate,course.endDate)+ ' Days'}
                            </p>
                        </span>
                    </div>
                    <div className="page__course-content">
                        <p className="page__course-description">
                            <span>{course.description ? course.description : ''}</span>
                        </p>
                    </div>
                </Post>
            </Page>
        );
    }else return <Redirect to="/error/404" />
}

export default Course;