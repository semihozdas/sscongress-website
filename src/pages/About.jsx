import { motion } from 'framer-motion';
import { Zap, Users, Target } from 'lucide-react';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border)';
const CARD = 'var(--c-bg-alt)';
const MUTED = 'var(--c-muted)';
const f = (d=0) => ({ initial:{opacity:0,y:24}, animate:{opacity:1,y:0}, transition:{duration:0.6,delay:d,ease:[0.22,1,0.36,1]} });

const workflow = [
  { title: 'Büyüme Girişimleri', desc: 'İşletmelerin büyüme yolculuğunu stratejik çözümlerle destekliyor, sürdürülebilir başarıya ulaştırıyoruz.', icon: Zap },
  { title: 'Danışmanlık Hizmetleri', desc: 'Uzman ekibimizle iş kararlarınıza rehberlik ediyor, geleceğe uygun stratejiler geliştiriyoruz.', icon: Users },
  { title: 'Küresel Girişimler', desc: 'Veri odaklı analiz ve yenilikçi yöntemlerle işinizi hızlandırıyor, küresel pazarlara açıyoruz.', icon: Target },
];

const stats = [{ v:'45+', l:'Tamamlanan Proje' }, { v:'$45K+', l:'Ticaret Hacmi' }, { v:'25+', l:'Ülke' }, { v:'200+', l:'Müşteri' }];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor:'var(--c-bg)', minHeight:'100vh', paddingTop:100, paddingBottom:96 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>

        {/* Hero text */}
        <motion.p {...f(0)} style={{ fontSize:11, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:EM, marginBottom:16 }}>Hakkımızda</motion.p>
        <motion.h1 {...f(0.07)} style={{ fontFamily:'Outfit', fontWeight:900, fontSize:'clamp(2.5rem,6vw,4rem)', letterSpacing:'-0.04em', lineHeight:1.05, color: 'var(--c-heading)', marginBottom:24 }}>
          Küresel İş Dünyasında{' '}
          <span style={{ background:'linear-gradient(135deg,#6ee7b7,#10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Güvenilir Yol Arkadaşınız
          </span>
        </motion.h1>
        <motion.p {...f(0.14)} style={{ color:MUTED, fontSize:17, lineHeight:1.75, maxWidth:680, marginBottom:12 }}>
          Uluslararası organizasyonların karmaşık yapısını sadeleştirerek firmalara küresel pazarlarda güvenle ilerleme imkânı sunuyoruz.
        </motion.p>
        <motion.p {...f(0.2)} style={{ color:'var(--c-subtle)', fontSize:15, lineHeight:1.75, maxWidth:680, marginBottom:56 }}>
          Katar'dan Japonya'ya, Rusya'dan Afrika'ya kadar iş forumlarını ve ticaret heyetlerini uçtan uca planlıyor ve yönetiyoruz.
        </motion.p>

        {/* Vision card */}
        <motion.div {...f(0.28)} style={{ padding:'36px 40px', borderRadius:20, border:BORDER, background:CARD, textAlign:'center', marginBottom:72 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:EM, marginBottom:12 }}>Vizyonumuz</p>
          <p style={{ fontFamily:'Outfit', fontSize:'clamp(1.2rem,3vw,1.75rem)', fontWeight:700, color: 'var(--c-heading)', fontStyle:'italic' }}>
            "Dış ticarette güven, her adımda sürdürülebilirlik."
          </p>
        </motion.div>

        {/* Workflow */}
        <motion.p {...f(0.1)} style={{ fontSize:11, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:EM, marginBottom:14, textAlign:'center' }}>İş Sürecimiz</motion.p>
        <motion.h2 {...f(0.16)} style={{ fontFamily:'Outfit', fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.8rem)', letterSpacing:'-0.04em', color: 'var(--c-heading)', textAlign:'center', marginBottom:48 }}>
          Yaklaşımımız
        </motion.h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:72 }} className="about-wf">
          {workflow.map(({ title, desc, icon:Icon }, i) => (
            <motion.div key={i} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.55}}
              whileHover={{ y:-6 }}
              style={{ padding:'28px 24px', borderRadius:16, border:BORDER, background:CARD }}>
              <div style={{ width:44, height:44, borderRadius:11, border:BORDER, background:CARD, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                <Icon size={20} style={{ color:EM }} />
              </div>
              <h3 style={{ fontFamily:'Outfit', fontWeight:700, fontSize:16, color: 'var(--c-heading)', marginBottom:10 }}>{title}</h3>
              <p style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }} className="about-stats">
          {stats.map(({ v, l }, i) => (
            <motion.div key={l} initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.08}}
              style={{ textAlign:'center', padding:'24px 16px', borderRadius:14, border:BORDER, background:CARD }}>
              <div style={{ fontFamily:'Outfit', fontWeight:900, fontSize:28, background:'linear-gradient(135deg,#6ee7b7,#10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--c-subtle)', marginTop:6, textTransform:'uppercase', letterSpacing:'0.12em' }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-wf { grid-template-columns: repeat(3,1fr); }
        .about-stats { grid-template-columns: repeat(4,1fr); }
        @media (max-width: 768px) { .about-wf { grid-template-columns: 1fr !important; } .about-stats { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}
