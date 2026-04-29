import { useEffect, useState } from "react";
import styles from "./CreateCardModal.module.css";
import { createCard, fetchCategories } from "../../api/cardApi";

type Props = {
  onClose: () => void;
};

export default function CreateCardModal({
  onClose,
}: Props) {
  const [text, setText] = useState("");
  const [level, setLevel] = useState("A1");
  const [category, setCategory] = useState("");
  const [partOfSpeech, setPartOfSpeech] =
    useState("noun");
  const [definition, setDefinition] =
    useState("");
  const [example, setExample] = useState("");
  const [image, setImage] =
    useState<File | null>(null);

  const [categories, setCategories] =
    useState<string[]>([]);
  const [loading, setLoading] =
    useState(false);

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

  async function handleSubmit(
    e: React.FormEvent
  ) {
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

      await createCard(formData);

      onClose();

      window.location.reload();
    } catch (error) {
      alert("Failed creating card");
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
              setLevel(e.target.value)
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
                e.target.value
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