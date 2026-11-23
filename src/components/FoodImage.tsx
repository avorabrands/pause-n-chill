import { useState } from 'react';

interface Props {
  imageKey: string;
  alt: string;
  eager?: boolean;
  folder?: 'menu' | '';
  /** Emoji shown while no photo is available. */
  glyph?: string;
  className?: string;
}

/**
 * Local image with a shimmer loading state and a graceful emoji fallback
 * (shown until real photos are added with `npm run fetch-images`).
 */
export function FoodImage({ imageKey, alt, eager = false, folder = 'menu', glyph = '🍽️', className = '' }: Props) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const src = `${import.meta.env.BASE_URL}images/${folder ? folder + '/' : ''}${imageKey}.webp`;

  return (
    <div className={`food-img ${state} ${className}`}>
      {state !== 'ready' && (
        <div className="food-img__placeholder" aria-hidden="true">
          {state === 'error' ? <span>{glyph}</span> : null}
        </div>
      )}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          width={640}
          height={480}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
        />
      )}
    </div>
  );
}
