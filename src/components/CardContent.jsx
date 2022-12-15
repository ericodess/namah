import React from 'react';

//Services
import {
    timeConverter,
    calcDateDiff
} from '../services';

const CardContent = (props) => {
    if(props.cardType === 'course'){
        const courseInfo = {
            startDate: timeConverter(props.card.courseDate.startDate),
            endDate: timeConverter(props.card.courseDate.endDate)
        };
        
        return(
            <React.Fragment>
                <div className="card-course__banner">
                    <img
                        src={`data:image/png;base64,${props.card.courseImage}`}
                        alt={props.card.courseTitle}
                    />
                </div>
                <div className="card-course__description">
                    <div className="card-course__header">
                        <span>{courseInfo.startDate.day} {courseInfo.startDate.month.charAt(0).toUpperCase() + courseInfo.startDate.month.slice(1).toLowerCase()} - {courseInfo.endDate.day} {courseInfo.endDate.month.charAt(0).toUpperCase() + courseInfo.endDate.month.slice(1).toLowerCase()}</span>
                        <h4 className="card-course__title">{props.card.courseTitle}</h4>
                    </div>
                    <div className="card-course__footer">
                        <div className="card-course__info">
                            <p>Por {props.card.courseAuthor}</p>
                            <p>{calcDateDiff(props.card.courseDate.startDate,props.card.courseDate.endDate)} Dias de curso</p>
                        </div>
                        <svg
                            className="card-course__redirector"
                            viewBox="0 0 21 12"
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.9375 11.1562C15.75 11.3438 15.5625 11.3906 15.3281 11.2969C15.0938 11.2031 15 11.0625 15 10.7812V7.40625H0.5625C0.375 7.40625 0.234375 7.35938 0.140625 7.26562C0.046875 7.17188 0 7.03125 0 6.84375V5.34375C0 5.25 0.046875 5.10938 0.140625 4.96875C0.234375 4.875 0.375 4.78125 0.5625 4.78125H15V1.45312C15 1.21875 15.0938 1.03125 15.3281 0.9375C15.5625 0.84375 15.75 0.890625 15.9375 1.07812L20.625 5.71875C20.7188 5.85938 20.7656 6 20.7656 6.14062C20.7656 6.28125 20.7188 6.42188 20.625 6.51562L15.9375 11.1562Z"
                                fill="grey"
                            />
                        </svg>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <div className="card-course__banner">
                <img
                    src={`data:image/png;base64,${props.card.podcastImage}`}
                    alt={props.card.podcastTitle}
                />
            </div>
            <div className="card-course__description">
                <div className="card-course__header">
                    <span>{props.card.podcastAuthor} #{props.card.podcastId}</span>
                    <h4 className="card-course__title">{props.card.podcastTitle}</h4>
                </div>
                <div className="card-course__footer">
                    <div className="card-course__info">
                        <p>{props.card.podcastDescription}</p>
                    </div>
                    <div className="card-course__button">
                        <svg
                            className="card-course__redirector-play"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.25 6.71875C13.5625 6.90625 13.7812 7.1875 13.9062 7.5C14.0312 7.84375 14.0312 8.1875 13.9062 8.5C13.7812 8.84375 13.5625 9.09375 13.25 9.28125L2.25 15.7812C1.9375 15.9688 1.59375 16.0312 1.25 15.9688C0.875 15.9062 0.59375 15.75 0.34375 15.4688C0.09375 15.2188 0 14.875 0 14.5V1.5C0 1.09375 0.125 0.75 0.375 0.5C0.625 0.25 0.90625 0.09375 1.28125 0.03125C1.625 -0.03125 1.9375 0.03125 2.25 0.21875L13.25 6.71875ZM1.5 14.1562C1.5 14.25 1.53125 14.3125 1.59375 14.3438C1.65625 14.375 1.71875 14.375 1.78125 14.3438L12.2188 8.15625C12.2812 8.125 12.3125 8.0625 12.3125 8C12.3125 7.9375 12.2812 7.90625 12.2188 7.84375L1.78125 1.65625C1.71875 1.65625 1.65625 1.65625 1.59375 1.6875C1.53125 1.71875 1.5 1.75 1.5 1.8125V14.1562Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CardContent;