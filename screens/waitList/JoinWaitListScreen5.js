import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { setWaitListView } from "../../actions";
import TouchableServicesList from "../../components/TouchableServicesList";

class JoinWaitListScreen5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: null
        };
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

    componentDidMount() {
        console.log("*************************", this.props.waitListFlow.waitListView);
        axios.get(`http://52.37.61.234:3001/services/category/${this.props.waitListFlow.waitListView}`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            });
    }

    render() {
        console.log("here klasdflkjsdklfjlskdjflksjdfkljslkdjfljsdjflsdlkfslkdfj PROPS", this.props.waitListFlow);
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text style={{fontSize: 30}}>Patrick Bullion</Text>
                    <Text>You chose the staff member with the staff ID of</Text>
                    <Text style={{fontSize: 30}}>{this.props.waitListFlow.staffMemberID}</Text>
                    <Text>You chose the service with an ID of</Text>
                    <Text style={{fontSize: 30, marginBottom: 50}}>{this.props.waitListFlow.serviceID}</Text>
                    <Text>Now I need to add the submit button and send it to the database and redirect back to the wait list page....</Text>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    console.log('state*******in the join wait list map 3', state);
    return {
        currentUser: state.currentUser,
        waitListFlow: state.waitListFlow
    }
}

export default connect(mapStateToProps, {setWaitListView})(JoinWaitListScreen5)

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
