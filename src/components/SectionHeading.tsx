import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

const SectionHeading = ({ eyebrow, title, description, align = 'center', light = false, className = '' }: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl mb-10 sm:mb-16 ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-4 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${
          light ? 'bg-white/10 text-white/80 border border-white/15' : 'bg-primary/10 text-primary'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-white' : 'bg-primary'}`} />
          {eyebrow}
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg sm:text-xl leading-relaxed ${light ? 'text-white/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
