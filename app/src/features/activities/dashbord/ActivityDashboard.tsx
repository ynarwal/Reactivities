import { Activity } from "../../../app/models/Activity";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity?: Activity;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({ activities, ...props }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={props.selectActivity}
          deleteActivity={props.deleteActivity}
          submitting={props.submitting}
        />
      </Grid.Column>
      <Grid.Column width={"6"}>
        {props.selectedActivity && !props.editMode && (
          <ActivityDetails
            activity={props.selectedActivity}
            openForm={props.openForm}
            cancelSelectActivity={props.cancelSelectActivity}
          />
        )}
        {props.editMode && (
          <ActivityForm
            closeForm={props.closeForm}
            createOrEdit={props.createOrEdit}
            submitting={props.submitting}
            activity={props.selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
