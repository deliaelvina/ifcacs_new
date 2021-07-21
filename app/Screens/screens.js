import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

//Initializing
import Initializing from './Initializing';

//Login
import Login from './Login';
import ChangePass from './Login/changePass';

//Profile
import Profile from './Profile';

//Home
import Home from './Home';

//Billing
import Billing from './Billing';

//Registering Component Screen
export function registerScreen() {
  Navigation.registerComponent('Initializing', () =>
    gestureHandlerRootHOC(Initializing),
  );

  Navigation.registerComponent('tab.Home', () => gestureHandlerRootHOC(Home));

  //Login
  Navigation.registerComponent('screen.Login', () =>
    gestureHandlerRootHOC(Login),
  );
  Navigation.registerComponent('screen.ChangePass', () =>
    gestureHandlerRootHOC(ChangePass),
  );

  //Profile
  Navigation.registerComponent('tab.Profile', () =>
    gestureHandlerRootHOC(Profile),
  );

  //Billing
  Navigation.registerComponent('screen.Billing', () =>
    gestureHandlerRootHOC(Billing),
  );
}
