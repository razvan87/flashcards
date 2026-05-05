import { useState } from "react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../hooks/useAuth";
import CreateCardModal from "../cards/CreateCardModal";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const location = useLocation();

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.title}>Dashboard</div>

        <nav className={styles.menu}>
          {isAdmin && (
            <button
              className={styles.primary}
              onClick={() => setShowCreateModal(true)}
            >
              + Create Card
            </button>
          )}
          <Link
            to="/"
            className={location.pathname === "/" ? styles.active : ""}
          >
            All
          </Link>
          <Link
            to="/favorites"
            className={location.pathname === "/favorites" ? styles.active : ""}
          >
            Favorites
          </Link>

          <Link
            to="/learned"
            className={location.pathname === "/learned" ? styles.active : ""}
          >
            Learned
          </Link>
        </nav>
      </aside>
      {showCreateModal && (
        <CreateCardModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}