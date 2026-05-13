import { useState } from "react";
import styles from "./CardItem.module.css";
import type { Card } from "../../types/card";
import { updateCard, deleteCard } from "../../api/cardApi";
import CreateCardModal from "./CreateCardModal";

type Props = {
  card: Card;
  isAdmin?: boolean;
};

export default function CardItem({ card, isAdmin = false }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [favorite, setFavorite] = useState(card.favorite);
  const [learned, setLearned] = useState(card.learned);
  const [showEditModal, setShowEditModal] = useState(false);

  function speakWord(e: React.MouseEvent) {
    e.stopPropagation();

    const utterance = new SpeechSynthesisUtterance(card.text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  async function toggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();

    const newValue = !favorite;
    setFavorite(newValue);

    try {
      const updated = await updateCard(card._id, { favorite: newValue });
      setFavorite(updated.favorite);
    } catch (error) {
      alert(`Failed to update favorite status for "${card.text}" with error: ${error}`);
      setFavorite(!newValue); 
    }
  }

  async function toggleLearned(e: React.MouseEvent) {
    e.stopPropagation();
  
    const newValue = !learned;
    setLearned(newValue);
  
    try {
      const updated = await updateCard(card._id, { learned: newValue });
      setLearned(updated.learned);
    } catch (error) {
      alert(`Failed to update learned status  for "${card.text}" with error: ${error}`);
      setLearned(!newValue);
    }
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    setShowEditModal(true);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
  
    if (!window.confirm(`Delete "${card.text}"?`)) return;
  
    try {
      await deleteCard(card._id);
      window.location.reload();
    } catch {
      alert("Delete failed");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.flipCard} ${flipped ? styles.flipped : ""}`}
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

            <button className={styles.speakBtn} onClick={speakWord}>
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
                  <button onClick={handleEdit} className={styles.editBtn}>
                    ✏️ Edit
                  </button>
                  <button onClick={handleDelete} className={styles.deleteBtn}>
                    🗑 Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
      <CreateCardModal
        initialData={card}
        onClose={() => setShowEditModal(false)}
      />
    )}
    </div>
  );
}
