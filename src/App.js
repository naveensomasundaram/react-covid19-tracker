import react, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBoxes from './InfoBoxes';
import Map from './Map';
import CovidTable from './CovidTable';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Worldwide');    
    const [countryInfo, setCountryInfo] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat:34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState('cases');

    useEffect(() => {
        const getCountriesList = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                let countries = data.map((country) => ({
                    id: country.countryInfo._id,
                    name: country.country,
                    value: country.countryInfo.iso2
                }));
                
                const sortedData = sortData(data);
                setTableData(sortedData);
                setCountries(countries);
                setMapCountries(data); // for loading map bubbles size based on the cases
            })
        }

        const firstTimeWorldWideData = async () => {
            await fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            })
        }

        getCountriesList();
        firstTimeWorldWideData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;        
        await onCountryChangeFetchDetails(countryCode);       
    }

    const onCountryChangeFetchDetails = async (countryCode) => {
        const hostUrl = "https://disease.sh/v3/covid-19";
        const url = countryCode === "Worldwide" ? (hostUrl + "/all") : (hostUrl + `/countries/${countryCode}`);
        await fetch(url).then((response) => response.json())
        .then((data) => {
            setCountry(countryCode);
            setCountryInfo(data);            
            setMapCenter({lat:data.countryInfo.lat, lng: data.countryInfo.long});
            setMapZoom(4);
        })
    }

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                            {countries.length > 0 ? (
                                countries.map((country, index) => (
                                    <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>    
                                ))
                            ) : (<div>Loading..</div>)}                 
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBoxes key={1} title={"Coronavirus Cases"} cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} onClick={e=> setCasesType('cases')} active={casesType === 'cases'} isred={true}/>
                    <InfoBoxes key={2} title={"Recovered"} cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}  onClick={e=> setCasesType('recovered')} active={casesType === 'recovered'} isred={false}/>
                    <InfoBoxes key={3} title={"Deaths"} cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}  onClick={e=> setCasesType('deaths')} active={casesType === 'deaths'} isred={true}/>
                </div>
                <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
            </div>
            <Card className="app__right">
                <CardContent>
                    <CovidTable countries={tableData} onCountryChangeFetchDetails={onCountryChangeFetchDetails}/>
                    <h3 className="app__graph_title">Worldwide new {casesType}</h3>
                    <LineGraph casesType={casesType}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default App;