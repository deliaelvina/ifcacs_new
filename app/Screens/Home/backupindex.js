// {/* --------- ANNOUNCEMENT ------- */}

// <View style={{paddingLeft: 10, paddingTop: 15}}>
//   <Text
//     style={{
//       color: colors.bg_abuabu,
//       fontSize: 16,
//       //fontFamily: 'Bold',
//       textAlign: 'left',
//       width: '100%',
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//     }}>
//     Announcement
//   </Text>
// </View>
// <Grid style={{paddingTop: 10}}>
//   <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
//     <TouchableOpacity
//       // // onPress={() => this.props.navigation.navigate('Cources')}
//       // onPress={() => this.handleNavigation(
//       //     "screen.Cources",
//       //     // this.state.totalInvoiceDue
//       // )}
//       style={{
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         alignItems: 'center',

//         height: 80,
//         width: '100%',
//         paddingVertical: 10,

//         paddingHorizontal: 10,
//         marginBottom: 15,
//         borderRadius: 20,
//         // textAlign: 'center',

//         // -- create shadow
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 1,
//         },
//         shadowOpacity: 0.22,
//         shadowRadius: 2.22,
//         elevation: 3,
//         // -- end create shadow
//       }}>
//       <View style={{flexDirection: 'column', width: '100%'}}>
//         {this.state.announce.length != 0 ? (
//           <View>
//             <View>
//               <Text
//                 style={{
//                   color: colors.bg_abuabu,
//                   fontSize: 16,
//                   //fontFamily: 'Bold',
//                   textAlign: 'center',
//                   width: '100%',
//                   fontWeight: 'bold',
//                 }}>
//                 {this.state.announce.announce_title}
//               </Text>
//             </View>
//             <View>
//               <Text
//                 style={{
//                   color: colors.bg_abuabu,
//                   fontSize: 14,
//                   //fontFamily: 'Bold',
//                   textAlign: 'center',
//                   width: '100%',
//                 }}>
//                 {this.state.announce.announce_descs}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View>
//             <View>
//               <Text
//                 style={{
//                   color: colors.bg_abuabu,
//                   fontSize: 16,
//                   //fontFamily: 'Bold',
//                   textAlign: 'center',
//                   width: '100%',
//                   fontWeight: 'bold',
//                 }}>
//                 Announcement
//               </Text>
//             </View>
//             <View>
//               <Text
//                 style={{
//                   color: colors.bg_abuabu,
//                   fontSize: 14,
//                   //fontFamily: 'Bold',
//                   textAlign: 'center',
//                   width: '100%',
//                 }}>
//                 No Announcement
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   </Col>
// </Grid>
// {/* --------- END ANNOUNCEMENT ------- */}

//  {
//    /* -------- NEWS -------- */
//  }
//  <View style={{paddingLeft: 10, paddingTop: 15}}>
//    <Text
//      style={{
//        color: colors.bg_abuabu,
//        fontSize: 16,
//        //fontFamily: 'Bold',
//        textAlign: 'left',
//        width: '100%',
//        fontWeight: 'bold',
//        textTransform: 'uppercase',
//      }}>
//      News
//    </Text>
//  </View>;
//  {
//    this.state.news ? (
//      this.state.news.length == 0 ? (
//        <View>
//          <Text>No News Available</Text>
//        </View>
//      ) : (
//        <View>
//          <ScrollView horizontal>
//            {this.state.news.map((item, index) => (
//              <TouchableOpacity
//                style={{
//                  paddingTop: 10,
//                  // -- create shadow
//                  shadowColor: '#000',
//                  shadowOffset: {
//                    width: 0,
//                    height: 1,
//                  },
//                  shadowOpacity: 0.22,
//                  shadowRadius: 2.22,
//                  elevation: 3,
//                  // -- end create shadow
//                  justifyContent: 'center',
//                }}
//                key={index}>
//                <Col
//                  style={{
//                    marginHorizontal: 5,
//                    marginBottom: 5,
//                  }}>
//                  <NewsList
//                    onPress={() =>
//                      this.handleNavigation('screen.NewsDetail', item)
//                    }
//                    desc={item.news_descs}
//                    bg={colors.bg_peachmuda}
//                    // bg={Style.hijaumuda}
//                    img={{uri: item.url_image}}
//                    // img={require('@Asset/images/new/news/Shelton.jpg')}
//                    title={item.news_title}
//                    numColumns={2}
//                    colorTextTitle={colors.bg_abuabu}
//                    colorTextDesc={colors.bg_abuabu}></NewsList>
//                </Col>
//              </TouchableOpacity>
//            ))}
//          </ScrollView>
//          <TouchableOpacity
//            style={{marginBottom: 10}}
//            onPress={() =>
//              this.handleNavigation('screen.NewsMore', this.state.news)
//            }>
//            <View
//              style={{
//                flexDirection: 'row',
//                alignItems: 'center',
//                justifyContent: 'flex-end',
//                paddingRight: 10,
//                paddingTop: 5,
//              }}>
//              <Text style={{color: colors.bg_abuabu, fontWeight: 'bold'}}>
//                more news
//              </Text>
//              <IconFA
//                name="chevron-right"
//                style={{
//                  fontSize: 16,
//                  paddingTop: 5,
//                  paddingLeft: 8,
//                  color: colors.bg_abuabu,
//                }}></IconFA>
//            </View>
//          </TouchableOpacity>
//        </View>
//      )
//    ) : (
//      <View>
//        <Text>no data</Text>
//      </View>
//    );
//  }

//  {
//    /* ------ END NEWS ------- */
//  }
