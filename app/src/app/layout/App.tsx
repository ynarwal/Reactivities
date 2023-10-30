import { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Activity } from "../models/Activity";
import { Navbar } from "./Navbar";
import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  async function fetchData() {
    const res = await axios.get<Activity[]>(
      "http://localhost:5000/api/activities/"
    );
    setActivities(res.data);
  }

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id != activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuidv4() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id != id)]);
  }

  return (
    <Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
