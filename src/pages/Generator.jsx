import { useState } from 'react';
import { generateBuilderClass } from '../utils/builderClassGenerator';
import IDCardCanvas from '../components/IDCardCanvas';
import { Download, Share2, Upload, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Generator() {
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [photos, setPhotos] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(null);
  
  const builderClass = generateBuilderClass(stack);
  
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setPhotos(prev => [...prev, ev.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `HHGoa2026_${name.replace(/\\s+/g, '')}_ID.png`;
    a.click();
  };

  const handleShare = () => {
    const text = encodeURIComponent(`Just generated my Builder ID for #HHGoa2026 🌴 Generate yours: https://hhgoa2026.app #FrameInGoa`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    alert("Note: X web intents cannot auto-attach images via URL. Please attach your downloaded ID card manually to the tweet.");
  };

  return (
    <div className="flex-1 flex flex-col p-6 max-w-6xl mx-auto w-full mt-4 mb-20 relative z-10">
      
      <div className="mb-8">
        <Link to="/" className="text-brand-green/70 hover:text-brand-green font-bold text-sm tracking-wider flex items-center gap-2">
          &larr; BACK TO HOME
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-brand-green/10 shadow-xl">
          <h2 className="text-4xl font-display font-black text-brand-green mb-2">Build Your ID</h2>
          <p className="text-brand-green/70 mb-8 font-medium">Task #1: Generate your official builder card</p>
          
          <div className="space-y-6">
            <div>
              <label className="block font-condensed font-bold text-lg mb-2">BUILDER NAME</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-2 border-brand-green/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-pink transition-colors text-lg font-medium"
                placeholder="Vitalik Buterin"
              />
            </div>
            
            <div>
              <label className="block font-condensed font-bold text-lg mb-2">CORE STACK</label>
              <input 
                type="text" 
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full bg-transparent border-2 border-brand-green/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-pink transition-colors text-lg font-medium"
                placeholder="React / Rust / Solidity"
              />
              <p className="text-sm font-medium text-brand-green/60 mt-2">Class: <span className="text-brand-pink">{builderClass}</span></p>
            </div>
            
            <div>
              <label className="block font-condensed font-bold text-lg mb-2">TEAM PHOTOS (MAX 3)</label>
              <div className="flex flex-wrap gap-4">
                {photos.map((photo, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-full dashed-border-pink p-1 group">
                    <img src={photo} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    <button 
                      onClick={() => removePhoto(i)}
                      className="absolute -top-2 -right-2 bg-brand-pink text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {photos.length < 3 && (
                  <label className="w-24 h-24 rounded-full border-2 border-dashed border-brand-green/30 flex flex-col items-center justify-center text-brand-green/50 hover:text-brand-green hover:border-brand-green hover:bg-brand-green/5 cursor-pointer transition-colors">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">ADD</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
              <p className="text-sm text-brand-green/60 mt-2 font-medium">Auto-centers and fits into a circular mask.</p>
            </div>
          </div>
        </div>
        
        {/* Preview Column */}
        <div className="lg:col-span-7 flex flex-col items-center relative">
          
          {/* Animated Background Elements */}
          <div className="absolute -top-12 -left-8 text-7xl animate-sway pointer-events-none drop-shadow-xl z-20" style={{ animationDelay: '0ms' }}>🌴</div>
          <div className="absolute top-1/4 -right-12 text-6xl animate-float pointer-events-none drop-shadow-xl z-20" style={{ animationDelay: '200ms' }}>☀</div>
          <div className="absolute bottom-1/3 -left-16 text-5xl animate-float-reverse pointer-events-none drop-shadow-xl z-20" style={{ animationDelay: '500ms' }}>🍹</div>
          <div className="absolute -bottom-8 -right-8 text-7xl animate-sway pointer-events-none drop-shadow-xl z-20" style={{ animationDelay: '1000ms' }}>🏖</div>
          <div className="absolute -top-4 right-1/4 text-5xl animate-float opacity-70 pointer-events-none z-0" style={{ animationDelay: '1500ms' }}>🌊</div>

          <div className="w-full max-w-[540px] aspect-square rounded-3xl overflow-hidden shadow-2xl relative bg-brand-green/5 z-10 transition-shadow duration-500 hover:shadow-brand-pink/20">
            {generatedImage ? (
              <img src={generatedImage} alt="Generated ID Card" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-green/40 font-display text-2xl font-bold p-8 text-center bg-white/30 backdrop-blur-sm border border-brand-green/10">
                Start typing or upload a photo to generate your ID card.
              </div>
            )}
          </div>
          
          <IDCardCanvas 
            name={name} 
            stack={stack} 
            builderClass={builderClass} 
            photos={photos} 
            onRenderComplete={setGeneratedImage} 
          />
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-[540px]">
            <button 
              onClick={handleDownload}
              disabled={!generatedImage}
              className="flex-1 bg-brand-green text-brand-cream hover:bg-brand-green/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-condensed font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
            >
              <Download className="w-5 h-5" />
              DOWNLOAD PNG
            </button>
            <button 
              onClick={handleShare}
              disabled={!generatedImage}
              className="flex-1 bg-brand-pink text-white hover:bg-brand-pink/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-condensed font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
            >
              <Share2 className="w-5 h-5" />
              SHARE ON X
            </button>
          </div>
          
          {generatedImage && (
            <div className="mt-6 bg-brand-yellow/20 rounded-xl p-4 w-full max-w-[540px]">
              <h4 className="font-condensed font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">🌴</span> HOW TO SHARE
              </h4>
              <ol className="list-decimal list-inside text-sm font-medium space-y-1 text-brand-green/80">
                <li>Click "Download PNG" to save your image.</li>
                <li>Click "Share on X" to open the pre-filled post.</li>
                <li>Attach your downloaded image to the post and send it!</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
