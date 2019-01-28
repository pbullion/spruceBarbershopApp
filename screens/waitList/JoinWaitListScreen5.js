import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { setWaitListView, refreshTrue } from "../../actions";
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
        console.log('waitlist', waitList);
        axios.post(`http://52.37.61.234:3001/waitlist`, {
            waitList,
            currentUser
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(props);
                props.refreshTrue(true);
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
                            {this.props.waitListFlow.staff.id > 0 ?
                                <Card style={styles.card}>
                                    <Card.Cover source={{uri: this.props.waitListFlow.staff.staffpicture}}
                                                style={styles.cardCover}/>
                                    <Card.Content style={styles.cardName}>
                                        <Title>{this.props.waitListFlow.staff.first_name} {this.props.waitListFlow.staff.last_name}</Title>
                                    </Card.Content>
                                </Card>
                                :
                                <View style={styles.buttonView}>
                                    <Button
                                        raised
                                        large
                                        title='First Available'
                                        borderRadius={18}
                                        containerViewStyle={{borderRadius: 18}}
                                        buttonStyle={styles.customerButton}
                                        onPress={() => {}}
                                    />
                                </View>
                            }
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
    // console.log('state*******in the join wait list map final page', state);
    return {
        currentUser: state.currentUser,
        waitListFlow: state.waitListFlow,
        refresh: state.refresh.refreshStatus
    }
}
const mapDispatchToProps = { setWaitListView, refreshTrue };

export default connect(mapStateToProps, mapDispatchToProps)(JoinWaitListScreen5)

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
    buttonView: {
        height: 150,
        marginTop: 15,
        width: '100%',
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
    cardCover: {
        width: '100%',
        height: Dimensions.get('window').width > 500 ? 500 : 250
    },
    customerButton: {
        backgroundColor: '#2F553C',
        width: 250,
        height: 100
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
