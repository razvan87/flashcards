import { useState } from "react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../hooks/useAuth";
import CreateCardModal from "../cards/CreateCardModal";

export default function Sidebar() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

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

          <button>Favorites</button>
          <button>Learned</button>
          <button>Categories</button>
        </nav>
      </aside>
      {showCreateModal && (
        <CreateCardModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}