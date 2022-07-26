import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import LoginContext from '../context/loginContext';
import HomeMedico from '../screens/HomeMedico';
import HomePaciente from '../screens/HomePaciente';

const Tab = createStackNavigator();
const AuthenticationStack = createStackNavigator();

const AuthenticationTabStack = () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
    <AuthenticationStack.Screen options={{ headerShown: false }} name="Register" component={Register} />
  </AuthenticationStack.Navigator>
)

const TabApp = ({ typeUser}) => {
  return (
    <Tab.Navigator>
      {
        typeUser == "Medico" ?
        <Tab.Screen name="HomeMedico" options={{ headerShown: false }} component={HomeMedico} />
        : <Tab.Screen name="HomePaciente" options={{ headerShown: false }} component={HomePaciente} />
      }
    </Tab.Navigator>
  );
}

const Routes = () => {
  const {user, typeUser} = useContext(LoginContext);
  return (
    <NavigationContainer>
      {user ? <TabApp typeUser={typeUser}/> : <AuthenticationTabStack/>}
    </NavigationContainer>
  )
}

export default Routes;
