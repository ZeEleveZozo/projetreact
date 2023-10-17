import React, { useState } from 'react';
import './App.css';
import CommandePopup from './components/CommandePopup';
import img1 from './assets/extrabrut.png';
import img2 from './assets/monets.png';
import img3 from './assets/robbion.png';
import img_cart from './assets/add-cart.png';

function App() {
  const champagnes = [
    { nom: "Champagne Elemart Robbion Extra Brut", prix: 37.90, img: img1 },
    { nom: "Champagne Elemart Robbion Les Monets", prix: 42.00, img: img2 },
    { nom: "Champagne Elemart Robbion", prix: 46.00, img: img3 },
    { nom: "Champagne Elemart Petit Meslier 2018", prix: 59.00, img: img2 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (champagne) => {
    const existingItemIndex = cart.findIndex((item) => item.nom === champagne.nom);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantite += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...champagne, quantite: 1 }]);
    }
  };

  const removeFromCart = (champagne) => {
    const existingItemIndex = cart.findIndex((item) => item.nom === champagne.nom);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantite > 1) {
        updatedCart[existingItemIndex].quantite -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + item.prix * item.quantite, 0);
    return total.toFixed(2);
  };

  const [showPopup, setShowPopup] = useState(false);

  const openCommandePopup = () => {
    setShowPopup(true);
  };

  const closeCommandePopup = () => {
    setShowPopup(false);
  };

  const handleCommandeSubmit = (commandeData) => {
    console.log('Commande soumise :', commandeData);
    closeCommandePopup();
  };

  return (
    <div className="main-container">
      <div className="title">
        <h1>LA BOUTIQUE DU CHAMPAGNE</h1>
        <p>Articles dans le panier : {cart.reduce((acc, item) => acc + item.quantite, 0)}</p>
      </div>

      <div className="boutique">
        {champagnes.map((champagne, index) => (
          <div className="champagne" key={index}>
            <p>{champagne.nom}</p>
            <img src={champagne.img} alt={champagne.nom} />
            <p>{champagne.prix}€</p>
            <button className="button" onClick={() => addToCart(champagne)}>
              <img src={img_cart} alt="Ajouter au panier" />
            </button>
          </div>
        ))}
      </div>

      <div className='Panier'>
        <h1>Contenu du Panier</h1>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Prix total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.quantite}</td>
                <td>{item.prix.toFixed(2)}€</td>
                <td>{(item.prix * item.quantite).toFixed(2)}€</td>
                <td>
                  <button onClick={() => removeFromCart(item)}>Retirer un article</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="total-price">Prix total du panier : {calculateTotalPrice()}€</p>
      </div>

      <button onClick={openCommandePopup}>Passer une commande</button>

      <CommandePopup
        show={showPopup}
        onClose={closeCommandePopup}
        onSubmit={handleCommandeSubmit}
      />
      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 La Boutique du Champagne. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
