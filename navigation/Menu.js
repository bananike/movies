import React from 'react';
import Btn from '../Btn';
import styled from 'styled-components/native';

const BtnContainer = styled.View`
    position: absolute;
    right: 0;
`;

export default (props) => {
    return(
        <BtnContainer>
            <Btn
                backgroundColor='transparent'
                color="#fff"
                height='auto'
                icon='menu'
                iconType='Entypo'
                onPress={() => props.navigation.toggleDrawer()}
            />
        </BtnContainer>
    )
}