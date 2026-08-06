import React, { useState, useEffect } from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import styles from './HubModal.module.css';

interface HubItem {
  name: string;
  type: string;
  location: string;
  detail: string;
}

interface HubModalProps {
  hub: HubItem | null;
  onClose: () => void;
}

export const HubModal: React.FC<HubModalProps> = ({ hub, onClose }) => {
  const [step, setStep] = useState<'info' | 'form' | 'submitting' | 'success' | 'error'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Keydown listener for Escape
  useEffect(() => {
    if (!hub) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hub, onClose]);

  // Reset form and step when hub changes
  useEffect(() => {
    if (!hub) return;
    setStep('info');
    setFormData({ name: '', email: '', phone: '', message: '' });
  }, [hub]);

  // Manage body scroll overflow
  useEffect(() => {
    if (!hub) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hub]);

  if (!hub) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');

    const web3formsId = import.meta.env.VITE_WEB3FORMS_CONTACT_ID;
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('email', formData.email);
    newFormData.append('subject', `Request to Join Hub: ${hub.name}`);
    newFormData.append('message', `Hub: ${hub.name} (${hub.type})
Location: ${hub.location}
Phone: ${formData.phone}
Why Join: ${formData.message}`);
    newFormData.append('access_key', web3formsId || '');

    if (web3formsId) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: 'POST',
          body: newFormData,
        });
        const data = await response.json();
        if (data.success) {
          setStep('success');
        } else {
          setStep('error');
        }
      } catch {
        setStep('error');
      }
    } else {
      // Mock API delay if VITE_WEB3FORMS_CONTACT_ID is not configured
      setTimeout(() => {
        setStep('success');
      }, 1500);
    }
  };

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label={`Hub details: ${hub.name}`}
    >
      <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.modalClose} 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {step === 'info' && (
          <div className={styles.modalBody}>
            <span className={`${styles.hubTypePill} ${hub.type === 'Hub' ? styles.pillHub : styles.pillClub}`}>
              {hub.type}
            </span>
            <h3 className={styles.hubTitle}>{hub.name}</h3>
            
            <div className={styles.infoMeta}>
              <div className={styles.metaItem}>
                <MapPin size={18} className={styles.metaIcon} />
                <span>{hub.location}</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.detailSection}>
              <h4>About the Hub</h4>
              <p>{hub.detail}</p>
              <p className={styles.extraContext}>
                Our regional hubs and student clubs serve as community centers where we hold Wikipedia editing workshops, digital literacy classes, and open educational training. By joining, you'll receive free training, get access to networking events, and collaborate with local open knowledge leaders.
              </p>
            </div>

            <div className={styles.footerCtas}>
              <button className={styles.btnSecondary} onClick={onClose}>Close</button>
              <button className={styles.btnPrimary} onClick={() => setStep('form')}>
                Join this Hub <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {(step === 'form' || step === 'submitting') && (
          <div className={styles.modalBody}>
            <span className={styles.formKicker}>Registration Form</span>
            <h3 className={styles.hubTitle}>Join {hub.name}</h3>
            <p className={styles.formSub}>Fill in your details below. The hub coordinator will review your application and contact you soon.</p>

            <form onSubmit={handleSubmit} className={styles.formLayout}>
              <div className={styles.inputGroup}>
                <label htmlFor="hub-name-field">Full Name <span className={styles.required}>*</span></label>
                <input
                  id="hub-name-field"
                  type="text"
                  required
                  placeholder="e.g. Ama Mensah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={step === 'submitting'}
                />
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="hub-email-field">Email Address <span className={styles.required}>*</span></label>
                  <input
                    id="hub-email-field"
                    type="email"
                    required
                    placeholder="e.g. ama@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={step === 'submitting'}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="hub-phone-field">Phone Number</label>
                  <input
                    id="hub-phone-field"
                    type="tel"
                    placeholder="e.g. +233 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={step === 'submitting'}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="hub-msg-field">Why do you want to join? (Optional)</label>
                <textarea
                  id="hub-msg-field"
                  rows={3}
                  placeholder="Tell us a little bit about yourself or why you'd like to join..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={step === 'submitting'}
                />
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.btnSecondary} onClick={() => setStep('info')} disabled={step === 'submitting'}>
                  Back
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={step === 'submitting'}>
                  {step === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className={`${styles.modalBody} ${styles.centeredBody}`}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.hubTitle}>Application Received!</h3>
            <p className={styles.successText}>
              Thank you for your interest in joining <strong>{hub.name}</strong>. Your request was successfully submitted. A hub leader or coordinator will get in touch with you at <strong>{formData.email}</strong> shortly.
            </p>
            <button className={styles.btnPrimary} onClick={onClose}>
              Done
            </button>
          </div>
        )}

        {step === 'error' && (
          <div className={`${styles.modalBody} ${styles.centeredBody}`}>
            <div className={styles.errorIcon}>✕</div>
            <h3 className={styles.hubTitle}>Submission Failed</h3>
            <p className={styles.errorText}>
              Something went wrong while submitting your application. Please check your internet connection and try again.
            </p>
            <div className={styles.footerCtas}>
              <button className={styles.btnSecondary} onClick={() => setStep('form')}>
                Try Again
              </button>
              <button className={styles.btnPrimary} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
