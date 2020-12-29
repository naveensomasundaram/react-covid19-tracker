import React from 'react'
import { Card, CardActions, Typography, CardContent } from '@material-ui/core';
import './InfoBox.css';

function InfoBoxes(props) {    
    return (
        <Card className={`infoBox ${props.active && 'infobox__selected'} ${props.active && props.isred && 'infobox__red'}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{props.title}</Typography>
                <Typography className={`infoBox__cases ${!props.isred && "infoBox__cases__green"}`} variant="h5" component="h2"> {props.cases} </Typography>
                <Typography className="infoBox__total" color="textSecondary"><strong>Total: </strong>{props.total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBoxes
