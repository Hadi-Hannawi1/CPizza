import React, { useState, useEffect } from 'react';
import { MOCK_MENU } from '../services/mockData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { MenuItem } from '../types';
import { useCartStore } from '../store/cartStore';
import { Search, Pizza, Beer, IceCream, Plus, Utensils, X, ChevronRight, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'all', label: 'Tout', icon: Utensils },
  { id: 'base-tomate', label: 'Base Tomate', icon: Pizza },
  { id: 'base-creme', label: 'Base Crème', icon: Pizza },
  { id: 'sides', label: 'Sides', icon: Plus },
  { id: 'desserts', label: 'Desserts', icon: IceCream },
  { id: 'drinks', label: 'Boissons', icon: Beer },
];

const INGREDIENT_ALLERGENS: Record<string, string[]> = {
  'Mozzarella': ['Lait'],
  'Chèvre': ['Lait'],
  'Roquefort': ['Lait'],
  'Œuf': ['Œuf'],
  'Thon': ['Poisson'],
  'Saumon': ['Poisson'],
  'Crème': ['Lait'],
  'Parmigiano': ['Lait'],
  'Reblochon': ['Lait'],
  'Brie': ['Lait'],
  'Cheddar': ['Lait'],
  'Raclette': ['Lait'],
};

export const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  
  // Customization State
  const [size, setSize] = useState<'junior' | 'senior' | 'mega'>('senior');
  const [baseModifier, setBaseModifier] = useState('Classique');
  const [extras, setExtras] = useState<string[]>([]);

  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items
  const filteredItems = MOCK_MENU.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (item: MenuItem) => {
    setSize('senior');
    setBaseModifier('Classique');
    setExtras([]);
    setSelectedItem(item);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    addToCart(selectedItem, size, {
      base: baseModifier,
      removals: [],
      extras: extras
    });

    toast.success(`${selectedItem.name} ajouté !`);
    setSelectedItem(null);
  };

  const toggleExtra = (extraName: string) => {
    if (extras.includes(extraName)) {
      setExtras(extras.filter(e => e !== extraName));
    } else {
      if (extras.length >= 3) {
        toast.error('Maximum 3 suppléments');
        return;
      }
      setExtras([...extras, extraName]);
    }
  };

  const getCurrentPrice = () => {
    if (!selectedItem) return 0;
    const basePrice = 
      size === 'junior' ? selectedItem.price_junior :
      size === 'senior' ? selectedItem.price_senior : 
      selectedItem.price_mega;
    
    const extrasCost = extras.length * 1.50 + (baseModifier === 'Cheezy Crust' ? 2.50 : 0);
    return basePrice + extrasCost;
  };

  const getAllergens = () => {
    if (!selectedItem) return [];
    let allergens = new Set(selectedItem.allergens || []);
    extras.forEach(extra => { if (INGREDIENT_ALLERGENS[extra]) INGREDIENT_ALLERGENS[extra].forEach(a => allergens.add(a)); });
    if (baseModifier === 'Cheezy Crust') { allergens.add('Lait'); allergens.add('Gluten'); }
    return Array.from(allergens);
  };

  const isPizza = selectedItem?.category === 'base-tomate' || selectedItem?.category === 'base-creme';

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-24 md:pb-12">
      {/* Hero Header */}
      <div className="relative bg-[#121212] py-24 text-center overflow-hidden">
         <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="relative z-10 container mx-auto px-4">
             <span className="font-script text-gold text-3xl block mb-2">Choisir votre goût</span>
             <h1 className="font-heading font-bold text-5xl md:text-6xl text-white uppercase tracking-wider">Notre Carte</h1>
         </div>
      </div>

      {/* Sticky Categories */}
      <div className={`sticky top-0 md:top-[80px] z-30 transition-all duration-300 ${isSticky ? 'bg-white shadow-md py-3' : 'bg-transparent -mt-8 py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-3 md:justify-center pb-2 md:pb-0">
             {CATEGORIES.map(cat => {
               const Icon = cat.icon;
               const isActive = activeCategory === cat.id;
               return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
                    isActive
                      ? 'bg-gold text-black transform scale-105' 
                      : 'bg-white text-gray-500 hover:text-gold'
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
               );
             })}
          </div>
        </div>
      </div>

      {/* Search & Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto mb-12 relative">
           <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-6 pr-12 py-4 rounded-full border-none shadow-lg focus:ring-2 focus:ring-gold outline-none text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
           <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2"
              onClick={() => handleOpenModal(item)}
            >
              <div className="relative h-60 overflow-hidden p-4 bg-[#fff8ef] flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-white flex items-center justify-center shadow-inner relative z-10">
                   <img 
                     src={item.image_url} 
                     alt={item.name} 
                     className="w-48 h-48 object-cover rounded-full transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" 
                   />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                   {item.is_new && <span className="bg-gold text-black text-xs font-bold px-2 py-1 rounded uppercase">New</span>}
                   {item.is_spicy && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">Hot</span>}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow text-center relative">
                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2 uppercase group-hover:text-gold transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-dashed border-gray-200">
                   <span className="font-heading font-bold text-2xl text-red-600">{item.price_senior.toFixed(2)}€</span>
                   <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors shadow-lg">
                      <Plus size={20} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - keeping previous structure but ensuring style consistency */}
      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.name || ''}
      >
        {selectedItem && (
          <div className="space-y-6">
            {/* Same modal content as before, style is inherited from global CSS */}
            <div className="relative h-48 -mx-6 -mt-2 mb-6">
              <img src={selectedItem.image_url} className="w-full h-full object-cover" alt={selectedItem.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex gap-2 mb-2">
                   {selectedItem.is_spicy && <Badge type="spicy" />}
                   {selectedItem.is_vegetarian && <Badge type="vegetarian" />}
                </div>
                <p className="text-white/90 text-sm leading-relaxed">{selectedItem.description}</p>
              </div>
            </div>

            {getAllergens().length > 0 && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-3">
                <AlertCircle size={18} className="text-[#E31837] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#E31837] uppercase tracking-wider mb-1">Information Allergènes</h5>
                  <p className="text-xs text-gray-700">
                    Ce produit contient : <span className="font-medium">{getAllergens().join(', ')}</span>.
                  </p>
                </div>
              </div>
            )}
            
            {isPizza && (
              <>
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-lg border-b pb-2">CHOISIR LA TAILLE</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['junior', 'senior', 'mega'].map((s) => (
                       <button 
                       key={s}
                       onClick={() => setSize(s as any)}
                       className={`p-4 border-2 rounded-2xl text-center transition-all relative overflow-hidden ${
                         size === s 
                           ? 'border-gold bg-yellow-50 text-black' 
                           : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                       }`}
                     >
                       {size === s && <div className="absolute top-0 right-0 w-4 h-4 bg-gold rounded-bl-lg"></div>}
                       <div className="text-sm font-bold capitalize mb-1">{s}</div>
                       <div className="font-heading font-bold text-lg">
                         {s === 'junior' ? selectedItem.price_junior : s === 'senior' ? selectedItem.price_senior : selectedItem.price_mega}€
                       </div>
                     </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-lg border-b pb-2">TYPE DE PÂTE</h4>
                  <div className="flex flex-col gap-2">
                    {['Fine', 'Classique', 'Cheezy Crust'].map((base) => (
                      <label key={base} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${baseModifier === base ? 'border-gold bg-yellow-50/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${baseModifier === base ? 'border-gold' : 'border-gray-300'}`}>
                             {baseModifier === base && <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>}
                          </div>
                          <span className={`font-medium ${baseModifier === base ? 'text-black' : 'text-gray-700'}`}>{base}</span>
                        </div>
                        {base === 'Cheezy Crust' && <span className="text-xs font-bold px-2 py-1 bg-gold text-black rounded">+2.50€</span>}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-lg border-b pb-2">SUPPLÉMENTS <span className="text-sm font-normal text-gray-500 ml-2">(+1.50€)</span></h4>
                  <div className="flex flex-wrap gap-2">
                    {['Champignons', 'Poivrons', 'Oignons', 'Olives', 'Œuf', 'Chèvre', 'Mozzarella', 'Miel', 'Jambon'].map((extra) => (
                      <button
                        key={extra}
                        onClick={() => toggleExtra(extra)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all border font-medium ${
                          extras.includes(extra) 
                            ? 'bg-black text-white border-black shadow-lg' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {extra}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="pt-6 mt-8 border-t border-gray-100 sticky bottom-0 bg-white pb-2">
              <Button onClick={handleAddToCart} variant="gold" fullWidth size="lg">
                <div className="flex justify-between w-full items-center px-2">
                   <span>AJOUTER AU PANIER</span>
                   <span className="bg-white/30 px-3 py-1 rounded-lg backdrop-blur-sm">{getCurrentPrice().toFixed(2)}€</span>
                </div>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};