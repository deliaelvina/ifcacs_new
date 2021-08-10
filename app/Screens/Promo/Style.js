import {Dimensions} from 'react-native';
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
import colors from '../../Theme/Colors';

export default {
  activeTabStyle: {backgroundColor: colors.bg_peach},
  activeTabTextStyle: {
    color: colors.bg_coklat,
    fontFamily: 'Montserrat-SemiBold',
  },
  tabStyle: {
    borderColor: colors.bg_coklat,
    backgroundColor: colors.bg_coklat,
    paddingVertical: 10,
  },
  tabTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  subWrap: {
    marginTop: 16,
  },
};
