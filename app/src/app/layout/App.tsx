import { Fragment, useEffect, useState } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/Activity";
import { Navbar } from "./Navbar";
import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";
import { v4 as uuidv4 } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await agent.Activities.list();
    res.forEach((activity) => (activity.date = activity.date.split("T")[0]));
    setActivities(res);
    setLoading(false);
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

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);

    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities([
        ...activities.filter((x) => x.id != activity.id),
        activity,
      ]);
    } else {
      activity.id = uuidv4();
      await agent.Activities.create(activity);
      setActivities([...activities, activity]);
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  };

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    await agent.Activities.delete(id);
    setActivities([...activities.filter((x) => x.id != id)]);
    setSubmitting(false);
  }

  if (loading) {
    return <LoadingComponent content="Loading app" inverted />;
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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
