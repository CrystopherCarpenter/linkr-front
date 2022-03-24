import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    TimelineContainer,
    TimelineBox,
    TimelineBody,
    Title,
    CenteredContainer,
    NoPostFound,
} from './style';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import Post from '../../components/Post';

function UserPage() {
    const { id } = useParams();
    const { auth } = useAuth();
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState();

    useEffect(() => {
        api.listUserPosts(auth?.token, id)
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });

        //eslint-disable-next-line
    }, []);

    function setData(data) {
        setPosts(data.posts);
        setUserName(data.authorName);
        setIsLoadingPosts(false);
    }

    return (
        <TimelineContainer>
            <TimelineBox>
                <TimelineBody>
                    <Title>{userName ? `${userName}'s posts` : ''}</Title>

                    {isLoadingPosts ? (
                        <CenteredContainer>
                            <ThreeDots
                                color="#ffffff"
                                height={100}
                                width={100}
                            />
                        </CenteredContainer>
                    ) : posts.length === 0 ? (
                        <NoPostFound>There are no posts yet</NoPostFound>
                    ) : (
                        posts.map((post) => (
                            <Post
                                key={post.id}
                                postId={post.id}
                                url={post.url}
                                linkTitle={post.urlTitle}
                                linkDescription={post.urlDescription}
                                linkImage={post.urlImage}
                                textDescription={post.description}
                                author={post.author}
                                profilePicture={post.profilePicture}
                                userId={post.userId}
                            />
                        ))
                    )}
                </TimelineBody>
            </TimelineBox>
        </TimelineContainer>
    );
}

export default UserPage;