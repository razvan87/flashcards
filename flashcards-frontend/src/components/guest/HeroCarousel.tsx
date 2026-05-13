import { useEffect, useState } from "react";
import styles from "./HeroCarousel.module.css";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const slides = [
  {
    icon: "📚",
    title: "Learn English with Flashcards",
    text: "Interactive vocabulary learning with images and examples.",
    button: "Start Learning",
  },
  {
    icon: "🚀",
    title: "Improve Your Vocabulary",
    text: "Thousands of flashcards organized by levels and categories.",
    button: "Login",
  },
  {
    icon: "🧠",
    title: "Smart Learning",
    text: "Definitions, examples and images help you remember faster.",
    button: "Create Free Account",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  function nextSlide() {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  const handleOpenLoginModal = () => {
    if (slides[current].button === "Login") {
      setIsLoginModalOpen(true);
    }
  }; 

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    if (slides[current].button === "Create Free Account") {
      setIsRegisterModalOpen(true);
    }
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
    <section className={styles.carousel}>
      <div className={styles.slide}>
        <span className={styles.icon}>
          {slides[current].icon}
        </span>

        <h1>{slides[current].title}</h1>

        <p>{slides[current].text}</p>

        <button onClick={() => {
          if (slides[current].button === "Login") {
            handleOpenLoginModal();
          }
          if (slides[current].button === "Create Free Account") {
            handleOpenRegisterModal();
          }
        }}>
          {slides[current].button}
        </button>
      </div>

      {/* arrows */}
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={prevSlide}
      >
        ‹
      </button>

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
      >
        ›
      </button>

      {/* dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={
              index === current
                ? `${styles.dot} ${styles.active}`
                : styles.dot
            }
            onClick={() =>
              setCurrent(index)
            }
          />
        ))}
      </div>
    </section>

     {/* Conditionally render the LoginModal */}
     {isLoginModalOpen && (
      <LoginModal onClose={handleCloseLoginModal} />
    )}
          {/* Conditionally render the RegisterModal */}
          {isRegisterModalOpen && (
        <RegisterModal onClose={handleCloseRegisterModal} />
      )}
    </>
  );
}