import React, {
    useState,
    useEffect
} from 'react';
import {Link} from 'react-router-dom';

//Components
import {
    Loader,
    Newsletter
} from './index';

//Services
import {
    translatePageType,
    timeConverter,
    fetchFromBackEnd
} from '../services';

const Node = (props) => {
    const [node,setNode] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        if(props.type !== 'newsletter') {
            fetchFromBackEnd(`${props.type}s`, `id=${props.ID}`, {method: 'GET'})
            .then(data => {
                if(data.wasSuccessful === true){
                    setNode(data[`${props.type}s`][0]);
                    setIsLoading(false);
                }
            })
        }
    },[props.type,props.ID]);

    let setNodeChildren;

    if(isLoading === true && props.type !== 'newsletter'){
        setNodeChildren = () => {
            return(
                <Loader isLoading={true} />
            );
        }
    }else{
        setNodeChildren = () => {
            switch (props.type) {
                case 'post':
                    if(props.theme === 'light'){
                        return(
                            <React.Fragment>
                                <p className="page__banner-title">
                                    {node.title}
                                </p>
                                <div className="page__banner-info">
                                    <p className="page__banner-text --underlined">
                                        {node.theme.toUpperCase()}
                                    </p>
                                    <p className="page__banner-text">
                                        por <span className="--underlined">{node.author}</span>
                                    </p>
                                </div>
                            </React.Fragment>
                        );
                    }else{
                        return(
                            <React.Fragment>
                                <img 
                                    src={`data:image/png;base64,${node.image}`}
                                    alt={node.title}
                                />
                                <p className="page__banner-title">
                                    {node.title}
                                </p>
                                <p className="page__banner-text --underlined">
                                    {node.theme.toUpperCase()}
                                </p>
                                <span className="page__banner-text">
                                    {node.title}
                                </span>
                            </React.Fragment>
                        );
                    }
                case 'podcast':
                    return(
                        <React.Fragment>
                            <div className="page__banner-info">
                                <p className="page__banner-text">
                                    {node.author} #{node.id}
                                </p>
                            </div>
                            <p className="page__banner-title">
                                {node.title}
                            </p>
                        </React.Fragment>
                    );
                case 'course':
                    return(
                        <React.Fragment>
                            <div className="page__banner-info">
                                <p className="page__banner-text">
                                    CURSO - {timeConverter(node.startDate).day} {timeConverter(node.startDate).month}
                                </p>
                            </div>
                            <p className="page__banner-title">
                                {node.title}
                            </p>
                        </React.Fragment>
                    );
                case 'product':
                    return(
                        <React.Fragment>
                            <p className="page__banner-title">
                                {node.name}
                            </p>
                            <div className="page__banner-info">
                                <p className="page__banner-text">COMPRE AGORA</p>
                                <svg
                                    className="page__product-foward"
                                    width="16"
                                    height="9" 
                                    viewBox="0 0 16 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.0781 8.11719C11.9375 8.25781 11.7969 8.29297 11.6211 8.22266C11.4453 8.15234 11.375 8.04688 11.375 7.83594V5.30469H0.546875C0.40625 5.30469 0.300781 5.26953 0.230469 5.19922C0.160156 5.12891 0.125 5.02344 0.125 4.88281V3.75781C0.125 3.6875 0.160156 3.58203 0.230469 3.47656C0.300781 3.40625 0.40625 3.33594 0.546875 3.33594H11.375V0.839844C11.375 0.664062 11.4453 0.523438 11.6211 0.453125C11.7969 0.382812 11.9375 0.417969 12.0781 0.558594L15.5938 4.03906C15.6641 4.14453 15.6992 4.25 15.6992 4.35547C15.6992 4.46094 15.6641 4.56641 15.5938 4.63672L12.0781 8.11719Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </React.Fragment>
                    );
                case 'newsletter':
                    return(
                        <Newsletter />
                    );
                default:
                    return(
                        <p>Type not found</p>
                    );
            }
        }
    }
    const nodeChildren = setNodeChildren(); 

    if(props.redirector){
        return(
            <Link
                className={`page__node --${props.size}-${props.position} --${props.type} --${props.theme}-text`}
                style={isLoading ? null : {backgroundImage: props.theme === 'light' ? `url(data:image/png;base64,${node.image})` : ''}}
                to={`/${translatePageType(props.type)}/post?id=${node.id}&type=${props.type}`}
            >
                <div className={props.theme === 'light' ? `page__banner-content --flex-end-self ${isLoading === true ? '' : '--fade-up'}` : "page__banner-content --flex-end-self"}>
                    {nodeChildren}  
                </div>    
            </Link>
        );
    }else{
        return(
            <div className={`--${props.size}-${props.position} --thick-borders --dark-borders --${props.theme}-text`}>
                {nodeChildren}   
            </div>
        );
    }
}

export default Node;