import React, { useEffect, useRef } from 'react';

// Brand colors
const COLORS = {
  green: '#0B5D33',
  cream: '#FBF3DC',
  pink: '#EC1E79',
  yellow: '#F5C518',
};

export default function IDCardCanvas({ name, stack, builderClass, photos, onRenderComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!name && !stack && (!photos || photos.length === 0)) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1080;
    
    canvas.width = width;
    canvas.height = height;
    
    const render = async () => {
      // 1. Draw Background (Deep Green Base)
      ctx.fillStyle = COLORS.green;
      ctx.fillRect(0, 0, width, height);
      
      // Beach Vibe Elements in Background
      
      // Giant Sun (Yellow)
      ctx.beginPath();
      ctx.arc(850, 250, 300, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.yellow;
      ctx.fill();
      
      // Subtle Sun rays
      ctx.strokeStyle = 'rgba(245, 197, 24, 0.2)';
      ctx.lineWidth = 20;
      for (let i = 0; i < 360; i += 15) {
        ctx.beginPath();
        ctx.moveTo(850, 250);
        ctx.lineTo(850 + Math.cos(i * Math.PI / 180) * 800, 250 + Math.sin(i * Math.PI / 180) * 800);
        ctx.stroke();
      }

      // Distant Ocean Waves (Pink)
      ctx.beginPath();
      ctx.moveTo(0, height - 400);
      for (let i = 0; i <= width; i += 20) {
        ctx.lineTo(i, height - 400 + Math.sin(i * 0.01) * 40);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = COLORS.pink;
      ctx.fill();

      // Near Ocean Waves (Cream)
      ctx.beginPath();
      ctx.moveTo(0, height - 300);
      for (let i = 0; i <= width; i += 20) {
        ctx.lineTo(i, height - 300 + Math.sin((i + 300) * 0.015) * 50);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = 'rgba(251, 243, 220, 0.2)'; // semi-transparent cream
      ctx.fill();

      // Sandy Beach (Yellow at the bottom)
      ctx.beginPath();
      ctx.moveTo(0, height - 150);
      ctx.quadraticCurveTo(width / 2, height - 250, width, height - 100);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = COLORS.yellow;
      ctx.fill();

      // A few large background emojis for that literal beach vibe
      ctx.font = '150px sans-serif';
      ctx.globalAlpha = 0.8;
      ctx.fillText('🌴', 100, height - 100);
      ctx.fillText('🏄', width - 250, height - 150);
      ctx.globalAlpha = 1.0;

      // 2. Setup VIP Pass Canvas Transform
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-4 * Math.PI / 180); // Tilt slightly left
      
      const pW = 720;
      const pH = 940;
      const pX = -pW / 2;
      const pY = -pH / 2;
      const pRadius = 30;

      // Drop shadow for the pass
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 25;
      
      // Draw Pass Shape with a "lanyard hole" cutout at the top
      ctx.beginPath();
      ctx.moveTo(pX + pRadius, pY);
      // Top edge with hole
      ctx.lineTo(-40, pY);
      ctx.arc(0, pY + 40, 25, -Math.PI/2, Math.PI*1.5, true); 
      ctx.lineTo(pX + pW - pRadius, pY);
      // Right edge
      ctx.quadraticCurveTo(pX + pW, pY, pX + pW, pY + pRadius);
      ctx.lineTo(pX + pW, pY + pH - pRadius);
      ctx.quadraticCurveTo(pX + pW, pY + pH, pX + pW - pRadius, pY + pH);
      // Bottom edge
      ctx.lineTo(pX + pRadius, pY + pH);
      ctx.quadraticCurveTo(pX, pY + pH, pX, pY + pH - pRadius);
      // Left edge
      ctx.lineTo(pX, pY + pRadius);
      ctx.quadraticCurveTo(pX, pY, pX + pRadius, pY);
      ctx.closePath();
      
      ctx.fillStyle = COLORS.cream;
      ctx.fill();
      
      // Reset shadow for internal elements
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      
      // Clip everything inside the pass shape
      ctx.clip();
      
      // --- PASS INNER DESIGN ---
      
      // Header Area (Dark Green)
      ctx.fillStyle = COLORS.green;
      ctx.fillRect(pX, pY, pW, 200);
      
      // Pink accent stripe below header
      ctx.fillStyle = COLORS.pink;
      ctx.fillRect(pX, pY + 200, pW, 15);
      
      // Yellow accent diagonal in top right
      ctx.fillStyle = COLORS.yellow;
      ctx.beginPath();
      ctx.moveTo(pX + pW - 150, pY);
      ctx.lineTo(pX + pW, pY);
      ctx.lineTo(pX + pW, pY + 150);
      ctx.fill();
      
      // Background abstract shapes inside cream area
      ctx.fillStyle = 'rgba(236, 30, 121, 0.05)';
      ctx.beginPath(); ctx.arc(pX + pW + 50, pY + 500, 300, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(245, 197, 24, 0.05)';
      ctx.beginPath(); ctx.arc(pX - 50, pY + 800, 250, 0, Math.PI*2); ctx.fill();
      
      // Header Text
      ctx.fillStyle = COLORS.cream;
      ctx.font = '900 42px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('HACKER HOUSE GOA 2026', 0, pY + 130);
      
      ctx.fillStyle = COLORS.pink;
      ctx.font = 'bold 22px "Roboto Condensed", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('OFFICIAL BUILDER PASS', 0, pY + 175);
      
      // Draw Photos (Multi-photo support)
      const photoY = pY + 400;
      if (photos && photos.length > 0) {
        const numPhotos = photos.length;
        // Overlapping layout if multiple
        const overlap = numPhotos > 1 ? -60 : 0;
        const totalW = (numPhotos * 260) + ((numPhotos - 1) * overlap);
        const startX = - (totalW / 2) + 130;
        
        for (let i = 0; i < photos.length; i++) {
          const photoUrl = photos[i];
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = photoUrl;
          
          await new Promise((resolve) => {
            img.onload = () => {
              const xPos = startX + (i * (260 + overlap));
              const r = 130; 
              
              ctx.save();
              // Yellow glow behind
              ctx.shadowColor = COLORS.yellow;
              ctx.shadowBlur = 20;
              
              // Thick white border
              ctx.beginPath();
              ctx.arc(xPos, photoY, r + 12, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
              
              // Dashed Pink Border overlay
              ctx.shadowBlur = 0;
              ctx.beginPath();
              ctx.arc(xPos, photoY, r + 12, 0, Math.PI * 2);
              ctx.setLineDash([12, 12]);
              ctx.lineWidth = 6;
              ctx.strokeStyle = COLORS.pink;
              ctx.stroke();
              
              // Clip and draw image
              ctx.beginPath();
              ctx.arc(xPos, photoY, r, 0, Math.PI * 2);
              ctx.clip();
              
              const scale = Math.max((r*2) / img.width, (r*2) / img.height);
              const w = img.width * scale;
              const h = img.height * scale;
              ctx.drawImage(img, xPos - w/2, photoY - h/2, w, h);
              ctx.restore();
              
              resolve();
            };
            img.onerror = resolve; 
          });
        }
        
        // Palm badge on top of everything
        ctx.beginPath();
        ctx.arc(startX + (numPhotos-1)*(260-60) + 90, photoY + 90, 40, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.yellow;
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = COLORS.green;
        ctx.stroke();
        ctx.fillStyle = COLORS.green;
        ctx.font = '34px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌴', startX + (numPhotos-1)*(260-60) + 90, photoY + 102);

      } else {
        // Placeholder Circle
        const r = 130;
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, photoY, r + 12, 0, Math.PI * 2);
        ctx.setLineDash([12, 12]);
        ctx.lineWidth = 6;
        ctx.strokeStyle = COLORS.pink;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, photoY, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(11, 93, 51, 0.1)';
        ctx.fill();
        ctx.restore();
      }
      
      // User Info Text
      ctx.fillStyle = COLORS.green;
      ctx.font = '900 65px "Playfair Display", serif';
      ctx.textAlign = 'center';
      const displayName = (name || 'YOUR NAME').toUpperCase();
      ctx.fillText(displayName, 0, pY + 620);
      
      // Stack box
      ctx.fillStyle = COLORS.pink;
      ctx.fillRect(-200, pY + 650, 400, 50);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px "Roboto Condensed", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((stack || 'YOUR STACK').toUpperCase(), 0, pY + 683);
      
      // Builder Class Badge
      ctx.fillStyle = COLORS.yellow;
      ctx.fillRect(-200, pY + 700, 400, 40);
      ctx.fillStyle = COLORS.green;
      ctx.font = 'bold 20px "Inter", sans-serif';
      ctx.fillText(`ROLE: ${(builderClass || 'HACKER HOUSE RESIDENT').toUpperCase()}`, 0, pY + 726);

      // Barcode simulation at bottom
      ctx.fillStyle = COLORS.green;
      const barcodeY = pY + 800;
      let bcX = -250;
      while (bcX < 250) {
        const w = Math.random() * 8 + 2;
        if (bcX + w < 250) ctx.fillRect(bcX, barcodeY, w, 80);
        bcX += w + Math.random() * 6 + 2;
      }
      ctx.font = 'bold 16px "Roboto Condensed", sans-serif';
      ctx.letterSpacing = '10px';
      ctx.fillText('TASK01-GOA-2026', 0, pY + 905);
      
      // Devanagari Sticker
      ctx.save();
      ctx.translate(pX + pW - 120, pY + pH - 150);
      ctx.rotate(-20 * Math.PI / 180);
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 5;
      ctx.fillStyle = COLORS.yellow;
      ctx.fillRect(-70, -40, 140, 80);
      ctx.lineWidth = 4;
      ctx.strokeStyle = COLORS.pink;
      ctx.strokeRect(-70, -40, 140, 80);
      ctx.fillStyle = COLORS.green;
      ctx.font = '900 50px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('गोवा', 0, 18);
      ctx.restore();
      
      ctx.restore(); // Restore global canvas state
      
      // Finalize
      if (onRenderComplete) {
        const dataUrl = canvas.toDataURL('image/png');
        onRenderComplete(dataUrl);
      }
    };
    
    render();
  }, [name, stack, builderClass, photos, onRenderComplete]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
}
