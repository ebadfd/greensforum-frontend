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
import { Link } from "react-router-dom";

export function PostCard({ props }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ margin: "auto" }}>
      <Card shadow="sm" p="lg" mb={30} withBorder key={props.id}>
        <Grid columns={24} gutter="xs">
          <Grid.Col span={3}>
            {" "}
            <Text size="sm">{props.up_vote_count} votes</Text>
          </Grid.Col>
          <Grid.Col span={18}>
            <Anchor href={`/post/${props.slug}`}>
              <Text weight={500} className="textTitle" lineClamp={1}>
                {props.title}
              </Text>
            </Anchor>
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>
        </Grid>

        <Grid columns={24}>
          <Grid.Col span={3}>
            {props.is_answered ? (
              <>
                <Code color="teal">{props.answer_count} answer</Code>{" "}
              </>
            ) : (
              <>
                <Code color="white">{props.answer_count} answers</Code>
              </>
            )}
          </Grid.Col>
          <Grid.Col span={18}>
            <Text
              size="sm"
              style={{ color: secondaryColor, lineHeight: 1.5 }}
              lineClamp={2}
            >
              {props.body}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>

          <Grid.Col span={3}>
            {" "}
            <Text size="sm" color="dimmed">
              {props.view_count} views
            </Text>
          </Grid.Col>
          <Grid.Col span={18}>
            <Group>
              {props.tags.length > 0 ? (
                <>
                  {props.tags.map((item) => {
                    return (
                      <Badge variant="dot" component={Link} to={`/tag/${item}`}>
                        {item}
                      </Badge>
                    );
                  })}
                </>
              ) : (
                <Text size="xs" ml={5}>
                  no tags found.
                </Text>
              )}
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group>
              <div>
                <Text size="xs" color="dimmed">
                  {new Date(props.created_at).toDateString()}
                </Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}
