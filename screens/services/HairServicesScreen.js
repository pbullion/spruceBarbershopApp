import React from 'react';
import axios from 'axios/index';
import ServicesList from "../../components/ServicesList";

export default class HairServicesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    static navigationOptions = {
        title: 'Hair Cut Services',
        headerStyle: {
            backgroundColor: 'rgba(53, 96, 68, 1)',
            fontFamily: 'neutra-text-bold'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <ServicesList data={this.state.data} imageHeight={650}/>
        );
    }

    componentDidMount() {
        axios.get(`http://18.237.192.82:3001/services/category/Hair`)
            .then(res => {
                // console.log('hair services response', res.data);
                const data = res.data;
                this.setState({ data });
            });
    }
}
