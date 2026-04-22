import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout, loginDemo, loginAdmin } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        📚 Flashcards
      </div>

      <div className={styles.right}>
        {!user && (
          <>
            <button onClick={loginDemo}>
              Login
            </button>

            <button onClick={loginAdmin}>
              Register
            </button>
          </>
        )}

        {user && (
          <>
            <span className={styles.user}>
              {user.role === "ADMIN"
                ? "🥷🏻"
                : "👤"}{" "}
              {user.username}
            </span>

            <span className={styles.badge}>
              {user.role}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}