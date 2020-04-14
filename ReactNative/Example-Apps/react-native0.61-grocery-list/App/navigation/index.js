import React from 'react';
import {Image, Platform} from 'react-native';
import 'react-native-get-random-values'; // https://www.npmjs.com/package/uuid#getrandomvalues-not-supported
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CurrentList from '../screens/CurrentList';
import FavoritesList from '../screens/FavoritesList';
import ItemDetails from '../screens/ItemDetails';

enableScreens();

const Tab = createBottomTabNavigator();

function CurrentListStackScreen() {
  const CurrentListStack = createStackNavigator();
  return (
    <CurrentListStack.Navigator>
      <CurrentListStack.Screen name="Shopping List" component={CurrentList} />
      <CurrentListStack.Screen name="ItemDetails" component={ItemDetails} />
    </CurrentListStack.Navigator>
  );
}

function FavoritesStackScreen() {
  const FavoritesStack = createStackNavigator();
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        options={({route}) => ({
          headerTitle: route.params?.name ?? 'Favorites',
        })}
        component={FavoritesList}
      />
    </FavoritesStack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="CurrentListTabScreen"
          component={CurrentListStackScreen}
          options={{
            tabBarLabel: 'Current List',
            tabBarIcon: ({color, size}) => {
              const image = Platform.select({
                ios: require('../assets/icons/ios-list.png'),
                android: require('../assets/icons/md-list.png'),
              });

              return (
                <Image
                  style={{tintColor: color, width: size}}
                  resizeMode="contain"
                  source={image}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="FavoritesTabScreen"
          component={FavoritesStackScreen}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({focused, color, size}) => {
              const image = Platform.select({
                ios: focused
                  ? require('../assets/icons/ios-star.png')
                  : require('../assets/icons/ios-star-outline.png'),
                android: focused
                  ? require('../assets/icons/md-star.png')
                  : require('../assets/icons/md-star-outline.png'),
              });

              return (
                <Image
                  style={{tintColor: color, width: size}}
                  resizeMode="contain"
                  source={image}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
