import {
  Card,
  Text,
  Group,
  useMantineTheme,
  Anchor,
  Badge,
  Grid,
  Code,
} from "@mantine/core";

function ForumCard() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ margin: "auto" }}>
      <Card shadow="sm" p="lg" mb={30} withBorder>
        <Grid columns={24} gutter="xs">
          <Grid.Col span={3}>
            {" "}
            <Text size="sm">0 votes</Text>
          </Grid.Col>
          <Grid.Col span={18}>
            <Text weight={500} className="textTitle">
              Norway Fjord Adventures
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>
        </Grid>

        <Grid columns={24}>
          <Grid.Col span={3}>
            {" "}
            <Code color="teal">1 answer</Code>{" "}
          </Grid.Col>
          <Grid.Col span={18}>
            <Text
              size="sm"
              style={{ color: secondaryColor, lineHeight: 1.5 }}
              lineClamp={2}
            >
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>

          <Grid.Col span={3}>
            {" "}
            <Text size="sm" color="dimmed">
              0 views
            </Text>
          </Grid.Col>
          <Grid.Col span={18}>
            <Group>
              <Badge>Badge</Badge>
              <Badge>Badge</Badge>
              <Badge>Badge</Badge>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group>
              <div>
                <Anchor href="//" target="_blank">
                  John Doe
                </Anchor>
                <Text size="xs" color="dimmed">
                  2022-01-90
                </Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}

export default ForumCard;
