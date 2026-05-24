import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';
import { data } from '../data';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  const contacts = [
    { Icon: FiMail, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { Icon: FiPhone, label: 'Phone', value: data.phone, href: `tel:${data.phone}` },
    { Icon: FiGithub, label: 'GitHub', value: 'github.com/SultanZhalifa', href: data.github },
    { Icon: FiLinkedin, label: 'LinkedIn', value: 'in/sultanzhalifunnasmusyaffa', href: data.linkedin },
    { Icon: FiMapPin, label: 'Location', value: data.location, href: null },
  ];

  return (
    <section id="contact" className="section" ref={ref}
      style={{ borderTop: '1px solid #111', background: '#040404' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-sub">Looking for internship opportunities or project collaborations. Drop a message.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contacts.map(({ Icon, label, value, href }) => (
                <div key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      id={`contact-${label.toLowerCase()}-link`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
                        border: '1px solid #141414', borderRadius: '8px', textDecoration: 'none',
                        background: '#080808', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.background = '#0f0f0f'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#141414'; e.currentTarget.style.background = '#080808'; }}
                    >
                      <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1c1c1c', borderRadius: '6px', color: '#555', flexShrink: 0 }}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontSize: '0.83rem', color: '#888' }}>{value}</div>
                      </div>
                    </a>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', border: '1px solid #141414', borderRadius: '8px', background: '#080808' }}>
                      <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1c1c1c', borderRadius: '6px', color: '#555', flexShrink: 0 }}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontSize: '0.83rem', color: '#555' }}>{value}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ padding: '32px' }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid #2a2a2a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#fff' }}>
                  <FiCheck size={20} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Message Sent</h3>
                <p style={{ color: '#555', fontSize: '0.88rem' }}>I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Name</label>
                  <input id="contact-name" type="text" name="name" required value={form.name} onChange={handleChange}
                    placeholder="Your name" className="input-field" />
                </div>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Email</label>
                  <input id="contact-email" type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className="input-field" />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Message</label>
                  <textarea id="contact-message" name="message" required value={form.message} onChange={handleChange}
                    placeholder="What would you like to discuss?" rows={5}
                    className="input-field" style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>
                <button id="contact-submit-btn" type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : <><FiSend size={13} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
