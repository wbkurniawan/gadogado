import React from 'react';
import {
    Image,
    Linking,
    Platform,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Router from '../navigation/Router';

import {
    Card,
    Icon,
} from 'react-native-material-design';

import CardMedia from 'react-native-card-media';
import { MonoText } from '../components/StyledText';

const path = 'http://82.165.156.145/gadogado/assets/img/products/';
const defaultMainPictures = [
    `${path}1_1_gadogado.JPG`,
];


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    static route = {
        navigationBar: {
            visible: false,
        },
    };

    onPress(productId) {
        console.log('on Press - open ProductDetail ' + productId);
        this.props.navigator.push(Router.getRoute('productDetail', {productId: productId}));
    }

    renderImageIconView() {
        return (
            <Icon
                name="image"
                color="#fafafa"
                size={24}
                style={{ top: 6 }}
            />
        );
    }

    getImages(images){
        if(images == null){
            return defaultMainPictures;
        }else{
            return images;
        }
    }

    componentDidMount() {
        return fetch('http://82.165.156.145/gadogado/api/products?categoryId=1')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 50}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => item.product_id}
                    renderItem={({item}) =>
                      <Card style={styles.cardStyle}
                            id={item.product_id}>
                          <View style={{ flex: 1, flexDirection: 'row',margin:5}}>
                              <Icon name="account-circle" size={25} style={styles.productIcon} color="rgba(0,0,255,.9)" />
                              <Text style={{fontWeight:'bold'}}>{item.user_name}</Text>
                              <Icon name="star" size={20} color="#ffcc00" />
                              <Icon name="star" size={20} color="#ffcc00" />
                              <Icon name="star" size={20} color="#ffcc00" />
                          </View>
                          <CardMedia
                              style={{ height: 200 }}
                              title={item.name}
                              titleStyle={{ fontSize: 24, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                              files={this.getImages(item.images)}
                              onPress={() => this.onPress(item.product_id)}
                              titleTouchable={true}
                              imageTouchable={true}
                          />
                          <Card.Body>
                              <Text>
                                  {item.description}
                              </Text>
                              <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View style={{ flex: 1, alignItems:'center'}}>
                                      <Text style={{fontWeight:'bold'}}>{item.price} €</Text>
                                  </View>
                                  <View style={{ flex: 1, alignItems:'center'}}>
                                      <Text style={{fontWeight:'bold'}}>{item.pickup_date}</Text>
                                  </View>
                              </View>
                          </Card.Body>
                      </Card>
                    }
                />
          </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
        const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
        );

        return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
        );
    } else {
        return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
        );
    }
}

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
    productIcon:{

    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
