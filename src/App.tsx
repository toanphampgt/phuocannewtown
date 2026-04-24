import React, { useState, useEffect } from 'react';
import { Phone, MapPin, CheckCircle, ChevronRight, ChevronLeft, Home, TreePine, ShieldCheck, Gem, Navigation, Map, Shield, Sprout, ArrowRight, Menu, X, TrendingUp, BadgeDollarSign, Percent, Landmark, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const galleryImages = [
    "/phuoc-an-new-town (25).png",
    "/phuoc-an-new-town (26).png",
    "/phuocan1.jpg",
    "/phuocan2.jpg",
    "/phuocan3.jpg",
    "/phuoc-an-new-town (30).png",
    "/phuoc-an-new-town (31).png",
    "/phuoc-an-new-town (32).png",
    "/phuoc-an-new-town (33).png",
    "/phuoc-an-new-town (34).png",
  ];

  const nextImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentGalleryImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-primary-500 selection:text-white">
      {/* Header / Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo-phuoc-an.png" alt="Phước An Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
              <span className={`font-sans text-lg md:text-xl font-bold tracking-tight ${isScrolled ? 'text-primary-800' : 'text-white'}`}>
                PHƯỚC AN NEW TOWN
              </span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {['Tổng quan', 'Vị trí', 'Tiện ích', 'Mặt bằng', 'Chính sách'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-500 ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}>
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a href="#nhan-bao-gia" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold uppercase rounded-full text-white bg-gold-500 hover:bg-gold-600 transition-colors shadow-lg">
                Nhận Báo Giá
              </a>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                 {mobileMenuOpen ? <X className={isScrolled ? 'text-gray-800' : 'text-white'} /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] bg-white shadow-xl z-40 md:hidden flex flex-col"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Tổng quan', 'Vị trí', 'Tiện ích', 'Mặt bằng', 'Chính sách'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-4 text-[16px] md:text-[19px] font-medium text-gray-800 border-b border-gray-100">
                  {item}
                </a>
              ))}
              <div className="pt-4 px-3">
                <a href="tel:0935352888" className="flex items-center justify-center w-full px-6 py-3 border border-transparent text-[16px] md:text-[19px] font-bold uppercase rounded-full text-white bg-primary-700 hover:bg-primary-800">
                  Gọi Ngay: 0935.352.888
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/bg-hero.jpg" 
            alt="Phước An New Town aerial view" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-primary-900/80"></div>
          {/* Light sweep effect */}
          <motion.div
             className="absolute inset-0 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] pointer-events-none mix-blend-overlay"
             animate={{ left: ["-150%", "150%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-bold uppercase tracking-[0.2em] mb-4 text-sm md:text-[19px]"
          >
            Đô thị sinh thái ven sông Tiên
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 uppercase tracking-tight drop-shadow-lg"
          >
            Khu Phố Mới Phước An
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-100 font-light mb-10 max-w-5xl mx-auto"
          >
            Đất nền trung tâm Tiên Phước, TP. Đà Nẵng, đã có sổ đỏ – <br className="hidden md:block" />
            Đón đầu cơ hội đầu tư sinh lời vững bền tại Đô thị sinh thái ven sông&nbsp;Tiên
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#tổng-quan" title="Xem Tổng quan dự án Khu Phố Mới Phước An" className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-xl uppercase tracking-wider">
              Khám phá ngay
            </a>
            <a href="tel:0935352888" title="Gọi ngay Hotline tư vấn: 0935352888" className="px-8 py-4 bg-white hover:bg-gold-500 hover:text-white text-primary-800 font-bold rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg">
              <Phone className="w-5 h-5" />
              Hotline
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="tổng-quan" className="py-12 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary-900 uppercase tracking-wide">
              Khu Phố Mới Phước An
            </h2>
          </div>

          <div className="mb-6 md:mb-8 space-y-6 text-gray-800 font-medium leading-relaxed text-justify font-sans text-base md:text-[19px]">
            <p>
              Giữa làn sóng phát triển mạnh mẽ của khu vực, Khu phố mới Phước An (do QNIC làm chủ đầu tư) vươn mình kiêu hãnh như một dấu ấn trung tâm bên dòng sông Tiên êm đềm, kiến tạo chuẩn sống đẳng cấp tại trung tâm thị trấn Tiên Kỳ. Với lợi thế tựa sông, tiếp giáp <a href="#vị-trí" title="Vị trí đắc địa Khu Phố Mới Phước An" className="text-gold-500 font-bold hover:underline">trục giao thông chiến lược</a> kết nối toàn vùng, cùng hệ sinh thái tiện ích nội đô hiện đại, dự án hứa hẹn trở thành khu đô thị kiểu mẫu, một không gian sống xanh, thông minh và phồn vinh bậc nhất.
            </p>
            <p>
              Được quy hoạch bài bản trên quy mô 6,91 ha với định hướng trở thành khu đô thị ven sông kiểu mẫu, dự án là tâm huyết của chủ đầu tư, tiên phong trong chiến lược phát triển đô thị sinh thái kết hợp khu dân cư hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="flex flex-col justify-between space-y-6 text-gray-800 font-medium leading-relaxed text-justify font-sans text-base md:text-[19px]">
              {/* Tablet/Mobile Image Layout */}
              <div className="flex lg:hidden w-screen -mx-4 overflow-hidden group my-4 relative md:w-full md:mx-0 md:rounded-xl">
                 <img 
                    src="/phuoc-an.png" 
                    alt="Phước An New Town render" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                 />
                 {/* Sweep Glow / Radar Effect for Mobile */}
                 <motion.div
                   className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 pointer-events-none z-20"
                   animate={{ x: ["-150%", "150%"] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                 />
              </div>

              <p>
                Dự án mang đến hệ sinh thái tiện ích toàn diện bao gồm: khu mua sắm liền kề, công viên cây xanh ven sông, quảng trường nhỏ, trung tâm thể thao đa năng, cùng các dãy nhà phố khang trang. Đặc biệt, không gian cộng đồng, giao thông nội khu và cảnh quan sinh thái được quy hoạch đồng bộ, ưu tiên yếu tố bền vững và môi trường sống hạnh phúc.
              </p>

              <p>
                Tầm nhìn dài hạn của chủ đầu tư không dừng lại ở một khu dân cư đơn thuần, mà là kiến tạo một trung tâm sống – làm việc – giải trí – nghỉ dưỡng kiểu mới, trở thành "đô thị biểu tượng" của Tiên Phước. Đây chính là bước chuyển mình táo bạo, hiện thực hóa tầm nhìn phát triển khu vực thành đô thị đáng sống và đáng đầu tư hàng đầu, góp phần nâng tầm diện mạo trẻ trung, năng động và giàu tiềm năng bứt phá trong tương lai.
              </p>
              <p>
                Đặc biệt, với hành lang pháp lý minh bạch, sổ đỏ trao tay sở hữu lâu dài cùng hạ tầng đã được đầu tư nâng cấp đồng bộ, Khu phố mới Phước An không chỉ là chốn an cư an toàn mà còn là bảo chứng vàng cho dòng vốn đầu tư sinh lời bền vững.
              </p>
            </div>
            
            <div className="hidden lg:block overflow-hidden group w-full h-full rounded-xl relative">
               <img 
                  src="/phuoc-an.png" 
                  alt="Phước An New Town render" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 360 Concept Section */}
      <section className="w-full bg-white relative overflow-hidden group">
        <div className="w-full mx-auto relative">
          
          {/* Continuous Sweep Glow / Radar Effect OVERLAY */}
          <motion.div
            className="absolute inset-y-0 w-[150%] md:w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-20 pointer-events-none"
            animate={{ left: ["-100%", "200%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="flex flex-col md:flex-row w-full relative z-10">
            {/* Image 1: "3" */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/3 relative transition-transform duration-300 origin-center"
            >
              <img src="/phuoc-an-new-town (1).png" alt="Phối cảnh 3 tiêu chí vàng dự án Khu Phố Mới Phước An" loading="lazy" decoding="async" className="w-full h-auto object-cover block" referrerPolicy="no-referrer"/>
            </motion.div>
            
            {/* Image 2: "6" */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-1/3 relative transition-transform duration-300 origin-center"
            >
              <img src="/phuoc-an-new-town (2).png" alt="Phối cảnh 6 nền tảng kiến tạo tương lai tại đô thị vệ tinh Tiên Phước" loading="lazy" decoding="async" className="w-full h-auto object-cover block" referrerPolicy="no-referrer"/>
            </motion.div>

            {/* Image 3: "0" */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, zIndex: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full md:w-1/3 relative transition-transform duration-300 origin-center"
            >
              <img src="/phuoc-an-new-town (3).png" alt="Pháp lý dự án đất nền có sổ đỏ QNIC Quảng Nam" loading="lazy" decoding="async" className="w-full h-auto object-cover block" referrerPolicy="no-referrer"/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Table Section */}
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary-900 uppercase">
              Tổng Quan Dự Án
            </h2>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:stretch items-stretch">
              <div className="p-8 md:p-12 bg-primary-800 text-white flex flex-col">
                 <div className="flex items-center gap-4 mb-6 shrink-0">
                   <img src="/logo-phuoc-an.png" alt="Phước An Logo" className="h-14 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} referrerPolicy="no-referrer" />
                   <h3 className="text-2xl md:text-3xl font-sans font-bold">Thông tin cốt lõi</h3>
                 </div>
                 <p className="font-sans text-base md:text-[19px] text-primary-100 leading-relaxed mb-8 shrink-0 text-justify">
                    Khu Phố Mới Phước An tự hào mang đến quy hoạch chuẩn chỉnh, tôn tạo không gian sống tiện nghi, an toàn và hòa mình vào thiên nhiên sông nước mây ngàn.
                 </p>
                 <div className="flex-1 relative w-full h-[300px] sm:h-[400px] lg:min-h-[300px] rounded-xl overflow-hidden shadow-2xl bg-white md:bg-transparent group">
                   <img 
                      src="/phuoc-an-new-town (18).png"
                      alt="Overview image"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain md:object-cover object-center"
                      referrerPolicy="no-referrer"
                   />
                   {/* Light sweep effect */}
                   <motion.div
                     className="absolute inset-0 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-30deg] pointer-events-none z-20"
                     animate={{ left: ["-150%", "150%"] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                   />
                 </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col">
                <ul className="flex flex-col justify-between flex-1 h-full">
                  {[
                    { label: "Tên dự án", value: "Khu Phố Mới Phước An" },
                    { label: "Vị trí", value: "TT Hành chính xã Tiên Phước, TP Đà Nẵng" },
                    { label: "Chủ đầu tư", value: "Công ty Đầu tư Phát triển Hạ tầng QN (QNIC)" },
                    { label: "Tổng quy mô", value: "6,91 ha (249 lô đất nền)" },
                    { label: "Diện tích", value: "100m² - 260m²" },
                    { label: "Loại hình sản phẩm", value: "Đất nền liền kề và biệt thự" },
                    { label: "Mật độ XD & Cao tầng", value: "Đến 90% (Xây tối đa 5 tầng)" },
                    { label: "Hạ tầng", value: "Hoàn thiện thảm nhựa, cây xanh, vỉa hè đầy đủ" },
                    { label: "Pháp lý", value: "Sổ đỏ sẵn từng lô, sở hữu lâu dài" }
                  ].map((item, index) => (
                    <li key={index} className="flex flex-col py-3 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
                      <span className="text-sm font-semibold text-gray-500 uppercase mb-1">{item.label}</span>
                      <span className="text-[17px] md:text-[19px] font-medium text-primary-900">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/phuoc-an-new-town (16).png" 
            alt="Core values background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900/85 to-primary-950/95"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-bold uppercase mb-4 text-white">
              6 Nền Tảng Vàng Kiến Tạo Tương Lai
            </h2>
            <p className="font-sans text-[16px] md:text-[19px] text-primary-200 max-w-2xl mx-auto text-justify">Những giá trị cốt lõi làm nên sức hút không thể chối từ của siêu dự án.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: <Navigation className="w-8 h-8"/>, title: "Vị Trí TT Hành Chính", desc: "Tọa lạc tại trung tâm đô thị xã Tiên Phước, kết nối liền mạch tới các tiện ích liền kề." },
              { icon: <Shield className="w-8 h-8"/>, title: "Pháp Lý Hoàn Chỉnh", desc: "Sổ đỏ có sẵn công chứng ngay, sở hữu lâu dài" },
              { icon: <TreePine className="w-8 h-8"/>, title: "Sinh Thái Ven Sông", desc: "Tiếp giáp mặt tiền Sông Tiên thoáng nhẹ, cao ráo hoàn toàn miễn nhiễm ngập." },
              { icon: <Gem className="w-8 h-8"/>, title: "Hạ Tầng Tối Ưu", desc: "Trục đường nhựa thảm lớn, điện nước đô thị, cáp quang đi ngầm tiện nghi an toàn." },
              { icon: <CheckCircle className="w-8 h-8"/>, title: "Môi Trường Sống Đẹp", desc: "Đầy đủ công viên, dải xanh thiên nhiên, trung tâm dịch vụ, sân trẻ em thể thao đa năng." },
              { icon: <TrendingUp className="w-8 h-8"/>, title: "Tiềm Năng Sinh Lời", desc: "Bảo chứng vàng cho dòng vốn đầu tư với dư địa tăng giá vượt trội nhờ quy hoạch hạ tầng trọng điểm." }
            ].map((feature, idx) => (
              <div key={idx} tabIndex={0} className="bg-primary-800/50 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-primary-700 hover:border-gold-500 focus:border-gold-500 active:border-gold-500 transition-colors duration-300 flex flex-col justify-start outline-none cursor-pointer">
                <div className="text-gold-400 mb-4 md:mb-6">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-sans font-bold mb-3 leading-tight">{feature.title}</h3>
                <p className="font-sans text-[14px] md:text-[19px] text-primary-100 leading-relaxed text-justify">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="vị-trí" className="py-12 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-sm font-bold text-gold-500 uppercase tracking-widest mb-2">Vị Trí</h2>
                <h3 className="text-3xl md:text-5xl font-sans font-bold text-primary-900 mb-6 uppercase">
                  Tâm Điểm Vàng Bất Động Sản
                </h3>
                <div className="w-24 h-1 bg-gold-500 mb-8"></div>
                
                <p className="font-sans text-[16px] md:text-[19px] text-gray-800 font-medium mb-6 text-justify">
                  Nằm tại trung tâm hành chính sự nghiệp, Khu phố mới Phước An sở hữu cả "Nhất Cận Thị, Nhị Cận Giang, Tam Cận Lộ" khi kề ngay chợ Tiên Kỳ, sông Tiên và hàng loạt kết nối chiến lược:
                </p>

                <ul className="space-y-4 mb-8 font-sans text-[16px] md:text-[19px] text-gray-800 font-medium">
                   <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-gold-500 shrink-0" /> <strong className="shrink-0 w-28 whitespace-nowrap">Phía Đông:</strong> Giáp khu Quân đội & Dân cư</li>
                   <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-gold-500 shrink-0" /> <strong className="shrink-0 w-28 whitespace-nowrap">Phía Tây:</strong> Chợ trung tâm Tiên Kỳ & Sông Tiên</li>
                   <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-gold-500 shrink-0" /> <strong className="shrink-0 w-28 whitespace-nowrap">Phía Nam:</strong> Trung tâm hành chính xã</li>
                   <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-gold-500 shrink-0" /> <strong className="shrink-0 w-28 whitespace-nowrap">Phía Bắc:</strong> Sân vận động đô thị đa năng</li>
                </ul>

                <div className="space-y-3">
                  {[
                    { title: "Giáo dục & Y tế", desc: "Trường TH Kim Đồng, THPT Huỳnh Thúc Kháng, BV Đa khoa Tiên Phước, BV Thái Bình Dương..." },
                    { title: "Giao thông", desc: "Giao thoa trục Huỳnh Thúc Kháng, QL 40B, tuyến 10/3, ĐT 614 đi Sơn Cẩm Hà." },
                    { title: "Văn hóa & Giải trí", desc: "Công viên trung tâm, Làng cổ Lộc Yên, Lò Thung, Nhà lưu niệm cụ Huỳnh Thúc Kháng." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-5 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="md:w-44 flex-shrink-0 font-bold text-lg text-primary-700 font-sans pt-1">{item.title}</div>
                      <div className="hidden md:block w-[2px] bg-gold-400 rounded-full my-1"></div>
                      <p className="font-sans text-gray-800 font-medium text-[16px] md:text-[19px] leading-relaxed md:pt-1 text-justify">{item.desc}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="relative">
                <div className="absolute inset-0 bg-gold-400 rounded-3xl transform translate-x-4 translate-y-4"></div>
                <img 
                  src="/phuoc-an-new-town (22).png" 
                  alt="Map location" 
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-xl bg-white"
                  referrerPolicy="no-referrer"
                />
             </div>
           </div>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="w-full bg-primary-900 relative overflow-hidden flex">
        <img 
          src="/phuoc-an-new-town (4).png" 
          alt="Phối cảnh Khu Phố Mới Phước An" 
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover block relative z-0"
          referrerPolicy="no-referrer"
        />
        
        {/* Sweep glow effect */}
        <motion.div 
          className="absolute inset-y-0 w-[80%] md:w-[40%] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-30deg] pointer-events-none z-10 mix-blend-overlay"
          initial={{ left: '-100%' }}
          animate={{ left: '200%' }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
        />
      </section>

      {/* Amenities Section */}
      <section id="tiện-ích" className="pt-4 md:pt-24 bg-gray-50 pb-8 relative z-10 w-full mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
             <h2 className="text-3xl md:text-5xl font-sans font-bold text-primary-900 mb-4 uppercase mt-4 md:mt-0">
               Đặc Quyền Sống Vượt Trội
             </h2>
             <p className="font-sans text-[16px] md:text-[19px] text-gray-800 font-medium max-w-2xl mx-auto text-justify mt-2 lg:mt-4">
               Hệ sinh thái tiện ích nội khu đỉnh cao, đáp ứng trọn vẹn mọi nhu cầu sống tinh hoa của cộng đồng cư dân.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-0 md:pt-4">
            {/* Card 1 */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
               <div className="relative h-[300px] overflow-hidden">
                 <img 
                   src="/phuoc-an-new-town (21).png" 
                   alt="Công viên trung tâm" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-primary-800 text-sm">
                   01
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-sans font-bold text-primary-900 mb-3">Tổ Hợp Công Viên Xanh & Thể Thao</h3>
                 <p className="font-sans text-[16px] md:text-[19px] text-gray-800 font-medium text-justify">Với đường nội bộ thảm nhựa, sân chơi trẻ em và thể thao đa năng - kiến tạo nhịp sống trọn vẹn, rèn luyện sức khỏe tuyệt vời.</p>
               </div>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
               <div className="relative h-[300px] overflow-hidden">
                 <img 
                   src="/phuoc-an-new-town (23).png" 
                   alt="Khu thương mại" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-primary-800 text-sm">
                   02
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-sans font-bold text-primary-900 mb-3">Dịch Vụ & Mua Sắm Liền Kề</h3>
                 <p className="font-sans text-[16px] md:text-[19px] text-gray-800 font-medium text-justify">Tận hưởng dịch vụ thương mại nhà hàng, siêu thị mini, chợ Tiên Kỳ liền sát - Đảm bảo mọi trải nghiệm mua sắm hằng ngày chu toàn nhất.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="w-full relative bg-gray-50 overflow-hidden pt-4 md:pt-0 -mt-2 pb-0 md:pb-0 z-20">
        <div className="w-full relative cursor-pointer bg-gray-50 flex flex-col md:block">
           {/* Mobile implementation: Stack two separate images seamlessly */}
           <div className="md:hidden w-full flex flex-col items-center relative overflow-hidden group">
              <img 
                src="/phuocan4.jpg" 
                alt="Khám phá Phước An phần 1" 
                className="w-full h-auto object-contain object-bottom block m-0 p-0"
                referrerPolicy="no-referrer"
              />
              <img 
                src="/phuocan5.jpg" 
                alt="Khám phá Phước An phần 2" 
                className="w-full h-auto object-contain object-top block m-0 p-0"
                referrerPolicy="no-referrer"
              />
              {/* Radar sweep */}
              <motion.div 
                 className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45 pointer-events-none z-20"
                 animate={{ x: ["-150%", "150%"] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              {/* Subtle dynamic pulse overlay */}
              <motion.div 
                className="absolute inset-0 bg-primary-900/5 pointer-events-none z-20"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
           </div>

           {/* Desktop implementation */}
           <motion.div
             whileHover={{ scale: 1.03 }}
             transition={{ duration: 0.6 }}
             className="relative z-10 w-full hidden md:block"
           >
              {/* Image is responsive and contained */}
              <div className="w-full h-auto overflow-hidden">
                <img 
                  src="/phuoc-an-new-town (24).png" 
                  alt="Khám phá Phước An" 
                  className="w-full h-auto object-contain object-center block"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Radar sweep */}
              <motion.div 
                 className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45 pointer-events-none z-20"
                 animate={{ x: ["-150%", "150%"] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              {/* Subtle dynamic pulse overlay */}
              <motion.div 
                className="absolute inset-0 bg-primary-900/5 pointer-events-none z-20"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
           </motion.div>
        </div>
      </section>

      {/* Project Stats Banner */}
      <section className="bg-white py-3 md:py-5 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5 }}
                 className="flex flex-col items-center justify-center space-y-1 md:space-y-2"
               >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-[#02bced] uppercase tracking-tight" style={{ transform: 'scaleY(1.1)' }}>6,91 HA</span>
                  <span className="text-[#a0aab8] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Quy mô</span>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 className="flex flex-col items-center justify-center space-y-1 md:space-y-2"
               >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-[#02bced] uppercase tracking-tight" style={{ transform: 'scaleY(1.1)' }}>249 LÔ</span>
                  <span className="text-[#a0aab8] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Sản phẩm</span>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="flex flex-col items-center justify-center space-y-1 md:space-y-2"
               >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-[#02bced] tracking-tight" style={{ transform: 'scaleY(1.1)' }}>90%</span>
                  <span className="text-[#a0aab8] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Mật độ XD</span>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 className="flex flex-col items-center justify-center space-y-1 md:space-y-2"
               >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-black text-[#02bced] uppercase tracking-tight" style={{ transform: 'scaleY(1.1)' }}>SỔ ĐỎ</span>
                  <span className="text-[#a0aab8] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Pháp lý</span>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Additional Showcase Section */}
      <section className="w-full relative bg-white overflow-hidden group">
        <div tabIndex={0} className="relative w-full cursor-crosshair group outline-none">
            <img 
              src="/phuoc-an-new-town (5).png" 
              alt="Không gian Phước An" 
              className="w-full h-auto block transition-all duration-700 group-hover:brightness-50 group-focus:brightness-50"
              referrerPolicy="no-referrer"
            />
            
            {/* Interactive Boundary Overlay */}
            <svg 
              className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700" 
              viewBox="0 0 2998 1408" 
              preserveAspectRatio="none"
            >
              <defs>
                 <style>
                    {`
                      @keyframes march {
                        to { stroke-dashoffset: 50; }
                      }
                      .marching-ants {
                        animation: march 2s linear infinite;
                      }
                    `}
                 </style>
                 <filter id="glowBoundary" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
              </defs>
              <polygon 
                points="216,1067 1317,1403 1452,1403 1712,1268 2096,1088 2141,1014 2133,977 2093,950 1934,868 2173,625 2215,572 2104,527 1659,363 1963,135 1627,16 970,394 327,627 345,664 218,733 486,873" 
                fill="rgba(252, 211, 77, 0.25)"
                stroke="#F59E0B"
                strokeWidth="8" 
                strokeDasharray="20 15"
                className="marching-ants drop-shadow-2xl"
                vectorEffect="non-scaling-stroke"
                filter="url(#glowBoundary)"
              />
            </svg>

            {/* Floating Title (appears on hover) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-primary-900/90 text-gold-500 px-8 py-3 rounded-full font-sans font-bold text-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 z-20 pointer-events-none shadow-2xl border border-gold-500/30 backdrop-blur-md whitespace-nowrap">
               📍 Ranh Giới Khu Phố Mới Phước An
            </div>
        </div>
      </section>

      {/* Sustainable Value & 3 Golden Criteria Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4 md:mb-10">
          <h2 className="text-[26px] md:text-5xl font-sans font-bold text-primary-900 mb-4 md:mb-6 uppercase leading-tight md:leading-normal">
            Giá trị sống và phát triển bền vững
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-6 text-[16px] md:text-[19px] font-sans text-gray-800 font-medium leading-relaxed mb-8 md:mb-16 text-justify">
          <p>
            Dưới tầm nhìn chiến lược của chủ đầu tư, Khu phố mới Phước An được định hướng trở thành “Đô thị Hạnh phúc – Biểu tượng sống mới tại trung tâm Tiên Phước”. Không gian sống nơi đây không chỉ xanh – sạch – đẹp mà còn giàu kết nối cộng đồng, lan tỏa cảm giác yên bình, thư thái và đầy cảm hứng giữa lòng vùng đất trung du giàu truyền thống.
          </p>
          <p>
            Bên cạnh đó, Khu phố mới Phước An còn là tài sản lâu dài với pháp lý minh bạch, sổ đỏ sở hữu lâu dài, đảm bảo sự an tâm tuyệt đối cho cư dân. Mỗi căn nhà tại đây không chỉ là mái ấm gắn kết các thế hệ, mang giá trị tinh thần sâu sắc mà còn sở hữu tiềm năng tăng giá bền vững theo đà phát triển đô thị hóa của khu vực.
          </p>
          <p>
            Với vị trí “vàng” ngay trái tim của Tiên Phước, kế bên dòng sông Tiên thơ mộng và tiếp giáp các trục giao thông huyết mạch, dự án hứa hẹn trở thành biểu tượng đô thị mới. Sự kết nối thuận tiện với trung tâm hành chính, chợ Tiên Kỳ, hệ thống trường học và các tiện ích nội khu đồng bộ (công viên, sân thể thao, hạ tầng hiện đại) sẽ góp phần nâng tầm chất lượng cuộc sống và thúc đẩy phát triển kinh tế - xã hội địa phương.
          </p>
        </div>

        <div className="w-full mb-8 md:mb-16 shadow-xl relative overflow-hidden group">
          <img 
            src="/phuoc-an-new-town (12).png" 
            alt="3 Tiêu chí vàng" 
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain block"
            referrerPolicy="no-referrer"
          />
          
          {/* Sweep Glow / Light Beam Effect over image 12 */}
          <motion.div
            className="absolute inset-0 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-30deg] pointer-events-none z-20"
            animate={{ left: ["-150%", "150%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
          
          {/* Typographic Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
            className="absolute top-[10%] md:top-[12%] right-[5%] md:right-[8%] lg:right-[10%] flex flex-col items-end z-10 pointer-events-none"
          >
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 md:gap-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
            >
              <span className="text-[#ffe066] text-[100px] md:text-[130px] font-sans font-bold leading-none drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]" style={{textShadow: "0 8px 30px rgba(0,0,0,0.8)"}}>3</span>
              <div className="flex flex-col items-start justify-center ml-1">
                <span className="text-white text-2xl md:text-4xl font-sans font-semibold tracking-wide" style={{textShadow: "0 4px 10px rgba(0,0,0,0.8)"}}>TIÊU CHÍ</span>
                <span className="text-[#ffe066] text-[50px] md:text-[70px] font-sans font-bold tracking-widest leading-[0.9] drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" style={{textShadow: "0 8px 30px rgba(0,0,0,0.8)"}}>VÀNG</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white text-base md:text-2xl font-sans font-bold tracking-[0.10em] md:tracking-[0.15em] mt-4 md:mt-6" 
              style={{textShadow: "0 6px 15px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.8)"}}
            >
              CẬN THỊ - CẬN GIANG – CẬN LỘ
            </motion.div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-[26px] sm:text-3xl md:text-4xl xl:text-[44px] font-sans font-bold text-primary-900 text-center mb-6 md:mb-10 uppercase tracking-tight sm:whitespace-nowrap leading-tight md:leading-snug">
            3 TIÊU CHÍ VÀNG:<br className="sm:hidden" /> CẬN THỊ – CẬN GIANG – CẬN LỘ
          </h3>
          <div className="space-y-4 md:space-y-6 text-[16px] md:text-[19px] font-sans text-gray-800 font-medium leading-relaxed text-justify">
            <p>
              Khu phố mới Phước An tự hào hội tụ trọn vẹn "tam cận" – thước đo vàng định vị giá trị bất động sản từ xưa đến nay, hứa hẹn mang lại sự thịnh vượng và đại cát cho chủ sở hữu:
            </p>
            <p>
              <strong className="text-primary-900">Nhất cận Thị:</strong> Tọa lạc ngay sát trung tâm thị trấn Tiên Kỳ và chợ Tiên Kỳ sầm uất, dự án cho phép cư dân tiếp cận mọi tiện ích sống chỉ trong vài bước chân. Từ các cơ quan hành chính, trường học các cấp đến hệ thống y tế và dịch vụ thương mại, tất cả đều hiện hữu xung quanh, mang đến một nhịp sống năng động và thuận tiện bậc nhất.
            </p>
            <p>
              <strong className="text-primary-900">Nhị cận Giang:</strong> Thừa hưởng sinh khí từ dòng sông Tiên hiền hòa – dòng sông duy nhất tại miền Trung chảy ngược về hướng Tây Bắc, dự án mang đến một không gian sống xanh mát, không khí trong lành và cảnh quan thơ mộng.
            </p>
            <p>
              <strong className="text-primary-900">Tam cận Lộ:</strong> Nằm trên trục giao thông huyết mạch kết nối liên khu vực, dự án sở hữu khả năng liên kết vùng hoàn hảo. Việc di chuyển đến thành phố Tam Kỳ hay các vùng phụ cận trở nên dễ dàng hơn bao giờ hết.
            </p>
          </div>
        </div>
      </section>

      {/* Sales Policy Section */}
      <section id="chính-sách" className="relative py-12 md:py-24 bg-[#dbe4e5] overflow-hidden">
         {/* Decorative blurred blobs for leaf-like effects */}
         <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/30 blur-[80px] rounded-full mix-blend-multiply pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400/30 blur-[100px] rounded-full mix-blend-multiply pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
         
         {/* Decorative Leaves (Photorealistic Foreground blur) */}
         <img src="https://images.unsplash.com/photo-1599598425947-330026206b12?q=80&w=600&auto=format&fit=crop" alt="Leaf overlay" className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 object-contain rotate-[120deg] opacity-70 mix-blend-multiply pointer-events-none transform translate-x-12 -translate-y-12 filter blur-[8px] z-20" referrerPolicy="no-referrer" />

         <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
               <motion.h2 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-black uppercase mb-16 tracking-tight leading-tight"
                 style={{ 
                   WebkitTextFillColor: "transparent",
                   WebkitTextStrokeWidth: "2px",
                   WebkitTextStrokeColor: "#0284c7",
                   backgroundImage: "linear-gradient(to bottom, #38bdf8, #1d4ed8)",
                   WebkitBackgroundClip: "text",
                   textShadow: "0px 2px 0px #1e40af, 0px 4px 0px #1e40af, 0px 6px 0px #1e40af, 0px 8px 0px #1e40af, 0px 10px 0px #1e40af, 0px 15px 15px rgba(0,0,0,0.4)"
                 }}
               >
                 CHÍNH SÁCH<br/>BÁN HÀNG
               </motion.h2>

               <ul className="space-y-8 font-sans">
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <BadgeDollarSign className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300">Giá chỉ từ <span className="text-gold-600">14 Triệu/m2</span></span>
                 </motion.li>
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <Map className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300">Diện tích đa dạng <span className="text-gold-600">100 - 260m2</span></span>
                 </motion.li>
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.4 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <Home className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300"><span className="text-gold-600">249</span> sản phẩm: đất nền và biệt thự</span>
                 </motion.li>
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.5 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <Percent className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300">Chiết khấu lên đến <span className="text-gold-600">10%</span> khi giao dịch</span>
                 </motion.li>
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.6 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <FileCheck className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300">Sổ đỏ công chứng ngay trong vòng <span className="text-gold-600">30 ngày</span>.</span>
                 </motion.li>
                 <motion.li 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.7 }}
                   className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                 >
                    <div className="mt-1 flex items-center justify-center border-2 border-primary-800 rounded-full w-8 h-8 shrink-0 transition-colors duration-300 group-hover:bg-primary-800">
                       <Landmark className="w-5 h-5 text-primary-800 group-hover:text-white transition-colors duration-300 pointer-events-none" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-800 leading-snug group-hover:text-primary-800 transition-colors duration-300">Hỗ trợ vay ngân hàng <span className="text-gold-600">80%</span> với lãi suất cực kỳ ưu đãi</span>
                 </motion.li>
               </ul>
            </div>

            {/* Right Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center items-center relative"
            >
               <div className="rounded-t-[45%] rounded-b-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative w-full border-[6px] border-transparent transition-transform duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer" style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to bottom, #f1f5f9, #cbd5e1) border-box" }}>
                  <img 
                    src="/phuoc-an.png" 
                    alt="Phước An landscape" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </motion.div>
         </div>
      </section>

      {/* Featured Image 7 Showcase */}
      <section className="w-full relative bg-white pb-8 md:pb-16 z-20">
         <div className="w-full overflow-hidden relative cursor-pointer group shadow-2xl">
            {/* The Image */}
            <motion.img 
               initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
               whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               viewport={{ once: true, margin: "-100px" }}
               src="/phuocan7.png" 
               alt="Không gian Phước An" 
               className="w-full h-auto object-cover block relative z-10 transition-transform duration-[2000ms] group-hover:scale-[1.02]"
               referrerPolicy="no-referrer"
            />
            
            {/* Light Sweep Effect */}
            <motion.div 
               className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 pointer-events-none z-20 mix-blend-overlay"
               animate={{ x: ["-150%", "150%"] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            
            {/* Subtle dynamic pulse overlay */}
            <motion.div 
              className="absolute inset-0 bg-primary-900/5 pointer-events-none z-20 transition-opacity"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
         </div>
      </section>

      {/* Master Plan */}
      <section id="mặt-bằng" className="pt-12 md:pt-24 pb-12 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold text-gold-500 uppercase tracking-widest mb-2">Kiến Trúc Tương Lai</h2>
            <h3 className="text-3xl md:text-5xl font-sans font-bold text-primary-900 mb-6 uppercase">
               Mặt Bằng Dự Án
            </h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-12"></div>
            
            <p className="font-sans text-[16px] md:text-[19px] text-gray-800 font-medium max-w-4xl mx-auto mb-12 leading-relaxed text-justify">
              Dự án sở hữu thiết kế thông minh với tổng cộng 249 vị trí lô đất, diện tích dao động từ 100m² - 260m², phù hợp để ở, cho thuê hoặc kinh doanh. Mạng lưới hạ tầng đồng bộ khang trang.
            </p>

            <div className="rounded-3xl overflow-hidden shadow-2xl p-4 bg-gray-50 border border-gray-100 relative">
               <img 
                 src="/bg-hero.jpg" 
                 alt="Master plan" 
                 className="w-full h-[600px] object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-x-8 bottom-8">
                 <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="font-bold text-xl text-primary-900">Chi phí đầu tư trọn vẹn giá trị</p>
                      <p className="font-sans text-gray-800 font-medium text-[16px] md:text-[19px] mt-1 text-justify">Giỏ hàng 249 lô đẹp, sổ hồng trao tay</p>
                    </div>
                    <button className="px-6 py-3 bg-primary-700 text-white font-bold rounded-lg hover:bg-primary-800 transition-colors uppercase text-sm">
                      Tải bản đồ gốc
                    </button>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* Legal Section */}
      <section className="py-12 bg-white relative z-20">
         <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-primary-900 mb-12 text-center uppercase tracking-tight">
               Pháp Lý Dự Án
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
               {/* Frame 1 */}
               <div className="w-full relative min-h-[400px] md:min-h-[500px] p-4 sm:p-6 group">
                  {/* Outer container defining the border and clipping the image */}
                  <div className="absolute inset-0 border-[1.5px] border-[#e6c06a] rounded-[2px] rounded-bl-[40px] sm:rounded-bl-[60px] rounded-tr-[40px] sm:rounded-tr-[60px] overflow-hidden shadow-2xl z-20">
                     {/* The Image */}
                     <img 
                       src="/sodophuocan1.png" 
                       alt="Sổ đỏ dự án 1" 
                       className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-[1.03]"
                       referrerPolicy="no-referrer"
                     />
                     
                     {/* Gradient Overlay for Text */}
                     <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-2/5 bg-gradient-to-t from-[#0c1839]/95 via-[#0c1839]/70 to-transparent z-10 pointer-events-none"></div>

                     {/* Text and Icon Container OVERLAYING at the bottom */}
                     <div className="absolute bottom-0 left-0 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-end justify-between z-30">
                        <div className="flex flex-col relative w-[75%] md:w-[80%]">
                           <span className="text-white font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-wide leading-tight mb-1 md:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">PHÁP LÝ VÀNG</span>
                           <span className="text-[#00d0ff] font-bold text-base sm:text-xl lg:text-[22px] uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">VỮNG VÀNG ĐẦU TƯ</span>
                        </div>
                        <div className="flex-shrink-0 relative mb-1">
                           <div className="bg-[#00d0ff]/10 backdrop-blur-sm border border-[#00d0ff]/30 rounded-2xl p-2 sm:p-3 shadow-[0_0_20px_rgba(0,208,255,0.4)] transition-all duration-300 group-hover:bg-[#00d0ff] group-hover:border-[#00d0ff]">
                              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#00d0ff] group-hover:text-[#0c1839] transition-colors duration-300" strokeWidth={2.5} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Frame 2 */}
               <div className="w-full relative min-h-[400px] md:min-h-[500px] p-4 sm:p-6 group">
                  {/* Outer container defining the border and clipping the image */}
                  <div className="absolute inset-0 border-[1.5px] border-[#e6c06a] rounded-[2px] rounded-bl-[40px] sm:rounded-bl-[60px] rounded-tr-[40px] sm:rounded-tr-[60px] overflow-hidden shadow-2xl z-20">
                     {/* The Image */}
                     <img 
                       src="/sodophuocan2.png" 
                       alt="Sổ đỏ dự án 2" 
                       className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-[1.03]"
                       referrerPolicy="no-referrer"
                     />
                     
                     {/* Gradient Overlay for Text */}
                     <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-2/5 bg-gradient-to-t from-[#0c1839]/95 via-[#0c1839]/70 to-transparent z-10 pointer-events-none"></div>

                     {/* Text and Icon Container OVERLAYING at the bottom */}
                     <div className="absolute bottom-0 left-0 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-end justify-between z-30">
                        <div className="flex flex-col relative w-[75%] md:w-[80%]">
                           <span className="text-white font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-wide leading-tight mb-1 md:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SỔ ĐỎ TRAO TAY</span>
                           <span className="text-[#00d0ff] font-bold text-base sm:text-xl lg:text-[22px] uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ĐỂ MAI SAU KẾ THỪA</span>
                        </div>
                        <div className="flex-shrink-0 relative mb-1">
                           <div className="bg-[#00d0ff]/10 backdrop-blur-sm border border-[#00d0ff]/30 rounded-2xl p-2 sm:p-3 shadow-[0_0_20px_rgba(0,208,255,0.4)] transition-all duration-300 group-hover:bg-[#00d0ff] group-hover:border-[#00d0ff]">
                              <FileCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#00d0ff] group-hover:text-[#0c1839] transition-colors duration-300" strokeWidth={2.5} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Real Images Gallery Section */}
      <section className="pt-12 pb-12 md:pb-24 bg-white">
         <div className="max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl md:text-5xl font-sans font-bold text-primary-900 mb-12 uppercase px-4 sm:px-0">
               Hình Ảnh Thực Tế Dự Án
            </h3>

            <div 
               className="relative w-full mx-auto md:rounded-2xl overflow-hidden md:shadow-2xl group bg-white"
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEnd}
            >
               <AnimatePresence mode="popLayout" custom={currentGalleryImage}>
                 <motion.div 
                   key={currentGalleryImage}
                   initial={{ opacity: 0.5 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0.5 }}
                   transition={{ duration: 0.3 }}
                   className="aspect-[16/9] w-full"
                 >
                   <img 
                     src={galleryImages[currentGalleryImage]} 
                     alt={`Hình ảnh thực tế Phước An ${currentGalleryImage + 1}`} 
                     className="w-full h-full object-cover"
                     loading="lazy"
                     decoding="async"
                     referrerPolicy="no-referrer"
                   />
                 </motion.div>
               </AnimatePresence>

               {/* Navigation Arrows */}
               <button 
                 onClick={prevImage}
                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white backdrop-blur-md text-primary-900 flex items-center justify-center rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                 aria-label="Previous image"
               >
                 <ChevronLeft className="w-6 h-6" />
               </button>
               
               <button 
                 onClick={nextImage}
                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white backdrop-blur-md text-primary-900 flex items-center justify-center rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                 aria-label="Next image"
               >
                 <ChevronRight className="w-6 h-6" />
               </button>

               {/* Dots Indicator */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                 {galleryImages.map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setCurrentGalleryImage(idx)}
                     className={`transition-all duration-300 rounded-full ${idx === currentGalleryImage ? "w-8 h-2.5 bg-gold-500" : "w-2.5 h-2.5 bg-white/70 hover:bg-white"}`}
                     aria-label={`Go to slide ${idx + 1}`}
                   />
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* CTA Footer Section */}
      <section id="nhan-bao-gia" className="bg-primary-900 py-12 md:py-24 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-gold-400 fill-current">
              <polygon points="0,100 100,0 100,100" />
            </svg>
         </div>
         <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8 md:mb-16">
               <h2 className="text-[20px] sm:text-2xl md:text-4xl lg:text-[44px] font-sans font-bold text-white mb-6 uppercase w-full">
                  CHIẾM LĨNH CƠ HỘI ĐẦU TƯ <br className="md:hidden" />NGAY HÔM NAY
               </h2>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* Removed button */}
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
               <div className="text-center lg:text-left flex flex-col items-center lg:items-start pl-0 lg:pl-4">
                  <h3 className="text-[3rem] sm:text-[5.5rem] md:text-[5rem] lg:text-[4rem] font-sans font-black uppercase tracking-tighter leading-none mb-6 md:mb-12 flex flex-col items-center lg:items-start select-none transform origin-center lg:origin-left my-0 md:my-0 pb-2 md:pb-0">
                     {/* ĐĂNG KÝ */}
                     <div className="relative self-center md:self-start lg:self-start z-10 hover:scale-[1.02] transition-transform duration-300 -ml-12 sm:-ml-4 lg:-ml-6 md:ml-0">
                        {/* 3D Drop Extrusion */}
                        <span className="absolute left-0 top-0 text-[#005b9f]" style={{ textShadow: '0px 1px 0 #005b9f, 0px 2px 0 #005290, 0px 3px 0 #004a82, 0px 4px 0 #004274, 0px 5px 0 #003a67, 0px 6px 0 #00335b, 0px 7px 0 #002c50, 0px 8px 15px rgba(0,0,0,0.5)' }} aria-hidden="true">
                           ĐĂNG KÝ
                        </span>
                        {/* Gradient Foreground */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-[#25faff] via-[#05c4ff] to-[#009bf3] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                           ĐĂNG KÝ
                        </span>
                     </div>
                     
                     {/* NHẬN TIN - Shifted right & slightly overlapping */}
                     <div className="relative self-center md:self-start lg:self-start ml-16 sm:ml-24 md:ml-32 lg:ml-32 -mt-2 sm:-mt-2 md:-mt-4 z-20 hover:scale-[1.02] transition-transform duration-300 whitespace-nowrap lg:-ml-0">
                        {/* 3D Drop Extrusion */}
                        <span className="absolute left-0 top-0 text-[#003975]" style={{ textShadow: '0px 1px 0 #003975, 0px 2px 0 #003368, 0px 3px 0 #002c5c, 0px 4px 0 #002652, 0px 5px 0 #002047, 0px 6px 0 #001a3d, 0px 7px 0 #001534, 0px 8px 15px rgba(0,0,0,0.6)' }} aria-hidden="true">
                           NHẬN TIN
                        </span>
                        {/* Gradient Foreground */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-[#1ec7ff] to-[#004cf0] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                           NHẬN TIN
                        </span>
                     </div>
                  </h3>
                  <div className="space-y-6 text-[19px] font-sans text-primary-100/90 text-center lg:text-left mt-4 pl-0 lg:pl-16 text-justify">
                     <p className="leading-relaxed">
                        Cảm ơn Quý khách hàng đã quan tâm đến<br/>
                        <strong className="text-white text-xl mt-1 block">PHƯỚC AN NEW TOWN</strong>
                     </p>
                     <p className="leading-relaxed">
                        Quý khách hàng vui lòng để lại thông tin liên hệ để chúng tôi hỗ trợ tốt nhất
                     </p>
                  </div>
               </div>

               <div className="relative z-20 w-full sm:max-w-md md:max-w-none mx-auto lg:max-w-none mt-8 lg:mt-0 px-4 md:px-[0.5cm] lg:px-0">
                  {/* Bird Image (Positioned top right) */}
                  <motion.img 
                     src="/bird.png" 
                     alt="Bird flying" 
                     className="absolute -top-16 -right-6 md:-top-20 md:-right-10 w-28 h-28 md:w-36 md:h-36 z-30 pointer-events-none object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)]"
                     animate={{ 
                        y: [0, -12, 0],
                        rotate: [0, -2, 2, 0]
                     }}
                     transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                     }}
                  />
                  <div className="p-1 md:p-2 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative">
                    <div className="bg-white rounded-[1.5rem] p-5 md:p-10 shadow-inner">
                       <form action="https://formsubmit.co/toanpham.pgt@gmail.com" method="POST" target="_blank" className="flex flex-col gap-6 text-left">
                          <input type="hidden" name="_captcha" value="false" />
                          <input 
                             type="text"
                             name="ho_ten"
                             placeholder="Họ tên (*)" 
                             className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 text-primary-900 placeholder:text-gray-400 font-sans text-[19px] focus:outline-none focus:border-gold-500 transition-colors"
                             required 
                          />
                          <input 
                             type="tel"
                             name="dien_thoai"
                             placeholder="Điện thoại (*)" 
                             className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 text-primary-900 placeholder:text-gray-400 font-sans text-[19px] focus:outline-none focus:border-gold-500 transition-colors"
                             required 
                          />
                          <input 
                             type="email"
                             name="email"
                             placeholder="Email (*)" 
                             className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 text-primary-900 placeholder:text-gray-400 font-sans text-[19px] focus:outline-none focus:border-gold-500 transition-colors"
                             required 
                          />
                          <input 
                             type="text"
                             name="loi_nhan"
                             placeholder="Lời nhắn" 
                             className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 text-primary-900 placeholder:text-gray-400 font-sans text-[19px] focus:outline-none focus:border-gold-500 transition-colors"
                          />
                          <div className="flex justify-center mt-6">
                             <button type="submit" className="flex items-center justify-center gap-2 px-3 sm:px-4 md:px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full transition-all hover:scale-105 uppercase text-[14px] sm:text-[16px] md:text-[19px] shadow-lg hover:shadow-xl w-full md:w-auto mx-auto md:mx-0 whitespace-nowrap overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Gửi thông tin
                             </button>
                          </div>
                       </form>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
         <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 justify-between">
            <div className="md:col-span-4 xl:pr-8">
               <div className="flex items-center gap-3 mb-6">
                 <img src="/logo-phuoc-an.png" alt="Phước An Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
                 <span className="font-sans text-lg md:text-xl font-bold text-white tracking-tight">PHƯỚC AN NEW TOWN</span>
               </div>
               <p className="font-sans text-[19px] text-justify">Khu phố mới tiện nghi – hiện đại – bền vững. Kiến tạo chuẩn sống mới hài hòa không gian sinh thái sông Tiên.</p>
            </div>
            <div className="md:col-span-5 xl:px-8">
               <h4 className="text-white font-bold uppercase mb-6 text-lg">Liên Hệ</h4>
               <ul className="space-y-4 text-sm">
                 <li className="font-bold text-white mb-2 text-[16px]">CÔNG TY TNHH ĐẦU TƯ VÀ SÀN GIAO DỊCH BĐS THT HOME</li>
                 <li>
                   <a href="https://maps.app.goo.gl/aY5vuE1vjQmeF8kaA" target="_blank" rel="noreferrer" className="flex gap-3 text-[16px] hover:text-gold-400 transition-colors items-start">
                     <MapPin className="w-6 h-6 text-gold-500 shrink-0" /> Thị trấn Tiên Kỳ, Tiên Phước, TP.Đà Nẵng
                   </a>
                 </li>
                 <li>
                   <a href="tel:0935352888" className="flex gap-3 text-[16px] hover:text-gold-400 transition-colors items-start">
                     <Phone className="w-6 h-6 text-gold-500 shrink-0" /> Hotline: 0935.352.888
                   </a>
                 </li>
               </ul>
            </div>
            <div className="md:col-span-3 lg:pl-12 xl:pl-16">
               <h4 className="text-white font-bold uppercase mb-6 text-lg">Chính Sách</h4>
               <ul className="space-y-4 text-[16px]">
                 <li><a href="#" className="hover:text-gold-400 transition-colors">Bảo mật thông tin</a></li>
                 <li><a href="#" className="hover:text-gold-400 transition-colors">Điều khoản dịch vụ</a></li>
                 <li><a href="#" className="hover:text-gold-400 transition-colors">Giấy phép kinh doanh</a></li>
               </ul>
            </div>
         </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
         <a href="https://zalo.me/0935352888" target="_blank" rel="noreferrer" className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 transition-transform hover:scale-110 relative group">
            <span className="font-bold text-xl">Zalo</span>
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1 rounded hidden group-hover:block whitespace-nowrap shadow uppercase text-xs font-bold font-sans">Chat Zalo ngay</span>
         </a>
         <a href="tel:0935352888" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 relative group animate-bounce">
            <Phone className="w-6 h-6" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1 rounded hidden group-hover:block whitespace-nowrap shadow uppercase text-xs font-bold font-sans">Gọi Hotline ngay</span>
         </a>
      </div>
    </div>
  );
}

