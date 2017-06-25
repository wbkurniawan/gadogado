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

import {
    Card,
    Icon,
} from 'react-native-material-design';

import { MonoText } from '../components/StyledText';

const path = 'http://82.165.156.145/gadogado/assets/img/products/';
const defaultMainPictures = [
    `${path}1_1_gadogado.JPG`,
];


export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true            
        }
    }
    
    componentDidMount() {
        var productId = this.props.route.params.productId;
        return fetch('http://82.165.156.145/gadogado/api/product/'+productId)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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
                <Text>Product Detail {this.props.route.params.productId}</Text>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    productIcon:{

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },  
});
