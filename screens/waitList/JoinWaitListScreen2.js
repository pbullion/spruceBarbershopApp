import React from 'react';
import {
    ScrollView,
    StyleSheet, View,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { setWaitListView, addStaffMember } from "../../actions";
import TouchableListComponent from "../../components/TouchableList";

class JoinWaitListScreen2 extends React.Component {
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
            fontFamily: 'neutra-text-bold'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    selectItem = (props) => {
        const item = {id: 0};
        this.props.addStaffMember(item);
        props.navigation.navigate('WaitTimes3')
    };

    componentDidMount() {
        axios.get(`http://52.37.61.234:3001/staff/list/${this.props.waitListFlow.waitListView}`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            });
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                        <TouchableListComponent props={this.props} data={this.state.data} imageHeight={650}/>
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

export default connect(mapStateToProps, {setWaitListView, addStaffMember})(JoinWaitListScreen2)

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
    },
    buttonView: {
        height: 150,
        marginTop: 15
    },
    customerButton: {
        backgroundColor: '#2F553C',
        width: 250,
        height: 100
    },
});
