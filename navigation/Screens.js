import React from 'react';
import { Easing, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SearchResultsScreen from '../screens/SearchResultsScreen';
import DetailedResultScreen from '../screens/DetailedResultScreen';
import { Header } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})


const RestaurantStack = createStackNavigator({
  Restaurants: {
    screen: () => <SearchResultsScreen term='restaurants'/>,
    navigationOptions: ({navigation}) => ({
      header: <Header iconName='none' title="Nearby Restaurants" navigation={navigation} />,
    })
  },
  Product: {
    screen: DetailedResultScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title={navigation.state.params.product.title} navigation={navigation} />,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const GroceryStack = createStackNavigator({
  Groceries: {
    screen: () => <SearchResultsScreen term='groceries'/>,
    navigationOptions: ({navigation}) => ({
      header: <Header iconName='none' title="Nearby Groceries" navigation={navigation} />,
    })
  },
  Product: {
    screen: DetailedResultScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title={navigation.state.params.product.title} navigation={navigation} />,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createBottomTabNavigator({
    Restaurants: RestaurantStack,
    Groceries:  GroceryStack,
  }
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
