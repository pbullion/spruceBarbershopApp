import React from 'react';
import axios from 'axios/index';
import ServicesList from "../../components/ServicesList";

export default class ColoringServicesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    static navigationOptions = {
        title: 'Hair Coloring Services',
        headerStyle: {
            backgroundColor: 'rgba(53, 96, 68, 1)',
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
        axios.get(`http://192.168.0.12:3000/services/category/Coloring`)
            .then(res => {
                // console.log('hair services response', res.data);
                const data = res.data;
                this.setState({ data });
            });
    }
}
