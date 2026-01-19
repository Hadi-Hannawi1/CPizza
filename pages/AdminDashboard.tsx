import React from 'react';
import { MOCK_MENU } from '../services/mockData';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#202020] text-white p-6 hidden md:block">
          <h2 className="font-heading text-2xl font-bold mb-8">ADMIN</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 bg-[#E31837] rounded text-white font-medium">Menu</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white transition-colors">Commandes</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white transition-colors">Stats</a>
            <a href="#" className="block py-2 px-4 text-gray-400 hover:text-white transition-colors">Réglages</a>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 font-heading">Gestion du Menu</h1>
            <Button>
              <Plus size={18} className="mr-2" /> Ajouter un produit
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs border-b">
                <tr>
                  <th className="px-6 py-4">Produit</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4">Prix (Sr)</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_MENU.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={item.image_url} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 uppercase">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 font-mono">{item.price_senior.toFixed(2)}€</td>
                    <td className="px-6 py-4">
                      <span className={`w-2 h-2 rounded-full inline-block mr-2 ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-gray-600">{item.available ? 'En stock' : 'Épuisé'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 mr-3"><Edit2 size={16} /></button>
                      <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};