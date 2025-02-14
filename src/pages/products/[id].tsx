

import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, Title, Text, Loader, Center, Button, Stack, Card, Group, Badge, Divider 
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";

const ResourceDetails: FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      if (!category || !id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://swapi.dev/api/${category.toLowerCase()}/${id}/`);
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch resource details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, id]);

  return (
    <Box p="xl" mx="auto" style={{ maxWidth: "1100px", marginTop: "3%" }}>
      {!isMobile && (
        <Button variant="outline" mb="lg" onClick={() => navigate(-1)}>← Back</Button>
      )}
      {loading ? (
        <Center style={{ height: "60vh" }}>
          <Loader size="lg" />
        </Center>
      ) : error ? (
        <Center>
          <Text color="red">{error}</Text>
        </Center>
      ) : (
        <Card shadow="md" padding="xl" radius="md">
          <Title order={2} mb="md" align={isMobile ? "center" : "left"}>
            {data.name || "Resource Details"}
          </Title>
          <Group 
            align="start" 
            spacing="xl" 
            // direction={isMobile ? "column" : "row"}
          >
            {/* Left: Main Information */}
            <Box style={{ flex: 1, width: "100%" }}>
              <Title order={4} mb="sm">Main Information</Title>
              <Divider mb="sm" />
              <Stack spacing="sm">
                {Object.entries(data)
                  .filter(([key]) => !Array.isArray(data[key]))
                  .map(([key, value]) => (
                    <Box key={key} style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text weight={500} size="sm">{key.replace('_', ' ').toUpperCase()}:</Text>
                      <Text size="xs" color="dimmed">
                        {typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}
                      </Text>
                    </Box>
                ))}
              </Stack>
            </Box>

            {/* Right: Related Resources */}
            <Box style={{ flex: 1, width: "100%" }}>
              <Title order={4} mb="sm">Related Resources</Title>
              <Divider mb="sm" />
              <Stack spacing="md">
                {Object.entries(data)
                  .filter(([key]) => Array.isArray(data[key]))
                  .map(([key, value]) => (
                    <Box key={key}>
                      <Text weight={500} size="sm">{key.replace('_', ' ').toUpperCase()}:</Text>
                      <Group spacing="xs" mt="xs" >
                        {(value as string[]).map((item, index) => {
                          const segments = item.split("/").filter(Boolean);
                          const extractedCategory = segments[segments.length - 2];
                          const extractedId = segments[segments.length - 1];

                          return (
                            <Badge
                              key={index}
                              color="yellow"
                              size="lg"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/product/${extractedCategory}/${extractedId}`)}
                            >
                              {extractedCategory.toUpperCase()} {extractedId}
                            </Badge>
                          );
                        })}
                      </Group>
                    </Box>
                ))}
              </Stack>
            </Box>
          </Group>
        </Card>
      )}
    </Box>
  );
};

export default ResourceDetails;

