import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {url_image},
      parallax,
      parallaxProps,
      even,
    } = this.props;
    console.log('data image slidder', url_image);

    return url_image != 0 ? (
      parallax ? (
        <ParallaxImage
          source={{uri: url_image}}
          containerStyle={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner={true}
          spinnerColor={
            even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'
          }
          {...parallaxProps}
        />
      ) : (
        <Image source={{uri: url_image}} style={styles.image} />
      )
    ) : (
      <View>
        <Text>no imaage</Text>
      </View>
    );
  }

  render() {
    const {
      data: {announce_title, announce_descs},
      even,
    } = this.props;

    const uppercaseTitle = announce_title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`);
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}>
            {announce_descs}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
