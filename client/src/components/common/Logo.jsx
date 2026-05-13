import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Logo = ({ 
  className, 
  href = "/", 
  size = "md",
  showText = true,
  textClassName,
  brandText = "Growlity Academy",
  variant = "gradient" // gradient, solid, etc.
}) => {
  const sizes = {
    sm: { container: "h-8 w-8 rounded-lg p-1", img: 24, text: "text-lg" },
    md: { container: "h-10 w-10 rounded-xl p-1.5", img: 32, text: "text-xl" },
    lg: { container: "h-12 w-12 rounded-2xl p-2.5", img: 40, text: "text-2xl" }
  };

  const currentSize = sizes[size] || sizes.md;

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative flex items-center justify-center bg-white shadow-sm border border-muted-foreground/10 transition-all group-hover:shadow-md group-hover:border-growlity-blue/20",
        currentSize.container
      )}>
        <Image 
          src="/Assets/icons/growlity-logo.png" 
          alt="Growlity Logo" 
          width={currentSize.img}
          height={currentSize.img}
          className="object-contain"
        />
      </div>
      {showText && (
        <span className={cn(
          "font-bold tracking-tight bg-gradient-to-r from-growlity-blue to-growlity-green bg-clip-text text-transparent transition-all",
          currentSize.text,
          textClassName
        )}>
          {brandText}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn("inline-flex items-center shrink-0 transition-transform active:scale-95 group", className)}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
