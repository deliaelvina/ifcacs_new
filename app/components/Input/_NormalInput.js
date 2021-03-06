import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Style from '../../Theme/Style';

const NormalInput = props => {
  return (
    <View>
      <Text style={Style.textBlack}>{props.label}</Text>
      <TextInput
        style={[Style.textBlack, styles.input]}
        placeholder={props.label}
        placeholderTextColor="#a9a9a9"
        keyboardType="default"
        returnKeyType="next"
        autoCorrect={false}
        value={props.value}
        editable={props.editable}
        onChangeText={props.onChangeText}
        {...props}
      />
      {props.required == true ? (
        <Text style={{color: 'red', fontSize: 10, marginTop: -16}}>
          Field this blank
        </Text>
      ) : null}
    </View>
  );
};

export default NormalInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 16,
    width: null,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
