import { useState, useEffect, useRef } from "react";
import { VslPlayer } from "@/components/VslPlayer";
import { CtaButton } from "@/components/CtaButton";
import { Check, Lock, ShieldCheck, CreditCard, Star, Award, Clock, Users, TrendingUp, Zap, Target, BookOpen, Heart, ThumbsUp, MessageCircle, ArrowRight, Camera, ImagePlus } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoCCPath from "@assets/LOGO-CC-SEM-FUNDO_1772209432426.png";
import profilePhotoPath from "@assets/download_(6)_1772485265896.jfif";
import beforeAfterPhotoPath from "@assets/Design_sem_nome_1772489387883.png";
import nathaliaPhotoPath from "@assets/74C7C2F2-A589-474F-B37B-5F8702BCC44C_1772491195906.png";

function AnimatedBar({ label, value, color, delay, animate }: { label: string; value: number; color: string; delay: number; animate: boolean }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const steps = 60;
      const stepTime = duration / steps;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(value * eased);
        setCurrentValue(value * eased);
        setDisplayValue(current);
        if (step >= steps) {
          clearInterval(interval);
          setCurrentValue(value);
          setDisplayValue(value);
        }
      }, stepTime);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [animate, value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/80 text-xs md:text-sm font-medium text-left w-32 md:w-40 flex-shrink-0">{label}</span>
      <div className="flex-1 h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <div
          className="h-full rounded-full transition-none"
          style={{
            width: `${currentValue}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-white/70 text-sm font-bold w-10 text-right flex-shrink-0">{displayValue}%</span>
    </div>
  );
}

function StatsCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const antesData = [
    { label: 'Confiança na própria capacidade', value: 24, color: '#ef4444' },
    { label: 'Coerência entre pensar e agir', value: 19, color: '#ef4444' },
    { label: 'Disciplina com consciência', value: 21, color: '#ef4444' },
    { label: 'Energia emocional estável', value: 17, color: '#ef4444' },
    { label: 'Frustração recorrente', value: 86, color: '#ef4444' },
    { label: 'Orgulho do próprio progresso', value: 16, color: '#ef4444' },
    { label: 'Culpa no final do dia', value: 89, color: '#ef4444' },
  ];

  const depoisData = [
    { label: 'Confiança na própria capacidade', value: 91, color: '#22c55e' },
    { label: 'Coerência entre pensar e agir', value: 88, color: '#22c55e' },
    { label: 'Disciplina com consciência', value: 90, color: '#22c55e' },
    { label: 'Energia emocional estável', value: 86, color: '#22c55e' },
    { label: 'Frustração recorrente', value: 12, color: '#22c55e' },
    { label: 'Orgulho do próprio progresso', value: 93, color: '#22c55e' },
    { label: 'Culpa no final do dia', value: 14, color: '#22c55e' },
  ];

  return (
    <div ref={ref} className="relative z-10 flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 sm:px-6 max-w-5xl mx-auto">

      {/* Card 1 - Antes */}
      <div
        className="relative rounded-[2.5rem] p-1.5 w-full md:w-1/2"
        style={{
          background: 'linear-gradient(135deg, #888 0%, #ec7c00 30%, #ec7c00 50%, #888 100%)',
          boxShadow: '0 0 60px rgba(236,124,0,0.35), 0 0 120px rgba(236,124,0,0.15)',
        }}
      >
        <div
          className="rounded-[2.25rem] px-8 py-12 md:px-10 md:py-16 lg:py-20 text-center h-full flex flex-col items-center justify-center"
          style={{ backgroundColor: '#1a1a1a', minHeight: '32rem' }}
        >
          <h3
            className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold mb-10 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span style={{ color: '#ef4444' }}>Antes</span> do Protocolo<br />Rotina Produtiva:
          </h3>
          <div className="w-full space-y-5">
            {antesData.map((item, i) => (
              <AnimatedBar key={i} label={item.label} value={item.value} color={item.color} delay={i * 250} animate={animate} />
            ))}
          </div>
        </div>
      </div>

      {/* Card 2 - Depois */}
      <div
        className="relative rounded-[2.5rem] p-1.5 w-full md:w-1/2"
        style={{
          background: 'linear-gradient(135deg, #888 0%, #ec7c00 30%, #ec7c00 50%, #888 100%)',
          boxShadow: '0 0 60px rgba(236,124,0,0.35), 0 0 120px rgba(236,124,0,0.15)',
        }}
      >
        <div
          className="rounded-[2.25rem] px-8 py-12 md:px-10 md:py-16 lg:py-20 text-center h-full flex flex-col items-center justify-center"
          style={{ backgroundColor: '#1a1a1a', minHeight: '32rem' }}
        >
          <h3
            className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold mb-10 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span style={{ color: '#22c55e' }}>Depois</span> do Protocolo<br />Rotina Produtiva:
          </h3>
          <div className="w-full space-y-5">
            {depoisData.map((item, i) => (
              <AnimatedBar key={i} label={item.label} value={item.value} color={item.color} delay={i * 250 + 400} animate={animate} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3" data-testid="feature-check">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ec7c00' }}>
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      </div>
      <p className="text-zinc-200 text-base md:text-lg leading-relaxed">{children}</p>
    </div>
  );
}

function TestimonialCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div
      className="rounded-xl p-6 border"
      style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#ec7c00' }}>"{text}"</p>
      <div>
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-zinc-500 text-xs">{role}</p>
      </div>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div
      className="rounded-xl p-5 border transition-all duration-300"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(236,124,0,0.15)' }}>
        <Icon className="w-5 h-5" style={{ color: '#ec7c00' }} />
      </div>
      <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  const [videoProgress, setVideoProgress] = useState(0);
  const [isContentUnlocked, setIsContentUnlocked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleVideoProgress = (percent: number) => {
    setVideoProgress(percent);
    if (percent >= 95 && !isContentUnlocked) {
      setIsContentUnlocked(true);
    }
  };

  return (
    <div className="min-h-screen text-white page-textured-bg relative">
      {/* ===== DECORATIVE NATURE ELEMENTS ===== */}
      <div className="absolute top-0 left-0 w-full h-[1600px] pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Left vine/branch climbing up */}
        <svg className="absolute left-0 top-0 w-24 md:w-40 h-full opacity-[0.09]" viewBox="0 0 120 1200" fill="none" preserveAspectRatio="xMinYMin slice">
          <path d="M60 1200 C55 1100 20 1050 25 950 C30 850 65 820 55 720 C45 620 15 580 20 480 C25 380 60 340 50 240 C40 140 25 80 30 0" stroke="#404D2C" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M55 1050 C40 1030 20 1040 18 1020 C16 1000 30 990 45 1000 C50 1005 55 1020 55 1030" fill="#6b8a3e"/>
          <path d="M30 900 C15 880 0 890 0 870 C0 850 18 840 30 855 C35 860 32 880 30 890" fill="#4a5a32"/>
          <path d="M55 750 C42 730 25 735 22 715 C19 695 35 688 48 700 C53 705 55 725 55 740" fill="#6b8a3e"/>
          <path d="M25 600 C10 585 -5 590 -3 570 C-1 550 15 545 28 558 C32 562 27 580 25 590" fill="#4a5a32"/>
          <path d="M50 450 C38 430 22 435 20 415 C18 395 32 388 45 400 C50 405 52 425 50 440" fill="#6b8a3e"/>
          <path d="M30 300 C18 282 5 287 3 267 C1 247 16 242 28 255 C32 260 31 280 30 292" fill="#4a5a32"/>
          <path d="M45 150 C35 132 20 137 18 117 C16 97 28 92 40 105 C44 110 46 130 45 145" fill="#6b8a3e"/>
          <path d="M32 50 C22 35 12 38 12 22 C12 8 22 5 30 15 C33 19 33 35 32 48" fill="#4a5a32"/>
        </svg>
        {/* Right vine/branch climbing up */}
        <svg className="absolute right-0 top-0 w-24 md:w-40 h-full opacity-[0.08]" viewBox="0 0 120 1200" fill="none" preserveAspectRatio="xMaxYMin slice">
          <path d="M60 1200 C65 1080 100 1020 95 920 C90 820 55 790 65 680 C75 570 105 530 100 420 C95 310 60 280 70 170 C80 60 95 20 90 0" stroke="#404D2C" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M90 1000 C105 980 118 988 120 968 C120 948 105 940 92 955 C88 960 88 980 90 992" fill="#6b8a3e"/>
          <path d="M65 850 C78 832 95 838 97 818 C99 798 85 792 72 805 C68 810 63 830 65 842" fill="#4a5a32"/>
          <path d="M95 680 C108 662 120 668 120 648 C120 628 108 622 95 635 C91 640 93 660 95 672" fill="#6b8a3e"/>
          <path d="M70 530 C82 512 98 518 100 498 C102 478 88 472 75 485 C71 490 68 510 70 522" fill="#4a5a32"/>
          <path d="M100 380 C110 362 120 368 120 348 C120 328 110 322 100 335 C96 340 98 360 100 372" fill="#6b8a3e"/>
          <path d="M75 230 C85 212 100 218 102 198 C104 178 90 172 78 185 C74 190 73 210 75 222" fill="#4a5a32"/>
          <path d="M88 100 C98 82 110 88 110 68 C110 48 98 44 88 55 C85 60 86 80 88 95" fill="#6b8a3e"/>
        </svg>
        {/* Floating leaves scattered */}
        <svg className="absolute left-[8%] top-[25%] w-10 md:w-14 opacity-[0.12] animate-float-slow" viewBox="0 0 40 60" fill="none">
          <path d="M20 55 C20 55 5 35 5 20 C5 8 12 2 20 2 C28 2 35 8 35 20 C35 35 20 55 20 55Z" fill="#6b8a3e"/>
          <path d="M20 55 L20 10" stroke="#4a5a32" strokeWidth="1.5"/>
        </svg>
        <svg className="absolute left-[12%] top-[55%] w-8 md:w-11 opacity-[0.1] animate-float-medium" viewBox="0 0 40 60" fill="none">
          <path d="M20 55 C20 55 5 35 5 20 C5 8 12 2 20 2 C28 2 35 8 35 20 C35 35 20 55 20 55Z" fill="#D4AF37"/>
          <path d="M20 55 L20 10" stroke="#C5A028" strokeWidth="1.5"/>
        </svg>
        <svg className="absolute right-[10%] top-[35%] w-9 md:w-12 opacity-[0.1] animate-float-medium rotate-[30deg]" viewBox="0 0 40 60" fill="none">
          <path d="M20 55 C20 55 5 35 5 20 C5 8 12 2 20 2 C28 2 35 8 35 20 C35 35 20 55 20 55Z" fill="#6b8a3e"/>
          <path d="M20 55 L20 10" stroke="#4a5a32" strokeWidth="1.5"/>
        </svg>
        <svg className="absolute right-[15%] top-[65%] w-7 md:w-10 opacity-[0.08] animate-float-slow rotate-[-20deg]" viewBox="0 0 40 60" fill="none">
          <path d="M20 55 C20 55 5 35 5 20 C5 8 12 2 20 2 C28 2 35 8 35 20 C35 35 20 55 20 55Z" fill="#D4AF37"/>
          <path d="M20 55 L20 10" stroke="#C5A028" strokeWidth="1.5"/>
        </svg>
        <svg className="absolute left-[20%] top-[75%] w-8 md:w-11 opacity-[0.09] animate-float-slow rotate-[15deg]" viewBox="0 0 40 60" fill="none">
          <path d="M20 55 C20 55 5 35 5 20 C5 8 12 2 20 2 C28 2 35 8 35 20 C35 35 20 55 20 55Z" fill="#6b8a3e"/>
          <path d="M20 55 L20 10" stroke="#4a5a32" strokeWidth="1.5"/>
        </svg>
        {/* Butterfly */}
        <svg className="absolute right-[6%] top-[45%] w-10 md:w-14 opacity-[0.1] animate-float-butterfly" viewBox="0 0 50 40" fill="none">
          <path d="M25 20 C20 10 5 5 5 15 C5 22 15 28 25 20Z" fill="#D4AF37"/>
          <path d="M25 20 C30 10 45 5 45 15 C45 22 35 28 25 20Z" fill="#ec7c00"/>
          <path d="M25 20 C20 25 8 35 12 30 C16 26 22 24 25 20Z" fill="#C5A028"/>
          <path d="M25 20 C30 25 42 35 38 30 C34 26 28 24 25 20Z" fill="#D4AF37"/>
          <line x1="25" y1="20" x2="22" y2="8" stroke="#404D2C" strokeWidth="0.8"/>
          <line x1="25" y1="20" x2="28" y2="8" stroke="#404D2C" strokeWidth="0.8"/>
        </svg>
        {/* Small sparkles */}
        <svg className="absolute left-[25%] top-[8%] w-5 md:w-7 opacity-[0.12] animate-float-slow" viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9Z"/>
        </svg>
        <svg className="absolute right-[25%] top-[15%] w-4 md:w-6 opacity-[0.1] animate-float-medium" viewBox="0 0 24 24" fill="#ec7c00">
          <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9Z"/>
        </svg>
        <svg className="absolute left-[6%] top-[5%] w-4 md:w-5 opacity-[0.08] animate-float-medium" viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9Z"/>
        </svg>
      </div>
      {/* ===== HEADER ===== */}
      <header className="w-full py-8 md:py-10 flex flex-col items-center justify-center relative z-10" data-testid="header">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="w-[500px] h-[120px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </div>
        <div className="relative flex items-center gap-3">
          <span className="text-lg md:text-xl" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.8))' }}>✨</span>
          <h2
            data-editable="header-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-center"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: '#D19793',
              fontVariant: 'small-caps',
              letterSpacing: '0.08em',
            }}
          >
            Protocolo Co-Criação Consciente
          </h2>

          <span className="text-lg md:text-xl" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.8))' }}>✨</span>
        </div>
        <p
          data-editable="header-subtitle"
          className="relative text-xs sm:text-sm tracking-[0.2em] uppercase mt-2"
          style={{
            color: '#C4756E',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Voce merece viver o extraordinario.
        </p>
      </header>
      {/* ===== HERO SECTION ===== */}
      <section className="w-full px-4 sm:px-6 pt-4 pb-8 md:pt-8 md:pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold leading-tight tracking-tight text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            data-testid="text-headline"
          >
            <span data-editable="hero-text-1" style={{ color: '#595959' }}>Em 14 dias, você vai descobrir que o que parecia perda, rejeição ou fracasso… era, na verdade,</span>{' '}
            <span data-editable="hero-text-2" style={{ color: '#FAD91B' }}>o caminho para você manifestar a vida que você sempre sonhou viver.</span>
          </h1>

          <p data-editable="hero-subtext" className="text-base md:text-lg text-center leading-relaxed font-bold max-w-3xl mx-auto" style={{ color: '#595959' }} data-testid="text-subheadline">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#ec7c00' }}>
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
            Mesmo que a vida tenha te colocado em um cenário que você não escolheu, você ainda pode escolher co-criar uma versão melhor de si mesma.
          </p>
        </div>
      </section>
      {/* ===== VSL VIDEO ===== */}
      <section className="w-full px-4 sm:px-6 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">
          <VslPlayer onProgressUpdate={handleVideoProgress} />
        </div>
      </section>
      {/* ===== LOCKED CONTENT WRAPPER ===== */}
      <div className="relative">
        {!isContentUnlocked && (
          <div
            className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-16 md:pt-24"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(245,230,211,0.85) 5%, rgba(245,230,211,0.98) 15%)' }}
            data-testid="content-lock-overlay"
          >
            <div className="sticky top-1/3 flex flex-col items-center gap-4 px-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #ec7c00, #e35525)',
                  boxShadow: '0 0 40px rgba(236,124,0,0.3)',
                }}
              >
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3
                className="text-xl md:text-2xl font-extrabold text-center"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              >
                Conteudo Bloqueado
              </h3>
              <p className="text-sm md:text-base text-center max-w-md" style={{ color: '#555' }}>
                Assista pelo menos <strong style={{ color: '#ec7c00' }}>95% do video</strong> acima para desbloquear o restante da pagina.
              </p>
              <div className="w-full max-w-xs mt-2">
                <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: '#777' }}>
                  <span>Progresso</span>
                  <span style={{ color: '#ec7c00' }}>{Math.round(videoProgress)}%</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.min(videoProgress, 100)}%`,
                      background: 'linear-gradient(90deg, #ec7c00, #e35525)',
                      boxShadow: videoProgress > 0 ? '0 0 10px rgba(236,124,0,0.5)' : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            filter: isContentUnlocked ? 'none' : 'blur(8px)',
            pointerEvents: isContentUnlocked ? 'auto' : 'none',
            userSelect: isContentUnlocked ? 'auto' : 'none',
            transition: 'filter 0.8s ease-out',
          }}
        >
      {/* ===== PRIMARY CTA ===== */}
      <section className="w-full px-4 sm:px-6 pb-12 md:pb-16">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <CtaButton
            text="QUERO MINHA VAGA"
            href="https://pay.hotmart.com/S102293415L?off=owxybbn0&checkoutMode=10"
          />
          <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 pt-1">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Compra Segura
            </div>
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              Acesso Imediato
            </div>
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              7 Dias de Garantia
            </div>
          </div>
        </div>
      </section>
      {/* ===== DIVIDER ===== */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,124,0,0.3), transparent)' }} />
      </div>
      {/* ===== HERO COM FOTO ===== */}
      <section className="w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d3a1f 0%, #3d4a2a 30%, #4a5a32 60%, #3a4828 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* LEFT - Text Content */}
            <div className="flex-1 space-y-6 text-left z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={logoCCPath} alt="Logo CC" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <p data-editable="format-label" className="text-green-400 text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">PROTOCOLO</p>
                  <p data-editable="format-title" className="text-white text-sm font-extrabold leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>CO-CRIAÇÃO CONSCIENTE</p>
                </div>
              </div>

              <p data-editable="protocol-label" className="text-green-300/80 text-xs font-bold tracking-wider uppercase">
                UM PROTOCOLO QUE AJUDA | <span className="text-white font-extrabold">COM 15 DIAS DE AÇÃO PRÁTICA</span>
              </p>

              <h2
                data-editable="protocol-headline"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Em apenas <span className="text-green-400">15 dias</span>, elimine aquilo que mais te faz mal e construa uma vida sob um olhar que{' '}
                <span className="text-green-400 italic">reconecta com sua melhor versão</span>, com exercícios científicos comprovados.
              </h2>

              <p data-editable="protocol-desc" className="text-green-100/70 text-sm md:text-base leading-relaxed max-w-lg">
                Você não precisa de mais motivação. Você precisa de um direcionamento simples que se encaixa completamente a sua vida e funcione em todas as áreas.
              </p>

              <a
                href="https://pay.hotmart.com/S102293415L?off=owxybbn0&checkoutMode=10"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-cta-hero"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-extrabold text-sm md:text-base tracking-wider text-white uppercase transition-all duration-300"
                style={{ backgroundColor: '#22c55e', fontFamily: "'Montserrat', sans-serif" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#16a34a'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#22c55e'; }}
              >
                QUERO COMEÇAR MINHA TRANSFORMAÇÃO
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* RIGHT - Photo Area with Floating Icons */}
            <div className="relative flex-shrink-0 w-full lg:w-[45%] flex justify-center">
              {/* Floating social icons */}
              <div className="absolute top-4 right-4 md:top-2 md:right-8 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="absolute top-1/4 -right-2 md:right-0 z-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                  <ThumbsUp className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-1/4 -right-2 md:right-2 z-20 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }}>
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="absolute top-8 left-4 md:left-8 z-20 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}>
                <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-8 left-4 md:left-12 z-20 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }}>
                <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="absolute top-1/3 left-0 z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}>
                <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Photo placeholder */}
              <div className="relative w-80 h-[24rem] sm:w-96 sm:h-[30rem] md:w-[26rem] md:h-[36rem] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img src={profilePhotoPath} alt="Foto de perfil" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ===== MARQUEE CAROUSEL ===== */}
      <div className="w-full overflow-hidden py-4" style={{ backgroundColor: '#2a3319' }}>
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-6 flex-shrink-0">
              <span className="text-base" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.8))' }}>✨</span>
              <span
                className="text-sm md:text-base font-bold tracking-[0.15em] uppercase"
                style={{
                  color: '#D19793',
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontVariant: 'small-caps',
                }}
              >
                Protocolo Co-Criação Consciente
              </span>
              <span className="text-xs opacity-40 text-white mx-2">•</span>
              <span
                className="text-xs md:text-sm tracking-[0.2em] uppercase"
                style={{
                  color: '#F6CEC8',
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
              >
                Você merece viver o extraordinário
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* ===== BENEFICIOS / CHECKLIST ===== */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-20" style={{ background: 'linear-gradient(to bottom, #404D2C, #F5E6D3)' }}>
        <div className="max-w-6xl mx-auto">

          <h3
            data-editable="checklist-title"
            className="text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight italic mb-10 md:mb-14 max-w-3xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Você sabe o que precisa fazer. Mas quando chega a hora... simplesmente não consegue começar.
          </h3>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">

            {/* LEFT - pain points */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-1" className="text-sm md:text-base leading-relaxed text-[#000000]">Você acredita. Visualiza. Ora. Mentaliza.</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-2" className="text-sm md:text-base leading-relaxed text-[#000000]">Mas, na rotina, na vida real, se sente desconectada.</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-3" className="text-sm md:text-base leading-relaxed text-[#000000]">Uma parte quer evoluir, enquanto a outra ainda vive no automático.</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-4" className="text-sm md:text-base leading-relaxed text-[#000000] font-semibold">Mas você ainda sente que nasceu pra mais.</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-5" className="text-sm md:text-base leading-relaxed text-[#000000]">E aí vem o pensamento:</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-6" className="text-sm md:text-base leading-relaxed text-[#000000] italic">"Por que eu não consigo manter nada?"</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-7" className="text-sm md:text-base leading-relaxed text-[#000000] italic">"Por que comigo é sempre assim?"</p>
              </div>
              <div className="flex items-start gap-3 lg:flex-row-reverse lg:text-right">
                <p data-editable="pain-8" className="text-sm md:text-base leading-relaxed text-[#000000] italic">"Por que eu sempre volto à estaca zero?"</p>
              </div>
            </div>

            {/* CENTER - Expert Photo with Floating Emojis */}
            <div className="relative flex-shrink-0">
              <div className="absolute -top-2 -left-6 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-orange-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">😤</span>
                </div>
              </div>
              <div className="absolute top-1/4 -left-8 z-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                <div className="w-10 h-10 rounded-full bg-blue-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">🔄</span>
                </div>
              </div>
              <div className="absolute bottom-1/4 -left-6 z-20 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }}>
                <div className="w-10 h-10 rounded-full bg-pink-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">🧠</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-6 z-20 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}>
                <div className="w-10 h-10 rounded-full bg-yellow-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">😔</span>
                </div>
              </div>
              <div className="absolute top-1/3 -right-8 z-20 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }}>
                <div className="w-10 h-10 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">💡</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 -right-6 z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}>
                <div className="w-10 h-10 rounded-full bg-purple-500/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-lg">✨</span>
                </div>
              </div>

              <div className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] md:w-96 md:h-[34rem] lg:w-[22rem] lg:h-[36rem] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img src={beforeAfterPhotoPath} alt="Antes e depois" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* RIGHT - solution text */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-3">
                <p data-editable="solution-1" className="text-sm md:text-base leading-relaxed text-[#000000] font-semibold">O fato é que você está presa num ciclo invisível.</p>
              </div>
              <div className="flex items-start gap-3">
                <p data-editable="solution-2" className="text-sm md:text-base leading-relaxed text-[#000000]">Permitindo que suas emoções ditem sua realidade, suas reações e escolhas.</p>
              </div>
              <div className="flex items-start gap-3">
                <p data-editable="solution-3" className="text-sm md:text-base leading-relaxed text-[#000000] font-semibold">No Protocolo de Co-criação Consciente, você aprende a quebrar esse padrão.</p>
              </div>
              <div className="flex items-start gap-3">
                <p data-editable="solution-4" className="text-sm md:text-base leading-relaxed text-[#000000] font-bold">Em 14 dias, você aprende a:</p>
              </div>
              <div className="flex items-start gap-3">
                <p data-editable="solution-5" className="text-sm md:text-base leading-relaxed text-[#000000]">Limpar as lentes da percepção, reprogramar padrões emocionais, fortalecer sua identidade, agir com clareza para então sustentar sua nova realidade.</p>
              </div>
              <div className="flex items-start gap-3">
                <p data-editable="solution-6" className="text-sm md:text-base leading-relaxed text-[#000000] font-bold italic">Isso é co-criação consciente.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ===== MITOS VS VERDADES ===== */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">

          <h2
            data-editable="myths-title"
            className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-10 md:mb-14"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            O que te ensinaram sobre mudar...<br />
            e o que <span style={{ color: '#6b8a3e' }}>realmente funciona</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* LEFT - O que te ensinaram */}
            <div
              className="rounded-2xl p-8 md:p-10 lg:p-12"
              style={{
                backgroundColor: '#e8e4e0',
                boxShadow: '8px 8px 24px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <h3
                data-editable="myths-left-title"
                className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif", color: '#2d2d2d' }}
              >
                O que te ensinaram:
              </h3>
              <div className="space-y-4">
                {[
                  "Pensa positivo que dá certo.",
                  "É só acreditar mais.",
                  "Você não muda porque não quer.",
                  "Confia no universo.",
                  "É falta de força de vontade.",
                  "Ter para ser.",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#c0392b' }}>✕</span>
                    <p className="text-sm md:text-base lg:text-lg font-medium" style={{ color: '#333' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Mas a verdade é */}
            <div
              className="rounded-2xl p-8 md:p-10 lg:p-12"
              style={{
                backgroundColor: '#e8ecd8',
                boxShadow: '8px 8px 24px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <h3
                data-editable="myths-right-title"
                className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif", color: '#2d2d2d' }}
              >
                Mas a verdade e:
              </h3>
              <div className="space-y-4">
                {[
                  "Não adianta pensar positivo e alimentar sentimentos negativos.",
                  "Vontade sem mudança de identidade não se sustenta.",
                  "Manifestação é construção diária.",
                  "A falta de alinhamento com o que se diz, o que se faz e se sente atrapalha a manifestação.",
                  "Ser para ter.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5" style={{ backgroundColor: '#6b8a3e' }}>✓</span>
                    <p className="text-sm md:text-base lg:text-lg" style={{ color: '#333' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <p data-editable="myths-conclusion" className="text-center text-base md:text-lg text-white max-w-3xl mx-auto mb-8 leading-relaxed">
            Você não está travada por não querer mudar. Só nunca te ensinaram como criar a sua melhor versão que realmente funciona pra <strong>sua vida real.</strong>
          </p>

          <div className="flex justify-center">
            <CtaButton
              text="QUERO DAR UM PASSO PARA MUDANÇA"
              href="https://pay.hotmart.com/S102293415L?off=owxybbn0&checkoutMode=10"
            />
          </div>

        </div>
      </section>
      {/* ===== PROTOCOLO SECTION ===== */}
      <section
        className="w-full px-4 sm:px-6 py-16 md:py-24"
        style={{ background: 'linear-gradient(135deg, #4a5a32 0%, #5a6b3a 30%, #6b7d45 60%, #4a5a32 100%)' }}
      >
        <div className="max-w-5xl mx-auto text-center">

          <h2
            data-editable="protocolo-title"
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            O <span style={{ color: '#c8e68a' }}>Protocolo: Co-Criação Consciente</span> é um programa prático e leve de 14 dias
          </h2>

          <p data-editable="protocolo-desc-1" className="text-base md:text-lg leading-relaxed mb-4 max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Feito para quem quer parar de travar, ganhar clareza e estruturar uma realidade que realmente funciona.
          </p>

          <p data-editable="protocolo-desc-2" className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Nada de mundo ilusório ou coisas que só funcionam em quem tem a vida perfeita. Você vai aplicar, sentir diferença e construir sua realidade de verdade, mesmo nos dias em que não estiver motivada.
          </p>

          {/* Big centered container */}
          <div
            className="rounded-3xl p-8 md:p-12 lg:p-16 mb-12 max-w-5xl mx-auto"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Two-column cards inside */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT - Como funciona */}
              <div
                className="rounded-2xl p-8 md:p-10 text-left"
                style={{
                  backgroundColor: 'rgba(30,40,20,0.7)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <h3
                  data-editable="how-title"
                  className="text-xl md:text-2xl font-extrabold text-white mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Como funciona:
                </h3>
                <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xl flex-shrink-0">📅</span>
                    <p className="text-white font-semibold text-sm md:text-base">Duração de 14 dias</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xl flex-shrink-0">🕐</span>
                    <p className="text-white font-semibold text-sm md:text-base">1 aula estratégica e intencional por dia</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xl flex-shrink-0">✨</span>
                    <p className="text-white font-semibold text-sm md:text-base">Aplicação imediata na sua rotina real</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xl flex-shrink-0">🔥</span>
                    <p className="text-white font-semibold text-sm md:text-base">Desafio Manifestação que será realizado em paralelo ao protocolo</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xl flex-shrink-0">🎁</span>
                    <p className="text-white font-semibold text-sm md:text-base">Planner Premium + PDF do Desafio Manifestação</p>
                  </div>
                </div>
              </div>

              {/* RIGHT - Voce vai aprender a */}
              <div
                className="rounded-2xl p-8 md:p-10 text-left"
                style={{
                  backgroundColor: 'rgba(200,220,160,0.25)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                <h3
                  data-editable="learn-title"
                  className="text-xl md:text-2xl font-extrabold text-white mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Você vai aprender a:
                </h3>
                <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">🧩</span>
                    <p className="text-white text-sm md:text-base">Quebrar padrões invisíveis</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">🔄</span>
                    <p className="text-white text-sm md:text-base">Regular seu sistema emocional</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">🏋️</span>
                    <p className="text-white text-sm md:text-base">Reprogramar sua identidade</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">🎯</span>
                    <p className="text-white text-sm md:text-base">Criar coerência interna (mente + corpo)</p>
                  </div>
                  <div className="flex items-start gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">💎</span>
                    <p className="text-white text-sm md:text-base">Materializar o que sustenta internamente</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <CtaButton
            text="QUERO ESSE PROTOCOLO"
            href="https://pay.hotmart.com/S102293415L?off=owxybbn0&checkoutMode=10"
          />

        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className="w-full py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#000' }}>
        <div className="relative w-full" style={{ minHeight: '32rem' }}>

          {/* Diagonal orange banner - full width looping */}
          <div
            className="absolute w-full overflow-hidden pointer-events-none"
            style={{
              top: '35%',
              left: '-5%',
              width: '110%',
              transform: 'rotate(-6deg)',
              backgroundColor: '#ec7c00',
              padding: '14px 0',
              zIndex: 1,
            }}
          >
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-10 px-5 font-extrabold text-white text-2xl md:text-3xl tracking-widest uppercase">
                  <span>ALEGRIA</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>★</span>
                  <span>ÂNIMO</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>★</span>
                  <span>RESULTADOS</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>★</span>
                  <span>DESENVOLVIMENTO</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>★</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two tall vertical cards side by side */}
          <StatsCards />

        </div>
      </section>
      {/* ===== OFERTA / PRICING ===== */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-24" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-[2rem] p-1"
            style={{
              background: 'linear-gradient(135deg, #333 0%, #ec7c00 40%, #ec7c00 60%, #333 100%)',
            }}
          >
            <div
              className="rounded-[1.75rem] px-6 py-12 md:px-12 md:py-16"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">

                {/* Left - Bonus list */}
                <div className="w-full md:w-1/2 space-y-4">
                  {[
                    'Acesso imediato e vitalício ao Protocolo',
                    'Suporte completo direto da plataforma',
                    'Aula Bônus — A ciência da criação: O experimento que prova que você não vive no acaso',
                    'Planner Premium + PDF (Desafio Manifestação)',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-full px-6 py-4 border"
                      style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(236,124,0,0.15)' }}
                      >
                        <span style={{ color: '#ec7c00', fontSize: '16px', fontWeight: 'bold' }}>+</span>
                      </div>
                      <span className="text-white text-sm md:text-base font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Right - Pricing card */}
                <div className="w-full md:w-1/2">
                  <div
                    className="rounded-2xl px-8 py-10 md:px-10 md:py-12 text-center border"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <p
                      className="text-sm tracking-widest uppercase mb-1"
                      style={{ color: '#ec7c00', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}
                    >
                      PROTOCOLO
                    </p>
                    <h3
                      className="text-white text-2xl md:text-3xl font-extrabold mb-0"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      CO-CRIAÇÃ<span style={{ color: '#ec7c00' }}>O</span>
                    </h3>
                    <p className="text-white/50 text-xs tracking-widest uppercase mb-6">CONSCIENTE</p>

                    <p className="text-white/80 text-sm md:text-base mb-4" style={{ fontStyle: 'italic' }}>
                      Tenha acesso a tudo isso por<br />uma condicao especial:
                    </p>

                    <p className="text-white/50 text-lg mb-1">
                      DE <span className="line-through" style={{ color: '#ef4444' }}>R$ 119,00</span> POR:
                    </p>

                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-white text-lg">12x</span>
                      <span
                        className="text-white text-5xl md:text-7xl font-extrabold"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        R$5
                      </span>
                    </div>
                    <p className="text-white/60 text-base md:text-lg mb-8">ou R$ 59,90 a vista.</p>

                    <CtaButton
                      text="QUERO MINHA VAGA COM DESCONTO"
                      href="https://pay.hotmart.com/S102293415L?off=owxybbn0&checkoutMode=10"
                    />

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,124,0,0.3), transparent)' }} />
      </div>
      {/* ===== DEPOIMENTOS ===== */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p data-editable="testimonials-label" className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#ec7c00' }}>
              Resultados Reais
            </p>
            <h2
              data-editable="testimonials-title"
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Resultados de quem já conseguiu mudar a realidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <TestimonialCard
              name="Amanda C."
              role="Arquiteta"
              text="Eu nunca fui muito de acreditar nisso, mas vendo minha realidade decidi dar uma oportunidade, e olha, realmente as coisas vem mudando..."
            />
            <TestimonialCard
              name="Carla S."
              role="Professora"
              text="As coisas deram certo, eu mentalizei e fiz a atividade do cheque e serio, foi surpreendente!"
            />
            <TestimonialCard
              name="Camila F."
              role="Nutricionista"
              text="Se você não acreditava igual eu... Eu te garanto que você vai realmente ser outra pessoa depois dos 14 dias!"
            />
          </div>
        </div>
      </section>
      {/* ===== DIVIDER ===== */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,124,0,0.3), transparent)' }} />
      </div>
      {/* ===== GARANTIA ===== */}
      <section className="w-full py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#6b7a5e' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Left - Text */}
            <div className="w-full md:w-3/5">
              <h2
                data-editable="guarantee-title"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Garantia Incondicional<br />de 7 Dias
              </h2>
              <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed">
                <p data-editable="guarantee-p1">
                  Eu quero que você entre no Protocolo: Co-Criação Consciente com total segurança e tranquilidade.
                </p>
                <p data-editable="guarantee-p2">
                  Por isso, voce tem <strong className="text-white">7 dias de garantia incondicional.</strong>
                </p>
                <p data-editable="guarantee-p3">
                  Isso significa que você pode acessar todo o conteúdo, aplicar nossa metodologia, fazer atividades, e se por qualquer motivo você sentir que o protocolo não faz sentido pra você, é só enviar um e-mail para o nosso suporte e todo o valor será devolvido, sem burocracia, sem perguntas.
                </p>
                <p data-editable="guarantee-p4">
                  Simples assim. <strong className="text-white">O risco é todo meu. A transformação será toda sua.</strong>
                </p>
                <p data-editable="guarantee-p5">
                  Você não tem nada a perder, em transformar sua realidade, queremos te mostrar que ela é leve e dá para alcançar.
                </p>
              </div>
            </div>

            {/* Right - Badge */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative">
                {/* Large background 7 */}
                <span
                  className="absolute text-[14rem] md:text-[18rem] font-extrabold leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: 'rgba(255,255,255,0.08)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  7
                </span>
                {/* Circular badge */}
                <div
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(236,124,0,0.2) 100%)',
                    border: '3px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                >
                  <div
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center"
                    style={{
                      border: '2px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <span
                      className="text-xs md:text-sm tracking-widest uppercase mb-1"
                      style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}
                    >
                      7 DIAS DE
                    </span>
                    <span
                      className="text-white text-4xl md:text-5xl font-extrabold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      7
                    </span>
                    <span
                      className="text-xs md:text-sm tracking-widest uppercase mt-1"
                      style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Montserrat', sans-serif" }}
                    >
                      GARANTIA
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ===== SOBRE / BIO ===== */}
      <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#F5E6D3' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Left - Photo placeholder */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div
                className="w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
                }}
              >
                <img src={nathaliaPhotoPath} alt="Nathália Franciely" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-3/5">
              <h2
                data-editable="bio-title"
                className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", color: '#2d2d2d' }}
              >
                Olá, eu sou <span style={{ color: '#6b7a5e' }}>Nathália Franciely!</span>
              </h2>
              <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: '#444' }}>
                <p data-editable="bio-p1">
                  Sou psicóloga há 7 anos, especialista em comportamento humano e apaixonada por entender como identidade, mente e emoção moldam a realidade que vivemos. A neurociência, a psicologia comportamental e o estudo da construção da identidade não são apenas temas que eu ensino, são fundamentos que sustentam tudo o que eu faço em minha própria vida.
                </p>
                <p data-editable="bio-p2">
                  Ao longo da minha trajetória, percebi algo que me inquietava profundamente: mulheres inteligentes, capazes e cheias de potencial que continuam presas em ciclos invisíveis de autossabotagem. Consomem conteúdo, estudam, começam mudanças… mas que por alguma razão voltam para o mesmo lugar.
                </p>
                <p data-editable="bio-p3">
                  Eu acredito que mudança real começa na identidade, que gratidão é treino neural e que manifestação não é misticismo mas sim coerência entre pensamento, emoção e comportamento repetido.
                </p>
                <p data-editable="bio-p4">
                  Eu também já estive nesse lugar. No lugar de quem entende, estuda, sabe o que precisa ser feito mas, ainda assim, se sente presa em ciclos internos difíceis de explicar.
                </p>
                <p data-editable="bio-p5">
                  Já vivi a frustração de começar mudanças com intenção genuína e, algum tempo depois, perceber que estava repetindo os mesmos padrões, as mesmas reações, as mesmas escolhas. Foi nesse ponto que eu entendi, na prática, que o problema não era falta de força de vontade, nem de conhecimento, mas uma identidade operando no automático.
                </p>
                <p data-editable="bio-p6">
                  Antes de ensinar qualquer protocolo, eu precisei aplicá-los em mim: reorganizar minha percepção, regular minhas emoções e construir, passo a passo, uma nova forma de agir.
                </p>
                <p data-editable="bio-p7">
                  Hoje, eu guio mulheres que assim como eu, estão cansadas de viver no automático a saírem do modo sobrevivência e entrarem no modo criação. Mulheres que querem parar de adiar a própria vida e começar a agir com clareza, constância e alinhamento interno.
                </p>
                <p data-editable="bio-p8">
                  O que eu compartilho hoje não vem de um lugar teórico — vem de alguém que atravessou esse processo por dentro e decidiu transformar essa travessia em método.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-24" style={{ backgroundColor: '#F3E4D2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p data-editable="faq-label" className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#ec7c00' }}>
              Tire suas duvidas
            </p>
            <h2
              data-editable="faq-title"
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Perguntas Frequentes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 items-start">
            {[
              { q: "Para quem é o Protocolo Co-Criação Consciente?", a: "Para donas de casa, empreendedoras, profissionais liberais e qualquer pessoa que queira desenvolver a sua realidade." },
              { q: "Será que isso realmente é para mim?", a: "Você não é tão diferente de todo mundo, inclusive de mim, quem viveu e experienciou esse método." },
              { q: "Por quanto tempo terei acesso?", a: "Você terá acesso ao treinamento de forma vitalícia, incluindo todas as atualizações feitas nesse período." },
              { q: "Como funciona a garantia?", a: "Você tem 7 dias para testar. Se não gostar, devolvemos 100% do valor investido sem perguntas." },
              { q: "O pagamento é seguro?", a: "Sim! O pagamento é processado pela Hotmart, a maior plataforma de produtos digitais da América Latina, com total segurança." },
              { q: "Funciona para qualquer pessoa?", a: "Sim! Esse é um método que cientistas utilizam para explicar o comportamento do ser para ter." },
            ].map((item, i) => {
              const isOpen = openFaq === i;
              return (
              <div
                key={i}
                className="rounded-2xl border transition-all cursor-pointer"
                style={{
                  backgroundColor: '#f6cec8',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
                onClick={() => setOpenFaq(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(236,124,0,0.12)' }}
                    >
                      <span style={{ color: '#ec7c00', fontSize: '14px', fontWeight: 'bold' }}>?</span>
                    </div>
                    <span className="font-semibold text-sm md:text-base pr-4" style={{ color: '#2d2d2d' }}>{item.q}</span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-base leading-none" style={{ color: '#666' }}>+</span>
                  </div>
                </div>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 pl-[4.25rem]">
                    <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{item.a}</p>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ===== FINAL CTA ===== */}
      <section
        className="w-full px-4 sm:px-6 py-16 md:py-20"
        style={{ backgroundColor: '#F3E4D2' }}
      >
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2
            data-editable="final-cta-title"
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: '#1a1a1a' }}
          >Tem alguma duvida que não encontrou aqui?</h2>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg md:text-xl transition-all duration-300"
            style={{
              backgroundColor: '#25D366',
              boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1fb855';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#25D366';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
            }}
          >
            <SiWhatsapp className="w-6 h-6" />
            Fale conosco pelo WhatsApp
          </a>
        </div>
      </section>
      </div>
      </div>
      {/* ===== FOOTER ===== */}
      <footer className="w-full px-4 sm:px-6 py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Protocolo Co-Criação Consciente. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-zinc-600 text-xs">
            <a href="#" className="transition-colors" style={{ }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ec7c00')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>Termos de Uso</a>
            <a href="#" className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = '#ec7c00')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>Politica de Privacidade</a>
            <a href="#" className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = '#ec7c00')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
