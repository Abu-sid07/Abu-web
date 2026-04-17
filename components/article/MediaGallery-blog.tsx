import React from 'react'
import Image from 'next/image'

interface MediaGalleryProps {
  media?: string[];
  heading?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, heading }) => {
  const getMediaUrl = (mediaHint?: string) => {
    if (!mediaHint) return null
    const hint = mediaHint.toLowerCase()
    // Map hints to local public assets (preferred filenames in /public)
    if (hint.includes('video')) return { type: 'image', url: '/Graduation-Day.gif' }
    if (hint.includes('graduation') || hint.includes('certificate')) return { type: 'image', url: '/gra-img.png' }
    if (hint.includes('classroom') || hint.includes('lab') || hint.includes('project')) return { type: 'image', url: '/class.gif' }
    if (hint.includes('teaching') || hint.includes('quran') || hint.includes('arabic') || hint.includes('islamic')) return { type: 'image', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop' }
    if (hint.includes('friends') || hint.includes('group') || hint.includes('cultural')) return { type: 'image', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop' }
    if (hint.includes('office') || hint.includes('work') || hint.includes('visa') || hint.includes('document')) return { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop' }
    if (hint.includes('speaking') || hint.includes('presentation') || hint.includes('speak in front')) return { type: 'image', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop' }
    if (hint.includes('campus') || hint.includes('college') || hint.includes('first day')) return { type: 'image', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=800&fit=crop' }
    return { type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop' }
  }

  if (!media || media.length === 0) return null

  return (
    <div className="space-y-4 my-6">
      {media.map((item, i) => {
        const mediaData = getMediaUrl(item)
        if (!mediaData) return null
        if (mediaData.type === 'image') {
          return (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <Image 
                src={mediaData.url} 
                alt={heading || 'Media'} 
                className="w-full h-auto object-cover" 
                width={1200}
                height={800}
                priority={false}
              />
            </div>
          )
        }

        return (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-800 shadow-lg aspect-video">
            <iframe width="100%" height="100%" src={mediaData.url} title={heading} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
          </div>
        )
      })}
    </div>
  )
}

export default MediaGallery