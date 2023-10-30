import React from "react";
import { Button, Form } from "semantic-ui-react";

import { Activity } from "../../../app/models/Activity";
import { useState } from "react";

interface Props {
  activity?: Activity;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  const inititalState = selectedActivity ?? {
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
    createOrEdit(activity);
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
          loading={submitting}
        />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </>
  );
}
