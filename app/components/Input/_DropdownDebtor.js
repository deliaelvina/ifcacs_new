import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import ModalSelector from 'react-native-modal-selector';
// import {Modalize} from 'react-native-modalize';
import Style from '../../Theme/Style';

const DropdownDebtor = props => {
  return (
    // <NativeBaseProvider>
    <View>
      {props.label && (
        <Text style={Style.textBlack}>{`Select ${props.label}`}</Text>
      )}

      <ModalSelector
        data={props.data}
        optionTextStyle={{color: '#333'}}
        selectedItemTextStyle={{color: '#3C85F1'}}
        accessible={true}
        keyExtractor={item => item.debtor_acct}
        labelExtractor={item => item.debtor_acct + ` - ` + item.name} //khusus untuk debtor
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={option => {
          props.onChange(option);
        }}>
        <TextInput
          style={[Style.textBlack, styles.input]}
          onFocus={() => this.selector.open()}
          placeholder={props.label}
          editable={false}
          placeholderTextColor="#a9a9a9"
          value={props.value}
        />
      </ModalSelector>
    </View>
    // </NativeBaseProvider>
  );
};

export default DropdownDebtor;

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
