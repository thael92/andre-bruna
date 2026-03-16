import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaHeart, FaPause, FaPlay, FaMusic, FaStar, FaHistory, FaImages, FaArrowDown, FaGlobeAmericas, FaHandsHelping, FaGlassCheers, FaMicrophoneAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GiBigDiamondRing } from 'react-icons/gi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules';
import { Howl, Howler } from 'howler';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './App.css';

// Context to share music state and scroll lock
export const AppContext = React.createContext();

// Components

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts((prev) => [...prev, { id, left: Math.random() * 100, size: Math.random() * 20 + 10 }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 5000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: '100vh', scale: 0 }}
          animate={{ opacity: 0.6, y: '-10vh', scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute text-pink-romantic/40"
          style={{ left: `${heart.left}%` }}
        >
          <FaHeart size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const { isPlaying, togglePlay, showControls } = React.useContext(AppContext);

  if (!showControls) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center shadow-lg glass border-none cursor-pointer"
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            <FaPause size={24} />
          </motion.div>
        ) : (
          <FaPlay size={24} className="ml-1" />
        )}
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gold border border-gold/20"
      >
        {isPlaying ? 'Tocando: Nossa Música' : 'Tocar Música'}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { isUnlocked, unlockExperience } = React.useContext(AppContext);

  return (
    <section className="relative h-[100svh] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-black w-full">
      {/* Cinematic Split Layout */}

      {/* Right Side - Content & Action (Order 1 on mobile, 2 on desktop) */}
      <div className="w-full md:w-1/2 h-[50svh] md:h-full relative z-20 flex flex-col items-center justify-center text-center md:text-left text-white px-6 md:px-16 lg:px-24 order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-lg mt-8 md:mt-0"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3 md:mb-4">
            <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-gold/50"></div>
            <p className="text-gold font-sans tracking-widest uppercase text-xs md:text-sm font-semibold">
              Uma história de amor
            </p>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif leading-tight mb-2 md:mb-4 text-marfim drop-shadow-2xl">
            14 Anos<br /><span className="text-gold italic">Juntos</span>
          </h1>

          <h2 className="text-xl md:text-3xl font-serif text-white/80 mb-6 md:mb-10 font-light">
            André & Bruna
          </h2>

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
               <motion.div
                 key="locked"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                 transition={{ duration: 0.8 }}
                 className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl"
               >
                 <div className="bg-zinc-950/50 border border-gold/20 p-8 md:p-12 rounded-[3rem] shadow-[0_0_80px_rgba(212,175,55,0.15)] flex flex-col items-center text-center max-w-lg mx-4 relative overflow-hidden group">
                   
                   {/* Decorative background glow */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                   <FaHeart className="text-gold/50 mb-6 text-2xl animate-pulse" />
                   
                   <h3 className="text-2xl md:text-4xl font-serif text-[#ffffff] mb-4">
                     Bem-vindos à <span className="text-gold italic block mt-1">Nossa História</span>
                   </h3>
                   
                   <p className="text-marfim/60 font-light mb-8 text-sm md:text-base px-4">
                     Para viver essa experiência por completo,<br className="hidden md:block"/> ligue o som e prepare o coração.
                   </p>

                   <div className="relative">
                     <div className="absolute inset-0 bg-gold blur-xl opacity-30 animate-pulse rounded-full"></div>
                     <button
                       onClick={unlockExperience}
                       className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-2xl text-black border border-yellow-300/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                     >
                        <FaPlay className="text-3xl md:text-4xl ml-2 drop-shadow-md" />
                     </button>
                   </div>
                   
                   <p className="mt-8 text-[10px] text-white/40 uppercase tracking-[0.3em] font-sans">
                     Clique para iniciar a trilha sonora
                   </p>
                 </div>
               </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white/50 text-sm tracking-[0.3em] uppercase flex flex-col md:flex-row items-center gap-4 mt-8 justify-center md:justify-start"
              >
                <span>Deslize ou Role para Cima</span>
                <FaArrowDown className="text-gold animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Left Side - Image (Order 2 on mobile, 1 on desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-1/2 h-[50svh] md:h-full relative overflow-hidden order-2 md:order-1"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 md:to-black z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 hidden md:block" />
        <img
          src="/img/02.jpeg"
          alt="Bodas de Marfim Hero"
          className="w-full h-full object-cover object-top md:object-[center_top] scale-105"
          style={{ filter: 'brightness(0.9) contrast(1.1)' }}
        />
      </motion.div>
    </section>
  );
};


const PhotoGallery = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { url: "/img/08.jpeg", title: "14 Anos Juntos", subtitle: "Uma Vida de Amor" },
    { url: "/img/03.jpeg", title: "Bodas de Marfim", subtitle: "A Nossa História" },
    { url: "/img/04.jpeg", title: "Amor Eterno", subtitle: "Para Sempre" },
    { url: "/img/05.jpeg", title: "Companheirismo", subtitle: "Dia a Dia" },
    { url: "/img/06.jpeg", title: "Cumplicidade", subtitle: "Lado a Lado" },
    { url: "/img/07.jpeg", title: "Alegria Constante", subtitle: "Sorrisos Sinceros" },
  ];

  const handleNextOrRewind = () => {
    if (!swiperInstance) return;
    if (isEnd) {
      swiperInstance.slideTo(0);
    } else {
      swiperInstance.slideNext();
    }
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden flex items-center md:min-h-[100svh]">
      <div className="absolute inset-0 bg-[#0a0a0a] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* Left Side: Theme & Phrase */}
        <div className="w-full md:w-5/12 text-center md:text-left flex flex-col justify-center">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <FaImages className="text-gold/50" size={24} />
            <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-gold/50"></div>
            <p className="text-gold font-sans tracking-widest uppercase text-xs md:text-sm font-semibold">
              Em Cartaz
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl text-[#ffffff] font-serif mb-6 drop-shadow-lg leading-tight">
            A Nossa<br /><span className="text-gold italic">História</span>
          </h2>

          <p className="text-lg md:text-2xl text-marfim/80 font-light italic leading-relaxed md:pr-10">
            "Cada momento capturado é um capítulo do nosso filme. Uma obra-prima construída com 14 anos de amor, sorrisos e muita cumplicidade."
          </p>
        </div>

        {/* Right Side: Posters and Controls */}
        <div className="w-full md:w-7/12 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 mt-12 md:mt-0">

          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] relative group perspective-1000 shrink-0">
            <Swiper
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setIsEnd(swiper.isEnd)}
              modules={[EffectCards]}
              effect="cards"
              grabCursor={true}
              className="w-full aspect-[2/3]"
            >
              {photos.map((photo, index) => (
                <SwiperSlide
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-[#ffffff]/20 bg-black cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="w-full h-full relative overflow-hidden flex flex-col justify-end">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      src={photo.url}
                      alt={`Memory ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: 'brightness(0.75) contrast(1.1) saturate(1.1)' }}
                    />
                    {/* Cinematic vignettes */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-95 pointer-events-none" />

                    {/* Movie Poster Content */}
                    <div className="relative z-10 p-5 sm:p-6 md:p-8 text-center text-[#ffffff] w-full">
                      <div className="flex justify-center items-center gap-2 mb-3 md:mb-4 pt-4">
                        <FaStar className="text-gold text-[10px] md:text-xs" />
                        <FaStar className="text-gold text-[10px] md:text-xs" />
                        <FaStar className="text-gold text-[10px] md:text-xs" />
                        <FaStar className="text-gold text-[10px] md:text-xs" />
                        <FaStar className="text-gold text-[10px] md:text-xs" />
                      </div>
                      <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#ffffff]/80 mb-2 font-sans font-light">Uma Produção de Vida</p>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-marfim leading-none mb-1 shadow-black drop-shadow-2xl">
                        {photo.title === "Bodas de Marfim" ? (
                          <>Bodas<br /><span className="text-xl sm:text-2xl md:text-3xl italic text-gold">de</span><br />Marfim</>
                        ) : photo.title === "14 Anos Juntos" ? (
                          <>14 Anos<br /><span className="text-xl sm:text-2xl md:text-3xl italic text-gold">Juntos</span></>
                        ) : (
                          <>{photo.title.split(' ')[0]}<br /><span className="text-xl sm:text-2xl md:text-3xl italic text-gold">{photo.title.split(' ').slice(1).join(' ')}</span></>
                        )}
                      </h3>

                      <p className="text-gold/90 font-serif italic text-xs md:text-sm mt-2">{photo.subtitle}</p>

                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent my-4 md:my-5"></div>

                      <div className="flex justify-between items-center text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-[#ffffff] font-sans">
                        <span className="text-[#ffffff]/70">Estrelando</span>
                        <span className="font-bold text-[#ffffff] tracking-[0.2em]">André & Bruna</span>
                      </div>

                      <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-[#ffffff]/10 text-[6px] sm:text-[7px] md:text-[8px] text-[#ffffff]/50 uppercase tracking-[0.2em] leading-relaxed">
                        <p>Bodas de Marfim • 14 Anos • Amor • Respeito • Cumplicidade</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            onClick={handleNextOrRewind}
            className="group relative px-6 py-12 sm:px-4 sm:py-24 bg-zinc-900/50 backdrop-blur-sm border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-[2rem] sm:rounded-full font-serif flex sm:flex-col items-center justify-center gap-4 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            style={{ writingMode: 'horizontal-tb' }}
          >
            <div className="absolute inset-0 bg-gold/20 w-0 sm:w-full sm:h-0 group-hover:w-full group-hover:h-full transition-all duration-500 ease-out z-0"></div>
            {isEnd ? (
              <>
                <FaHistory className="relative z-10 text-sm md:text-base animate-pulse" />
                <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold sm:[writing-mode:vertical-rl] sm:rotate-180">Rebobinar</span>
              </>
            ) : (
              <>
                <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold sm:[writing-mode:vertical-rl] sm:rotate-180">Próxima Cena</span>
                <FaPlay className="relative z-10 text-[10px] md:text-sm" />
              </>
            )}
          </button>

        </div>
      </div>

      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md w-12 h-12 rounded-full flex justify-center items-center transition-all z-50 border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <FaTimes size={20} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold bg-black/20 hover:bg-black/80 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center transition-all z-50 border border-white/10 hover:border-gold/50 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
              }}
            >
              <FaChevronLeft size={24} className="-ml-1" />
            </button>

            <button
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold bg-black/20 hover:bg-black/80 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center transition-all z-50 border border-white/10 hover:border-gold/50 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
              }}
            >
              <FaChevronRight size={24} className="-mr-1" />
            </button>

            {/* Image Container */}
            <div
              className="relative w-full h-full p-4 md:p-16 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center max-h-screen"
                >
                  <img
                    src={photos[selectedImage].url}
                    alt={photos[selectedImage].title}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg md:rounded-2xl"
                  />

                  {/* Minimalist image details footer */}
                  <div className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center pointer-events-none">
                    <p className="text-gold font-serif text-2xl md:text-3xl lg:text-4xl shadow-black drop-shadow-md mb-2">{photos[selectedImage].title}</p>
                    <p className="text-white/70 uppercase tracking-[0.3em] font-sans text-[10px] md:text-xs font-semibold">{photos[selectedImage].subtitle}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TimelineItem = ({ Icon, title, text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 50 }}
    className={`flex w-full mb-16 items-center justify-between ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} relative z-10`}
  >
    <div className="hidden md:block w-5/12"></div>
    <div className="z-20 flex items-center justify-center order-1 bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.4)] w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/50 relative">
      <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping" style={{ animationDuration: '3s' }}></div>
      <Icon className="text-gold text-2xl md:text-3xl" />
    </div>
    <div className="order-1 bg-black/60 backdrop-blur-xl border border-gold/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] w-full md:w-5/12 p-8 hover:bg-black/80 transition-colors duration-500 hover:border-gold/50 group">
      <h3 className="mb-4 font-serif font-bold text-[#ffffff] text-2xl md:text-3xl group-hover:text-gold transition-colors duration-300 drop-shadow-md">{title}</h3>
      <p className="text-base md:text-lg leading-relaxed tracking-wide text-[#ffffff]/80 font-light italic">"{text}"</p>
    </div>
  </motion.div>
);

const Timeline = () => {
  const events = [
    { Icon: GiBigDiamondRing, title: "O Cordão de Três Dobras", text: "O dia em que unimos nossas vidas, tendo Jeová como o elo mais forte e principal da nossa união." },
    { Icon: FaGlobeAmericas, title: "Onde Há Necessidade", text: "Colocamos os interesses do Reino em primeiro lugar e sentimos a alegria de servir onde a necessidade é maior." },
    { Icon: FaHandsHelping, title: "Servindo Juntos", text: "Lado a lado no ministério e nas designações. Nossa força e felicidade vêm de servir a Deus unidos." },
    { Icon: FaGlassCheers, title: "14 Anos de Bênçãos", text: "Bodas de Marfim - 14 anos de amor, lealdade e uma vida inteira dedicada a Jeová." }
  ];

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10 md:bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black/80 to-zinc-950 z-20"></div>
        <img
          src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=2070&auto=format&fit=crop"
          alt="Timeline Background Cinematic"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="text-center mb-24">
          <FaHistory className="text-gold/50 mx-auto mb-6" size={32} />
          <h2 className="text-4xl md:text-6xl text-[#ffffff] font-serif mb-4 drop-shadow-2xl">
            A Nossa <span className="text-gold italic">Jornada</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full max-w-6xl mx-auto">
          {/* Vertical Center Line */}
          <div className="border-2-2 absolute border-opacity-30 border-gold h-full border left-[50%] hidden md:block z-0 blur-[1px]"></div>

          {events.map((event, i) => (
            <TimelineItem key={i} {...event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const KaraokeSection = () => {
  const { isPlaying: globalIsPlaying, togglePlay: toggleGlobalPlay } = React.useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const animationRef = useRef(null);

  const toggleModal = () => {
    if (!isModalOpen && globalIsPlaying) {
      // Pause global background music when opening karaoke
      toggleGlobalPlay();
    }
    
    setIsModalOpen(!isModalOpen);
    if (isPlaying) {
      audioRef.current?.pause();
      videoRef.current?.pause();
      setIsPlaying(false);
    }
    // reset
    if (isModalOpen) {
      setCurrentTime(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  const updateTime = () => {
    if (audioRef.current && videoRef.current) {
      setCurrentTime(audioRef.current.currentTime);

      // Fix sync drift occasionally
      const drift = Math.abs(audioRef.current.currentTime - videoRef.current.currentTime);
      if (drift > 0.5) {
        videoRef.current.currentTime = audioRef.current.currentTime;
      }

      animationRef.current = requestAnimationFrame(updateTime);
    }
  };

  const toggleKaraokePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      videoRef.current?.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current?.play();
      videoRef.current?.play();
      animationRef.current = requestAnimationFrame(updateTime);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <section className="py-32 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
        {/* Neon Stage Background */}
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center justify-center mb-8 relative group cursor-pointer" onClick={toggleModal}>
              <div className="absolute inset-0 rounded-full border border-gold/50 group-hover:animate-ping opacity-50 transition-all duration-300"></div>
              <FaMicrophoneAlt className="text-gold text-4xl group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black shadow-lg shadow-gold/50">
                <FaPlay className="ml-1 text-sm" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl text-[#ffffff] font-serif mb-4 tracking-wider uppercase">
              <span className="text-gold font-light italic normal-case">Bodas de Marfim - André e Bruna</span>
            </h2>
            <p className="text-lg text-marfim/60 font-light mb-12 max-w-xl mx-auto">
              Preparamos um vídeo Karaokê para esse momento. Dê o play e venha cantar!
            </p>

            <button
              onClick={toggleModal}
              className="px-10 py-4 bg-gradient-to-r from-gold/80 to-yellow-600 hover:from-gold hover:to-yellow-500 text-black font-semibold rounded-full uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <FaMusic />
              <span>Dê o Play no Clipe</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Full-screen Video Karaokê Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[100] flex justify-center items-center bg-zinc-950/95 backdrop-blur-3xl px-4 md:px-10"
          >
            {/* Dark theatrical background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            <motion.div
              className="relative w-full max-w-6xl h-[95vh] bg-black/80 rounded-[2rem] border border-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.2)] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-40 pointer-events-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-gold/30 shadow-lg">
                    <FaMicrophoneAlt className="text-gold" size={16} />
                  </div>
                  <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <h3 className="text-xl md:text-2xl font-serif text-[#ffffff] mb-0 hidden sm:block leading-none">Bodas de Marfim</h3>
                    <p className="text-gold/80 text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold">Video Karaokê</p>
                  </div>
                </div>

                <button
                  onClick={toggleModal}
                  className="pointer-events-auto text-white hover:text-gold bg-black/50 hover:bg-black/80 backdrop-blur-md w-12 h-12 rounded-full flex justify-center items-center transition-all border border-white/20 hover:border-gold/50 shadow-lg hover:scale-110"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Video Player Box */}
              <div
                className="flex-1 w-full bg-black relative flex items-center justify-center overflow-hidden cursor-pointer group"
                onClick={toggleKaraokePlay}
              >
                {!isPlaying && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pb-24 pointer-events-none">
                    <div className="w-24 h-24 bg-gold/80 hover:bg-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.6)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 pointer-events-auto cursor-pointer">
                      <FaPlay className="text-black text-3xl ml-2" />
                    </div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  src="/music/video.mp4"
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                  onError={(e) => console.log('Video failed to load:', e)}
                />

                {/* Slight dark gradient at the bottom so the footer text pops out more if video is bright */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
              </div>

              {/* Audio Controls Footer */}
              <div className="p-6 md:p-8 bg-black/90 backdrop-blur-xl border-t border-gold/20 flex flex-col md:flex-row items-center justify-between relative z-20 gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                {/* Audio Element */}
                <audio
                  ref={audioRef}
                  src="/music/Bodas--Marfim-André e Bruna.mp3"
                  onEnded={() => {
                    setIsPlaying(false);
                    cancelAnimationFrame(animationRef.current);
                  }}
                  onSeeked={() => {
                    updateTime();
                    if (videoRef.current && audioRef.current) {
                      videoRef.current.currentTime = audioRef.current.currentTime;
                    }
                  }}
                />

                <div className="flex flex-col mb-2 md:mb-0 text-center md:text-left">
                  <p className="text-[#ffffff] font-serif text-xl leading-tight drop-shadow-md">A Nossa Canção</p>
                  <span className="text-gold/60 text-xs font-sans tracking-[0.2em] uppercase">Música & Letra</span>
                </div>

                <button
                  onClick={toggleKaraokePlay}
                  className="hidden md:flex w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold to-yellow-600 rounded-full shrink-0 items-center justify-center text-black hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-yellow-300/50"
                  aria-label="Play/Pause Video"
                >
                  {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} className="ml-1" />}
                </button>

                <div className="w-full md:w-auto flex-1 max-w-sm flex flex-col items-center gap-2">
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden relative border border-white/5">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-600 to-gold transition-all duration-100 ease-linear"
                      style={{ width: audioRef.current ? `${(currentTime / audioRef.current.duration) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <div className="w-full flex justify-between text-[10px] text-white/50 font-mono tracking-widest">
                    <span>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}</span>
                    <span>BODAS DE MARFIM</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FriendsMessage = () => {
  return (
    <section className="py-24 bg-gradient-to-t from-black to-zinc-950 relative">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-pink-romantic opacity-10 absolute -top-10 left-1/2 -translate-x-1/2">
            <FaHeart size={100} />
          </div>
          <h2 className="text-gold/50 text-xl font-sans mb-12 uppercase tracking-[0.3em] font-light">Mensagem dos Amigos</h2>
          <div className="bg-zinc-900/30 p-10 md:p-16 rounded-[4rem] border border-gold/10 shadow-2xl backdrop-blur-sm">
            <p className="text-2xl md:text-3xl text-marfim/90 font-serif leading-relaxed italic font-light">
              "Queridos André e Bruna, vocês são exemplo de amor, amizade e companheirismo.
              Que essa linda história continue sendo escrita com muita alegria, carinho e momentos inesquecíveis.
              <span className="block mt-6 text-gold font-medium">Feliz Bodas de Marfim!"</span>
            </p>
            <div className="mt-12 flex justify-center gap-6 text-gold/60">
              <FaHeart className="animate-pulse" /> <FaHeart className="animate-pulse" style={{ animationDelay: '0.2s' }} /> <FaHeart className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/music/Bodas--Marfim-André e Bruna.mp3'],
      html5: true,
      loop: true,
      volume: 0.5,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const unlockExperience = () => {
    if (!isPlaying) {
      togglePlay();
    }
    setIsUnlocked(true);
  };

  // Lock scrolling when not unlocked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      // Ensure we are at the top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isUnlocked]);

  return (
    <AppContext.Provider value={{ isPlaying, togglePlay, showControls: isUnlocked, isUnlocked, unlockExperience }}>
      <div className={`App font-sans selection:bg-gold selection:text-white bg-black ${!isUnlocked ? 'h-screen overflow-hidden' : ''}`}>
        {isUnlocked && <FloatingHearts />}
        <MusicPlayer />

        <Hero />

        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <PhotoGallery />
            <Timeline />
            <KaraokeSection />
            <FriendsMessage />

            <footer className="py-12 bg-black border-t border-gold/20 text-center relative z-20">
              <div className="container mx-auto px-6">
                <p className="text-gold font-serif text-2xl mb-6">14 anos de amor – André & Bruna</p>
                <div className="flex justify-center gap-8 text-gold/40 text-xl">
                  <FaHeart />
                  <GiBigDiamondRing />
                  <FaStar />
                </div>
                <p className="mt-8 text-xs text-white/30 uppercase tracking-widest">
                  Bodas de Marfim • {new Date().getFullYear()}
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </div>
    </AppContext.Provider>
  );
}


export default App;
