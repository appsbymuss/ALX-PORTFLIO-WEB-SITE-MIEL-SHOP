import React from "react";

const Checkout = () => {
  return (
    <div className="flex justify-center bg-[#fef7f2] min-h-screen py-10">
      {/* Main Container */}
      <div className="flex w-[90%] max-w-[1200px] space-x-6">
        {/* Left Section */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8">
            {/* Steps */}
            <div className="flex items-center space-x-2 text-sm text-[#ffc107]">
              <span className="font-semibold">Compte</span>
              <span>-</span>
              <span className="text-gray-400">Shipping</span>
              <span>-</span>
              <span className="text-gray-400">Payment</span>
            </div>
            {/* Title */}
            <h2 className="text-xl font-semibold mt-4 mb-6">Détails du compte</h2>
          </div>
          <button className="flex items-center justify-center w-full py-2 mb-6 border border-gray-300 rounded-md">
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Se connecter avec Google
          </button>
          <div className="mb-4 text-center text-gray-400">Ou continuez avec E-mail</div>
          <form>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Souvenez-vous de moi</span>
                </label>
                <a href="#" className="text-[#ffc107] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-[#ffc107] rounded-md hover:bg-[#e6b706]"
              >
                Se Connecter
              </button>
            </div>
          </form>
          <div className="mt-8 flex justify-between">
            <button className="text-[#ffc107] underline">Annuler la commande</button>
            <button className="py-2 px-4 bg-[#ffc107] text-white rounded-md hover:bg-[#e6b706]">
              Détails de livraisons
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[35%] bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Finalisez Votre Commande</h2>
          <div className="flex items-center mb-6">
            <img
              src="/miel.jpg"
              alt="Miel De Jujubier"
              className="w-20 h-20 rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">Miel De Jujubier</h3>
              <p className="text-gray-600">44.99 €</p>
            </div>
            <input
              type="number"
              min="1"
              value="1"
              className="w-12 border rounded-md text-center"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Carte cadeau / Code de réduction"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
            />
            <button className="mt-2 py-2 px-4 bg-[#ffc107] text-white rounded-md hover:bg-[#e6b706]">
              Appliquer
            </button>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Sous-total</span>
              <span>44.99 €</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Taxe</span>
              <span>4.99 €</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping</span>
              <span className="text-[#ffc107]">Gratuit</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>51.99 €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
