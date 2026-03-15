import { useState } from "react";
import "./profileCard.css";

type ProfileCardProps = {
  name: string;
  jobTitle: string;
  favoriteTech: string;
};

export default function ProfileCard({
  name,
  jobTitle,
  favoriteTech,
}: ProfileCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(0);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>
        <strong>Job title:</strong> {jobTitle}
      </p>
      <p>
        <strong>Favorite technology:</strong> {favoriteTech}
      </p>

      {showMore && (
        <p className="extraText">
          I am excited to learn more about React and TypeScript.
        </p>
      )}

      <button onClick={toggleShowMore}>
        {showMore ? "Show less" : "Show more"}
      </button>

      <button onClick={handleLike}>👍 Like</button>

      <p>Likes: {likes}</p>

      <button onClick={() => setLikes(0)}>Reset Likes</button>
    </div>
  );
}
