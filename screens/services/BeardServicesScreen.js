import React from 'react';
import axios from 'axios/index';
import ServicesList from "../../components/ServicesList";

export default class BeardServicesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    static navigationOptions = {
        title: 'Beard Services',
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
        axios.get(`http://52.37.61.234:3001/services/category/Beard`)
            .then(res => {
                // console.log('hair services response', res.data);
                const data = res.data;
                this.setState({ data });
            });
    }
}
