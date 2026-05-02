import { useEffect, useState } from "react";
import CardGrid from "../components/cards/CardGrid";
import { fetchCards } from "../api/cardApi";
import type { Card } from "../types/card";

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    async function loadCards() {
      try {
        setLoading(true);
        setError("");
  
        const result = await fetchCards({
          page: currentPage,
          favorite: showFavoritesOnly ? true : undefined,
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
  }, [currentPage, showFavoritesOnly]);

  return (
    <div>
      {/* Sidebar / Filter button */}
      <button 
        onClick={() => {
          setShowFavoritesOnly(prev => !prev);
          setCurrentPage(1);
        }}
        >
        {showFavoritesOnly ? "⭐ Showing Favorites" : "☆ Show Favorites"}
      </button>

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