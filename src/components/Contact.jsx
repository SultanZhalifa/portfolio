import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck, FiCopy, FiFileText, FiLoader, FiMessageSquare } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import { data } from '../data';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contacts = [
  { Icon: FiMail,          label: 'Email',    value: data.email,                     href: `mailto:${data.email}`,                     copyable: true  },
  { Icon: FiMessageSquare, label: 'WhatsApp', value: `${data.phone} (Direct Chat)`,  href: 'https://wa.me/6285694229552',              copyable: true  },
  { Icon: FiPhone,         label: 'Phone',    value: data.phone,                     href: `tel:${data.phone.replace(/\s+/g, '')}`,    copyable: true  },
  { Icon: FiGithub,        label: 'GitHub',   value: 'github.com/SultanZhalifa',     href: data.github,                                copyable: false },
  { Icon: FiLinkedin,      label: 'LinkedIn', value: 'in/sultanzhalifunnasmusyaffa', href: data.linkedin,                              copyable: false },
  { Icon: FiMapPin,        label: 'Location', value: data.location,                  href: null,                                       copyable: false },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [copied, setCopied]   = useState(null);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); };
  }, []);

  const copyToClipboard = useCallback((value, label) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(null), 2200);
    });
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    
    setLoading(true);
    setError('');

    // If EmailJS env credentials are not configured, fallback gracefully
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setTimeout(() => {
        setSent(true);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      setError('Message delivery failed. Please send an email directly to sultanzhalifunnasmusyaffa@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information and Inquiries"
      className="section"
      ref={ref}
      style={{
        borderTop: '1px solid #181818',
        background: '#020202',
        zIndex: 1,
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header */}
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
          <p className="section-sub">Open to internship opportunities, full-stack & AI engineering roles, and technical collaborations.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Direct Links Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {/* CV Download / View Card */}
            <a
              href="/Sultan_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="contact-item contact-item-link"
              style={{ borderColor: '#222222', background: '#090909' }}
            >
              <div className="contact-icon-box"><FiFileText size={14} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#707070', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Curriculum Vitae</div>
                <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>Download Sultan_CV.pdf</div>
              </div>
            </a>

            {/* Contacts list */}
            {contacts.map(({ Icon, label, value, href, copyable }) => (
              <div key={label} style={{ position: 'relative' }}>
                {href ? (
                  <>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      id={`contact-${label.toLowerCase()}-link`}
                      className="contact-item contact-item-link"
                      style={copyable ? { paddingRight: '48px' } : undefined}
                    >
                      <div className="contact-icon-box"><Icon size={14} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#666666', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontSize: '0.84rem', color: '#b0b0b0', overflowWrap: 'break-word' }}>{value}</div>
                      </div>
                    </a>
                    {copyable && (
                      <button
                        onClick={() => copyToClipboard(value, label)}
                        title={`Copy ${label} to clipboard`}
                        aria-label={`Copy ${label} to clipboard`}
                        className="contact-copy-btn"
                        style={{ color: copied === label ? '#ffffff' : '#555555' }}
                      >
                        {copied === label ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                            <FiCheck size={13} />
                          </span>
                        ) : (
                          <FiCopy size={13} />
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="contact-item">
                    <div className="contact-icon-box"><Icon size={14} /></div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#666666', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
                      <div style={{ fontSize: '0.84rem', color: '#888888' }}>{value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Interactive Contact Form Column */}
          <motion.div
            className="card contact-form-card"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: ' clamp(32px, 6vh, 48px) 0' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid #333333',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#ffffff',
                  background: '#111111',
                }}>
                  <FiCheck size={22} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#ffffff',
                }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: '#888888', fontSize: '0.88rem', maxWidth: '320px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="btn btn-ghost"
                  style={{ padding: '8px 18px', fontSize: '0.78rem' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form" noValidate>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-name" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Sultan Zhalifunnas"
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-email" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="contact-message" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Let's discuss an internship opportunity or software project..."
                    rows={5}
                    className="input-field"
                    style={{ resize: 'vertical', minHeight: '110px' }}
                  />
                </div>

                {error && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginBottom: '14px', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '0.88rem' }}
                  disabled={loading}
                >
                  {loading ? (
                    <><FiLoader className="animate-spin" size={15} /> <span>Sending...</span></>
                  ) : (
                    <><FiSend size={13} /> <span>Send Message</span></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: clamp(28px, 4.5vw, 48px);
          align-items: start;
        }
        .contact-form-card {
          padding: clamp(20px, 3.5vw, 36px);
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid #181818;
          border-radius: 10px;
          background: #060606;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .contact-item-link {
          text-decoration: none;
          cursor: pointer;
        }
        .contact-item-link:hover {
          border-color: #303030;
          background: #0d0d0d;
          transform: translateY(-1px);
        }
        .contact-icon-box {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #202020;
          border-radius: 8px;
          color: #888888;
          flex-shrink: 0;
          background: #090909;
        }
        .contact-copy-btn {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          background: #111111;
          border: 1px solid #222222;
          border-radius: 6px;
          cursor: pointer;
          padding: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .contact-copy-btn:hover {
          border-color: #444444;
          background: #181818;
        }

        @media (max-width: 480px) {
          .contact-item { padding: 12px 14px; }
        }
      `}</style>
    </section>
  );
}

