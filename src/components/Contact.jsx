import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import { data } from '../data';

// EmailJS config — replace with your actual IDs from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_lnabd9c';
const EMAILJS_TEMPLATE_ID = 'template_8dm3f7k';
const EMAILJS_PUBLIC_KEY  = '8azyJj6BjhDONY1Hp';

const contacts = [
  { Icon: FiMail,     label: 'Email',    value: data.email,                         href: `mailto:${data.email}` },
  { Icon: FiPhone,    label: 'Phone',    value: data.phone,                         href: `tel:${data.phone}` },
  { Icon: FiGithub,   label: 'GitHub',   value: 'github.com/SultanZhalifa',         href: data.github },
  { Icon: FiLinkedin, label: 'LinkedIn', value: 'in/sultanzhalifunnasmusyaffa',     href: data.linkedin },
  { Icon: FiMapPin,   label: 'Location', value: data.location,                      href: null },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      setError('Failed to send. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid #111', background: '#030303', zIndex: 1, position: 'relative' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-number">06</span>
            <span className="section-label">Get In Touch</span>
          </div>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-sub">Open to internship opportunities and project collaborations. Drop a message or reach out directly.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
          >
            {contacts.map(({ Icon, label, value, href }) => (
              <div key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    id={`contact-${label.toLowerCase()}-link`}
                    className="contact-item contact-item-link"
                  >
                    <div className="contact-icon-box">
                      <Icon size={12} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
                        color: '#2a2a2a', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '2px',
                      }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#555' }}>{value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="contact-item">
                    <div className="contact-icon-box">
                      <Icon size={12} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
                        color: '#2a2a2a', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '2px',
                      }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#444' }}>{value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Form column */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ padding: '32px' }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '56px 0' }}>
                <div style={{
                  width: '44px', height: '44px', border: '1px solid #2a2a2a',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 20px', color: '#aaa',
                }}>
                  <FiCheck size={18} />
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk', fontSize: '1rem',
                  fontWeight: 700, marginBottom: '8px', color: '#ddd',
                }}>
                  Message Sent
                </h3>
                <p style={{ color: '#444', fontSize: '0.85rem' }}>
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                {[
                  { id: 'contact-name',    name: 'name',    type: 'text',  label: 'Name',    placeholder: 'Your name' },
                  { id: 'contact-email',   name: 'email',   type: 'email', label: 'Email',   placeholder: 'your@email.com' },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
                      color: '#333', letterSpacing: '0.1em',
                      textTransform: 'uppercase', marginBottom: '8px',
                    }}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      required
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="input-field"
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
                    color: '#333', letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: '8px',
                  }}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    rows={5}
                    className="input-field"
                    style={{ resize: 'vertical', minHeight: '110px' }}
                  />
                </div>

                {error && (
                  <p style={{ color: '#555', fontSize: '0.78rem', marginBottom: '14px', fontFamily: 'JetBrains Mono' }}>
                    {error}
                  </p>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : <><FiSend size={12} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 48px;
          align-items: start;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid #131313;
          border-radius: 8px;
          background: #060606;
          transition: border-color 0.2s, background 0.2s;
        }
        .contact-item-link {
          text-decoration: none;
          cursor: pointer;
        }
        .contact-item-link:hover {
          border-color: #242424;
          background: #0c0c0c;
        }
        .contact-icon-box {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #1c1c1c; border-radius: 6px;
          color: #333; flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .contact-grid { gap: 32px; }
        }
      `}</style>
    </section>
  );
}
