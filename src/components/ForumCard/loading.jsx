import {
  Card,
  Text,
  Group,
  useMantineTheme,
  Anchor,
  Badge,
  Grid,
  Code,
  Skeleton,
} from "@mantine/core";

export default function LoadingPost() {
  return (
    <>
      <Card shadow="sm" p="lg" mb={30} withBorder>
        <Grid columns={24} gutter="xs">
          <Grid.Col span={3}>
            <Skeleton height={8} mt={6} radius="xl" />
          </Grid.Col>
          <Grid.Col span={18}>
            <Text weight={500} className="textTitle">
              <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>
        </Grid>

        <Grid columns={24}>
          <Grid.Col span={3}>
            <Skeleton height={8} mt={6} radius="xl" />
          </Grid.Col>
          <Grid.Col span={18}>
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </Grid.Col>
          <Grid.Col span={3}>{}</Grid.Col>

          <Grid.Col span={3}>
            <Skeleton height={8} mt={6} radius="xl" />
          </Grid.Col>
          <Grid.Col span={18}>
            <Skeleton height={8} mt={6} radius="xl" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
