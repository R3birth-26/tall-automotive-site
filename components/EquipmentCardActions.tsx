"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Phone, MessageCircle, Images, CreditCard } from "lucide-react";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { business } from "@/lib/site";

const actionButton =
  "flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10";

export function EquipmentCardActions({
  photos,
  alt,
  financeHref,
  financeExternal,
}: {
  photos: { url: string }[];
  alt: string;
  financeHref: string;
  financeExternal?: boolean;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4 pt-4">
        <a href={business.phoneHref} className={actionButton}>
          <Phone className="h-3.5 w-3.5" />
          Call Us
        </a>
        <a href={business.smsHref} className={actionButton}>
          <MessageCircle className="h-3.5 w-3.5" />
          Text Us
        </a>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (photos.length > 0) setLightboxIndex(0);
          }}
          disabled={photos.length === 0}
          className={`${actionButton} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <Images className="h-3.5 w-3.5" />
          Photos {photos.length > 0 && `(${photos.length})`}
        </button>
        {financeExternal ? (
          <a
            href={financeHref}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={actionButton}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Apply for Financing
          </a>
        ) : (
          <Link href={financeHref} onClick={(e) => e.stopPropagation()} className={actionButton}>
            <CreditCard className="h-3.5 w-3.5" />
            Apply for Finance
          </Link>
        )}
      </div>

      {lightboxIndex !== null &&
        createPortal(
          <PhotoLightbox
            photos={photos}
            alt={alt}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />,
          document.body
        )}
    </>
  );
}
