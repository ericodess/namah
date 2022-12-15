import React, {
    useEffect,
    useState
} from 'react';

//Component
import {
    Page,
    Banner,
    RedirectorButton,
    Cluster,
    Node,
    Post,
    TableListing,
    ProductCard,
    Filler,
    FillerProduct,
    Carousel,
    CarouselItem,
    CardList,
    FloatingButton
} from '../components';

//Services
import {fetchFromBackEnd} from '../services';

const Home = () => {
    const [conceptList, setConceptList] = useState([]);

    useEffect(() => {
        fetchFromBackEnd('concepts', 'limit=6', {method: 'GET'})
        .then(data => {
            if(data.wasSuccessful){
                setConceptList(data.concepts);
            }
        })
    },[]);

    return(
        <div className="--flex-row">
            <Page>
                <Post>
                    <Banner ID={552}>
                        <RedirectorButton
                            text="LOREM IPSUM" 
                            root="banner"
                        />
                    </Banner>
                </Post>
                <Post>
                    <Cluster type='two-to-one'>
                        <Node
                            redirector
                            size="big"
                            position="left" 
                            theme="light"
                            type="post"
                            ID={681}
                        />
                        <Node 
                            redirector
                            size="small"
                            position="top-right"
                            theme="light"
                            type="podcast"
                            ID={122}
                        />
                        <Node 
                            redirector
                            size="small"
                            position="bottom-halfed-left"
                            theme="light"
                            type="course"
                            ID={12023452}
                        />
                        <Node 
                            redirector
                            size="small"
                            position="bottom-halfed-right"
                            theme="light"
                            type="product"
                            ID={404} 
                        />
                    </Cluster>
                    <Filler
                        title="recomendam"
                        text="nossos especialistas"
                    >
                        <FillerProduct productCount={3} />
                        <FillerProduct productCount={3} />
                    </Filler>
                </Post>
                <Post title="Blog">
                    <Cluster type='three-to-one'>
                        <Node
                            redirector
                            size="medium"
                            position="top-left" 
                            theme="light"
                            type="post"
                            ID={681}
                        />
                        <Node
                            redirector
                            size="medium"
                            position="top-right" 
                            theme="light"
                            type="post"
                            ID={682}
                        />
                        <Node
                            redirector
                            size="small"
                            position="bottom-left" 
                            theme="medium-grey"
                            type="post"
                            ID={684}
                        />
                        <Node
                            redirector
                            size="small"
                            position="bottom-middle" 
                            theme="medium-grey"
                            type="post"
                            ID={683}
                        />
                        <Node
                            size="small"
                            position="bottom-right" 
                            theme="dark"
                            type="newsletter"
                        />
                    </Cluster>
                    <RedirectorButton
                        root="post" 
                        target="blog"
                        text="Veja todos os posts"
                    />
                </Post>
                <Post title="Namah Shop">
                    <Carousel>
                        <CarouselItem>
                            <TableListing listingType="four">
                                <ProductCard productID={405}/>
                                <ProductCard productID={406}/>
                                <ProductCard productID={407}/>
                                <ProductCard productID={404}/>
                            </TableListing>
                        </CarouselItem>
                        <CarouselItem>
                            <TableListing listingType="four">
                                <ProductCard productID={39}/>
                                <ProductCard productID={62}/>
                                <ProductCard productID={72}/>
                            </TableListing>
                        </CarouselItem>
                    </Carousel>
                    <RedirectorButton
                        root="post" 
                        target="store"
                        text="Veja todos os produtos"
                    />
                </Post>
                <Post title="Courses">
                    <TableListing listingType="three-desktop">
                        <CardList
                            cardListingType="course"
                            cardMaxListing={3}
                        />
                    </TableListing>
                    <RedirectorButton
                        root="post" 
                        target="courses"
                        text="Veja todos os cursos"
                    />
                </Post>
                <Post title="Podcasts">
                    <TableListing listingType="three-desktop">
                        <CardList
                            cardListingType="podcast"
                            cardMaxListing={3}
                        />
                    </TableListing>           
                    <RedirectorButton
                        root="post" 
                        target="podcasts"
                        text="Veja todos os podcasts"
                    />
                </Post>
                <Post title="@namah.concept">
                    <TableListing listingType="six-desktop">
                        {
                            conceptList.map((element, index) => {
                                return(
                                    <img
                                        key={index}
                                        src={`data:image/png;base64,${element.conceptImage}`}
                                        alt="A concept"
                                        className="page__concept-image"
                                    />
                                );
                            })
                        }
                    </TableListing>
                </Post>
            </Page>
            <FloatingButton
                floatingButtonHandler={(() => {window.scroll({top: 0, behavior: 'smooth'})})}
                floatingButtonTitle="Scroll to the top"
            >
                <svg 
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.1875 11.375C0.09375 11.2812 0.046875 11.1406 0.046875 10.9531C0.046875 10.8125 0.09375 10.6719 0.1875 10.5781L10.125 0.6875C10.2188 0.59375 10.3125 0.5 10.5 0.5C10.6406 0.5 10.7812 0.59375 10.875 0.6875L20.8125 10.5781C20.9062 10.6719 20.9531 10.8125 20.9531 10.9531C20.9531 11.1406 20.9062 11.2812 20.8125 11.375L20.4375 11.7031C20.3438 11.7969 20.2031 11.8438 20.0625 11.8438C19.875 11.8438 19.7344 11.7969 19.6406 11.7031L11.2969 3.3125V20.9375C11.2969 21.125 11.2031 21.2656 11.1094 21.3594C11.0156 21.4531 10.875 21.5 10.7344 21.5H10.2656C10.0781 21.5 9.9375 21.4531 9.84375 21.3594C9.75 21.2656 9.70312 21.125 9.70312 20.9375V3.3125L1.35938 11.7031C1.21875 11.7969 1.07812 11.8438 0.9375 11.8438C0.75 11.8438 0.65625 11.7969 0.5625 11.7031L0.1875 11.375Z"
                        fill="white"
                    />
                </svg>
            </FloatingButton>
        </div>
    );
}

export default Home;