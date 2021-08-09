import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import colors from '../Theme/Colors';
const selectedColor = colors.bg_hijaugelap;
const iconColor = colors.bg_coklat;

let iconHome;
let iconStatus;
let iconEmergency;
let iconInbox;
let iconProfile;
// if (Platform.OS == 'android') {
//   iconHome = require('@Asset/icons/home.png');
//   iconStatus = require('@Asset/icons/status.png');
//   iconEmergency = require('@Asset/icons/emergency.png');
//   iconInbox = require('@Asset/icons/notif.png');
//   iconProfile = require('@Asset/icons/profile.png');
// } else {
//   iconHome = require('@Asset/icons/ios-home.png');
//   iconStatus = require('@Asset/icons/ios-status.png');
//   iconEmergency = require('@Asset/icons/ios-emergency.png');
//   iconInbox = require('@Asset/icons/ios-notif.png');
//   iconProfile = require('@Asset/icons/ios-profile.png');
// }
if (Platform.OS == 'android') {
  iconHome = require('@Asset/icons/home.png');
  iconStatus = require('@Asset/icons/emergency-call.png');

  // iconEmergency = require('@Asset/icons/emergency.png')
  // iconInbox = require('@Asset/icons/notif.png')
  iconProfile = require('@Asset/icons/profile.png');
} else {
  // iconHome = require('@Asset/icons/ios-home.png')
  iconHome = require('@Asset/icons/home-ios.png');
  //   iconStatus = require('@Asset/icons/emergency-call-ios.png');
  iconStatus = require('@Asset/icons/ios-emergency.png');
  // iconStatus = require('@Asset/icons/ios-status.png')
  // iconEmergency = require('@Asset/icons/ios-emergency.png')
  // iconInbox = require('@Asset/icons/ios-notif.png')
  iconProfile = require('@Asset/icons/ios-profile.png');
}

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'tab.Home',
                    options: {
                      // topBar:{
                      //   visible:false,
                      //   height:0
                      // },

                      animations: {
                        push: {
                          enabled: 'false',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: iconHome,
                  iconInsets: {bottom: -5},
                  iconColor: iconColor,
                  textColor: iconColor,
                  selectedIconColor: selectedColor,
                  selectedTextColor: selectedColor,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'tab.Emergency',
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Emergency Call',
                  icon: iconStatus,
                  iconInsets: {bottom: -5},
                  iconColor: iconColor,
                  textColor: iconColor,
                  selectedIconColor: selectedColor,
                  selectedTextColor: selectedColor,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'tab.Profile',
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: iconProfile,
                  iconInsets: {bottom: -5},
                  iconColor: iconColor,
                  textColor: iconColor,
                  selectedIconColor: selectedColor,
                  selectedTextColor: selectedColor,
                },
              },
            },
          },
        ],
        options: {
          bottomTabs: {
            visible: true,
            animate: false,
            translucent: false,
            disableIconTint: true,
            disableSelectedIconTint: true,
            fontSize: 10,
            titleDisplayMode: 'alwaysShow',
          },
        },
      },
    },
  });

// export const goToAuth = () =>
export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'screen.Login',
            },
          },
        ],
      },
    },
  });
// Navigation.setRoot({
//   root: {
//     stack: {
//       id: 'App',
//       children: [
//         {
//           component: {
//             // name: 'screen.Home',
//             name: 'tab.Home',
//           },
//         },
//       ],
//     },
//   },
// });
// Navigation.setRoot({
//   root: {
//     bottomTabs: {
//       id: 'BottomTabsId',
//       children: [
//         {
//           stack: {
//             children: [
//               {
//                 component: {
//                   name: 'tab.Home',
//                   options: {
//                     // topBar:{
//                     //   visible:false,
//                     //   height:0
//                     // },

//                     animations: {
//                       push: {
//                         enabled: 'false',
//                       },
//                     },
//                   },
//                 },
//               },
//             ],
//             options: {
//               bottomTab: {
//                 text: 'Home',
//                 icon: iconHome,
//                 iconInsets: {bottom: -5},
//                 iconColor: iconColor,
//                 textColor: iconColor,
//                 selectedIconColor: selectedColor,
//                 selectedTextColor: selectedColor,
//               },
//             },
//           },
//         },
//         {
//           stack: {
//             children: [
//               {
//                 component: {
//                   name: 'tab.Profile',
//                   options: {
//                     topBar: {
//                       visible: false,
//                     },
//                   },
//                 },
//               },
//             ],
//             options: {
//               bottomTab: {
//                 text: 'Profile logout',
//                 icon: iconProfile,
//                 iconInsets: {bottom: -5},
//                 iconColor: iconColor,
//                 textColor: iconColor,
//                 selectedIconColor: selectedColor,
//                 selectedTextColor: selectedColor,
//               },
//             },
//           },
//         },
//       ],
//       options: {
//         bottomTabs: {
//           visible: true,
//           animate: false,
//           translucent: false,
//           disableIconTint: true,
//           disableSelectedIconTint: true,
//           fontSize: 10,
//           titleDisplayMode: 'alwaysShow',
//         },
//       },
//     },
//   },
// });
