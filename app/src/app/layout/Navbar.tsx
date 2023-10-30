import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export const Navbar = ({ openForm }: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Acitivies" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
