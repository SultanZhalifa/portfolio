import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiArrowRight, FiFileText, FiGithub, FiLinkedin,
  FiMail, FiMessageSquare, FiCompass, FiFolder, FiCheck, FiX
} from 'react-icons/fi';
import { data } from '../data';
import { sections } from '../hooks/useActiveSection';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build command items
  const items = useMemo(() => {
    const navItems = sections.map(s => ({
      id: `nav-${s.id}`,
      group: 'Navigation',
      label: s.label,
      sub: `Jump to ${s.label} section`,
      Icon: FiCompass,
      action: () => {
        onClose();
        const el = document.getElementById(s.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    const actionItems = [
      {
        id: 'action-cv',
        group: 'Quick Actions',
        label: 'Download Resume (CV)',
        sub: 'PDF · Sultan Zhalifunnas Musyaffa',
        Icon: FiFileText,
        action: () => {
          onClose();
          window.open('/Sultan_CV.pdf', '_blank');
        },
      },
      {
        id: 'action-email',
        group: 'Quick Actions',
        label: 'Copy Email Address',
        sub: data.email,
        Icon: copied ? FiCheck : FiMail,
        action: () => {
          navigator.clipboard.writeText(data.email).then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              onClose();
            }, 800);
          });
        },
      },
      {
        id: 'action-whatsapp',
        group: 'Quick Actions',
        label: 'Direct WhatsApp Chat',
        sub: `${data.phone} · Instant Message`,
        Icon: FiMessageSquare,
        action: () => {
          onClose();
          window.open(`https://wa.me/${data.phone.replace(/\D/g, '')}`, '_blank');
        },
      },
      {
        id: 'action-github',
        group: 'Quick Actions',
        label: 'Open GitHub Profile',
        sub: 'github.com/SultanZhalifa',
        Icon: FiGithub,
        action: () => {
          onClose();
          window.open(data.github, '_blank');
        },
      },
      {
        id: 'action-linkedin',
        group: 'Quick Actions',
        label: 'Open LinkedIn Profile',
        sub: 'in/sultanzhalifunnasmusyaffa',
        Icon: FiLinkedin,
        action: () => {
          onClose();
          window.open(data.linkedin, '_blank');
        },
      },
    ];

    const projectItems = data.projects.map(p => ({
      id: `project-${p.id}`,
      group: 'Projects',
      label: p.title,
      sub: `${p.subtitle} · ${p.tech.slice(0, 3).join(', ')}`,
      Icon: FiFolder,
      action: () => {
        onClose();
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    return [...actionItems, ...navItems, ...projectItems];
  }, [onClose, copied]);

  // Filter items by query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      item =>
        item.label.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Arrow navigation & Enter execution
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'clamp(20px, 8vh, 80px) 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#0a0a0a',
              border: '1px solid #222222',
              borderRadius: '12px',
              boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.95)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Input Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderBottom: '1px solid #1c1c1c',
            }}>
              <FiSearch size={16} style={{ color: '#777777', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, project, or section..."
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  flex: 1,
                  minWidth: 0,
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                style={{
                  background: 'transparent',
                  border: '1px solid #222222',
                  borderRadius: '4px',
                  color: '#777777',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  cursor: 'pointer',
                }}
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              style={{
                maxHeight: '340px',
                overflowY: 'auto',
                padding: '8px',
              }}
            >
              {filtered.length === 0 ? (
                <div style={{
                  padding: '24px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: '#666666',
                }}>
                  No commands or projects matching "{query}"
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.Icon;

                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '9px 12px',
                        borderRadius: '6px',
                        background: isSelected ? '#151515' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.1s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                        <div style={{
                          color: isSelected ? '#ffffff' : '#777777',
                          display: 'flex',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}>
                          <Icon size={14} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{
                            color: isSelected ? '#ffffff' : '#dddddd',
                            fontSize: '0.82rem',
                            fontWeight: isSelected ? 600 : 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {item.label}
                          </div>
                          <div style={{
                            color: '#666666',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {item.sub}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#555555',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}>
                          {item.group}
                        </span>
                        {isSelected && (
                          <FiArrowRight size={12} style={{ color: '#ffffff' }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Help */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              borderTop: '1px solid #191919',
              background: '#060606',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              color: '#666666',
            }}>
              <span>Use ↑ ↓ to navigate, Enter to select</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
