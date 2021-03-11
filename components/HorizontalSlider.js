import React from 'react';
import Title from './Title';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';

const HorizontalSlider = ({ title, children }) => {
    return(
        <View>
            <Title
                title={title}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    marginTop: 20,
                    marginBottom: 40
                }}
                contentContainerStyle={{
                    paddingLeft: 40
                }}
            >
            {children}
            </ScrollView>
        </View>
    )
}

HorizontalSlider.propTypes={
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default HorizontalSlider;