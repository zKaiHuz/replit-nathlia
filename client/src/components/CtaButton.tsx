interface CtaButtonProps {
  text?: string;
  href?: string;
}

export function CtaButton({ text = "QUERO MINHA VAGA", href = "#" }: CtaButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-cta"
      className="relative inline-flex items-center justify-center w-full max-w-lg mx-auto cursor-pointer select-none"
    >
      <div
        className="relative w-full text-center py-3.5 px-10 rounded-full font-extrabold text-lg md:text-xl tracking-wider text-white uppercase transition-all duration-300 overflow-hidden animate-pulse-glow"
        style={{
          backgroundColor: '#ec7c00',
          fontFamily: "'Montserrat', sans-serif",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = '#ffa817';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = '#ec7c00';
        }}
      >
        <span className="relative z-10">{text}</span>
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          }}
        />
      </div>
    </a>
  );
}
