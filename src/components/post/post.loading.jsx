import { Grid, Container, Skeleton, Text, Stack, Paper } from "@mantine/core";

export default function LoadingPost() {
  return (
    <>
      <Grid>
        <Grid.Col xs={1} className="slidebarleft" />
        <Grid.Col xs={12} p="lg">
          <Paper shadow="xl" p="xl" withBorder>
            <Grid grow gutter="xs">
              <Grid.Col span={1}>
                <Stack>
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />

                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Stack>
              </Grid.Col>
              <Grid.Col span={10}>
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />

                <Text size="xs" color="dimmed" mt={30}>
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Text>
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper shadow="xl" p="xl" withBorder mt={50}>
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </Paper>

          <Paper shadow="xl" p="xl" withBorder mt={50}>
            <Text size="lg" weight={500}>
              Answers
            </Text>
            <br />

            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />

            <br />

            <Skeleton height={8} mt={6} width="70%" radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />

            <Skeleton height={8} mt={6} radius="xl" />

            <br />

            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />

            <br />

            <Skeleton height={8} mt={6} radius="xl" />

            <Skeleton height={8} mt={6} width="70%" radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
          </Paper>
        </Grid.Col>
        <Grid.Col xs={3} ml={100}></Grid.Col>
      </Grid>
    </>
  );
}
