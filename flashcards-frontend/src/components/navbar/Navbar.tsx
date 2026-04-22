import { useState } from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal"; 

export default function Navbar() {
  const { user, logout } = useAuth();

  const [showLogin, setShowLogin] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  function openLogin() {
    setShowLogin(true);
  }

  function closeLogin() {
    setShowLogin(false);
  }

  function openRegister() {
    setShowRegister(true);
  }

  function closeRegister() {
    setShowRegister(false);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>📚 Flashcards</div>

        <div className={styles.right}>
          {!user && (
            <>
              <button onClick={openLogin}>Login</button>

              <button onClick={openRegister}>Register</button>
            </>
          )}

          {user && (
            <>
              <span className={styles.user}>
                {user.role === "ADMIN" ? "🥷🏻" : "👤"} {user.username}
              </span>

              <span className={styles.badge}>{user.role}</span>

              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>
      {showLogin && <LoginModal onClose={closeLogin} />}

      {showRegister && <RegisterModal onClose={closeRegister} />}
    </>
  );
}
