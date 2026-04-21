import { useState } from "react";
import styles from "./CardItem.module.css";
import type { Card } from "../../types/card";

type Props = {
  card: Card;
  isAdmin?: boolean;
};

export default function CardItem({card,isAdmin = false}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [learned, setLearned] = useState(false);

  function speakWord(e: React.MouseEvent) {
    e.stopPropagation();

    const utterance = new SpeechSynthesisUtterance(card.text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  function toggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    setFavorite((prev) => !prev);
  }

  function toggleLearned(e: React.MouseEvent) {
    e.stopPropagation();
    setLearned((prev) => !prev);
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    alert(`Edit card: ${card.text}`);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    alert(`Delete card: ${card.text}`);
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.flipCard} ${
          flipped ? styles.flipped : ""
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.cardInner}>
          {/* FRONT */}
          <div className={styles.cardFront}>
            {card.imageUrl && (
              <img
                src={card.imageUrl}
                alt={card.text}
                className={styles.image}
              />
            )}

            <h4>{card.text}</h4>

            <button
              className={styles.speakBtn}
              onClick={speakWord}
            >
              🔊
            </button>
          </div>

          {/* BACK */}
          <div className={styles.cardBack}>
            {card.meanings.map((meaning, index) => (
              <p key={index}>
                <strong>{meaning.partOfSpeech}: </strong>
                {meaning.definition}
              </p>
            ))}

            <div className={styles.actions}>
              <button
                onClick={toggleFavorite}
                className={favorite ? styles.active : ""}
              >
                ⭐
              </button>

              <button
                onClick={toggleLearned}
                className={learned ? styles.active : ""}
              >
                ✅
              </button>

              {isAdmin && (
                <>
                  <button onClick={handleEdit}>✏️</button>
                  <button onClick={handleDelete}>🗑️</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}