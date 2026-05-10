import { useEffect, useState } from "react";
import styles from "./CreateCardModal.module.css";
import { createCard, fetchCategories, editCard } from "../../api/cardApi";
import type { Card } from "../../types/card";


type Props = {
  onClose: () => void;
  initialData?: Card;
};

export default function CreateCardModal({
  onClose,
  initialData,
}: Props) {
  const isEdit = !!initialData;
  const [text, setText] = useState(initialData?.text || "");
  const [level, setLevel] = useState(initialData?.level || "A1");
  const [category, setCategory] = useState(initialData?.category || "");
  const [partOfSpeech, setPartOfSpeech] = useState(initialData?.meanings[0]?.partOfSpeech || "noun");
  const [definition, setDefinition] = useState(initialData?.meanings[0]?.definition || "");
  const [example, setExample] = useState(initialData?.meanings[0]?.example || "");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("text", text);
      formData.append("level", level);
      formData.append("category", category);

      formData.append(
        "meanings",
        JSON.stringify([
          {
            partOfSpeech,
            definition,
            example,
          },
        ])
      );

      if (image) {
        formData.append("image", image);
      }

      if (isEdit && initialData) {
        await editCard(initialData._id, formData);
      } else {
        await createCard(formData);
      }

      onClose();

      window.location.reload();
    } catch (error) {
      alert(`Failed creating / editing card ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Create Flashcard</h2>

          <button
            onClick={onClose}
            className={styles.close}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            placeholder="Word"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            required
          />

          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "A1" | "A2" | "B1" | "B2" | "C1" | "C2")
            }
          >
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
          >
            <option value="">
              Select category
            </option>

            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

          <select
            value={partOfSpeech}
            onChange={(e) =>
              setPartOfSpeech(
                e.target.value as "noun" | "verb" | "adjective" | "adverb" | "phrase"
              )
            }
          >
            <option>noun</option>
            <option>verb</option>
            <option>adjective</option>
            <option>adverb</option>
            <option>phrase</option>
          </select>

          <textarea
            placeholder="Definition"
            value={definition}
            onChange={(e) =>
              setDefinition(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Example"
            value={example}
            onChange={(e) =>
              setExample(
                e.target.value
              )
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.submit}
          >
            {loading
              ? "Creating..."
              : "Create Card"}
          </button>
        </form>
      </div>
    </div>
  );
}