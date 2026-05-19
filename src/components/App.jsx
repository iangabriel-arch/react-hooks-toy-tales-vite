import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // ─── READ ────────────────────────────────────────────────────────────────
  // When the app loads → GET /toys → set toys state
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // ─── CREATE ──────────────────────────────────────────────────────────────
  // When the form is submitted → POST /toys → add new toy to state
  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => setToys((prev) => [...prev, createdToy]));
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────
  // When Like is clicked → PATCH /toys/:id → update that toy's likes in state
  function handleLike(toy) {
    fetch(`${API_URL}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) =>
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        )
      );
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────
  // When Donate is clicked → DELETE /toys/:id → remove that toy from state
  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setToys((prev) => prev.filter((t) => t.id !== id))
    );
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </>
  );
}

export default App;