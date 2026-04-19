import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Users, Compass, ExternalLink, 
  ChevronRight, Library, MonitorPlay, Home, Dumbbell, 
  Award, ArrowRight, UserCheck, CheckCircle, Mail, MapPin, Phone
} from "lucide-react";

import { LiquidGlass } from "./ui/liquid-glass";
import { GlassCard } from "./ui/glass-card";
import { GlassButton } from "./ui/glass-button";
import { GlassDock, GlassDockItem } from "./ui/glass-dock";

const FADE_UP = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Demo() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formState, setFormState] = useState({ loading: false, success: false, error: false });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setFormState({ loading: true, success: false, error: false });

    // Replace this URL with your Google Apps Script Web App URL
    // Documentation: https://github.com/jamiewilson/form-to-google-sheets
    const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx32y-pp28DNjBDVy6t9HrBVYLzyMgB6EWSl4YY2cXNANGShotXCx4fAGXB3rbcwrt9/exec";

    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      // For demonstration purposes, we'll simulate a success after 1.5 seconds if URL is empty
      setTimeout(() => {
        setFormState({ loading: false, success: true, error: false });
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 1500);
      return;
    }

    try {
      // Use URLSearchParams for reliable data transfer to Google Apps Script 'e.parameter'
      const searchParams = new URLSearchParams();
      searchParams.append('name', formData.name);
      searchParams.append('email', formData.email);
      searchParams.append('phone', formData.phone);
      searchParams.append('message', formData.message);

      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        body: searchParams,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      setFormState({ loading: false, success: true, error: false });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form", error);
      setFormState({ loading: false, success: false, error: true });
    }
  };

  return (
    <LiquidGlass imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3">
      
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 w-full z-50 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white tracking-widest uppercase">Aura Institute</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/80 font-medium tracking-wide">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#courses" className="hover:text-white transition-colors">Courses</a>
            <a href="#facilities" className="hover:text-white transition-colors">Facilities</a>
            <a href="#admission" className="hover:text-white transition-colors">Admission</a>
          </div>
          <GlassButton className="px-6 py-2 text-sm hidden md:flex">Apply Now</GlassButton>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-40 pb-32 flex flex-col gap-32">
        
        {/* 1. Hero Section */}
        <motion.section 
          id="hero"
          className="min-h-[70vh] flex flex-col justify-center items-center text-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP} className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm text-sm font-medium mb-4">
            Admissions Open 2026-2027
          </motion.div>
          <motion.h1 variants={FADE_UP} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-tight">
            Empowering <br /> Future Leaders
          </motion.h1>
          <motion.p variants={FADE_UP} className="text-lg md:text-xl text-white/70 max-w-2xl font-light">
            Experience world-class education with cutting-edge facilities, industry-aligned curriculum, and a vibrant canvas of life at Aura Institute of Technology and Sciences.
          </motion.p>
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 mt-4">
            <GlassButton className="px-10 py-4 text-base gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </GlassButton>
            <GlassButton className="px-10 py-4 text-base bg-transparent border-white/30 hover:bg-white/5">
              Explore Campus
            </GlassButton>
          </motion.div>
        </motion.section>

        {/* 2. About Section */}
        <motion.section id="about" className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="text-center mb-16">
            <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-4">About the Institute</motion.h2>
            <motion.p variants={FADE_UP} className="text-white/60 max-w-2xl mx-auto">A legacy of excellence, rooted in values and driven by futuristic vision.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={FADE_UP}>
              <GlassCard className="h-full p-8 flex flex-col justify-center gap-6">
                <div className="h-14 w-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Compass className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
                <p className="text-white/70 leading-relaxed font-light">
                  To provide an environment of rigorous academic pursuit, fostering innovation, leadership, and ethical values to create global professionals ready to tackle tomorrow's challenges.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div variants={FADE_UP}>
              <GlassCard className="h-full p-8 flex flex-col justify-center gap-6">
                <div className="h-14 w-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Award className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
                <p className="text-white/70 leading-relaxed font-light">
                  To be recognized globally for excellence in education, research, and holistic development of individuals, bridging the gap between academia and industry.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* 3. Courses */}
        <motion.section id="courses" className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-4">Academic Programs</motion.h2>
              <motion.p variants={FADE_UP} className="text-white/60 max-w-xl">Curriculum designed by industry experts to ensure complete readiness.</motion.p>
            </div>
            <motion.div variants={FADE_UP} className="hidden md:block">
              <GlassButton className="px-6 py-2 text-sm bg-transparent hover:bg-white/10">View All Programs</GlassButton>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Engineering & Tech", icon: MonitorPlay, desc: "B.Tech, M.Tech across innovative disciplines." },
              { title: "Commerce & Mgmt", icon: Users, desc: "MBA, BBA with focus on global business strategies." },
              { title: "Applied Sciences", icon: BookOpen, desc: "B.Sc, M.Sc focusing on deep research & innovation." }
            ].map((course, idx) => (
              <motion.div key={idx} variants={FADE_UP}>
                <GlassCard className="p-8 group cursor-pointer h-full">
                  <course.icon className="w-10 h-10 text-white/80 group-hover:text-white mb-6 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{course.desc}</p>
                  <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white">
                    Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. Statistics (Bonus) */}
        <motion.section 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
        >
          {[
            { label: "Students", value: "5000+" },
            { label: "Placements", value: "95%" },
            { label: "Faculty", value: "250+" },
            { label: "Global Partners", value: "40+" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={FADE_UP} className="text-center">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-white/50 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* 5. Facilities */}
        <motion.section id="facilities" className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="text-center mb-16">
            <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-4">Campus Facilities</motion.h2>
            <motion.p variants={FADE_UP} className="text-white/60 max-w-2xl mx-auto">A vibrant ecosystem designed to nurture your academic and personal growth.</motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Library, label: "Digital Library" },
              { icon: MonitorPlay, label: "Advanced Labs" },
              { icon: Home, label: "Comfortable Hostels" },
              { icon: Dumbbell, label: "Sports Complex" }
            ].map((facility, idx) => (
              <motion.div key={idx} variants={FADE_UP}>
                <GlassCard className="aspect-square flex flex-col items-center justify-center gap-4 text-center p-4">
                  <facility.icon className="w-12 h-12 text-white/80" />
                  <span className="text-white font-medium">{facility.label}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. Campus Gallery (Bonus) */}
        <motion.section className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="text-center mb-16">
            <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-4">Life at Aura</motion.h2>
            <motion.p variants={FADE_UP} className="text-white/60 max-w-2xl mx-auto">Capturing the vibrant moments and memories of our campus community.</motion.p>
          </div>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1498243639359-2830a679cf11?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=600"
            ].map((url, idx) => (
              <motion.div key={idx} variants={FADE_UP} className="break-inside-avoid">
                <GlassCard className="p-0 overflow-hidden border-none group">
                  <img src={url} alt="Campus" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="text-white w-6 h-6" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. Admission Section */}
        <motion.section id="admission" className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <GlassCard className="p-12 overflow-hidden relative">
            {/* Background flourish inside the card */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">Admission Process</motion.h2>
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-white/20" />
                
                {[
                  { step: "01", icon: UserCheck, title: "Apply Online", desc: "Fill the application form with your details." },
                  { step: "02", icon: CheckCircle, title: "Verification", desc: "Upload docs and pass the entrance test." },
                  { step: "03", icon: Award, title: "Confirmation", desc: "Pay the fee and secure your admission." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={FADE_UP} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#111827] border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center text-xl font-bold text-white/50 mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm max-w-[200px]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={FADE_UP} className="mt-16 flex justify-center">
                <GlassButton className="px-12 py-4">Start Application</GlassButton>
              </motion.div>
            </div>
          </GlassCard>
        </motion.section>

        {/* 6. Testimonials */}
        <motion.section className="pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="text-center mb-16">
            <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-white mb-4">Student Voices</motion.h2>
            <motion.p variants={FADE_UP} className="text-white/60 max-w-2xl mx-auto">Hear from our students who have transformed their careers.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Sarah Jenkins", course: "B.Tech Computer Science", text: "The faculty and the lab facilities at Aura are unparalleled. I got placed in a top MNC before my final semester." },
              { name: "Michael Chang", course: "MBA International Business", text: "The holistic environment and global exposure helped me shape my entrepreneurial journey right from the campus." }
            ].map((review, idx) => (
              <motion.div key={idx} variants={FADE_UP}>
                <GlassCard className="p-8 h-full flex flex-col justify-between gap-6">
                  <div className="text-white/80 italic font-light leading-relaxed">
                    "{review.text}"
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <span className="text-white/50 text-sm">{review.course}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. Contact Form */}
        <motion.section id="contact" className="pt-20 pb-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
          <div className="grid md:grid-cols-5 gap-10">
            <motion.div variants={FADE_UP} className="md:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-white/60">Have questions about admissions or campus? We are here to help.</p>
              </div>
              <div className="flex flex-col gap-6 text-white/80">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                  <div><p className="text-sm text-white/50">Call Us</p><p className="font-medium">+1 (555) 123-4567</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                  <div><p className="text-sm text-white/50">Email Us</p><p className="font-medium">admissions@aura.edu</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
                  <div><p className="text-sm text-white/50">Visit Us</p><p className="font-medium">123 Education Boulevard, NY</p></div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={FADE_UP} className="md:col-span-3">
              <GlassCard className="p-8 relative overflow-hidden">
                {/* Success Overlay */}
                {formState.success && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-8 max-w-xs">Thank you for reaching out. Our admissions team will contact you shortly.</p>
                    <GlassButton onClick={() => setFormState({ ...formState, success: false })} className="px-8 py-2 text-sm">
                      Send another
                    </GlassButton>
                  </motion.div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                  {formState.error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
                      Failed to send message. Please try again later.
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/70 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/70 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors" 
                      placeholder="+1 (555) 000-0000" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70 ml-1">Message</label>
                    <textarea 
                      required 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none" 
                      placeholder="I would like to know more about..." 
                    />
                  </div>
                  <GlassButton type="submit" className="w-full py-4 mt-2" disabled={formState.loading}>
                    {formState.loading ? "Sending..." : "Send Message"}
                  </GlassButton>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

      </main>

      {/* 8. Footer */}
      <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md pt-16 pb-24 px-6 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-white pb-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-6 w-6 text-white" />
              <span className="text-lg font-bold tracking-widest uppercase">Aura Institute</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Shaping minds and building the future. Empowering leaders of tomorrow through innovation and ethics.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2">Academics</h4>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Engineering</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Management</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Sciences</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Research</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2">Useful Links</h4>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">About Us</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Careers</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Alumni</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Contact</a>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-bold mb-2">Newsletter</h4>
            <p className="text-white/50 text-sm">Subscribe to get latest updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email here" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50" />
              <GlassButton className="px-4 py-2 !rounded-lg text-sm">GO</GlassButton>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-white/40 text-xs pt-8">
          <p>&copy; {new Date().getFullYear()} Aura Institute. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Glass Dock (Mobile & Desktop quick access) */}
      <GlassDock>
        <GlassDockItem href="#hero" title="Home">
          <Home className="w-5 h-5 mx-2" />
        </GlassDockItem>
        <GlassDockItem href="#courses" title="Programs">
          <BookOpen className="w-5 h-5 mx-2" />
        </GlassDockItem>
        <GlassDockItem href="#admission" title="Admissions">
          <Award className="w-5 h-5 mx-2" />
        </GlassDockItem>
        <GlassDockItem href="#contact" title="Contact">
          <Mail className="w-5 h-5 mx-2" />
        </GlassDockItem>
      </GlassDock>

    </LiquidGlass>
  );
}
