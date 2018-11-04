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
        axios.get(`http://api.jsonbin.io/b/5b69b7d92b23fb1f2b70a7ea/8`)
            .then(res => {
                const data = res.data.menu.breakfast;
                this.setState({ data });
            });
    }
}
