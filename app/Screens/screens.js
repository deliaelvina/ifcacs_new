import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

//Initializing
import Initializing from './Initializing';

//Login
import Login from './Login';

//Registering Component Screen
export function registerScreen() {
  Navigation.registerComponent('Initializing', () =>
    gestureHandlerRootHOC(Initializing),
  );

  //Login
  Navigation.registerComponent('screen.Login', () =>
    gestureHandlerRootHOC(Login),
  );
}
