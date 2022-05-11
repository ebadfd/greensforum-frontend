import {
  Box,
  Title,
  Text,
  Button,
  List,
  Code,
  Accordion,
  createStyles,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

import { useLocalStorage } from "@mantine/hooks";
import { config } from "../config";
import { useStyles } from "../styles/mod.apply.style";

function StyledAccordion(props) {
  const { classes } = useStyles();
  return (
    <Accordion
      mt={50}
      classNames={classes}
      icon={<Plus size={16} />}
      {...props}
    />
  );
}

export default function ApplyForMod() {
  const [auth, setAuth] = useLocalStorage({ key: "auth" });

  const ApplyMod = () => {
    console.log("=============== apply for mod =============");

    if (!auth) {
      showNotification({
        title: "Auth error",
        message: "Please login again to continue",
        color: "red",
      });
      return;
    }

    let headers = new Headers();
    headers.append("Authorization", `Bearer ${auth.auth}`);

    let requestOptions = {
      method: "POST",
      headers: headers,
      redirect: "follow",
    };
    console.log(auth);

    fetch(`${config.v1}user/me/apply/mod`, requestOptions)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          showNotification({
            title: data.error,
            message: data.details,
            color: "red",
          });
          return;
        }

        showNotification({
          title: "Success",
          message:
            "Your privilages have been upvated. please login again to continue",
          color: "green",
        });
      });
  };

  return (
    <Box p={30}>
      <Title> Apply for Moderators </Title>

      <Text size="lg" mt={50}>
        You can apply for a Moderator in this form using here. not that to apply
        a Moderators you need to have some things completed
      </Text>

      <List withPadding mt={20}>
        <List.Item>Make sure the E-Mail is verified.</List.Item>
        <List.Item>
          You can only apply for a mod if you have <Code>nsbm.ac.lk</Code>{" "}
          E-Mail
        </List.Item>
      </List>
      <StyledAccordion initialItem={0}>
        <Accordion.Item label="What if I dont have a internal E-Mail">
          You can contact the admin's to get relevent privilages
        </Accordion.Item>

        <Accordion.Item label="Flexibility">
          Configure components appearance and behavior with vast amount of
          settings or overwrite any part of component styles
        </Accordion.Item>

        <Accordion.Item label="No annoying focus ring">
          With new :focus-visible pseudo-class focus ring appears only when user
          navigates with keyboard
        </Accordion.Item>
      </StyledAccordion>

      <Button size="sm" color="green" mt={50} onClick={() => ApplyMod()}>
        Request Now
      </Button>
    </Box>
  );
}
