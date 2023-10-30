import React from "react";
import { Button, Form } from "semantic-ui-react";

import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function ActivityForm() {
  const { activityStore } = useStore();

  const inititalState = activityStore.selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(inititalState);

  function handleSubmit() {
    activityStore.handleCreateOrEditActivity(activity);
  }

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={onFieldChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={onFieldChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={onFieldChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          value={activity.date}
          type="date"
          onChange={onFieldChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={onFieldChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={onFieldChange}
        />

        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={activityStore.submitting}
        />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={activityStore.cancelSelectedActivity}
        />
      </Form>
    </>
  );
}

export default observer(ActivityForm);
