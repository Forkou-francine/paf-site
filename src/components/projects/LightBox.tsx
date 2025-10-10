import React, { useEffect, useRef } from "react";

export default function LightBox({ images, index, onClose, onPrev, onNext }:{
  images: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key === "Tab") {
        const focusables = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean) as HTMLElement[];
        if (!focusables.length) return;
        const current = document.activeElement as HTMLElement | null;
        const currentIndex = current ? focusables.indexOf(current) : -1;
        let nextIndex = currentIndex;

        if (event.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
        }
        event.preventDefault();
        focusables[nextIndex]?.focus({ preventScroll: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus({ preventScroll: true });
      }
    };
  }, [onClose, onNext, onPrev]);

  if (!images.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Fermer
      </button>
      <button
        ref={prevRef}
        type="button"
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Image precedente"
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
      />
      <button
        ref={nextRef}
        type="button"
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Image suivante"
      >
        <span aria-hidden="true">&gt;</span>
      </button>
      <div className="absolute bottom-4 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
