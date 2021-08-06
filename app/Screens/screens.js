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

//Emergency
import EmergencyCall from './Emergency/EmergencyCall';

//Amenities
import Amenities from './Amenities';

//NewsDetail
import NewsDetail from './News/NewsDetail';
import NewsMore from './News/NewsMore';

//PromoDetail
import PromoDetail from './Promo/PromoDetail';

import ContohCarousel from './contohcarousel';

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

  //Emergency
  Navigation.registerComponent('tab.Emergency', () =>
    gestureHandlerRootHOC(EmergencyCall),
  );

  //Amenities
  Navigation.registerComponent('screen.Amenities', () =>
    gestureHandlerRootHOC(Amenities),
  );

  //NewsDetail
  Navigation.registerComponent('screen.NewsDetail', () =>
    gestureHandlerRootHOC(NewsDetail),
  );
  Navigation.registerComponent('screen.NewsMore', () =>
    gestureHandlerRootHOC(NewsMore),
  );

  //PromoDetail
  Navigation.registerComponent('screen.PromoDetail', () =>
    gestureHandlerRootHOC(PromoDetail),
  );

  //contoh carrousel
  Navigation.registerComponent('screen.ContohCarousel', () =>
    gestureHandlerRootHOC(ContohCarousel),
  );
}
