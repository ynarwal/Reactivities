import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity } = activityStore;

  if (!selectedActivity) {
    return <></>;
  }

  return (
    <>
      <Card fluid style={{}}>
        <Image
          src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{selectedActivity.title}</Card.Header>
          <Card.Meta>
            <span>{selectedActivity.date}</span>
          </Card.Meta>
          <Card.Description>{selectedActivity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={"2"}>
            <Button
              basic
              color="blue"
              content="Edit"
              onClick={() => activityStore.openForm(selectedActivity.id)}
            />
            <Button
              onClick={activityStore.cancelSelectedActivity}
              basic
              color="grey"
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
}
