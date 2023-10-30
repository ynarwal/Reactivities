import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export const Navbar = observer(() => {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Acitivies" />
        <Menu.Item>
          <Button
            onClick={() => activityStore.openForm()}
            positive
            content="Create activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
});
