import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, {colors} from './styles/index.style';
// import {ENTRIES1, ENTRIES2} from './static/entries';
import {scrollInterpolators, animatedStyles} from './utils/animations';

export default function MomentumCarousel(props) {
  const {number, title, data, renderItem, sliderWidth, itemWidth} = props;

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.title}>{`Example ${number}`}</Text>
      <Text style={styles.subtitle}>{title}</Text>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'start'}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
      />
    </View>
  );
}
