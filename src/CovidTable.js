import React from 'react'
import './Table.css';
import numeral from 'numeral';
import { point } from 'leaflet';

function CovidTable(props) {

    const selectCountry = (countryCode) => {
        props.onCountryChangeFetchDetails(countryCode);
    }

    return (
        <div className="table">            
            {props.countries.map(({country, countryInfo, cases}) => (
                <tr onClick={(event) => selectCountry(countryInfo.iso2)} style={{'cursor': 'pointer'}}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default CovidTable
