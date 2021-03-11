import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

const ScrollContainer = ({ loading, children, contentContainerStyle, refreshFn }) => {
    const [refreshing ,setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refreshFn();
        setRefreshing(false);
    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    tintColor={'#eee'}
            />}
            style={{
                backgroundColor: '#222'
            }}
            contentContainerStyle={{
                flex: loading ? 1 : 0,
                justifyContent: loading ? 'center' : 'flex-start',
                ...contentContainerStyle
            }}
        >
            {loading ? 
                <ActivityIndicator
                    color='#fff'
                    size='large'
                />
            : children}
        </ScrollView>
)};

ScrollContainer.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    contentContainerStyle: PropTypes.object,
    refreshFn: PropTypes.func
}

export default ScrollContainer;