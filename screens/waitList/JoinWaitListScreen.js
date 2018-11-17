import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { Picker } from 'react-native-picker-dropdown'
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class JoinWaitListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            availableStaff: [
                "Patrick Bullion",
                "Oscar Miranda",
                "Mallory Petry",
                "Michelle Vincent",
                "Johnny Meier",
                "James Hunt"
            ],
            services: [],
            staffMember: "",
            service: ""
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

    _onSubmit = () => {
        alert(`staff member id: ${this.state.staffMember} service id: ${this.state.service}`);
        this.props.navigation.navigate('AuthWaitList')
    };

    componentDidMount() {
        axios.get(`http://52.37.61.234:3001/staff/list/barber`)
            .then(res => {
                const availableStaff = res.data;
                this.setState({ availableStaff });
            });
        axios.get(`http://52.37.61.234:3001/services/category/Hair`)
            .then(res => {
                // console.log('hair services response', res.data);
                const services = res.data;
                this.setState({ services });
            });
    }

    render() {
        console.log("here is the state", this.state);
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.name}>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</Text>
                <Text>Choose a barber/stylist</Text>
                <Picker
                    selectedValue={this.state.staffMember}
                    onValueChange={(itemValue, itemIndex) => this.setState({ staffMember: itemValue})}
                    prompt="Choose your staff member"
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    cancel
                >
                    {this.state.availableStaff ? this.state.availableStaff.map((item,index) => {
                    return (
                    <Picker.Item label={item.first_name + " " + item.last_name} value={item.id} key={index}/>
                    )}) : null}
                </Picker>
                <Text>Choose your service</Text>
                <Picker
                    selectedValue={this.state.service}
                    onValueChange={(itemValue, itemIndex) => this.setState({ service: itemValue})}
                    prompt="Choose your service"
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    cancel
                >
                    {this.state.services ? this.state.services.map((item,index) => {
                    return (
                    <Picker.Item label={item.name} value={item.id} key={index}/>
                    )}) : null}
                </Picker>
                {this.state.service && this.state.staff !== "" ?
                <Animatable.View animation="bounceIn">
                    <Button
                        raised
                        large
                        title='SUBMIT'
                        borderRadius={18}
                        fontSize={22}
                        color='#ffffff'
                        containerViewStyle={{borderRadius: 18}}
                        buttonStyle={styles.submitButton}
                        onPress={this._onSubmit}
                    />
                </Animatable.View> : null }
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
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        width: '100%',
        paddingTop: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50
    },
    name: {
        color: '#356044',
        fontSize: 40,
        marginBottom: 20
    },
    dropdown: {
        width: '80%'
    },
    submitButton: {
        backgroundColor: '#356044',
        width: 200,
        marginTop: 40
    },
    picker: {
        alignSelf: 'stretch',
        backgroundColor: '#356044',
        paddingHorizontal: 20,
        paddingVertical: 20,
        margin: 20,
        borderRadius: 10,
    },
    pickerText: {
        color: 'white',
    }
});
