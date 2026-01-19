import React, { useState, useEffect } from 'react';
import { MOCK_ORDERS } from '../services/mockData';
import { Order } from '../types';
import { Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const KitchenDashboard = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS as Order[]);
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch from PocketBase or listen to WebSocket
      console.log('Refreshing orders...'); 
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const moveStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Commande ${newStatus === 'preparing' ? 'en préparation' : 'prête'} !`);
  };

  const StatusColumn = ({ title, status, color }: { title: string, status: string, color: string }) => {
    const columnOrders = orders.filter(o => o.status === status);
    
    return (
      <div className="flex-1 bg-gray-100 rounded-xl p-4 flex flex-col h-full">
        <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${color}`}>
          <h2 className="font-heading font-bold text-xl text-gray-700">{title}</h2>
          <span className="bg-white px-2 py-1 rounded text-sm font-bold text-gray-500">{columnOrders.length}</span>
        </div>
        
        <div className="space-y-4 overflow-y-auto flex-1">
          {columnOrders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-transparent hover:border-l-[#E31837] transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg">#{order.order_number}</span>
                <span className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">
                  {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              <div className="mb-3">
                <div className={`text-xs uppercase font-bold tracking-wider inline-block px-2 py-1 rounded ${
                  order.type === 'delivery' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.type === 'delivery' ? 'Livraison' : 'Emporter'}
                </div>
              </div>

              {/* Items Placeholder since Mock Orders are empty items array for brevity, 
                  rendering static items for visual demo */}
              <div className="space-y-1 mb-4 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>1x Margherita (Senior)</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Coca (33cl)</span>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end">
                {status === 'pending' && (
                  <Button size="sm" onClick={() => moveStatus(order.id, 'preparing')}>
                    Lancer
                  </Button>
                )}
                {status === 'preparing' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => moveStatus(order.id, 'ready')}>
                    Prêt
                  </Button>
                )}
                {status === 'ready' && (
                  <div className="text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle size={16} /> Prêt
                  </div>
                )}
              </div>
            </div>
          ))}
          {columnOrders.length === 0 && (
            <div className="text-center text-gray-400 py-8 italic">Aucune commande</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-gray-800">ÉCRAN CUISINE</h1>
        <div className="flex items-center gap-2 text-gray-500">
           <Clock size={20} />
           <span className="font-mono text-xl">{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <StatusColumn title="EN ATTENTE" status="pending" color="border-yellow-500" />
        <StatusColumn title="EN PRÉPARATION" status="preparing" color="border-blue-500" />
        <StatusColumn title="PRÊT" status="ready" color="border-green-500" />
      </div>
    </div>
  );
};