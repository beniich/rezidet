import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            CAFM <span className="text-primary">Pro</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">App Demo</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-primary-deep transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="inline-block border border-border bg-surface-soft px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-on-surface-variant mb-8">
              The Future of Facility Management
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-8">
              Build memorable facilities, fast operations, and <span className="text-primary">conversion-focused</span> management.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed font-light">
              CAFM Pro is a strategy, operations, and growth platform. We build powerful tools for companies that want to scale their facility operations without becoming generic.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="bg-primary text-primary-foreground px-8 py-4 rounded-sm text-base font-semibold hover:bg-primary-deep transition-colors flex items-center justify-center gap-2">
                Explore Platform <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <a href="#contact" className="border border-border bg-surface px-8 py-4 rounded-sm text-base font-semibold hover:bg-surface-soft transition-colors flex items-center justify-center">
                Book Free Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services/Features Grid */}
      <section id="features" className="py-32 px-6 bg-surface-dark border-t border-border/30">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20"
          >
            <h2 className="text-xs font-medium tracking-[0.2em] text-on-dark-mute uppercase mb-4">What we do</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Tools built to move the needle.</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Operational Strategy",
                desc: "Positioning, messaging, and operational frameworks rooted in what your team actually needs to execute.",
                icon: "strategy"
              },
              {
                title: "Asset Management",
                desc: "Lifecycle tracking, maintenance history, and predictive alerts built to hold up across every facility touchpoint.",
                icon: "inventory_2"
              },
              {
                title: "Work Orders",
                desc: "Fast, accessible ticketing built on modern stacks, designed to resolve issues in record time.",
                icon: "build"
              },
              {
                title: "Energy & Sustainability",
                desc: "Data-driven insights to reduce your carbon footprint and optimize energy consumption across the board.",
                icon: "eco"
              },
              {
                title: "Space Optimization",
                desc: "Live floor plans and occupancy tracking to ensure your real estate is utilized to its maximum potential.",
                icon: "meeting_room"
              },
              {
                title: "Analytics & AI",
                desc: "Technical insights and AI-driven growth strategies that position your operations for measurable results.",
                icon: "analytics"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                }}
                className="bg-surface-soft border border-border/50 p-10 rounded-sm hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="w-12 h-12 bg-surface-deep border border-border/50 rounded-sm flex items-center justify-center mb-8 text-primary">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section id="process" className="py-32 px-6 bg-surface-deep">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-xs font-medium tracking-[0.2em] text-on-dark-mute uppercase mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How we deploy CAFM Pro.</h3>
            <p className="text-on-surface-variant font-light">A streamlined onboarding process designed to integrate with your existing infrastructure seamlessly.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We map your current workflows and identify operational bottlenecks." },
              { step: "02", title: "Strategy", desc: "Our team customizes the CAFM platform to align with your business goals." },
              { step: "03", title: "Deployment", desc: "We launch the system, migrate data, and train your key personnel." },
              { step: "04", title: "Growth", desc: "Ongoing analytics, predictive maintenance, and continuous optimization." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-border mb-6 tracking-tighter">{item.step}</div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
                {i !== 3 && <div className="hidden md:block absolute top-10 -right-4 w-8 h-[1px] bg-border"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
          >
            Ready to upgrade your facility operations?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto font-medium"
          >
            Join industry leaders who trust CAFM Pro for their mission-critical infrastructure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/dashboard" className="bg-background text-foreground px-10 py-5 rounded-sm text-base font-bold hover:bg-surface-soft transition-transform hover:scale-105 inline-flex items-center gap-3 shadow-2xl">
              Start your free trial <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-background border-t border-border pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-bold tracking-tight mb-6 inline-block">
              CAFM <span className="text-primary">Pro</span>
            </Link>
            <p className="text-sm text-on-surface-variant max-w-sm mt-4 font-light leading-relaxed">
              Building memorable brands, fast websites, and conversion-focused digital experiences for companies that want to grow without becoming generic.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-on-dark-mute uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#process" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">Process</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">Our Work</a></li>
              <li><a href="#" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">FAQ</a></li>
              <li><a href="#contact" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-on-dark-mute uppercase mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li><a href="mailto:zatexsols@gmail.com" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">zatexsols@gmail.com</a></li>
              <li><a href="tel:+923025007868" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">+92 302 5007868</a></li>
              <li><a href="tel:+923329121886" className="text-sm text-on-surface-variant hover:text-foreground transition-colors font-light">+92 332 9121886</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
          <p className="text-xs text-on-dark-mute font-light">© 2026 Zatex Sols & CAFM Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-on-dark-mute hover:text-foreground transition-colors font-light">Privacy Policy</a>
            <a href="#" className="text-xs text-on-dark-mute hover:text-foreground transition-colors font-light">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
