import { useEffect, useState } from "react";
import CardGrid from "../components/cards/CardGrid";
import type { Card } from "../types/card";
import { fetchCards } from "../api/cardApi";

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCards() {
    try {
      setLoading(true);

      const result = await fetchCards();

      setCards(result.data);
    } catch (err) {
      setError(`Could not load cards. ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) return <h2>Loading cards...</h2>;

  if (error) return <h2>{error}</h2>;

  return <CardGrid cards={cards} />;
}