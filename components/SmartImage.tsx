import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

export default function SmartImage({
  src,
  alt,
  width = 800,
  height = 600, // 4:3 standard
  priority = false,
  className = '',
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SmartImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt || 'Bengal Kitten'}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        referrerPolicy="no-referrer"
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt || 'Bengal Kitten'}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}
