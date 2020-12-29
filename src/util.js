import React from "react";
import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral';

export const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      bgColor: "rgba(204, 16, 52, 0.5)",
      multiplier: 400,
    },
    recovered: {
      hex: "#7dd71d",
      bgColor: "rgba(125, 215, 29, 0.5)",
      multiplier: 600,
    },
    deaths: {
      hex: "#fb4443",
      bgColor: "rgba(251, 68, 67, 0.5)",
      multiplier: 1000,
    },
  };

export const sortData = (data) => {
    const soretedData = [...data];
    // soretedData.sort((a,b) => {
    //     if(a.cases > b.cases) return -1;
    //     else return 1;
    // });

    return soretedData.sort((a,b) => a.cases > b.cases ? -1 : 1);
}

export const showDataOnMap = (data, casesType='cases') => {    
    
    return data.map(country => (
        <Circle
            center={{lat:country.countryInfo.lat, lng: country.countryInfo.long}}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
            pathOptions={{color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex }}
        >
            <Popup>
                <div className="popup-container">
                    <div style={{ backgroundImage: `url(${country.countryInfo.flag})`}} className="popup-flag"/>
                    <div className="popup-name">{country.country}</div>
                    <div className="popup-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="popup-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="popup-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
}

export const prettyPrintStat = (stat) => {    
    return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
}