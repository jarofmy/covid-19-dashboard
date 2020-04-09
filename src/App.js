import React from 'react';
import Axios from 'axios';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css'
import { fetchData } from './api';
import coronaImage from './images/image.png'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        // Fetch data
        const fetchedData = await fetchData(country);
        // Set the state
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img src={coronaImage} className={styles.image} alt="Covid-19"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;