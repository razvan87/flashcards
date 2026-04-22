import { useState } from "react";
import styles from "./Modal.module.css";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  onClose: () => void;
};

export default function LoginModal({
  onClose,
}: Props) {
  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(username, password);

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            Login
          </h2>

          <button
            className={styles.close}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button
            className={styles.button}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}