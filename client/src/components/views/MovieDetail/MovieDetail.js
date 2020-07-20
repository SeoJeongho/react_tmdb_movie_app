import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import Axios from 'axios';

function MovieDetail(props) {
    let movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    const [CommentLists, setCommentLists] = useState([]);

    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovie(response);
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            })

        Axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments);
                    setCommentLists(response.data.comments);
                } else {
                    alert('Failed to get comments Info');
                }
            })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    }

    return (
        <div>
            {/* Header */}
            {/*
                backdrop_path라는 값을 가져오는데 시간이 걸려서 그 값을 가져오기 전에 불러 드릴려고 하면 Undefined 가 나옴.
                그래서  {Movie.backdrop_path && ~~ } 이렇게 까지 명시해줘서 Movie.backdroup_path가 있을떄에만 그러니깐 가져온 후에 
                보여줄수있게 하니깐 undefined 이 아닌 실제 값이 나오는 것
            */}
            {Movie.backdrop_path &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie} />

                <br />

                {/* Actors Grid */}

                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16,16]}> {/* gutter -> 포스터 사이사이의 여백 */}
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }

                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>
        </div>
    )
}

export default MovieDetail;
