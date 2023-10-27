
import { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';


function App() {

  const [activities, setActivities] = useState<Activity[]>([])


  async function fetchData() {
    const res = await axios.get<Activity[]>('http://localhost:5000/api/activities/');
    setActivities(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Header as='h2'>Reactivites</Header>
      <List bulleted>
        {activities.map((a) => <List.Item key={a.id}>{a.title}</List.Item>)}
      </List>
    </>
  )
}

export default App
