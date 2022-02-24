import React from "react";
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';
import { useToast } from '@chakra-ui/react';
import { ReactComponent as HexPoint } from '../../assets/hexPoint.svg';
import "./encontros.scss";


const Encontros = ({ stateArray }) => {
  const toast = useToast();

  const connectGoogle = (point, oDate) => {

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(oDate);
    const datee = date.getTime() + 3600000;
    const finalDate = new Date(datee)

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
      .then(() => console.log('logged in'));

      ApiCalendar.createEvent(event)
      .then(() => {
        toast({
            title: 'Eba!',
            description: 'Seu ponto já está agendado.',
            status: 'success',
            duration: 2500,
        });
      })
      .catch(() => {
        toast({
          title: 'Oops!',
          description: 'Não conseguimos agendar esse ponto.',
          status: 'error',
          duration: 2500,
      });
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
        )) : <p>essa jornada não tem pontos futuros</p>}
      </ul>
    </>
  );
};

export default Encontros;