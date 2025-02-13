// import { useEffect, useState } from "react";
// import { Table, TextInput, Select, Image, Container, Title, Flex, Box } from "@mantine/core";
// import { useNavigate, useSearchParams } from "react-router-dom";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Extract URL params
//   const search = searchParams.get("search") || "";
//   const sort = searchParams.get("sort") || "";
//   const category = searchParams.get("category") || "";

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((data: Product[]) => {
//         setProducts(data);
//         setFilteredProducts(data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   useEffect(() => {
//     let filtered = [...products];

//     if (search) {
//       filtered = filtered.filter((product) =>
//         product.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category) {
//       filtered = filtered.filter((product) => product.category === category);
//     }

//     if (sort === "price-asc") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sort === "price-desc") {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     setFilteredProducts(filtered);
//   }, [search, sort, category, products]);

//   // Handle filter changes and update URL
//   const updateParams = (key: string, value: string) => {
//     const newParams = new URLSearchParams(searchParams);
//     if (value) newParams.set(key, value);
//     else newParams.delete(key);
//     setSearchParams(newParams);
//   };

//   return (
//     <Box p="md" mx="5%">
//       <Title order={2} my="lg">
//         Product List
//       </Title>

//       {/* Filters Section */}
//       <Flex justify="space-between" align="center" mb="md" gap="md">
//         {/* Left Filters (Sort & Category) */}
//         <Flex gap="md">
//           <Select
//             placeholder="Sort"
//             data={[
//               { value: "price-asc", label: "Price: Low to High" },
//               { value: "price-desc", label: "Price: High to Low" },
//             ]}
//             value={sort}
//             onChange={(value) => updateParams("sort", value || "")}
//             w={180} 
//           />
//           <Select
//             placeholder="Category"
//             data={[
//               { value: "", label: "All Categories" },
//               { value: "men's clothing", label: "Men's Clothing" },
//               { value: "jewelery", label: "Jewelry" },
//             ]}
//             value={category}
//             onChange={(value) => updateParams("category", value || "")}
//             w={180}
//           />
//         </Flex>

//         {/* Search Input (Aligned Right) */}
//         <TextInput
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => updateParams("search", e.target.value)}
//           w={250}
//         />
//       </Flex>

//       {/* Mantine Table */}
//       <Table striped highlightOnHover withBorder>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Rating</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product) => (
//             <tr key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
//               <td>
//                 <Image src={product.image} alt={product.title} width={50} height={50} />
//               </td>
//               <td>{product.title}</td>
//               <td>{product.category}</td>
//               <td>${product.price.toFixed(2)}</td>
//               <td>{product.rating.rate} ⭐</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import {
    Table,
    TextInput,
    Select,
    Image,
    Title,
    Flex,
    Box,
    Stack,
    ScrollArea,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "";
    const category = searchParams.get("category") || "";

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        let filtered = [...products];

        if (search) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (sort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    }, [search, sort, category, products]);

    const updateParams = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set(key, value);
        else newParams.delete(key);
        setSearchParams(newParams);
    };

    return (
        <Box p="md" mx="5%">
            <Title order={2} my="lg" align="center">
                Product List
            </Title>

            <Flex justify="space-between" align="center" mb="md" gap="md" wrap={isMobile ? "wrap" : "nowrap"}>
                <Flex gap="md" wrap={isMobile ? "wrap" : "nowrap"}>
                    <Select
                        placeholder="Sort"
                        data={[
                            { value: "price-asc", label: "Price: Low to High" },
                            { value: "price-desc", label: "Price: High to Low" },
                        ]}
                        value={sort}
                        onChange={(value) => updateParams("sort", value || "")}
                        w={isMobile ? "100%" : 180}
                    />
                    <Select
                        placeholder="Category"
                        data={[
                            { value: "", label: "All Categories" },
                            { value: "men's clothing", label: "Men's Clothing" },
                            { value: "jewelery", label: "Jewelry" },
                        ]}
                        value={category}
                        onChange={(value) => updateParams("category", value || "")}
                        w={isMobile ? "100%" : 180}
                    />
                </Flex>

                <TextInput
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => updateParams("search", e.target.value)}
                    w={isMobile ? "100%" : 250}
                />
            </Flex>

            <ScrollArea>
                <Table striped highlightOnHover withBorder>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                <td>
                                    <Image src={product.image} alt={product.title} width={50} height={50} />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.rating.rate} ⭐</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </Box>
    );
}