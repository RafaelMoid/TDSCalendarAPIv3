import React from "react";
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import { ReactComponent as HexPoint } from '../../assets/hexPoint.svg';
import "./encontros.scss";


const Encontros = ({ stateArray }) => {


  const connectGoogle = (point, oDate) => {

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(oDate);
    const datee = date.getTime() + 3600000
    const finalDate = new Date(datee)
    console.log(point)

    const event = {
      summary: point.description,
      location: point.meeting_place,
      start: {
        dateTime: oDate,
        timeZone: timezone
      },
      end: {
        dateTime: finalDate,
        timeZone: timezone
      }
    };

    ApiCalendar.handleAuthClick()
      .then(resp => console.log('logged in'));

      ApiCalendar.createEvent(event)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
  });
  }

  return (
    <>
      <ul className='button-menu-items'>
        {stateArray ? stateArray.map(arr => (
            arr.map( point => (
            <li key={point.id} className='hexa' onClick={() => connectGoogle(point, point.opening_date,)}>
              <div className="kitHexagon">
                <HexPoint />
                <div className="textStyle">
                    <span className='point-date'>{`${point.splitDate[0].slice(8, 10)}/${point.splitDate[0].slice(5, 7)}/${point.splitDate[0].slice(0, 4)}`}</span>
                    <span className='point-hour' defaultValue={point.id}> {point.splitDate[1].slice(0, 5)} </span>
                </div>
              </div>    
            </li>
          ))
        )) : ''}
      </ul>
    </>
  );
};

export default Encontros;