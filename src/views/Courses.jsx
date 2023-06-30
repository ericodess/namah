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
import {
    timeConverter,
    fetchFromBackEnd
} from '../services';

const Courses = () => {
    const [courses,setCourses] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBackEnd('courses', '', {method: 'GET'})
        .then(data => {
            setCourses(data.courses);
            setIsLoading(false);
        })
    },[]);

    return(
        <Page
            isLoading={isLoading}
            pageTitle="Courses"
        spinner>
            <Post listing="table">
                {courses.map((element,index) => {
                    return(
                       <Redirector 
                           key={index}
                           redirectorType='course'
                           redirectorID={element.id}
                       >
                            <RedirectorBanner
                                url={`data:image/png;base64,${element.image}`} 
                                alt={element.title} 
                            />
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
                                    CURSO - {timeConverter(element.startDate).day} {timeConverter(element.startDate).month} 
                                </RedirectorText>
                            </RedirectorInfo>
                        </Redirector>
                    );
                })}
           </Post>
        </Page>
    );
}

export default Courses;