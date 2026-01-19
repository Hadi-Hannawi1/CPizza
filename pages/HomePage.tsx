import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Bike, Flame, Clock, ChefHat, ArrowRight, MapPin, Star, Wheat, Award, Leaf, Utensils } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Hero Section - Pizzon Style */}
      <section className="relative min-h-[90vh] flex items-center bg-[#fff8ef]">
        {/* Floating Decorative Elements using Icons instead of broken images */}
        <div className="absolute top-20 left-10 w-16 h-16 text-green-500 opacity-60 animate-float flex items-center justify-center">
           <Leaf size={48} />
        </div>
        <div className="absolute bottom-20 right-10 w-20 h-20 text-red-400 opacity-60 animate-float-delayed flex items-center justify-center transform rotate-45">
           <Utensils size={56} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left pt-12 lg:pt-0">
                 <span className="font-script text-gold text-3xl md:text-4xl block transform -rotate-2">Délicieuse & Croustillante</span>
                 <h1 className="font-heading font-bold text-6xl md:text-8xl text-gray-900 leading-[0.9]">
                   PIZZA <br/>
                   <span className="text-red-600">ARTISANALE</span>
                 </h1>
                 <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                   Une expérience authentique à Asnières. Pâte pétrie chaque matin, ingrédients frais et cuisson au feu de bois.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Link to="/menu">
                      <Button variant="gold" size="xl" className="shadow-xl">COMMANDER MAINTENANT</Button>
                    </Link>
                    <Link to="/menu">
                      <Button variant="white" size="xl">VOIR LE MENU</Button>
                    </Link>
                 </div>
              </div>

              {/* Hero Image */}
              <div className="order-1 lg:order-2 relative">
                 <div className="relative w-full max-w-lg mx-auto aspect-square p-6">
                    <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse blur-3xl"></div>
                    <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl animate-spin-slow">
                        <img 
                          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80" 
                          alt="Delicious Pizza" 
                          className="w-full h-full object-cover scale-110" 
                        />
                    </div>
                    {/* Price Badge */}
                    <div className="absolute top-0 right-0 lg:-right-4 bg-white p-4 rounded-full shadow-2xl z-20 animate-float border-4 border-gold w-28 h-28 flex flex-col items-center justify-center transform rotate-12">
                       <span className="text-xs font-bold uppercase text-gray-500">Dès</span>
                       <span className="text-3xl font-heading font-bold text-red-600">8<span className="text-lg">.50€</span></span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Daily Fresh Section */}
      <section className="py-24 bg-white relative">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="group relative overflow-hidden rounded-3xl h-80 shadow-lg cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1595707678535-6494796e6244?auto=format&fit=crop&w=600&q=80" alt="Handmade" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white group-hover:bg-black/50 transition-colors">
                     <span className="font-script text-gold text-2xl mb-2">Pâte Fraîche</span>
                     <h3 className="font-heading font-bold text-3xl uppercase">Fait Main</h3>
                     <Link to="/menu" className="mt-4 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors inline-flex items-center gap-2">Commander <ArrowRight size={14}/></Link>
                  </div>
               </div>
               <div className="group relative overflow-hidden rounded-3xl h-80 shadow-lg cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?auto=format&fit=crop&w=600&q=80" alt="Delivery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white group-hover:bg-black/50 transition-colors">
                     <span className="font-script text-gold text-2xl mb-2">Livraison Rapide</span>
                     <h3 className="font-heading font-bold text-3xl uppercase">30 Minutes</h3>
                     <Link to="/menu" className="mt-4 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors inline-flex items-center gap-2">Commander <ArrowRight size={14}/></Link>
                  </div>
               </div>
               <div className="group relative overflow-hidden rounded-3xl h-80 shadow-lg cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1593560708920-63878b2d1844?auto=format&fit=crop&w=600&q=80" alt="Fresh" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white group-hover:bg-black/50 transition-colors">
                     <span className="font-script text-gold text-2xl mb-2">Ingrédients</span>
                     <h3 className="font-heading font-bold text-3xl uppercase">100% Frais</h3>
                     <Link to="/menu" className="mt-4 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors inline-flex items-center gap-2">Commander <ArrowRight size={14}/></Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Our Strength */}
      <section className="py-24 bg-[#fff8ef]">
         <div className="container mx-auto px-4 text-center">
            <span className="font-script text-red-600 text-3xl block mb-2">Pourquoi Choisir</span>
            <h2 className="font-heading font-bold text-5xl text-gray-900 mb-16 uppercase">Nos Points Forts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
               <StrengthItem icon={Wheat} title="Produits Naturels" desc="Sans conservateurs, farine italienne" />
               <StrengthItem icon={ChefHat} title="Chef Expert" desc="10 ans d'expérience" />
               <StrengthItem icon={Flame} title="Feu de Bois" desc="Cuisson traditionnelle à 400°C" />
               <StrengthItem icon={Bike} title="Livraison Express" desc="Chaude à votre porte" />
            </div>
         </div>
      </section>

      {/* Large Visual Section */}
      <section className="relative py-32 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1600&q=80')"}}>
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="font-script text-gold text-4xl mb-4 block">C'est le moment de craquer</span>
            <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8 uppercase">Pizza Du Jour <br/> <span className="text-gold">Offre Spéciale</span></h2>
            <Link to="/menu">
               <Button variant="gold" size="xl" className="uppercase font-bold tracking-widest hover:bg-white hover:text-black">Commander</Button>
            </Link>
         </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2">
                <span className="font-script text-red-600 text-3xl block mb-2">Visitez-nous</span>
                <h2 className="font-heading font-bold text-5xl text-gray-900 mb-8 uppercase">Localisation</h2>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                   Au cœur d'Asnières-sur-Seine, nous vous accueillons dans un cadre chaleureux. Venez voir notre four à bois en action !
                </p>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white shrink-0">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">Adresse</h4>
                         <p className="text-gray-500">6-8 Rue Armand Numès, 92600 Asnières</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white shrink-0">
                         <Clock size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">Horaires</h4>
                         <p className="text-gray-500">Ouvert 7j/7 - Midi & Soir</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="lg:w-1/2 w-full">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-[#fff8ef] h-[400px]">
                   <img 
                      src="https://maps.googleapis.com/maps/api/staticmap?center=48.9108,2.2882&zoom=15&size=800x600&markers=color:red%7C48.9108,2.2882&key="
                      alt="Map"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                         e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                      }}
                   />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StrengthItem = ({ icon: Icon, title, desc }: any) => (
   <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="w-20 h-20 mx-auto bg-[#fff8ef] rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
         <Icon size={32} className="text-black group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-heading font-bold text-xl mb-3 uppercase">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
   </div>
);