import { Grid, Container, SimpleGrid, Button, Group } from "@mantine/core";
import ForumCard from "../components/ForumCard/card";
import SideBarRight from "../components/slideBar-right/sidebar";

export default function HomePage() {
  return (
    <div>
      <Container p={0} m={0} pl={10} size={2000}>
        <Grid>
          <Grid.Col xs={3} className="slidebarleft">
            {}
          </Grid.Col>
          <Grid.Col xs={6.2}>
            <Group position="apart">
              <h1> Top Questions For You </h1>
              <Button> Ask Question </Button>
            </Group>

            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SimpleGrid className="homepagegridsidebargird">
              <SideBarRight />
              <SideBarRight />
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
