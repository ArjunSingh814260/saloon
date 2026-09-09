"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Video Scroll Animation Refs
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is paused so scroll controls playback time
    video.pause();

    const updateScrollProgress = () => {
      if (!heroScrollRef.current || !videoRef.current) return;
      const rect = heroScrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));

      const duration = videoRef.current.duration || 2;
      targetTimeRef.current = progress * duration;
    };

    const handleLoadedMetadata = () => {
      updateScrollProgress();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    updateScrollProgress();

    let animationFrameId: number;

    const animate = () => {
      updateScrollProgress();

      if (videoRef.current && videoRef.current.duration) {
        const duration = videoRef.current.duration;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
          currentTimeRef.current = targetTimeRef.current;
        } else {
          const diff = targetTimeRef.current - currentTimeRef.current;
          currentTimeRef.current += diff * 0.15; // Smooth lerp easing
        }

        // Clamp to prevent video reaching exact end index error or duration overshooting
        const targetTime = Math.max(0, Math.min(duration - 0.01, currentTimeRef.current));

        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.001) {
          videoRef.current.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const categories = [
    {
      title: "HAIR",
      desc: "Signature cuts, bespoke colour & precision styling.",
      image: "/lumiere_cat_hair.png",
      href: "#hair"
    },
    {
      title: "SKIN",
      desc: "Advanced botanical rituals for radiant luminous skin.",
      image: "/lumiere_cat_skin.png",
      href: "#skin"
    },
    {
      title: "WELLNESS",
      desc: "Holistic relaxation, restoration & sensory care.",
      image: "/lumiere_cat_wellness.png",
      href: "#wellness"
    }
  ];

  const signatureServices = [
    {
      id: "cut",
      title: "Signature Haircut",
      desc: "Precision tailoring designed around your natural facial structure & hair texture.",
      duration: "60 MIN",
      price: "€140",
      image: "/lumiere_service_haircut.png"
    },
    {
      id: "ritual",
      title: "Luxe Hair Ritual",
      desc: "Deep restorative scalp & follicle conditioning using organic botanical elixirs.",
      duration: "75 MIN",
      price: "€180",
      image: "/lumiere_service_ritual.png"
    },
    {
      id: "facial",
      title: "Signature Facial",
      desc: "Customized skin treatment combining lymphatic massage & luminous hydration.",
      duration: "90 MIN",
      price: "€220",
      image: "/lumiere_service_facial.png"
    },
    {
      id: "colour",
      title: "Hair Colour",
      desc: "Bespoke hand-painted balayage & dimensional tone enhancement.",
      duration: "120 MIN",
      price: "€260",
      image: "/lumiere_service_colour.png"
    }
  ];

  const benefits = [
    {
      title: "EXPERT CARE",
      desc: "Personalised treatments by experienced master colorists & trichologists.",
      icon: (
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "PREMIUM PRODUCTS",
      desc: "Curated professional-grade botanical formulations.",
      icon: (
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "PRIVATE EXPERIENCE",
      desc: "Thoughtful service in a calm, refined, private environment.",
      icon: (
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "PERSONAL CONSULTATION",
      desc: "Every ritual begins with deep understanding of your needs.",
      icon: (
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 font-sans selection:bg-white selection:text-black overflow-x-clip">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-zinc-300 text-[11px] font-sans tracking-[0.2em] uppercase py-2.5 px-4 sm:px-8 border-b border-zinc-900 z-30 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="font-light">COMPLIMENTARY CONSULTATION ON YOUR FIRST VISIT</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] font-light text-zinc-400">
            <button onClick={() => setBookingModalOpen(true)} className="hover:text-white transition-colors">
              BOOK APPOINTMENT
            </button>
            <span className="text-zinc-800">|</span>
            <a href="#contact" className="hover:text-white transition-colors">
              CONTACT
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-display tracking-[0.25em] text-zinc-300 uppercase font-light">
            <a href="#hair" className="hover:text-white transition-colors py-1 relative group">
              HAIR
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#skin" className="hover:text-white transition-colors py-1 relative group">
              SKIN
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#wellness" className="hover:text-white transition-colors py-1 relative group">
              WELLNESS
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="hover:text-white transition-colors py-1 relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-zinc-300 focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center Brand Logo - LUMIÈRE */}
          <a href="#" className="flex flex-col items-center group">
            <span className="font-display font-light text-2xl sm:text-3xl tracking-[0.35em] uppercase text-white group-hover:text-zinc-400 transition-colors">
              LUMIÈRE
            </span>
            <span className="text-[9px] font-sans tracking-[0.4em] text-zinc-500 uppercase font-light -mt-0.5">
              PARIS • SALON DE BEAUTÉ
            </span>
          </a>

          {/* Right Nav Actions */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-display tracking-[0.22em] font-light uppercase text-zinc-300">
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden md:inline">SEARCH</span>
            </button>

            <button 
              onClick={() => setBookingModalOpen(true)}
              className="px-6 py-2.5 rounded-none bg-white text-black hover:bg-zinc-200 transition-all text-xs font-display tracking-[0.25em] uppercase font-medium"
            >
              BOOK
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-zinc-950 h-full p-8 flex flex-col justify-between shadow-2xl border-l border-zinc-900">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <span className="font-display font-light tracking-[0.35em] text-lg uppercase text-white">LUMIÈRE</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-zinc-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-sm font-display tracking-[0.25em] font-light text-zinc-300 uppercase">
                <a href="#hair" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">HAIR</a>
                <a href="#skin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">SKIN</a>
                <a href="#wellness" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">WELLNESS</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">ABOUT</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">SIGNATURE RITUALS</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">CONTACT</a>
              </nav>
            </div>

            <div className="space-y-4 border-t border-zinc-900 pt-6">
              <button 
                onClick={() => { setMobileMenuOpen(false); setBookingModalOpen(true); }}
                className="w-full py-3.5 bg-white text-black text-xs font-display tracking-[0.25em] uppercase font-medium text-center"
              >
                BOOK YOUR VISIT
              </button>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 text-center uppercase">
                14 RUE SAINT-HONORÉ, PARIS
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SCROLL CONTAINER (h-[400vh]) WITH PINNED HTML5 CANVAS ANIMATION BEHIND HERO */}
      <div ref={heroScrollRef} className="relative h-[400vh] w-full bg-[#070604]">
        
        {/* STICKY FULL SCREEN CANVAS CONTAINER */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          
          {/* FULL SCREEN STICKY HTML5 VIDEO FOR SCROLL-LINKED ANIMATION */}
          <video
            ref={videoRef}
            src="/video/Camera-optimized.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
          >
            <source src="/video/Camera-optimized.mp4" type="video/mp4" />
            <source src="/video/Camera.mp4" type="video/mp4" />
          </video>

          {/* DEEP GOLD / DARK LUXURY VIGNETTE OVERLAY FOR SEAMLESS CANVAS BLENDING */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-0 pointer-events-none" />

          {/* LARGE SMOOTH CINEMATIC DARK SHADOW / GRADIENT BEHIND LEFT HEADLINE (FADING OUT TO 45-50%) */}
          <div className="absolute inset-y-0 left-0 w-[50vw] bg-gradient-to-r from-black/95 via-black/70 to-transparent z-0 pointer-events-none" />

          {/* EXISTING HERO CONTENT OVERLAY (Z-10) - PRESERVING EXACT LAYOUT, TEXT, NAVBAR, BUTTONS, SPACING, COLORS & STYLING */}
          <div className="relative z-10 flex flex-col justify-between h-full py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
            
            {/* TOP HERO ROW: Editorial Label (Left) & Season Tag (Right) */}
            <div className="grid grid-cols-2 gap-4 items-start mb-8 sm:mb-12">
              <div className="space-y-1 relative">
                {/* Subtle localized dark glow behind left text for extra contrast */}
                <div className="absolute -inset-6 bg-black/70 blur-2xl -z-10 rounded-full pointer-events-none" />
                <h2 className="font-display font-medium text-xs sm:text-sm tracking-[0.3em] uppercase leading-relaxed bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(192,132,252,0.35)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  BEAUTY <br />
                  THAT MOVES <br />
                  WITH YOU.
                </h2>
              </div>

              <div className="text-right space-y-1">
                <div className="font-display font-light text-xs sm:text-sm tracking-[0.3em] text-zinc-300 uppercase leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  NEW <br />
                  SEASON <br />
                  <span className="text-zinc-500">2026</span>
                </div>
              </div>
            </div>

            {/* CENTER HERO TYPOGRAPHY DISPLAY */}
            <div className="my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 w-full">
              <h1 className="font-display font-light text-[13vw] sm:text-[14vw] tracking-[0.06em] whitespace-nowrap uppercase text-center w-full max-w-[90vw] mx-auto select-none bg-gradient-to-b from-white via-purple-50 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(236,72,153,0.3)] drop-shadow-[0_20px_50px_rgba(168,85,247,0.35)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-none">
                DREAMFRAME
              </h1>

              <p className="max-w-xl mx-auto text-zinc-300 text-sm sm:text-base font-editorial italic tracking-wide leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                &quot;A new standard of beauty — thoughtful hair, skin and wellness rituals created around you in a space designed for quiet moments.&quot;
              </p>
            </div>

            {/* BOTTOM HERO ROW: CTAs (Left) & Supporting Info (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-zinc-800/80">
              <div className="md:col-span-8 flex flex-wrap items-center gap-6 sm:gap-10">
                <button 
                  onClick={() => setBookingModalOpen(true)}
                  className="px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-all text-xs font-display tracking-[0.25em] font-medium uppercase flex items-center gap-3 group shadow-lg"
                >
                  <span>BOOK YOUR VISIT</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <a 
                  href="#services" 
                  className="text-xs font-display font-light tracking-[0.25em] uppercase text-zinc-300 border-b border-zinc-700 pb-1 hover:text-white hover:border-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  EXPLORE SERVICES
                </a>
              </div>

              <div className="md:col-span-4 md:text-right font-display text-[11px] tracking-[0.25em] uppercase text-zinc-400 space-y-1 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <p className="text-zinc-200 font-normal">PARIS • NEW YORK • LONDON</p>
                <p>2026 EDITION</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. SERVICE CATEGORY STRIP */}
      <section className="bg-black py-16 px-4 sm:px-8 border-y border-zinc-900 relative z-20" id="hair">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            
            {categories.map((cat, idx) => (
              <div key={idx} className="group flex items-center gap-5 p-5 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all">
                {/* Thumbnail Image */}
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 overflow-hidden border border-zinc-900">
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    className="object-cover zoom-image grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-display font-light text-base tracking-[0.25em] uppercase text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {cat.desc}
                  </p>
                  <button 
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-display font-light tracking-[0.22em] uppercase text-zinc-300 hover:text-white transition-colors pt-2 group-hover:translate-x-1 duration-300"
                  >
                    <span>EXPLORE {cat.title}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. EDITORIAL FEATURE SECTION */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto bg-black relative z-20" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text Spread */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-display font-light tracking-[0.3em] text-zinc-500 uppercase">
                THE LUMIÈRE EXPERIENCE
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-light uppercase tracking-tight text-white leading-[0.95]">
                A NEW <br />
                STANDARD <br />
                OF BEAUTY
              </h2>
            </div>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-editorial italic font-light">
              &quot;Thoughtful hair, skin and wellness rituals created around you — in a space designed for quiet moments and exceptional care.&quot;
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Located on Rue Saint-Honoré, our Paris atelier brings together master colorists, trichologists, and skin specialists to curate bespoke treatments tailored to your individuality.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-all text-xs font-display tracking-[0.25em] font-medium uppercase inline-flex items-center gap-3 group"
              >
                <span>DISCOVER LUMIÈRE</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column Architectural Photography Spread */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] overflow-hidden group border border-zinc-900 bg-zinc-950">
              <Image 
                src="/lumiere_interior.png" 
                alt="LUMIÈRE Paris Atelier Interior" 
                fill 
                className="object-cover zoom-image opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-zinc-900 text-xs font-display tracking-[0.25em] uppercase text-zinc-300 flex items-center justify-between font-light">
                <span>ATELIER LE CLERC • PARIS</span>
                <span className="text-zinc-500">EST. 2026</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. EXPERIENCE / BENEFITS STRIP */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-20 px-4 sm:px-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {benefits.map((b, i) => (
            <div key={i} className="space-y-3 p-6 bg-black border border-zinc-900 hover:border-zinc-800 transition-colors">
              <div className="p-2.5 w-fit rounded-full bg-zinc-950 border border-zinc-900">
                {b.icon}
              </div>
              <h3 className="font-display font-light text-xs tracking-[0.25em] uppercase text-white pt-1">
                {b.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {b.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 7. SIGNATURE SERVICES GRID */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto bg-black relative z-20" id="services">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-zinc-900 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-display font-light tracking-[0.3em] text-zinc-500 uppercase">CURATED SELECTION</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-white">
              SIGNATURE SERVICES
            </h2>
          </div>

          <button 
            onClick={() => setBookingModalOpen(true)}
            className="text-xs font-display font-light tracking-[0.25em] uppercase text-zinc-300 border-b border-zinc-800 pb-1 hover:text-white hover:border-white transition-colors w-fit"
          >
            VIEW ALL RITUALS →
          </button>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureServices.map((service) => (
            <div key={service.id} className="group flex flex-col justify-between bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all p-4">
              <div className="space-y-4">
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden border border-zinc-900">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover zoom-image grayscale hover:grayscale-0 transition-all duration-700 opacity-90" 
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-display tracking-[0.2em] text-zinc-500 uppercase font-light">
                    <span>{service.duration}</span>
                    <span className="font-normal text-zinc-200">{service.price}</span>
                  </div>
                  <h3 className="font-display font-light text-base tracking-[0.2em] uppercase text-white group-hover:text-zinc-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-2">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-zinc-900 mt-6">
                <button 
                  onClick={() => { setSelectedService(service.title); setBookingModalOpen(true); }}
                  className="w-full py-2.5 bg-black text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors text-[11px] font-display tracking-[0.22em] font-light uppercase flex items-center justify-center gap-2"
                >
                  <span>RESERVE TREATMENT</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL BOOKING CTA SECTION */}
      <section className="bg-black text-white py-28 px-4 sm:px-8 text-center border-t border-zinc-900 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-display font-light tracking-[0.35em] text-zinc-500 uppercase">
              RESERVATIONS &amp; CONSULTATION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light uppercase tracking-tight text-white leading-tight">
              YOUR TIME, <br />
              <span className="font-editorial italic font-normal text-zinc-300">BEAUTIFULLY SPENT.</span>
            </h2>
          </div>

          <p className="max-w-xl mx-auto text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Discover a more considered approach to hair, skin and wellness. Reserve your appointment online or contact our concierge.
          </p>

          <div>
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="px-10 py-5 bg-white text-black hover:bg-zinc-200 transition-all text-xs font-display tracking-[0.3em] font-medium uppercase inline-flex items-center gap-3 group"
            >
              <span>BOOK YOUR VISIT</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-black text-zinc-300 border-t border-zinc-900 py-16 px-4 sm:px-8 text-xs font-display tracking-[0.25em] uppercase font-light relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Logo & Address */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display font-light text-2xl tracking-[0.35em] text-white uppercase block">
              LUMIÈRE
            </span>
            <p className="text-zinc-500 text-xs font-sans tracking-normal leading-relaxed max-w-sm normal-case font-light">
              14 Rue Saint-Honoré, 75001 Paris, France <br />
              Concierge: +33 1 42 68 00 00 | concierge@lumiere-salon.com
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-zinc-500 text-[10px] font-normal">DIRECTORY</span>
            <div className="flex flex-col gap-2.5 text-zinc-400 font-light">
              <a href="#hair" className="hover:text-white transition-colors">HAIR RITUALS</a>
              <a href="#skin" className="hover:text-white transition-colors">SKIN &amp; FACIALS</a>
              <a href="#wellness" className="hover:text-white transition-colors">WELLNESS SANCTUARY</a>
              <a href="#about" className="hover:text-white transition-colors">THE PARIS ATELIER</a>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-zinc-500 text-[10px] font-normal">CONNECT</span>
            <div className="flex flex-col gap-2.5 text-zinc-400 font-light">
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">PINTEREST</a>
              <a href="#" className="hover:text-white transition-colors">VOGUE DIRECTORY</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-light">
          <p>© 2026 LUMIÈRE SALON DE BEAUTÉ. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400">PRIVACY</a>
            <a href="#" className="hover:text-zinc-400">TERMS</a>
            <a href="#" className="hover:text-zinc-400">ACCESSIBILITY</a>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 text-white w-full max-w-lg p-8 sm:p-10 border border-zinc-900 shadow-2xl relative space-y-6">
            <button 
              onClick={() => { setBookingModalOpen(false); setSelectedService(null); }}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-2 border-b border-zinc-900 pb-4">
              <span className="text-[10px] font-display tracking-[0.3em] uppercase text-zinc-500 font-light">RESERVATION CONCIERGE</span>
              <h3 className="font-display text-2xl font-light uppercase tracking-tight text-white">
                RESERVE YOUR VISIT
              </h3>
              {selectedService && (
                <p className="text-xs font-display tracking-widest text-amber-400 uppercase font-light pt-1">
                  SELECTED: {selectedService}
                </p>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Reservation Request Received! Concierge will contact you shortly.'); setBookingModalOpen(false); setSelectedService(null); }} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[10px] font-display tracking-widest uppercase font-light text-zinc-400 mb-1">FULL NAME</label>
                <input required type="text" placeholder="e.g. Eleanor Vance" className="w-full px-4 py-3 bg-black border border-zinc-900 focus:outline-none focus:border-zinc-700 text-white placeholder-zinc-600" />
              </div>

              <div>
                <label className="block text-[10px] font-display tracking-widest uppercase font-light text-zinc-400 mb-1">EMAIL ADDRESS</label>
                <input required type="email" placeholder="eleanor@example.com" className="w-full px-4 py-3 bg-black border border-zinc-900 focus:outline-none focus:border-zinc-700 text-white placeholder-zinc-600" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display tracking-widest uppercase font-light text-zinc-400 mb-1">PREFERRED DATE</label>
                  <input required type="date" className="w-full px-4 py-3 bg-black border border-zinc-900 focus:outline-none focus:border-zinc-700 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-display tracking-widest uppercase font-light text-zinc-400 mb-1">SERVICE TYPE</label>
                  <select defaultValue={selectedService || "HAIR"} className="w-full px-4 py-3 bg-black border border-zinc-900 focus:outline-none focus:border-zinc-700 text-white uppercase font-display text-[11px]">
                    <option value="HAIR">Signature Hair Cut &amp; Style</option>
                    <option value="SKIN">Facial Skincare Ritual</option>
                    <option value="WELLNESS">Wellness Sanctuary Spa</option>
                    <option value="COLOUR">Balayage &amp; Hair Colour</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-white text-black font-display text-xs font-medium tracking-[0.25em] uppercase hover:bg-zinc-200 transition-colors">
                  CONFIRM RESERVATION REQUEST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
