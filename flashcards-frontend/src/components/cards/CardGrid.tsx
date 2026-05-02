import CardItem from "./CardItem";
import type { Card } from "../../types/card";
import styles from "./CardGrid.module.css";
import Pagination from "./Pagination";

type Props = {
  cards: Card[];
  loading: boolean;
  error: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function CardGrid({
  cards,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {

  if (loading) {
    return <h2>Loading cards...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (cards.length === 0) {
    return <h2>No cards found.</h2>;
  }

  return (
    <>
      <div className={styles.grid}>
        {cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
