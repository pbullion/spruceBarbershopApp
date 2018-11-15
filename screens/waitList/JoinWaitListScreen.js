import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import axios from "axios";
import { Button } from "react-native-elements";

class JoinWaitListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            staff: null,
            availableStaff: [
                {value:"Patrick"},
                {value:"Oscar"},
                {value:"Mallory"},
                {value:"Michelle"},
                {value:"Johnny"},
                {value:"James"}
            ],
            service: []
        }
    }
    static navigationOptions = {
        title: 'Join the Waitlist',
        headerStyle: {
            backgroundColor: 'rgba(53, 96, 68, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    _onRefresh = () => {

    };

    componentDidMount() {
        axios.get(`http://52.37.61.234:3001/services/category/Additional`)
            .then(res => {
                const service = res.data;
                var i;
                for (i = 0; i < service.length; i++) {
                    this.state.service.push({value: service[i].name});
                }
            });
    }

    render() {
        console.log('current user props', this.props.currentUser);
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {/*<Text>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</Text>*/}
                <Text style={styles.name}>Patrick Bullion</Text>
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Available Staff'
                    fontSize={20}
                    labelFontSize={16}
                    data={this.state.availableStaff}
                    baseColor='#ffffff'
                    textColor='#ffffff'
                    selectedItemColor='#000000'
                    overlayStyle={{marginTop: 90}}
                />
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Service'
                    fontSize={20}
                    labelFontSize={16}
                    data={this.state.service}
                    baseColor='#ffffff'
                    textColor='#ffffff'
                    selectedItemColor='#000000'
                    overlayStyle={{marginTop: 90}}
                />
                <Button
                    raised
                    large
                    title='SUBMIT'
                    borderRadius={18}
                    fontSize={22}
                    color='#356044'
                    containerViewStyle={{borderRadius: 18}}
                    buttonStyle={styles.submitButton}
                    onPress={() => {}}
                />
            </ScrollView>
        );
    }
}


function mapStateToProps(state) {
    console.log('state', state);
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(JoinWaitListScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#356044',
    },
    contentContainer: {
        width: '100%',
        paddingTop: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
    },
    name: {
        color: '#ffffff',
        fontSize: 40,
        marginBottom: 20
    },
    dropdown: {
        width: '80%'
    },
    submitButton: {
        backgroundColor: '#ffffff',
        width: 200,
        marginTop: 40
    },
});
