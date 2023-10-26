
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';


interface Activity {
  id: string;
  title: string;
}

function App() {

  const [activities, setActivities] = useState([] as Activity[])


  async function fetchData() {
    const res = await axios.get('http://localhost:5000/api/activities/');
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
