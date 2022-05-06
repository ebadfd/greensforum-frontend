import {
  Grid,
  Container,
  Title,
  Text,
  useMantineTheme,
  Group,
  Button,
  Divider,
  Textarea,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { MdOutlineThumbUpAlt, MdOutlineThumbDownAlt } from "react-icons/md";
import { useForm } from "@mantine/form";
import SideBarRight from "../components/slideBar-right/sidebar";
import { CommentCard } from "../components/Comment/comment";
import { useParams } from "react-router-dom";

export default function Post() {
  const theme = useMantineTheme();

  const { slug } = useParams();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const form = useForm({
    initialValues: {
      comment: "",
      postId: "1234",
    },
  });

  const items = [
    { title: "Home", href: "/" },
    { title: "post-title", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <Container p={0} m={0} pl={10} size={2000}>
        <Grid>
          <Grid.Col xs={2} className="slidebarleft" />
          <Grid.Col xs={6} p="lg">
            <Breadcrumbs mb={20}>{items}</Breadcrumbs>
            <Title mb={10}> {slug}</Title>

            <Text size="sm" style={{ color: secondaryColor, lineHeight: 2 }}>
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>

            <Group mt={20}>
              <Button variant="light" className="ThumbsUpButtons">
                <MdOutlineThumbUpAlt /> <Text ml={5}> 420 </Text>
              </Button>

              <Button variant="light" className="ThumbsUpButtons" color="red">
                <MdOutlineThumbDownAlt /> <Text ml={5}> 69 </Text>
              </Button>
            </Group>

            <Divider my="sm" mt={50} variant="dotted" />

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Textarea
                size="sm"
                mt={50}
                placeholder="Add Your Comment Here"
                {...form.getInputProps("comment")}
              />

              <Group position="right" mt="md">
                <Button type="submit" variant="light" radius="xs" size="md">
                  Submit
                </Button>
              </Group>
            </form>

            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Grid.Col>
          <Grid.Col xs={3} ml={100}>
            <p> sudgest posts </p>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
