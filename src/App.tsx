import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// Types & Data
// ============================================================================

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

interface ProblemCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface BenefitCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface MethodologyStep {
  id: number;
  title: string;
  description: string;
}

interface SuccessCase {
  id: number;
  name: string;
  before: string;
  after: string;
  result: string;
}

interface ModuleItem {
  id: number;
  title: string;
  content: string;
  duration: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const statsData: StatItem[] = [
  { value: 12, label: "Years of Experience", suffix: "+" },
  { value: 150, label: "Businesses Launched", suffix: "+" },
  { value: 2500, label: "Students Mentored", suffix: "+" },
  { value: 800, label: "Consultations", suffix: "+" },
];

const problems: ProblemCard[] = [
  {
    id: 1,
    title: "Don't know which business to start",
    description: "Analysis paralysis stops you from taking the first step.",
    icon: "🎯",
  },
  {
    id: 2,
    title: "Fear of losing money",
    description: "Risk management seems overwhelming without a clear plan.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Lack of customers",
    description: "Struggling to find your first paying clients.",
    icon: "👥",
  },
  {
    id: 4,
    title: "No business plan",
    description: "Operating without a clear roadmap to success.",
    icon: "📋",
  },
  {
    id: 5,
    title: "No marketing strategy",
    description: "Random efforts with no measurable results.",
    icon: "📢",
  },
  {
    id: 6,
    title: "Team building challenges",
    description: "Finding and managing the right people.",
    icon: "🤝",
  },
];

const benefits: BenefitCard[] = [
  {
    id: 1,
    title: "Market Analysis",
    description: "Deep dive into regional opportunities and gaps.",
    icon: "📊",
  },
  {
    id: 2,
    title: "Business Model Creation",
    description: "Proven frameworks that generate profit from day one.",
    icon: "🏗️",
  },
  {
    id: 3,
    title: "Financial Planning",
    description: "Budgeting, pricing, and cash flow strategies.",
    icon: "💎",
  },
  {
    id: 4,
    title: "Customer Acquisition",
    description: "Systems to attract and convert your ideal clients.",
    icon: "🎯",
  },
  {
    id: 5,
    title: "Sales Systems",
    description: "Repeatable processes that close deals consistently.",
    icon: "🔄",
  },
  {
    id: 6,
    title: "Business Scaling",
    description: "From solo operation to scalable enterprise.",
    icon: "📈",
  },
];

const methodologySteps: MethodologyStep[] = [
  {
    id: 1,
    title: "Niche Selection",
    description: "Identify profitable niches with your unique advantage.",
  },
  {
    id: 2,
    title: "Market Research",
    description: "Validate demand and understand your competitors.",
  },
  {
    id: 3,
    title: "Financial Planning",
    description: "Build sustainable financial models and funding strategies.",
  },
  {
    id: 4,
    title: "Launch Strategy",
    description: "Execute a powerful market entry with minimal risk.",
  },
  {
    id: 5,
    title: "Sales System",
    description: "Automate and optimize your sales funnel for growth.",
  },
  {
    id: 6,
    title: "Business Growth",
    description: "Scale operations, build teams, and expand regionally.",
  },
];

const successCases: SuccessCase[] = [
  {
    id: 1,
    name: "Алексей Иванов",
    before: "Started with zero clients",
    after: "Owns a digital agency with 20+ staff",
    result: "Revenue increased by 340%",
  },
  {
    id: 2,
    name: "Мария Петрова",
    before: "Struggling local bakery",
    after: "3 locations and regional franchise",
    result: "Monthly profit $45k+",
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    before: "Freelance designer",
    after: "Productized service with subscription model",
    result: "MRR $32k in 8 months",
  },
  {
    id: 4,
    name: "Екатерина Волкова",
    before: "No business experience",
    after: "Online education platform owner",
    result: "2,500+ students enrolled",
  },
];

const modules: ModuleItem[] = [
  {
    id: 1,
    title: "Module 1: Entrepreneurial Mindset",
    content:
      "Develop the psychology of a successful entrepreneur, overcome fears, and build resilience.",
    duration: "2 weeks",
  },
  {
    id: 2,
    title: "Module 2: Idea Validation",
    content:
      "Learn how to test business ideas before investing money. Customer discovery and lean methodology.",
    duration: "3 weeks",
  },
  {
    id: 3,
    title: "Module 3: Business Model & Finance",
    content:
      "Create a profitable business model, pricing strategies, and financial projections.",
    duration: "2 weeks",
  },
  {
    id: 4,
    title: "Module 4: Marketing & Sales",
    content:
      "Customer acquisition channels, sales funnels, and closing techniques for local business.",
    duration: "3 weeks",
  },
  {
    id: 5,
    title: "Module 5: Operations & Team",
    content:
      "Build systems, hire the right people, and manage daily operations efficiently.",
    duration: "2 weeks",
  },
  {
    id: 6,
    title: "Module 6: Scaling & Exit",
    content:
      "Strategies to scale regionally, raise capital, and plan your exit.",
    duration: "2 weeks",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Игорь Морозов",
    role: "Founder of SmartSolutions",
    text: "The mentorship completely transformed my approach. Within 6 months, I launched a profitable business and never looked back.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Анна Ковальчук",
    role: "CEO at EcoLife",
    text: "Best investment I ever made. The framework is practical and works in our region. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Сергей Павлов",
    role: "Owner of AutoMaster",
    text: "I went from losing money to scaling 3 branches. The support and systems are unmatched.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Ольга Сидорова",
    role: "Director at BeautyGroup",
    text: "Real, actionable advice. The accountability and network access changed everything for me.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Is this program suitable for complete beginners?",
    answer:
      "Absolutely. The program is designed specifically for those starting from scratch. We cover everything from mindset to first sales.",
  },
  {
    id: 2,
    question: "How long does the training last?",
    answer:
      "The core program is 14 weeks, with ongoing support and access to all materials for 12 months.",
  },
  {
    id: 3,
    question: "Do I need startup capital?",
    answer:
      "Many of our students started with less than $500. We teach you how to bootstrap and use lean methods.",
  },
  {
    id: 4,
    question: "Is there personal support from the mentor?",
    answer:
      "Yes, you'll have weekly group coaching calls and direct messaging access to the mentor.",
  },
  {
    id: 5,
    question: "Are installment payments available?",
    answer:
      "Yes, we offer flexible payment plans. Contact us for more details.",
  },
];

const partnerLogos = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "InnovateHub" },
  { id: 3, name: "RegionalBiz" },
  { id: 4, name: "StartupGrind" },
  { id: 5, name: "GrowthMinds" },
  { id: 6, name: "VentureLab" },
  { id: 7, name: "BizNetwork" },
  { id: 8, name: "ScaleUp" },
];

// ============================================================================
// 3D Background Component (React Three Fiber)
// ============================================================================

const ThreeBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.15) * 0.3;
    }
  });

  return (
    <div className="fixed inset-0 -z-10 w-full h-full opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-5, 0, 2]} intensity={0.5} color="#ffd700" />
        <Sphere
          ref={meshRef}
          args={[1.5, 64, 64]}
          position={[0, 0, 0]}
          scale={2.5}
        >
          <MeshDistortMaterial
            color="#b8860b"
            emissive="#ffd700"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

// ============================================================================
// Utility Components
// ============================================================================

const Counter: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
}> = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Marquee: React.FC<{
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}> = ({ children, direction = "left", speed = 20 }) => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {children}
        <span className="ml-16">{children}</span>
      </motion.div>
    </div>
  );
};

const SectionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = "", id }) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-4 md:px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
};

const SectionTitle: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
}> = ({ children, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gold-400 bg-clip-text text-transparent"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

// ============================================================================
// Header Component
// ============================================================================

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Program", href: "#program" },
    { name: "Cases", href: "#cases" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contacts", href: "#contacts" },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-amber-600 bg-clip-text text-transparent"
        >
          BUSINESS<span className="text-white">EDGE</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-gold-500 to-amber-600 text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-gold-500/30 transition-all"
        >
          Start Journey
        </motion.button>
      </div>
    </motion.header>
  );
};

// ============================================================================
// Hero Section
// ============================================================================

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <ThreeBackground />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/70 -z-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <SectionWrapper className="relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm mb-6">
            #1 Business Mentor in the Region
          </span>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto">
            Turn Your Business Idea into a{" "}
            <span className="bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent">
              Profitable Reality
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-6">
            From zero to scaling: Proven systems by a serial entrepreneur who
            built 7 companies from the ground up.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-gold-500 to-amber-600 text-black font-bold px-8 py-4 rounded-full text-lg shadow-xl"
            >
              Enroll Now →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-gold-500 text-gold-400 font-semibold px-8 py-4 rounded-full backdrop-blur-sm hover:bg-gold-500/10"
            >
              Watch Free Masterclass
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold-400">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

// ============================================================================
// Social Proof Section (Marquee)
// ============================================================================

const SocialProofSection: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-black to-gray-900 border-y border-white/10 overflow-hidden">
      <p className="text-center text-gray-400 text-sm mb-6">
        Trusted by entrepreneurs from 50+ cities
      </p>
      <Marquee direction="left" speed={25}>
        <div className="flex gap-16 items-center">
          {partnerLogos.map((logo) => (
            <div
              key={logo.id}
              className="text-white/40 text-xl font-semibold tracking-wider"
            >
              {logo.name}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

// ============================================================================
// About Section
// ============================================================================

const AboutSection: React.FC = () => {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gold-500/20 rounded-2xl blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop"
            alt="Mentor portrait"
            className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-gold-400 font-semibold tracking-wide">
            ABOUT THE MENTOR
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">
            Serial Entrepreneur & Regional Business Architect
          </h3>
          <p className="text-gray-300 leading-relaxed">
            With over 12 years of experience building and scaling companies
            across retail, tech, and services, I've generated over $50M in
            revenue and created 500+ jobs in the region. My mission is to help
            aspiring entrepreneurs skip the costly mistakes and build
            sustainable businesses that thrive.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border-l-4 border-gold-500 pl-4">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-gray-400">Successful Companies</div>
            </div>
            <div className="border-l-4 border-gold-500 pl-4">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Jobs Created</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Problems Section
// ============================================================================

const ProblemsSection: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionWrapper>
      <SectionTitle subtitle="Common struggles holding you back">
        The Real Problems
      </SectionTitle>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-gold-500/50 transition-all"
          >
            <div className="text-4xl mb-4">{problem.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {problem.title}
            </h3>
            <p className="text-gray-400">{problem.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ============================================================================
// Benefits Section
// ============================================================================

const BenefitsSection: React.FC = () => {
  return (
    <SectionWrapper className="bg-gradient-to-b from-black to-gray-900 rounded-3xl my-8">
      <SectionTitle subtitle="What you'll master">
        Program Benefits
      </SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 rounded-2xl p-6 text-center"
          >
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-gold-400 mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-300">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Methodology Timeline
// ============================================================================

const MethodologySection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle subtitle="Step-by-step framework">
        Proven Methodology
      </SectionTitle>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold-500 to-amber-600" />
        {methodologySteps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-6 mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div className="md:w-1/2 pl-12 md:pl-0">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-gold-400 text-2xl font-bold mb-2">
                  Step {step.id}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-400 mt-2">{step.description}</p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gold-500 border-4 border-black -ml-0.5 mt-2" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Success Cases (Horizontal Scroll)
// ============================================================================

const SuccessCasesSection: React.FC = () => {
  return (
    <SectionWrapper id="cases">
      <SectionTitle subtitle="Real transformation stories">
        Success Cases
      </SectionTitle>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide">
        {successCases.map((caseItem) => (
          <motion.div
            key={caseItem.id}
            whileHover={{ scale: 1.02 }}
            className="min-w-[280px] md:min-w-[380px] snap-start bg-gradient-to-br from-gray-900 to-black border border-gold-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-xl">
                👤
              </div>
              <div>
                <h3 className="font-bold text-lg">{caseItem.name}</h3>
                <p className="text-gray-400 text-sm">Student</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-red-400">Before: {caseItem.before}</p>
              <p className="text-green-400">After: {caseItem.after}</p>
              <p className="text-gold-400 font-bold">{caseItem.result}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Course Accordion
// ============================================================================

const CourseProgramSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <SectionWrapper id="program">
      <SectionTitle subtitle="Detailed curriculum">Course Program</SectionTitle>
      <div className="max-w-3xl mx-auto space-y-4">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
          >
            <button
              onClick={() => setOpenId(openId === module.id ? null : module.id)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <div>
                <div className="text-gold-400 text-sm">{module.duration}</div>
                <h3 className="text-xl font-bold">{module.title}</h3>
              </div>
              <motion.span
                animate={{ rotate: openId === module.id ? 180 : 0 }}
                className="text-2xl"
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {openId === module.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-gray-300 border-t border-white/10 pt-4"
                >
                  {module.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Reviews Carousel
// ============================================================================

const ReviewsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <SectionWrapper id="reviews">
      <SectionTitle subtitle="What students say">Client Reviews</SectionTitle>
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10"
          >
            <img
              src={testimonials[current].image}
              alt=""
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gold-500"
            />
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <span key={i} className="text-gold-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-200 text-lg italic">
              "{testimonials[current].text}"
            </p>
            <h4 className="font-bold text-xl mt-6">
              {testimonials[current].name}
            </h4>
            <p className="text-gold-400">{testimonials[current].role}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="bg-white/10 p-3 rounded-full hover:bg-gold-500/30 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="bg-white/10 p-3 rounded-full hover:bg-gold-500/30 transition"
          >
            →
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// FAQ Accordion
// ============================================================================

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <SectionWrapper>
      <SectionTitle subtitle="Got questions?">
        Frequently Asked Questions
      </SectionTitle>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <motion.div
            key={faq.id}
            className="border border-white/10 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex justify-between p-6 text-left font-semibold text-lg"
            >
              {faq.question}
              <span className="text-gold-400">
                {openId === faq.id ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence>
              {openId === faq.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="px-6 pb-6 text-gray-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================================================
// Final CTA Section
// ============================================================================

const FinalCTASection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you at ${formData.phone}`);
    setFormData({ name: "", phone: "" });
  };

  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-amber-600/10 rounded-3xl blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center p-8 md:p-12 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gold-500/30"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Build Your Empire?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Limited spots available. Get personalized mentorship and proven
          systems.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex-1 px-6 py-3 bg-white/10 rounded-full border border-white/20 focus:border-gold-500 outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="flex-1 px-6 py-3 bg-white/10 rounded-full border border-white/20 focus:border-gold-500 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-gold-500 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition"
          >
            Apply Now →
          </button>
        </form>
      </motion.div>
    </SectionWrapper>
  );
};

// ============================================================================
// Footer
// ============================================================================

const Footer: React.FC = () => {
  return (
    <footer
      id="contacts"
      className="border-t border-white/10 py-12 px-4 bg-black"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold text-gold-400 mb-4">
            BUSINESSEDGE
          </div>
          <p className="text-gray-400">
            Transforming entrepreneurs into regional market leaders.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <p>📞 +7 (999) 123-45-67</p>
            <p>✉️ hello@bizedge.com</p>
            <p>📱 Telegram: @biz_mentor</p>
            <p>💬 WhatsApp: +7 (999) 123-45-67</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Social Media</h4>
          <div className="flex gap-4">
            {["Instagram", "LinkedIn", "YouTube", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-gold-400 transition"
              >
                📱 {social}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-white/10">
        © 2025 BusinessEdge. All rights reserved.
      </div>
    </footer>
  );
};

// ============================================================================
// Main App Component
// ============================================================================

const App: React.FC = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
        <ProblemsSection />
        <BenefitsSection />
        <MethodologySection />
        <SuccessCasesSection />
        <CourseProgramSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
