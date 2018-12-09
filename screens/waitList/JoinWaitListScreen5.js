import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { setWaitListView } from "../../actions";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import {Card, Paragraph, Title} from "react-native-paper";

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

    handleSubmit = (props) => {
        const waitList = props.waitListFlow;
        const currentUser = props.currentUser;
        axios.post(`http://52.37.61.234:3001/waitlist`, {
            waitList,
            currentUser
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                props.navigation.navigate('WaitTimeList');
            })
            .catch(function (error) {
                console.log('error', error)
            })
    };

    componentDidMount() {
        axios.get(`http://52.37.61.234:3001/services/category/${this.props.waitListFlow.waitListView}`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            });
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.viewContainer}>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Animatable.View animation="bounceIn">
                            <Card style={styles.card}>
                                <Card.Cover source={{ uri: this.props.waitListFlow.staff.staffpicture }} style={{ width: '100%' }}/>
                                <Card.Content style={styles.cardName}>
                                    <Title>{this.props.waitListFlow.staff.first_name} {this.props.waitListFlow.staff.last_name}</Title>
                                </Card.Content>
                            </Card>
                        </Animatable.View>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Animatable.View animation="bounceInUp">
                            <Card style={styles.servicesCard}>
                                <Card.Content style={styles.cardContent}>
                                    <Title style={{ color: '#ffffff' }}>{this.props.waitListFlow.service.name}</Title>
                                    <Text style={styles.subTitle}>${this.props.waitListFlow.service.price / 100}</Text>
                                    <Text style={styles.subTitle}>{this.props.waitListFlow.service.time} minutes</Text>
                                    <View>
                                        {this.props.waitListFlow.service.description.map((item,index) => {
                                            return (
                                                <Text key={index} style={{ textAlign: 'center', color: '#ffffff' }}>• {item}</Text>
                                            )})
                                        }
                                    </View>
                                </Card.Content>
                            </Card>
                        </Animatable.View>
                    </View>
                    <Button
                        raised
                        large
                        title='SUBMIT'
                        borderRadius={18}
                        fontSize={22}
                        color='#ffffff'
                        containerViewStyle={{borderRadius: 18}}
                        buttonStyle={styles.submitButton}
                        onPress={() => this.handleSubmit(this.props)}
                    />
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    console.log('state*******in the join wait list map final page', state);
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
        paddingBottom: 150
    },
    contentContainer: {
        width: '100%',
        paddingTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardName: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    name: {
        color: '#356044',
        fontSize: 40,
        marginBottom: 20
    },
    submitButton: {
        backgroundColor: '#356044',
        width: 200,
        marginTop: 10
    },
    card: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    servicesCard: {
        marginHorizontal: 4,
        backgroundColor: '#356044',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
        paddingBottom: 5,
        color: '#ffffff'
    }
});
