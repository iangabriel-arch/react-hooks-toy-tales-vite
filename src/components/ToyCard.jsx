import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="card" data-testid="toy-card">
      <div className="card-img-wrapper">
        <img
          src={toy.image}
          alt={toy.name}
          className="toy-avatar"
        />
      </div>
      <h2>{toy.name}</h2>
      <p>{toy.likes} Likes </p>
      <div className="card-actions">
        <button className="like-btn" onClick={() => onLike(toy)}>
          Like {"<3"}
        </button>
        <button className="del-btn" onClick={() => onDelete(toy.id)}>
          Donate to GoodWill
        </button>
      </div>
    </div>
  );
}

export default ToyCard;