import { Text, Paper, SimpleGrid, useMantineTheme } from "@mantine/core";
import DOMPurify from "dompurify";

export function CommentCard({ props }) {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Paper radius="md" withBorder mt={20}>
      <SimpleGrid cols={1} spacing="xs">
        <Paper p="lg">
          <Text size="lg" weight={500}>
            {props.title}
          </Text>

          <Text
            size="sm"
            style={{ color: secondaryColor, lineHeight: 1.5 }}
            lineClamp={2}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.body),
            }}
          />

          <Text size="xs" color="dimmed" mt={10}>
            {new Date(props.created_at).toDateString()}
          </Text>
        </Paper>
      </SimpleGrid>
    </Paper>
  );
}
