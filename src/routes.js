import 'react-native-gesture-handler';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Tab = createBottomTabNavigator();

function New() {
  return (
    <Stack2.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack2.Screen
        name="Selecione o prestador"
        component={SelectProvider}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Agendamentos');
                }}
              >
                <Icon name="chevron-left" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack2.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) => {
          return {
            title: 'Selecione o horário',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="chevron-left" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack2.Screen
        name="Confirm"
        component={Confirm}
        options={({ navigation }) => {
          return {
            title: 'Confirmar agendamento',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="chevron-left" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack2.Navigator>
  );
}

export default function Routes() {
  const isLoggedIn = useSelector((state) => state.auth.signed);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#fff',
            inactiveTintColor: 'rgba(255,255,255, 0.6)',
            style: {
              backgroundColor: '#8d41a8',
              borderTopColor: '#8d41a8',
            },
          }}
        >
          <Tab.Screen
            name="Agendamentos"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="event" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Agendar"
            component={New}
            options={{
              unmountOnBlur: true,
              tabBarVisible: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
