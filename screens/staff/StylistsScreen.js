import React from 'react';
import axios from 'axios/index';
import ListComponent from "../../components/List";

export default class StylistsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    static navigationOptions = {
        title: 'Stylists',
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
            <ListComponent data={this.state.data} imageHeight={650}/>
        );
    }

    componentDidMount() {
        axios.get(`http://52.37.61.234:3001/staff/list/stylist`)
            .then(res => {
                console.log("this should be stylists", res.data);
                const data = res.data;
                this.setState({ data });
            });
    }
}
