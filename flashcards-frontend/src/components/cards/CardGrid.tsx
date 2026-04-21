import CardItem from "./CardItem";
import type { Card } from "../../types/card";
import styles from "./CardGrid.module.css";

type Props = {
  cards: Card[];
};

export default function CardGrid({ cards }: Props) {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  );
}