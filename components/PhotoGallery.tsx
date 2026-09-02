"use client";

import { useState } from "react";

export function PhotoGallery({
  photos,
  alt,
}: {
  photos: { id: string; url: string }[];
  alt: string;
}) {
  const images = photos.length > 0 ? photos : [{ id: "placeholder", url: "/equipment-placeholder.svg" }];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        <img src={images[active].url} alt={alt} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded border-2 ${
                i === active ? "border-brand-red" : "border-transparent"
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
