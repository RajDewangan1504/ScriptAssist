
import { FC, useEffect, useState } from "react";
import {
    Table,
    Title,
    Box,
    ScrollArea,
    Loader,
    Center,
    Pagination,
    TextInput,
    Select,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ResourceListProps {
    category: string;
}

const ResourceList: FC<ResourceListProps> = ({ category }) => {
    const [resources, setResources] = useState<any[]>([]);
    const [filteredResources, setFilteredResources] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const navigate = useNavigate();

    const sortOptions: { [key: string]: string[] } = {
        Starships: ["name", "cost_in_credits", "hyperdrive_rating"],
        Planets: ["name", "rotation_period", "orbital_period"],
        Species: ["name", "average_height"],
    };

    const handleRowClick = (url: string) => {
        console.log("object",url);
        const match = url.match(/\/(\d+)\/?$/); // Extracts only numbers from the end of URL
        const id = match ? match[1] : null; // Get the number or null
        if (!id) {
            console.error("Invalid ID in URL:", url);
            return;
        }
        console.log("id", id);
        navigate(`/product/${category}/${id}`);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const categoryUrls: { [key: string]: string } = {
                Species: "https://swapi.dev/api/species",
                Planets: "https://swapi.dev/api/planets",
                Starships: "https://swapi.dev/api/starships",
            };

            const url = categoryUrls[category];

            if (!url) {
                setError("Invalid category");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${url}/?page=${page}`);
                setResources(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10));
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, page]);

    useEffect(() => {
        let updatedData = [...resources];

        if (searchQuery) {
            updatedData = updatedData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortKey) {
            updatedData.sort((a, b) => {
                const valA = a[sortKey as keyof typeof a];
                const valB = b[sortKey as keyof typeof b];
                if (!valA || !valB) return 0;

                if (isNaN(Number(valA))) {
                    return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
                } else {
                    return sortOrder === "asc" ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
                }
            });
        }

        setFilteredResources(updatedData);
    }, [searchQuery, sortKey, sortOrder, resources]);
    const categoryColumns: Record<string, { key: string; label: string }[]> = {
        Starships: [
            { key: "name", label: "Name" },
            { key: "manufacturer", label: "Manufacturer" },
            { key: "cost_in_credits", label: "Credits" },
            { key: "passengers", label: "Passengers" },
            { key: "consumables", label: "Consumables" },
            { key: "hyperdrive_rating", label: "Rating" },
        ],
        Planets: [
            { key: "name", label: "Name" },
            { key: "rotation_period", label: "Rotation Period" },
            { key: "orbital_period", label: "Orbital Period" },
            { key: "diameter", label: "Diameter" },
            { key: "climate", label: "Climate" },
            { key: "gravity", label: "Gravity" },
        ],
        Species: [
            { key: "name", label: "Name" },
            { key: "classification", label: "Classification" },
            { key: "designation", label: "Designation" },
            { key: "average_height", label: "Average Height" },
            { key: "skin_colors", label: "Skin Colors" },
            { key: "average_lifespan", label: "Average Lifespan" },
            { key: "language", label: "Language" },
        ],
    };
    
    const renderTableContent = () => {
        if (!filteredResources.length || !categoryColumns[category]) return null;
    
        return (
            <Table striped highlightOnHover withBorder>
                <thead>
                    <tr>
                        {categoryColumns[category].map(({ key, label }) => (
                            <th key={key} onClick={() => setSortKey(key)}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredResources.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.url)} style={{ cursor: "pointer" }}>
                            {categoryColumns[category].map(({ key }) => (
                                <td key={key}>{item[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };
    

    return (
        <Box p="md" style={{marginTop:"5%"}} >
            <Title order={2} my="xl" align="center">
                {category} Resources
            </Title>

            {loading && (
                <Center style={{ height: "60vh" }}>
                    <Loader size="lg" />
                </Center>
            )}

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {!loading && (
                <>
                    <Box mb="md" sx={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                        <TextInput
                            placeholder="Search by Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: "300px" }}
                        />

                        <Select
                            placeholder="Sort by"
                            data={sortOptions[category] || []}
                            value={sortKey}
                            onChange={(value) => setSortKey(value)}
                            clearable
                            style={{ width: "200px" }}
                        />
                    </Box>

                    <ScrollArea>
                        <Table>
                        {renderTableContent()}
                        </Table>
                    </ScrollArea>

                    {totalPages > 1 && (
                        <Center mt="md">
                            <Pagination value={page} onChange={setPage} total={totalPages} />
                        </Center>
                    )}
                </>
            )}
        </Box>
    );
};

export default ResourceList;
