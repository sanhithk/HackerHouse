import { Link } from 'react-router-dom';
import { ArrowRight, Ticket } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col relative z-10 overflow-x-hidden">
      
      {/* Animated Goa Vibes in Background */}
      <div className="absolute top-10 left-4 md:left-10 text-6xl md:text-8xl animate-sway z-0 opacity-80 pointer-events-none drop-shadow-lg">🌴</div>
      <div className="absolute top-20 right-4 md:right-20 text-6xl md:text-7xl animate-float z-0 opacity-90 pointer-events-none drop-shadow-lg" style={{ animationDelay: '200ms' }}>☀</div>
      <div className="absolute top-1/2 left-8 text-5xl md:text-6xl animate-float-reverse z-0 opacity-70 pointer-events-none drop-shadow-md" style={{ animationDelay: '500ms' }}>🥥</div>
      <div className="absolute bottom-1/4 right-8 text-6xl md:text-8xl animate-sway z-0 opacity-80 pointer-events-none drop-shadow-lg" style={{ animationDelay: '1000ms' }}>🏖</div>
      <div className="absolute bottom-10 left-1/4 text-5xl md:text-6xl animate-float z-0 opacity-60 pointer-events-none" style={{ animationDelay: '1500ms' }}>🌊</div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full mt-24 mb-20 relative z-10">
        
        {/* Brand Lockup */}
        <div className="relative mb-12 group">
          {/* Devanagari Sticker overlapping */}
          <div className="absolute -top-8 -right-8 bg-brand-yellow text-brand-green font-display text-2xl px-4 py-1 rounded-sm border-2 border-brand-pink rotate-12 shadow-lg z-20 group-hover:rotate-6 transition-transform">
            गोवा
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight text-brand-green leading-none drop-shadow-sm bg-white/30 backdrop-blur-sm p-4 rounded-3xl border border-white/20">
            HACKER<br/>HOUSE
          </h1>
          
          {/* Tropical vector accent (simple SVG) */}
          <div className="absolute -left-12 -bottom-6 w-24 h-24 bg-brand-green rounded-full -z-10 flex items-center justify-center shadow-xl">
             <span className="text-4xl block transform -rotate-12 animate-sway">🌴</span>
          </div>
        </div>

        <p className="text-lg md:text-2xl max-w-2xl text-brand-green/90 font-medium mb-10 leading-relaxed bg-brand-cream/80 p-4 rounded-xl backdrop-blur-sm">
          HH Goa 2026 is live. Complete tasks, climb the ladder, win your official Builder ID.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center mb-24">
          <Link 
            to="/generate" 
            className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-brand-cream px-10 py-5 rounded-2xl font-condensed font-bold text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-brand-green/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Ticket className="w-6 h-6" />
            GENERATE MY BUILDER ID
          </Link>
          
          <a 
            href="#more" 
            className="w-full sm:w-auto px-8 py-5 text-brand-green font-condensed font-bold text-xl flex items-center justify-center gap-2 hover:text-brand-pink transition-colors"
          >
            SHOW MORE
            <ArrowRight className="w-6 h-6 animate-pulse" />
          </a>
        </div>

        {/* Show More Section */}
        <div id="more" className="mt-12 pt-16 border-t-2 border-brand-green/10 w-full text-left scroll-mt-10">
          <h2 className="text-4xl font-display font-black text-brand-green mb-8 flex items-center gap-4">
            <span className="text-5xl animate-sway inline-block">🏄‍♂️</span>
            The Goa Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-green/90">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border-2 border-brand-green/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">🥥</div>
              <h3 className="font-condensed font-black text-2xl mb-3 text-brand-pink tracking-wide">THE HACKER BEACH</h3>
              <p className="text-lg leading-relaxed font-medium">Step out of the codebase and onto the sand. Goa 2026 brings together top builders for a month of intense coding, fresh coconuts, and sunset ship-its.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border-2 border-brand-green/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-condensed font-black text-2xl mb-3 text-brand-pink tracking-wide">BUILDER LADDER</h3>
              <p className="text-lg leading-relaxed font-medium">Complete tasks to climb the ranks. First task: generate your ID card to claim your spot in the house. More tasks unlocking soon!</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto p-8 text-center border-t-2 border-brand-green/10 bg-brand-green/5 backdrop-blur-sm">
        <p className="font-condensed font-black text-brand-green/60 flex items-center justify-center gap-3 text-lg">
          <span className="text-brand-yellow text-2xl animate-spin-slow">☀</span>
          SHARE WITH <span className="text-brand-pink">#FrameInGoa</span>
        </p>
      </footer>
    </div>
  );
}
