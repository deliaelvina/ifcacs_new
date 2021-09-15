import {Dimensions, PixelRatio} from 'react-native';
import {color} from 'styled-system';
import colors from '../../Theme/Colors';
import fonts from '../../Theme/Fonts';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  tabStyle: {
    borderColor: colors.rs_grey,
    backgroundColor: '#F6F9FC',
    paddingVertical: 10,
  },
  tabTextStyle: {
    color: colors.rs_grey,
    fontFamily: fonts.PTSansWebRegular,
    fontSize: 15,
  },
  activeTabStyle: {backgroundColor: colors.rs_grey},
  activeTabTextStyle: {
    color: colors.bg_putih,
    fontSize: 15,
    fontFamily: fonts.PTSansWebBold,
  },
  textRegularMedium: {
    fontFamily: fonts.PTSansWebRegular,
    fontSize: 16,
  },
};
