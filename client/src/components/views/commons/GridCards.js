import React from 'react';
import {Col} from 'antd';

function GridCards(props) {
    if(props.landingPage) {
        return (
            // 한 컴럼에 24사이즈
            <Col lg={6} md={8} xs={24} >
                <div style={{position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            // 한 컴럼에 24사이즈
            <Col lg={6} md={8} xs={24} >
                <div style={{position: 'relative'}}>
                    <a href={`https://www.google.com/search?source=hp&ei=lTsUX7mhK8e2mAW8672oAw&q=${props.characterName}&oq=${props.characterName}`}>
                        <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName} />
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCards;
