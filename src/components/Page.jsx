import React from 'react';

//Components
import {Loader} from '../components';

const Page = (props) => {
    if(props.spinner){       
        return(
            <section className="page">
                {props.title ? <p className="page__place-holder">{props.ttle}</p> : ''}
                <Loader isLoading={props.isLoading} />
                {props.children}
            </section>
        );
    }else{
        return(
            <section className={props.isLoading ? "page --loading" : "page"}>
                {props.title ? <p className="page__place-holder">{props.title}</p> : ''}
                {props.children}
            </section>
        );
    }
};

export default Page;