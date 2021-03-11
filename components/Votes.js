import React from 'react';
import styled from 'styled-components/native';

const Container = styled.Text`
    color: #aaa;
    font-size: 12px;
`;

const Votes = ({votes}) => {
    return(
        <Container>⭐️ {votes} / 10</Container>
    )
}

export default Votes;