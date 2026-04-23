import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import type { Card } from "../../types/card";
import { fetchCards } from "../../api/cardApi";
import styles from "./CardGrid.module.css";

export default function CardGrid() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCards() {
    try {
      setLoading(true);
      setError("");
      const result = await fetchCards();
      setCards(result.data);
    }catch (err) {
      setError(`Could not load cards. ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return (
      <h2>Loading cards...</h2>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (cards.length === 0) {
    return <h2>No cards found.</h2>;
  }


  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  );
}