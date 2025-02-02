// src/utils/fetchMissingPersons.ts (or wherever you place your API functions)
export const fetchMissingPersons = async () => {
    try {
      const response = await fetch("/api/missing-persons");
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  