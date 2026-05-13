import { useEffect, useState } from "react";
import CardGrid from "../components/cards/CardGrid";
import { fetchCards } from "../api/cardApi";
import type { Card } from "../types/card";
import { useLocation } from "react-router-dom";

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();

  const isFavorites = location.pathname === "/favorites";
  const isLearned = location.pathname === "/learned";

  useEffect(() => {
    async function loadCards() {
      try {
        setLoading(true);
        setError("");
  
        const result = await fetchCards({
          page: currentPage,
          favorite: isFavorites ? true : undefined,
          learned: isLearned ? true : undefined,
        });
  
        setCards(result.data);
        setTotalPages(result.pages);
      } catch {
        setError("Could not load cards");
      } finally {
        setLoading(false);
      }
    }
  
    loadCards();
  }, [currentPage, isFavorites, isLearned]);

  return (
    <div>
      <CardGrid
        cards={cards}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}