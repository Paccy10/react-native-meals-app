import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import Categories from '../screens/Categories';
import CategoryMeals from '../screens/CategoryMeals';
import MealDetails from '../screens/MealDetails';
import Favorites from '../screens/Favorites';
import Filters from '../screens/Filters';
import colors from '../constants/colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    width: 250
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
};

const MealsNavigator = createStackNavigator(
  {
    Categories,
    CategoryMeals,
    MealDetails
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites,
    MealDetails
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name='ios-restaurant' color={tabInfo.tintColor} size={20} />
        );
      },
      tabBarColor: colors.primary
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-star' color={tabInfo.tintColor} size={20} />;
      },
      tabBarColor: colors.accent
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: '#fff',
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold'
          },
          activeTintColor: colors.accent
        }
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: { drawerLabel: 'Meals' }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.accent,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
