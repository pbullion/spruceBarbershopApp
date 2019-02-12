import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import {addService, setWaitListView} from "../../actions";
import ServicesButton from "../../components/buttons/ServicesButton";
import * as Animatable from "react-native-animatable";

class JoinWaitListScreen3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
        this.handlePress = this.handlePress.bind(this);
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

    handlePress = (serviceType) => {
        this.props.setWaitListView(serviceType);
        this.props.navigation.navigate('WaitTimes4');
    };

    _changeAnimation = () => {
        this.setState({animation: "fadeOutDown"});
        this.setState({animation: null});
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <View style={styles.buttons}>
                        <Animatable.View animation={this.state.animation} easing="ease-out">
                            <ServicesButton onPress={() => {this.handlePress('Hair')}} line1='Hair' line2='Cuts' />
                        </Animatable.View>
                        <Animatable.View animation={this.state.animation} easing="ease-out">
                            <ServicesButton onPress={() => {this._changeAnimation(); this.handlePress('Coloring')}} line1='Hair' line2='Coloring' />
                        </Animatable.View>
                    </View>
                    <View style={styles.buttons}>
                        <Animatable.View animation={this.state.animation} easing="ease-out">
                            <ServicesButton onPress={() => {this._changeAnimation(); this.handlePress('Beard')}} line1='Beard' />
                        </Animatable.View>
                        <Animatable.View animation={this.state.animation} easing="ease-out">
                            <ServicesButton onPress={() => {this._changeAnimation(); this.handlePress('Shave')}} line1='Shave' />
                        </Animatable.View>
                    </View>
                    <View style={styles.buttons}>
                        <Animatable.View animation={this.state.animation} easing="ease-out">
                            <ServicesButton onPress={() => {this._changeAnimation(); this.handlePress('Additional')}} line1='Additional' line2='Services'/>
                        </Animatable.View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        waitListFlow: state.waitListFlow
    }
}

export default connect(mapStateToProps, {setWaitListView, addService})(JoinWaitListScreen3)

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
