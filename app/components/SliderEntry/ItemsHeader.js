import React from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import {ParallaxImage} from 'react-native-snap-carousel';
import styleItems from './styleItems';
import Style from '../../Theme/Style';

export default function ItemsHeader(props) {
  const {item, parallaxProps, onPress} = props;

  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styleItems.item}>
        <ParallaxImage
          source={{uri: item.image}}
          containerStyle={styleItems.imageContainer}
          style={styleItems.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {item.id && (
          <View style={styleItems.newsTitle}>
            <Text style={[Style.textWhite, Style.textMedium]} numberOfLines={2}>
              {item.id}
            </Text>
            {/* <Text style={styleItems.newsTitleText_small}>{item.descs}</Text> */}
          </View>
        )}

        {/* <View style={styleItems.newsTitle_small}>
              <Text style={styleItems.newsTitleText_small} numberOfLines={2}>
                  { item.descs }
              </Text>
            </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
