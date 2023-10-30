import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function ActivityList() {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    activityStore.handleDeleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as={"a"}>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  name={activity.id}
                  loading={activityStore.submitting && target === activity.id}
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default observer(ActivityList);
