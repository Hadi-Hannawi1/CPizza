import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, Phone, MapPin, Instagram, Facebook, Home, Pizza, User, UtensilsCrossed, Menu as MenuIcon, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Layout = () => {
  const cartCount = useCartStore(state => state.getCartCount());
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const time = hour + minute / 60;
      let open = false;
      if (day >= 1 && day <= 4) { if ((time >= 11 && time < 14.5) || (time >= 18 && time < 22.5)) open = true; } 
      else if (day === 5) { if (time >= 18 && time < 23) open = true; } 
      else { if ((time >= 11 && time < 14.5) || (time >= 18 && time < 23)) open = true; }
      setIsOpen(open);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const isDashboard = location.pathname.startsWith('/kitchen') || location.pathname.startsWith('/admin');
  if (isDashboard) return <Outlet />;

  const NavLink = ({ to, icon: Icon, label }: any) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex flex-col items-center justify-center w-full py-3 transition-all duration-300 relative group`}>
        <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-gray-600'}`}>
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 transition-colors ${isActive ? 'text-gold' : 'text-gray-400'}`}>
          {label}
        </span>
        {label === 'Panier' && cartCount > 0 && (
          <span className="absolute top-2 right-[28%] bg-gold text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce-subtle">
            {cartCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Main Header - Clean White */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-50">
               <div className="relative">
                 <div className="w-12 h-12 bg-white border-2 border-gold rounded-full flex items-center justify-center relative z-10">
                   <span className="font-heading font-bold text-2xl text-red-600">C'</span>
                 </div>
                 <div className="absolute top-0 right-0 w-4 h-4 bg-gold rounded-full -mr-1 -mt-1 animate-pulse"></div>
               </div>
               <div className="flex flex-col">
                 <span className="font-heading font-bold text-2xl tracking-tight text-gray-900 leading-none group-hover:text-gold transition-colors">PIZZA</span>
                 <span className="font-script text-gold text-lg leading-none -mt-1 transform -rotate-2">Asnières</span>
               </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-12">
              <Link to="/" className={`font-heading font-bold uppercase tracking-widest text-sm hover:text-gold transition-colors ${location.pathname === '/' ? 'text-gold' : 'text-gray-900'}`}>Accueil</Link>
              <Link to="/menu" className={`font-heading font-bold uppercase tracking-widest text-sm hover:text-gold transition-colors ${location.pathname === '/menu' ? 'text-gold' : 'text-gray-900'}`}>Menu</Link>
              <Link to="/kitchen" className="font-heading font-bold uppercase tracking-widest text-sm hover:text-gold transition-colors text-gray-900">Cuisine</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
               {/* Phone Number - Desktop */}
               <div className="hidden lg:flex items-center gap-3 bg-red-50 px-4 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white">
                     <Phone size={14} fill="currentColor" />
                  </div>
                  <div>
                     <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold">Commander</span>
                     <span className="block font-heading font-bold text-gray-900 leading-none">01 41 11 00 44</span>
                  </div>
               </div>

              <Link to="/checkout" className="hidden lg:block relative group">
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-300">
                    <ShoppingBag size={20} />
                 </div>
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                     {cartCount}
                   </span>
                 )}
              </Link>

              <button className="lg:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden animate-fade-in">
           <nav className="flex flex-col space-y-6 text-center">
              <Link to="/" className="text-2xl font-heading font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>ACCUEIL</Link>
              <Link to="/menu" className="text-2xl font-heading font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>NOTRE CARTE</Link>
              <Link to="/admin" className="text-2xl font-heading font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>MON COMPTE</Link>
           </nav>
        </div>
      )}

      <main className="flex-grow pb-20 lg:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 lg:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl">
        <div className="flex justify-around items-center px-2">
          <NavLink to="/" icon={Home} label="Accueil" />
          <NavLink to="/menu" icon={Pizza} label="Carte" />
          <NavLink to="/checkout" icon={ShoppingBag} label="Panier" />
          <NavLink to="/admin" icon={User} label="Compte" />
        </div>
      </div>

      <footer className="bg-[#121212] text-white pt-24 pb-12 hidden lg:block relative overflow-hidden">
        {/* Background Pattern Overlay - Replaced broken link with CSS gradient/opacity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900"></div>
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-3xl tracking-tight text-white">C'PIZZA</span>
                <span className="font-script text-gold text-xl">Artisan Pizza</span>
              </div>
              <p className="text-gray-400 text-sm leading-7">
                La passion du goût authentique. Pâte fraîche, ingrédients de qualité et cuisson au feu de bois pour une expérience unique.
              </p>
              <div className="flex gap-4">
                 <SocialButton icon={Instagram} />
                 <SocialButton icon={Facebook} />
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-xl mb-8 text-gold uppercase">Liens Rapides</h4>
              <ul className="text-gray-400 space-y-3 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/menu" className="hover:text-white transition-colors">Notre Carte</Link></li>
                <li><Link to="/kitchen" className="hover:text-white transition-colors">Cuisine</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Administration</Link></li>
              </ul>
            </div>

            <div>
               <h4 className="font-heading font-bold text-xl mb-8 text-gold uppercase">Horaires</h4>
               <ul className="text-gray-400 space-y-3 text-sm">
                  <li className="flex justify-between"><span>Lun - Jeu</span> <span className="text-white">11:00 - 22:30</span></li>
                  <li className="flex justify-between"><span>Vendredi</span> <span className="text-white">18:00 - 23:00</span></li>
                  <li className="flex justify-between"><span>Sam - Dim</span> <span className="text-white">11:00 - 23:00</span></li>
               </ul>
            </div>

            <div>
               <h4 className="font-heading font-bold text-xl mb-8 text-gold uppercase">Contact</h4>
               <ul className="space-y-4">
                 <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-gold">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-white font-bold text-sm">6-8 Rue Armand Numès</span>
                      <span className="text-gray-500 text-xs">92600 Asnières-sur-Seine</span>
                    </div>
                 </li>
                 <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-gold">
                      <Phone size={18} />
                    </div>
                    <span className="text-white font-bold text-lg">01 41 11 00 44</span>
                 </li>
               </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-xs text-gray-500">
             <p>© {new Date().getFullYear()} C'Pizza. Tous droits réservés.</p>
             <div className="flex gap-4">
                <a href="#" className="hover:text-gold">Mentions Légales</a>
                <a href="#" className="hover:text-gold">Confidentialité</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SocialButton = ({ icon: Icon }: any) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold transition-all duration-300 transform hover:-translate-y-1">
    <Icon size={18} />
  </a>
);