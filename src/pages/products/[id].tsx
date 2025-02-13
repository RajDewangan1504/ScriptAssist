import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Title, Text, Image, Box, Button, Loader, Card, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface AdditionalInfo {
  manufacturer: string;
  stock: number;
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => {
          setProduct(data);
          return fetch(`https://dummyjson.com/products/${id}`);
        })
        .then((res) => res.json())
        .then((info: any) => {
          setAdditionalInfo({
            manufacturer: info.brand || "Unknown Manufacturer",
            stock: info.stock || Math.floor(Math.random() * 50) + 1,
          });
        })
        .catch((error) => console.error("Error fetching product:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <Container size="md" pt="lg" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader size="xl" />
      </Container>
    );

  if (!product)
    return (
      <Container size="md" pt="lg">
        <Text size="lg" color="red">
          No product found
        </Text>
      </Container>
    );

  return (
    <Box mx="5%" py="xl">
      <Button onClick={() => navigate("/")} mb="lg" variant="outline" color="red">
        ← Back to Products
      </Button>

      <Card mx={isMobile ? "5%" : "15%"} my="5%" shadow="sm" padding="lg" radius="md" withBorder>
        <Stack spacing="md" align="center">
          <Image src={product.image} alt={product.title} width={isMobile ? 200 : 300} height={isMobile ? 200 : 300} radius="md" />
          <Box sx={{ textAlign: isMobile ? "center" : "left", width: "100%" }}>
            <Title order={2}>{product.title}</Title>
            <Text size="xl" weight={700} color="blue">
              ${product.price.toFixed(2)}
            </Text>

            {!showMore && (
              <Button mt="lg" color="gray" size="md" fullWidth={isMobile} onClick={() => setShowMore(true)}>
                Show More Details
              </Button>
            )}

            {showMore && (
              <>
                <Text size="sm" color="dimmed" mb="xs">
                  Category: {product.category}
                </Text>
                <Text mt="md">{product.description}</Text>
                <Text mt="md">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </Text>

                {additionalInfo && (
                  <>
                    <Text mt="md">
                      <b>Manufacturer:</b> {additionalInfo.manufacturer}
                    </Text>
                    <Text mt="md">
                      <b>Stock:</b> {additionalInfo.stock} units available
                    </Text>
                  </>
                )}

                <Button mt="lg" color="black" size="md" fullWidth={isMobile}>
                  Add to Cart
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
