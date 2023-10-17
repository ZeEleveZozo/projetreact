import React, { useState } from 'react';

function CommandePopup({ show, onClose, onSubmit }) {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ nom, adresse });
  };

  return (
    <div className={`commande-popup ${show ? 'active' : ''}`}>
      <div className="commande-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Passer une commande</h2>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={handleNomChange}
        />
        <input
          type="text"
          placeholder="Adresse de livraison"
          value={adresse}
          onChange={handleAdresseChange}
        />
        <button onClick={handleSubmit}>Commander</button>
      </div>
    </div>
  );
}

export default CommandePopup;
