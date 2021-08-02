import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import colors from '../../Theme/Colors';
import EmergencyList from './EmergencyList';

// const modalizeRef = useRef(null);

export default class EmergencyCall extends React.Component {
  // handleClose = dest => {
  //     if (modalizeRef.current) {
  //         modalizeRef.curreant.close(dest);
  //     }
  // };
  //     renderContent = () => {
  //         return (
  //             <View style={s.content}>
  //                 <Text style={s.content__subheading}>{'Introduction'.toUpperCase()}</Text>
  //                 <Text style={s.content__heading}>Always open modal!</Text>
  //                 <Text style={s.content__description} >What is Lorem Ipsum?
  //                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

  //                 Why do we use it?
  //                 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

  //                 Where does it come from?
  //                 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  // The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text>
  //                 <Button name="Close to initial position" onPress={() => this.handleClose('alwaysOpen')} />
  //                 <Button name="Close completely" onPress={() => this.handleClose} />
  //             </View>
  //         )
  //     }
  // renderContent = () => (

  // );
  render() {
    return (
      <ImageBackground
        // source={require('@Asset/images/cat.png')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.bg_peach,
        }}>
        {/* <View style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingHorizontal: 20
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Home")}
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 13,
                            borderRadius: 10,
                            marginTop: 30,
                            backgroundColor: "#8bbcdb"
                        }}
                    >
                        <Image
                            source={require('@Asset/images/a1.png')}
                            style={{ width: 20, height: 15 }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        paddingHorizontal: 10,
                        paddingVertical: 13,
                        borderRadius: 10,
                        marginTop: 30,
                        backgroundColor: "#8bbcdb",
                        marginLeft: 240
                    }}>
                        <Image
                            source={require('@Asset/images/hum.png')}
                            style={{ height: 15, width: 20 }}
                        />
                    </View>
                </View> */}
        <Text
          style={{
            color: colors.bg_abuabu,
            fontSize: 20,
            // fontFamily: "Bold",
            width: 200,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 34,
            paddingTop: 40,
          }}>
          Emergency Calls
        </Text>
        <Image
          source={require('@Asset/images/new/emergencycall/siren.png')}
          style={{width: 100, height: 100, alignSelf: 'center', top: 20}}
        />
        <Modalize
          handleStyle={{
            marginTop: 30,
            backgroundColor: colors.bg_hijautua,
            width: 80,
          }}
          modalStyle={{
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            backgroundColor: colors.bg_putih,
          }}
          alwaysOpen={200}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          handlePosition="outside">
          <View style={{flex: 1}}>
            <ScrollView style={{marginTop: 40}}>
              <EmergencyList
                // onPress={() => this.props.navigation.navigate("Xd")}
                img={require('@Asset/images/new/emergencycall/fireman.png')}
                title="Firefighter"
                bg={colors.bg_peach}
                call={() => Linking.openURL(`tel:082`)}
              />
              <EmergencyList
                img={require('@Asset/images/new/emergencycall/ambulance.png')}
                title="Ambulance"
                bg={colors.bg_hijautua}
                call={() => Linking.openURL(`tel:082`)}
              />
              <EmergencyList
                img={require('@Asset/images/new/emergencycall/police.png')}
                title="Police"
                bg={colors.bg_peach}
                call={() => Linking.openURL(`tel:082`)}
              />
              <EmergencyList
                img={require('@Asset/images/new/emergencycall/heavy-rain.png')}
                title="Natural Disasters Post"
                bg={colors.bg_hijautua}
                call={() => Linking.openURL(`tel:082`)}
              />
              <EmergencyList
                img={require('@Asset/images/new/emergencycall/electrical-energy.png')}
                title="Electrical Engineering"
                bg={colors.bg_peach}
                call={() => Linking.openURL(`tel:082`)}
              />
              <EmergencyList
                img={require('@Asset/images/new/emergencycall/support.png')}
                title="Suicide Prevention"
                bg={colors.bg_hijautua}
              />
              {/* <CourseList
                                img={require('@Asset/images/ae.png')}
                                title="UI Motion Design in After Effects"
                                bg="#fcf2ff"
                            /> */}
            </ScrollView>
          </View>
        </Modalize>
      </ImageBackground>
    );
  }
}

// const s = StyleSheet.create({
//     content: {
//         padding: 20,
//     },

//     content__modal: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.45,
//         shadowRadius: 16,
//     },

//     content__subheading: {
//         marginBottom: 2,

//         fontSize: 16,
//         fontWeight: '600',
//         color: '#ccc',
//     },

//     content__heading: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: '#333',
//     },

//     content__description: {
//         paddingTop: 10,
//         paddingBottom: 10,

//         fontSize: 15,
//         fontWeight: '200',
//         lineHeight: 22,
//         color: '#666',
//     },
// });
