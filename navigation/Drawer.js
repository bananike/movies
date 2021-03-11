import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Stack from './Stack';
import Second from '../screens/Second';
import Loading from '../screens/Loading';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

function CloseMenu(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
      </DrawerContentScrollView>
    );
  }

export default () => {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    
    return(
        <>
            
            <Drawer.Navigator
                initialRouteName="Stack"
                drawerContent={props => <CloseMenu {...props} />}
                // drawerType={isLargeScreen ? 'permanent' : 'front'}
                drawerStyle={
                    isLargeScreen ? null : {width: '100%'},
                    {
                        backgroundColor: '#333',
                        borderRightColor: 'transparent'
                    }}
                overlayColor='transparent'
                drawerContentOptions={{
                    inactiveTintColor: '#eee',
                    activeBackgroundColor: '#222',
                    activeTintColor: '#fff'
                }}
            >
                <Drawer.Screen
                    name="Stack"
                    component={Stack}
                />
                <Drawer.Screen
                    name="Second"
                    component={Second}
                />
                <Drawer.Screen
                    name="Loading"
                    component={Loading}
                    // images={props.images}
                />
            </Drawer.Navigator>
        </>
    )
}