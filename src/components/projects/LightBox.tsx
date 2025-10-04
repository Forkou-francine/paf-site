import React from "react";
export default function LightBox({ images, index, onClose, onPrev, onNext }:{
  images: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  if (!images.length) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-white">Fermer ✕</button>
      <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-2xl text-white">‹</button>
      <img src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] rounded-md object-contain shadow-2xl" />
      <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-2xl text-white">›</button>
      <div className="absolute bottom-4 flex gap-2">{images.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />)}</div>
    </div>
  );
}
