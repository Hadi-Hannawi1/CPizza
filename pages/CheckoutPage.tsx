import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, Bike, ShoppingBag, CreditCard, Banknote, MapPin, Phone, User, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const CheckoutPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = getCartTotal();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    orderType: 'delivery', // delivery, takeaway
    payment: 'cash'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.phone) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    if (formData.orderType === 'delivery' && !formData.address) {
      toast.error('Adresse requise pour la livraison');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success('Commande validée avec succès !', { 
        duration: 5000,
        icon: '🍕'
      });
      navigate('/'); 
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
           <ShoppingBag size={40} />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-4 text-[#121212]">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Vous n'avez pas encore sélectionné de pizzas. Notre four est chaud et n'attend que votre commande !</p>
        <Link to="/menu">
          <Button size="lg">DÉCOUVRIR LE MENU</Button>
        </Link>
      </div>
    );
  }

  const InputField = ({ label, icon: Icon, ...props }: any) => (
    <div className="relative group">
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">{label}</label>
      <div className="relative">
         {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E31837] transition-colors" size={18} />}
         <input 
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all`} 
            {...props} 
         />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
       {/* Header */}
       <div className="bg-white border-b sticky top-0 z-30 px-4 py-4">
          <div className="container mx-auto flex items-center justify-between">
             <Link to="/menu" className="inline-flex items-center text-gray-500 hover:text-[#121212] font-medium transition-colors">
               <ArrowLeft size={20} className="mr-2" /> Retour
             </Link>
             <h1 className="font-heading text-xl font-bold">VALIDATION</h1>
             <div className="w-8"></div> {/* Spacer */}
          </div>
       </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Mode */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="font-heading text-xl font-bold">MODE DE RETRAIT</h3>
               </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.orderType === 'delivery' ? 'border-[#E31837] bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="orderType" value="delivery" className="hidden" checked={formData.orderType === 'delivery'} onChange={(e) => setFormData({...formData, orderType: e.target.value})} />
                  <div className={`p-3 rounded-full mr-4 ${formData.orderType === 'delivery' ? 'bg-[#E31837] text-white' : 'bg-gray-100 text-gray-500'}`}>
                     <Bike size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Livraison</div>
                    <div className="text-sm text-gray-500">À votre domicile</div>
                  </div>
                  {formData.orderType === 'delivery' && <div className="absolute top-4 right-4 w-3 h-3 bg-[#E31837] rounded-full"></div>}
                </label>

                <label className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.orderType === 'takeaway' ? 'border-[#E31837] bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="orderType" value="takeaway" className="hidden" checked={formData.orderType === 'takeaway'} onChange={(e) => setFormData({...formData, orderType: e.target.value})} />
                  <div className={`p-3 rounded-full mr-4 ${formData.orderType === 'takeaway' ? 'bg-[#E31837] text-white' : 'bg-gray-100 text-gray-500'}`}>
                     <ShoppingBag size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">À Emporter</div>
                    <div className="text-sm text-gray-500">Au restaurant</div>
                  </div>
                  {formData.orderType === 'takeaway' && <div className="absolute top-4 right-4 w-3 h-3 bg-[#E31837] rounded-full"></div>}
                </label>
              </div>
            </section>

            {/* Step 2: Info */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="font-heading text-xl font-bold">COORDONNÉES</h3>
               </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <InputField 
                      label="Nom Complet *" 
                      icon={User}
                      required 
                      type="text" 
                      placeholder="Jean Dupont"
                      value={formData.name} 
                      onChange={(e: any) => setFormData({...formData, name: e.target.value})} 
                   />
                   <InputField 
                      label="Téléphone *" 
                      icon={Phone}
                      required 
                      type="tel" 
                      placeholder="06 12 34 56 78"
                      value={formData.phone} 
                      onChange={(e: any) => setFormData({...formData, phone: e.target.value})} 
                   />
                </div>
                
                <InputField 
                   label="Email (Reçu)" 
                   icon={Mail}
                   type="email" 
                   placeholder="jean@exemple.com"
                   value={formData.email} 
                   onChange={(e: any) => setFormData({...formData, email: e.target.value})} 
                />

                {formData.orderType === 'delivery' && (
                  <div className="relative group">
                     <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Adresse de Livraison *</label>
                     <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#E31837] transition-colors" size={18} />
                        <textarea 
                           required 
                           className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all" 
                           rows={3} 
                           placeholder="Rue, Code Postal, Ville, Digicode..."
                           value={formData.address} 
                           onChange={e => setFormData({...formData, address: e.target.value})}
                        ></textarea>
                     </div>
                  </div>
                )}
              </form>
            </section>

            {/* Step 3: Payment */}
             <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="font-heading text-xl font-bold">PAIEMENT</h3>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <label className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.payment === 'cash' ? 'border-[#E31837] bg-red-50/20' : 'border-gray-100 hover:border-gray-200'}`}>
                     <input type="radio" name="payment" value="cash" className="hidden" checked={formData.payment === 'cash'} onChange={() => setFormData({...formData, payment: 'cash'})} />
                     <Banknote size={32} className={`mb-2 ${formData.payment === 'cash' ? 'text-[#E31837]' : 'text-gray-400'}`} />
                     <span className={`font-bold ${formData.payment === 'cash' ? 'text-[#121212]' : 'text-gray-500'}`}>Espèces</span>
                     {formData.orderType === 'delivery' && <span className="text-xs text-gray-400">Au livreur</span>}
                     {formData.orderType === 'takeaway' && <span className="text-xs text-gray-400">Au comptoir</span>}
                  </label>

                  <label className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.payment === 'card' ? 'border-[#E31837] bg-red-50/20' : 'border-gray-100 hover:border-gray-200'}`}>
                     <input type="radio" name="payment" value="card" className="hidden" checked={formData.payment === 'card'} onChange={() => setFormData({...formData, payment: 'card'})} />
                     <CreditCard size={32} className={`mb-2 ${formData.payment === 'card' ? 'text-[#E31837]' : 'text-gray-400'}`} />
                     <span className={`font-bold ${formData.payment === 'card' ? 'text-[#121212]' : 'text-gray-500'}`}>Carte Bancaire</span>
                     {formData.orderType === 'delivery' && <span className="text-xs text-gray-400">Au livreur (TPE)</span>}
                  </label>
               </div>
             </section>
          </div>

          {/* Right Col: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg sticky top-24 border border-gray-100">
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                 <ShoppingBag size={20} className="text-[#E31837]"/> 
                 RÉSUMÉ
              </h3>
              
              <div className="space-y-5 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-dashed border-gray-100 pb-4">
                     <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={item.menuItem.image_url} alt={item.menuItem.name} className="w-full h-full object-cover" />
                     </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                         <div className="font-heading font-bold text-sm">{item.menuItem.name}</div>
                         <div className="font-bold text-sm">{(item.totalPrice * item.quantity).toFixed(2)}€</div>
                      </div>
                      <div className="text-xs text-gray-500 capitalize mb-2">{item.size} • {item.quantity}x</div>
                      
                      {item.customizations.extras.length > 0 && (
                        <div className="text-[10px] bg-gray-50 p-1.5 rounded text-gray-600 mb-2">
                           + {item.customizations.extras.join(', ')}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                         <div className="flex items-center border rounded-md">
                           <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 hover:bg-gray-100 text-gray-500">-</button>
                           <span className="text-xs font-bold px-2">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 hover:bg-gray-100 text-gray-500">+</button>
                         </div>
                         <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-auto">
                           <Trash2 size={14} />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Sous-total</span>
                  <span className="font-mono">{total.toFixed(2)}€</span>
                </div>
                {formData.orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Livraison</span>
                    <span className="font-mono">2.50€</span>
                  </div>
                )}
                <div className="flex justify-between font-heading font-bold text-2xl pt-4 mt-2 border-t border-gray-800">
                  <span>TOTAL</span>
                  <span className="text-[#E31837]">{(total + (formData.orderType === 'delivery' ? 2.50 : 0)).toFixed(2)}€</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                className="w-full mt-8 shadow-red-500/30" 
                size="lg"
                isLoading={loading}
              >
                CONFIRMER LA COMMANDE
              </Button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                 En commandant, vous acceptez nos CGV.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};