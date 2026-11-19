/**
 * Jisr Al Maliha Prefabricated Houses Tr. L.L.C
 * Dynamic Site Configuration & Lead Management System
 */

const DEFAULT_CONFIG = {
  phone: '+971 56 938 6872',
  phoneTel: '+971569386872',
  whatsapp1: '+971 54 523 0105',
  whatsapp1Raw: '971545230105',
  whatsapp2: '+971 52 863 4547',
  whatsapp2Raw: '971528634547',
  email: 'Jisralmaliha@gmail.com',
  address: 'Maliha Road, Sharjah, UAE',
  socialFacebook: '',
  socialInstagram: '',
  socialTiktok: '',
  socialLinkedin: '',
  socialYoutube: '',
  socialTwitter: '',
  socialWhatsapp: 'https://wa.me/971545230105'
};

function getSiteConfig() {
  try {
    const saved = localStorage.getItem('jisr_site_config');
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading site config:', e);
  }
  return DEFAULT_CONFIG;
}

function applySiteConfig() {
  const cfg = getSiteConfig();

  // Apply Phone
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = cfg.phone;
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.href = 'tel:' + cfg.phone.replace(/[^0-9+]/g, '');
  });

  // Apply WhatsApp 1
  document.querySelectorAll('[data-config="whatsapp1"]').forEach(el => {
    el.textContent = cfg.whatsapp1;
  });

  // Apply WhatsApp 2
  document.querySelectorAll('[data-config="whatsapp2"]').forEach(el => {
    el.textContent = cfg.whatsapp2;
  });

  // Apply Email
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = cfg.email;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.href = 'mailto:' + cfg.email;
  });

  // Apply Address
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = cfg.address;
  });
}

// Lead Management (Saves inquiries locally so Admin Panel can view them)
function saveLead(lead) {
  try {
    const existing = JSON.parse(localStorage.getItem('jisr_leads') || '[]');
    const newLead = {
      id: Date.now(),
      date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
      ...lead
    };
    existing.unshift(newLead);
    localStorage.setItem('jisr_leads', JSON.stringify(existing));
  } catch (e) {
    console.error('Error saving lead:', e);
  }
}

// Global Quote Submission
function submitHeroQuote(event) {
  event.preventDefault();
  const unit = document.getElementById('heroUnitType')?.value || 'Not specified';
  const size = document.getElementById('heroDimensions')?.value || 'Standard';
  const location = document.getElementById('heroLocation')?.value || 'Sharjah / UAE';
  const phone = document.getElementById('heroPhone')?.value || '';

  saveLead({
    type: 'Quick Quotation',
    unitType: unit,
    dimensions: size,
    deliveryLocation: location,
    contactNumber: phone
  });

  const cfg = getSiteConfig();
  const text = 'Hello Jisr Al Maliha Prefabricated Houses,\n\nI would like an instant quotation:\n- Product: ' + unit + '\n- Dimensions: ' + size + '\n- Delivery Emirate: ' + location + '\n- My Phone: ' + phone + '\n\nPlease reply with factory pricing.';
  window.open('https://wa.me/' + cfg.whatsapp1Raw + '?text=' + encodeURIComponent(text), '_blank');
}

// Global Contact Form Submission
function submitContactInquiry(event) {
  event.preventDefault();
  const name = document.getElementById('cName')?.value || '';
  const phone = document.getElementById('cPhone')?.value || '';
  const email = document.getElementById('cEmail')?.value || '';
  const unit = document.getElementById('cUnit')?.value || 'General Inquiry';
  const size = document.getElementById('cSize')?.value || '';
  const notes = document.getElementById('cNotes')?.value || '';

  saveLead({
    type: 'Contact Consultation',
    clientName: name,
    contactNumber: phone,
    email: email,
    unitType: unit,
    dimensions: size,
    notes: notes
  });

  const cfg = getSiteConfig();
  const text = 'Hello Jisr Al Maliha Engineering Team,\n\nConsultation Request:\n- Name: ' + name + '\n- Phone: ' + phone + '\n- Email: ' + email + '\n- Product: ' + unit + '\n- Preferred Dimensions: ' + size + '\n- Notes: ' + notes;
  window.open('https://wa.me/' + cfg.whatsapp1Raw + '?text=' + encodeURIComponent(text), '_blank');
}

document.addEventListener('DOMContentLoaded', applySiteConfig);
