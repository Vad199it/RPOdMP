import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, NavigationEvents} from 'react-native';
import {SectionGrid} from 'react-native-super-grid';
import {Searchbar} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  getActiveChildNavigationOptions,
} from 'react-navigation';
const icon = require('./icon.js');
var item = require('./data.json');
var RFNS = require('react-native-fs');
const Placeholder = ({text}) => (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
);


class A extends React.Component {

  constructor() {
    super();
    setInterval(() => this.forceUpdate(), 400);
  }
  state = {
    firstQuery: '',
    filteredList: item,
  };


  static navigationOptions = {
    tabBarLabel: 'Store',
    header: null,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },

    tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./icon/store.png')}
            style={[styles.icon]}
        />
    ),
  };


  render() {
    const {firstQuery} = this.state;
    const {navigation} = this.props;
    return (
        <View style={styles.viewStyle}>
          <Searchbar style={{height: 40}}
                     placeholder="Search"
                     inputStyle={[styles.SearchBar]}
                     onChangeText={query => {
                       const filteredList = item.filter(el => !query || (query && el.name.toLowerCase().indexOf(query.toLowerCase().trim()) === 0));
                       this.setState({firstQuery: query, filteredList});
                     }}
                     value={firstQuery}

          />
          <SectionGrid
              itemDimension={70}
              // staticDimension={300}
              //fixed
              spacing={5}
              sections={[
                {
                  title: 'Clothes',
                  data: this.state.filteredList.slice(0, 21),

                },
              ]}

              style={styles.gridView}

              renderItem={({item, section, index}) => (
                  <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
                    <ImageBackground source={icon[item.product]} style={{width: '100%', height: '100%'}}>
                      <Badge status='success'
                             value={item.amount}
                             textStyle={{fontSize: 8}}
                             containerStyle={{position: 'absolute', top: -4, right: -4}}
                             badgeStyle={{backgroundColor: item.code, height: 10}}
                      />
                      <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => {
                          navigation.navigate('D', {
                            image_product: icon[item.product],
                            product_name: item.name,
                            price_product: item.price,
                            size_product: item.size,
                            amount_product: item.amount,
                            bought_product: item.buy,
                            id: item.id
                          })
                        }}>
                          <Text style={styles.itemName}> {item.name}</Text>
                        </TouchableOpacity>
                      </View>

                    </ImageBackground>
                  </View>
              )}
              renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
          />
        </View>
    );
  }
}

class B extends React.Component {
  constructor() {
    super();
    setInterval(() => this.forceUpdate(), 400);
  }

  state = {
    firstQuery: '',
  };

  static navigationOptions = {
    tabBarLabel: 'Bag',
    header: null,
    tabBarOptions: {
      activeTintColor: 'black',
    },
    tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./icon/bag.png')}
            style={[styles.icon]}
        />
    ),
  };
  // componentWillFocus=()=>{
  // this.forceUpdate();
  // };

  render() {
    const {navigation} = this.props;
    const {firstQuery} = this.state;

    return (
        <View style={styles.viewStyle}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#E9967A',
            height: 20,
            justifyContent: 'center'
          }}>
            <TouchableOpacity onPress={() => {
              item.forEach(el=>{el.amount = el.amount - el.buy; el.buy = 0});
              this.forceUpdate();
            }}>
              <Image style={{height: 20, width: 20}} source={require('./icon/buy.png')}/>
            </TouchableOpacity>
          </View>
          <SectionGrid
              itemDimension={230}
              // staticDimension={300}
              //fixed
              spacing={5}
              sections={[

                {
                  title: 'Your bag',
                  data: item.slice(0, 21),

                },

              ]}
              style={styles.gridView}

              renderItem={({item ,section, index}) => {
                  // console.log(item.buy);
                //console.log(item.buy);
                if (item.buy !== 0) {
                  //console.log(item.buy);
                    console.log(item);
                  return (

                      <View style={[styles.itemContainerows, {backgroundColor: item.code}]}>
                        <TouchableOpacity style={{width: 235, flex: 1, flexDirection: 'row'}}
                                          onPress={() => {
                                            navigation.navigate('D', {
                                              image_product: icon[item.product],
                                              product_name: item.name,
                                              price_product: item.price,
                                              size_product: item.size,
                                              amount_product: item.amount,
                                              id: item.id

                                            })
                                          }}>
                          <View style={{width: 70, height: 70}}>
                            <Image source={icon[item.product]} style={{width: 70, height: 70}}/>
                            <Badge status='success'
                                   value={item.buy}
                                   textStyle={{fontSize: 8}}
                                   containerStyle={{position: 'absolute', top: -4, right: -4}}
                                   badgeStyle={{backgroundColor: item.code, height: 10}}
                            />
                          </View>
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.itemNamerow}>{item.name}</Text>
                          </View>
                          <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          }} onPress={() => {
                            item.buy = 0; this.forceUpdate();}}>
                            <Image style={{width: 20, height: 20}}
                                   source={require('./icon/delete.png')}/>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>
                  )
                }
              }}
              renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
          />
        </View>
    );
  }
}

class C extends React.Component {
  constructor() {
    super();
    setInterval(() => this.forceUpdate(), 400);
  }

  state = {
    firstQuery: '',
    isModalVisible: false,
    filteredList: item,
  };


  static navigationOptions = {
    tabBarLabel: 'Rows',
    header: null,
    tabBarOptions: {
      activeTintColor: 'black',
    },

    tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./icon/rows.png')}
            style={[styles.icon]}
        />
    ),
  };


  render() {
    const {navigation} = this.props;
    const {firstQuery} = this.state;
    return (
        <View style={styles.viewStyle}>
          <Searchbar style={{height: 40}}
                     placeholder="Search"
                     inputStyle={[styles.SearchBar]}
                     onChangeText={query => {
                       const filteredList = item.filter(el => !query || (query && el.name.toLowerCase().indexOf(query.toLowerCase().trim()) === 0));
                       this.setState({firstQuery: query, filteredList});
                     }}
                     value={firstQuery}

          />
          <SectionGrid
              itemDimension={230}
              // staticDimension={300}
              //fixed
              spacing={5}
              sections={[
                {
                  title: 'Clothes',
                  data: this.state.filteredList.slice(0, 21),

                },
              ]}

              style={styles.gridView}

              renderItem={({item, section, index}) => {
                // console.log(index, section, item);
                return (

                    <View style={[styles.itemContainerows, {backgroundColor: item.code}]}>
                      <TouchableOpacity style={{width: 235, flex: 1, flexDirection: 'row'}} onPress={() => {
                        navigation.navigate('D', {
                          image_product: icon[item.product],
                          product_name: item.name,
                          price_product: item.price,
                          size_product: item.size,
                          amount_product: item.amount,
                          bought_product: item.buy,
                          id: item.id
                        })
                      }}>
                        <View style={{width: 70, height: 70}}>
                          <Image source={icon[item.product]} style={{width: 70, height: 70}}/>
                          <Badge status='success'
                                 value={item.amount}
                                 textStyle={{fontSize: 8}}
                                 containerStyle={{position: 'absolute', top: -4, right: -4}}
                                 badgeStyle={{backgroundColor: item.code, height: 10}}
                          />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={styles.itemNamerow}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                )
              }}
              renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
          />
        </View>
    );
  }

}

class D extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: '1'};
  }

  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if ((numbers.indexOf(text[i]) > -1) && (numbers.indexOf(text[i]) !== 0)) {
        if (numbers.indexOf(text[i]) <= this.props.navigation.getParam('amount_product')) {
          newText = newText + text[i];
        } else {
          alert("In stock, there are not so many clothes");
        }
      }
      else {
        alert("please enter numbers [1,9]");
      }
    }
    this.setState({myNumber: newText});

  }


  static navigationOptions = {
    header: null,
    tabBarLabel: 'Back',
    tabBarIcon: ({tintColor}) => (
        <Image
            source={require('./icon/back.png')}
            style={[styles.icon]}
        />
    ),
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
    headerTitleStyle: {
      flex: 1,
      color: '#000',
      textAlign: 'center',
      alignSelf: 'center'
    },

  };

  render() {
    const {navigation} = this.props;
    const {id} = navigation.state.params;

    return (
        <View style={{flex: 1, backgroundColor: '#faf4e8', flexDirection: 'column'}}>
          <Text style={{
            textAlign: 'center',
            top: 10,
            fontSize: 15
          }}>{this.props.navigation.getParam('product_name')}</Text>
          <View style={{flex: 1, flexDirection: 'row', height: 120}}>
            <View>
              <Image style={{height: 100, width: 100, marginTop: 20, marginLeft: 10}}
                     source={this.props.navigation.getParam('image_product')}/>
            </View>
            <View style={{
              height: 80,
              width: 100,
              marginTop: 35,
              marginLeft: 20,
              justifyContent: 'space-between'
            }}>
              <Text>Current: {this.props.navigation.getParam('amount_product')}</Text>
              <Text>Size: {this.props.navigation.getParam('size_product')}</Text>
              <Text>Price(X1): {this.props.navigation.getParam('price_product')}$</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{marginTop: 10}}>
                  <Text>Amount:</Text>
                </View>
                <View>
                  <TextInput
                      placeholder='0'
                      maxLength={1}
                      style={{
                        width: 35,
                        height: 40
                      }}
                      keyboardType='numeric'
                      onChangeText={(text) => this.onChanged(text)}
                      value={this.state.myNumber}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={{marginTop: 80}} onPress={() => {
              // console.log(this.props.navigation.getParam('buy_product'));
              //item.buy = +this.state.myNumber;
              //  item = JSON.parse(JSON.stringify(item, (key, value)=> value.buy = +this.state.myNumber));
              // this.props.navigation.getParam('bought_product') = +this.state.myNumber;
              item.find(i => i.id == id).buy = +this.state.myNumber;
              //console.log(item[1]);
              //console.log(item.find(i => i.id == id).buy);
              var path = RFNS.DocumentDirectoryPath + '/data.json';
              RFNS.writeFile(path, JSON.stringify(item))
                  .then((success) => {
                    console.log('FILE WRITTEN!');
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              console.log(item);
              // this.bought_product = +this.state.myNumber;
              // console.log(this.bought_product);
              // navigation.navigate('B', {
              //     bought_product: this.bought_product
              // })

            }}>
              <Image source={require('./icon/addBag-24.png')}/>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}

const HomeStack = createStackNavigator({A, D, B}, {
  navigationOptions: ({navigation, screenProps}) => ({
    // you can put fallback values before here, eg: a default tabBarLabel
    ...getActiveChildNavigationOptions(navigation, screenProps),
    // put other navigationOptions that you don't want the active child to
    // be able to override here!
  })
});

let BagsStack = createStackNavigator({C, D}, {
  navigationOptions: ({navigation, screenProps}) => ({
    ...getActiveChildNavigationOptions(navigation, screenProps),
  })
});

let SettingsStack = createStackNavigator({B, D}, {
  navigationOptions: ({navigation, screenProps}) => ({
    ...getActiveChildNavigationOptions(navigation, screenProps),
  })
});


export default createAppContainer(createBottomTabNavigator({
  HomeStack,
  BagsStack,
  SettingsStack,

}));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 30,
    height: 30,
    margin: 0,
    padding: 0,
  },

  image: {
    width: 78,
    height: 78,
  },

  gridView: {
    flex: 1,
    backgroundColor: '#FFF5EE',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 2,
    height: 90,
  },
  itemName: {
    fontSize: 10,
    color: '#000',
    fontWeight: '600',
    paddingTop: 73,
    textAlign: 'center',
  },

  sectionHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'center',
    backgroundColor: '#E9967A',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },

  viewStyle: {
    flex: 1,
  },

  itemContainerows: {
    flex: 1,
    borderRadius: 5,
    padding: 5,
    height: 80,
  },

  itemNamerow: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',


  }

});