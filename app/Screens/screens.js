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

// More Menu
import moreMenu from './Home/moreMenu';

//Billing
import Billing from './Billing';

//Emergency
import EmergencyCall from './Emergency/EmergencyCall';

//Amenities
import Amenities from './Amenities';

//NewsDetail
import NewsDetail from './News/NewsDetail';
import NewsMore from './News/NewsMore';
import News from './News';

//PromoDetail
import PromoDetail from './Promo/PromoDetail';
import Promo from './Promo';

import ContohCarousel from './contohcarousel';

//Announce
import Announce from './Announce';
import Regulation from './Regulation';
import showPDF from './Regulation/showPDF';
import Facility from './Facility';

//about us
import AboutUs from './AboutUs';
import FacilityDetail from './Facility/FacilityDetail';
import Privacy from './Privacy';
import AnnounceDetail from './Announce/AnnounceDetail';
import Helpdesk from './Helpdesk';
import SpecHelpDesk from './Helpdesk/SpecHelpDesk';
import SubmitHelpDesk from './Helpdesk/Submit';
import CategoryHelp from './Helpdesk/CategoryHelp';
import SelectCategory from './Helpdesk/SelectCategory';
import StatusHelp from './Helpdesk/StatusHelp';
import ViewHistory from './Helpdesk/ViewHistoryStatus';
import ViewHistoryDetail from './Helpdesk/ViewHistoryDetail';

//rent sale
import RentSale from './RentSale';

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

  //NewsAll
  Navigation.registerComponent('screen.News', () =>
    gestureHandlerRootHOC(News),
  );

  //PromoDetail
  Navigation.registerComponent('screen.PromoDetail', () =>
    gestureHandlerRootHOC(PromoDetail),
  );

  //PromoAll
  Navigation.registerComponent('screen.Promo', () =>
    gestureHandlerRootHOC(Promo),
  );

  //contoh carrousel
  Navigation.registerComponent('screen.ContohCarousel', () =>
    gestureHandlerRootHOC(ContohCarousel),
  );

  //Announce
  Navigation.registerComponent('screen.Announce', () =>
    gestureHandlerRootHOC(Announce),
  );
  Navigation.registerComponent('screen.AnnounceDetail', () =>
    gestureHandlerRootHOC(AnnounceDetail),
  );

  //Regulation
  Navigation.registerComponent('screen.Regulation', () =>
    gestureHandlerRootHOC(Regulation),
  );
  Navigation.registerComponent('screen.showPDF', () =>
    gestureHandlerRootHOC(showPDF),
  );

  //Facility
  Navigation.registerComponent('screen.Facility', () =>
    gestureHandlerRootHOC(Facility),
  );
  Navigation.registerComponent('screen.FacilityDetail', () =>
    gestureHandlerRootHOC(FacilityDetail),
  );

  //about us
  Navigation.registerComponent('screen.AboutUs', () =>
    gestureHandlerRootHOC(AboutUs),
  );

  //privacy policy
  Navigation.registerComponent('screen.Privacy', () =>
    gestureHandlerRootHOC(Privacy),
  );

  //helpdesk
  Navigation.registerComponent('screen.Helpdesk', () =>
    gestureHandlerRootHOC(Helpdesk),
  );
  Navigation.registerComponent('screen.SpecHelpDesk', () =>
    gestureHandlerRootHOC(SpecHelpDesk),
  );
  Navigation.registerComponent('screen.SubmitHelpDesk', () =>
    gestureHandlerRootHOC(SubmitHelpDesk),
  );
  Navigation.registerComponent('screen.CategoryHelp', () =>
    gestureHandlerRootHOC(CategoryHelp),
  );
  Navigation.registerComponent('screen.SelectCategory', () =>
    gestureHandlerRootHOC(SelectCategory),
  );
  Navigation.registerComponent('screen.StatusHelp', () =>
    gestureHandlerRootHOC(StatusHelp),
  );
  Navigation.registerComponent('screen.ViewHistoryStatus', () =>
    gestureHandlerRootHOC(ViewHistory),
  );
  Navigation.registerComponent('screen.ViewHistoryDetail', () =>
    gestureHandlerRootHOC(ViewHistoryDetail),
  );

  //more menu
  Navigation.registerComponent('screen.moreMenu', () =>
    gestureHandlerRootHOC(moreMenu),
  );

  //rent sale
  Navigation.registerComponent('screen.RentSale', () =>
    gestureHandlerRootHOC(RentSale),
  );
}
