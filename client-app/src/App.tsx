import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments').then(response => {
      console.log(response);
      setAppointments(response.data);
    })
  },[])
  return (
    <div >
      <Header as='h2' icon='users' content='Appointments'/>
        <List>
          {appointments.map((appointment: any) => (
            <List.Item key={appointment.id}>
              {appointment.description}
            </List.Item>
          ))}
        </List>
        
      
    </div>
  );
}

export default App;
