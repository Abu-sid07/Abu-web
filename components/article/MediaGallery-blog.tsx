// components/article/MediaGallery-blog.tsx
import React from 'react'
import Image from 'next/image'

interface MediaGalleryProps {
  media?: string[];
  heading?: string;
}

type MediaResult =
  | { type: 'gif'; url: string }
  | { type: 'image'; url: string }
  | null;

const getMediaUrl = (mediaHint?: string): MediaResult => {
  if (!mediaHint) return null;
  const hint = mediaHint.toLowerCase();

  // ── College blog images ──────────────────────────────────────────────────
  if (
    hint.includes('campus') ||
    hint.includes('college') ||
    hint.includes('sadakathullah') ||
    hint.includes('first day') ||
    hint.includes('gate')
  ) return { type: 'image', url: '/blogs/college/sadak-clg.png' };

  if (
    hint.includes('friends') ||
    hint.includes('gang') ||
    hint.includes('group') ||
    hint.includes('boys') ||
    hint.includes('cultural')
  ) return { type: 'image', url: '/blogs/college/friends_png.jpeg' };

  if (
    hint.includes('graduation day') ||
    hint.includes('ceremony') ||
    hint.includes('stage') ||
    hint.includes('gown')
  ) return { type: 'gif', url: '/blogs/college/Graduation-Day.gif' };

  if (
    hint.includes('graduation') ||
    hint.includes('certificate') ||
    hint.includes('degree') ||
    hint.includes('bittersweet')
  ) return { type: 'image', url: '/blogs/college/gra-img.png' };

  // ── Teaching blog images ─────────────────────────────────────────────────
  if (
    hint.includes('teaching') ||
    hint.includes('quran') ||
    hint.includes('arabic') ||
    hint.includes('islamic') ||
    hint.includes('madrasa') ||
    hint.includes('prayer')
  ) return { type: 'image', url: '/blogs/teaching/teach-01.jpeg' };

  if (
    hint.includes('students') ||
    hint.includes('class') ||
    hint.includes('circle') ||
    hint.includes('sitting')
  ) return { type: 'image', url: '/blogs/teaching/teach-5.jpeg' };

  if (
    hint.includes('award') ||
    hint.includes('appreciation') ||
    hint.includes('trophy') ||
    hint.includes('recognition')
  ) return { type: 'image', url: '/blogs/teaching/award-1.jpg' };

  // ── Generic fallbacks ────────────────────────────────────────────────────
  if (
    hint.includes('office') ||
    hint.includes('work') ||
    hint.includes('visa') ||
    hint.includes('document') ||
    hint.includes('desk')
  ) return {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
  };

  if (
    hint.includes('speaking') ||
    hint.includes('presentation') ||
    hint.includes('podium') ||
    hint.includes('confident')
  ) return {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop',
  };

  if (
    hint.includes('coding') ||
    hint.includes('lab') ||
    hint.includes('screen') ||
    hint.includes('computer')
  ) return {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
  };

  // Default
  return {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
  };
};

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, heading }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-4 my-6">
      {media.map((item, i) => {
        const mediaData = getMediaUrl(item);
        if (!mediaData) return null;

        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-stone-100 shadow-sm"
          >
            {mediaData.type === 'gif' ? (
              // Use plain <img> for GIFs — next/image strips animation
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaData.url}
                alt={heading || item}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="relative w-full h-64">
                <Image
                  src={mediaData.url}
                  alt={heading || item}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 740px"
                  priority={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaGallery;