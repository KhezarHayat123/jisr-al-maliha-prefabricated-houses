/* ========================================================
   JISR AL MALIHA PREFABRICATED HOUSES TR. L.L.C
   24/7 Multilingual AI Live Support & Full Guidance Widget
   (English & Roman Urdu Auto-Reply + Instant Order Alert)
   Official Email: jisralmaliha@gmail.com | SEDD #922593
   ======================================================== */

(function () {
  'use strict';

  // Audio Chime Synthesizer via Web Audio API (Zero external audio file dependency)
  function playNotificationChime(isAlert = false) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isAlert) {
        // High-priority 3-tone alert chime
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.2); // D6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.45);
      } else {
        // Soft friendly ping chime
        osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio context may be restricted by browser policy before user interaction
    }
  }

  // Inject Widget Styles
  const styleId = 'jisr-ai-chat-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Left Floating Trigger Container */
      .jisr-ai-launcher {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }

      /* Trigger Button */
      .jisr-ai-btn {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0b1526 0%, #1e293b 100%);
        border: 2px solid #f59e0b;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 18px rgba(245, 158, 11, 0.35);
        position: relative;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .jisr-ai-btn:hover {
        transform: scale(1.08) translateY(-3px);
        box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5), 0 0 28px rgba(245, 158, 11, 0.55);
        border-color: #fbbf24;
      }
      .jisr-ai-btn i {
        font-size: 26px;
        color: #f59e0b;
        transition: transform 0.3s ease;
      }
      .jisr-ai-btn:hover i {
        transform: rotate(10deg) scale(1.12);
      }

      /* Online Green Pulse Indicator */
      .jisr-ai-online-dot {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        background: #10b981;
        border: 2px solid #0b1526;
        border-radius: 50%;
      }
      .jisr-ai-online-dot::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 50%;
        border: 2px solid #10b981;
        animation: jisrPulse 1.8s infinite;
      }

      @keyframes jisrPulse {
        0% { transform: scale(0.9); opacity: 1; }
        100% { transform: scale(2.2); opacity: 0; }
      }

      /* Floating Label Pill */
      .jisr-ai-pill {
        background: #0f172a;
        color: #ffffff;
        border: 1px solid rgba(245, 158, 11, 0.45);
        padding: 9px 16px;
        border-radius: 24px;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .jisr-ai-pill:hover {
        border-color: #fbbf24;
        background: #1e293b;
        transform: translateX(3px);
      }
      .jisr-ai-pill-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 8px #10b981;
      }

      /* Greeting Bubble Popup */
      .jisr-ai-greeting-bubble {
        position: absolute;
        bottom: 78px;
        left: 0;
        width: 310px;
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid rgba(245, 158, 11, 0.45);
        padding: 14px 16px;
        border-radius: 14px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.55);
        font-size: 13px;
        line-height: 1.48;
        display: none;
        animation: jisrSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        cursor: pointer;
      }
      .jisr-ai-greeting-bubble.show {
        display: block;
      }
      .jisr-ai-greeting-bubble::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 26px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #0f172a;
      }
      .jisr-ai-greeting-close {
        position: absolute;
        top: 6px;
        right: 8px;
        color: #94a3b8;
        background: none;
        border: none;
        font-size: 15px;
        cursor: pointer;
        padding: 2px 6px;
      }
      .jisr-ai-greeting-close:hover {
        color: #f59e0b;
      }

      /* Exit Intent Modal Bubble */
      .jisr-exit-intent-box {
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: #0f172a;
        border: 2px solid #f59e0b;
        color: #ffffff;
        padding: 16px 22px;
        border-radius: 14px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        z-index: 100001;
        display: none;
        max-width: 90vw;
        width: 480px;
        animation: jisrFadeDown 0.35s ease forwards;
      }
      .jisr-exit-intent-box.active {
        display: block;
      }
      @keyframes jisrFadeDown {
        to { transform: translateX(-50%) translateY(0); }
      }

      /* Chat Modal Drawer (Left Aligned) */
      .jisr-chat-modal {
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 395px;
        max-width: calc(100vw - 36px);
        height: 600px;
        max-height: calc(100vh - 48px);
        background: #090e17;
        border: 1px solid rgba(245, 158, 11, 0.4);
        border-radius: 18px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.2);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(20px) scale(0.95);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }
      .jisr-chat-modal.open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      /* Chat Header */
      .jisr-chat-header {
        background: linear-gradient(135deg, #0b1526 0%, #152238 100%);
        border-bottom: 1px solid rgba(245, 158, 11, 0.25);
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .jisr-chat-header-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .jisr-chat-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #f59e0b;
        color: #0b1526;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        font-weight: 800;
        box-shadow: 0 2px 10px rgba(245, 158, 11, 0.45);
      }
      .jisr-chat-title {
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
        margin: 0;
      }
      .jisr-chat-subtitle {
        font-size: 11px;
        color: #10b981;
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
      }
      .jisr-chat-email-badge {
        font-size: 11px;
        color: #fbbf24;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: 2px;
        font-weight: 600;
      }
      .jisr-chat-email-badge:hover {
        text-decoration: underline;
      }
      .jisr-chat-controls {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .jisr-chat-btn-ctrl {
        background: rgba(255, 255, 255, 0.08);
        border: none;
        color: #cbd5e1;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      .jisr-chat-btn-ctrl:hover {
        background: #f59e0b;
        color: #0b1526;
      }

      /* Chat Messages Scroll Area */
      .jisr-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #060a12;
      }
      .jisr-chat-messages::-webkit-scrollbar {
        width: 5px;
      }
      .jisr-chat-messages::-webkit-scrollbar-thumb {
        background: rgba(245, 158, 11, 0.3);
        border-radius: 4px;
      }

      /* Message Bubbles */
      .jisr-msg {
        max-width: 86%;
        padding: 11px 15px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.48;
        position: relative;
        word-wrap: break-word;
      }
      .jisr-msg-bot {
        align-self: flex-start;
        background: #111a2e;
        color: #e2e8f0;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-top-left-radius: 4px;
      }
      .jisr-msg-user {
        align-self: flex-end;
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        color: #ffffff;
        border-top-right-radius: 4px;
      }
      .jisr-msg-time {
        font-size: 10px;
        opacity: 0.65;
        margin-top: 5px;
        text-align: right;
      }

      /* Action Buttons inside Bot Message */
      .jisr-msg-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
      }
      .jisr-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 9px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
      }
      .jisr-btn-wa-order {
        background: #25d366;
        color: #0b1526;
      }
      .jisr-btn-wa-order:hover {
        background: #1eb956;
        transform: translateY(-1px);
      }
      .jisr-btn-mail-order {
        background: #ea4335;
        color: #ffffff;
      }
      .jisr-btn-mail-order:hover {
        background: #d33828;
        transform: translateY(-1px);
      }

      /* Quick Action Chips */
      .jisr-chat-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .jisr-chip {
        background: rgba(245, 158, 11, 0.12);
        border: 1px solid rgba(245, 158, 11, 0.35);
        color: #fbbf24;
        padding: 6px 11px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
      }
      .jisr-chip:hover {
        background: #f59e0b;
        color: #0b1526;
        border-color: #f59e0b;
      }

      /* Typing Animation Indicator */
      .jisr-typing {
        display: none;
        align-self: flex-start;
        background: #111a2e;
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 8px 14px;
        border-radius: 12px;
        gap: 4px;
        align-items: center;
      }
      .jisr-typing.active {
        display: flex;
      }
      .jisr-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f59e0b;
        animation: jisrBounce 1.4s infinite ease-in-out both;
      }
      .jisr-dot:nth-child(1) { animation-delay: -0.32s; }
      .jisr-dot:nth-child(2) { animation-delay: -0.16s; }

      @keyframes jisrBounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      @keyframes jisrSlideUp {
        0% { transform: translateY(15px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }

      /* Chat Input Bar */
      .jisr-chat-input-bar {
        background: #0b1526;
        border-top: 1px solid rgba(245, 158, 11, 0.25);
        padding: 10px 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .jisr-chat-input {
        flex: 1;
        background: #111c30;
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        padding: 10px 14px;
        border-radius: 20px;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
      }
      .jisr-chat-input:focus {
        border-color: #f59e0b;
      }
      .jisr-chat-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f59e0b;
        color: #0b1526;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 15px;
        transition: all 0.2s;
      }
      .jisr-chat-send:hover {
        background: #fbbf24;
        transform: scale(1.06);
      }

      /* Responsive adjustment */
      @media (max-width: 480px) {
        .jisr-ai-launcher {
          bottom: 16px;
          left: 16px;
        }
        .jisr-ai-pill {
          display: none;
        }
        .jisr-chat-modal {
          bottom: 12px;
          left: 12px;
          right: 12px;
          width: auto;
          height: calc(100vh - 24px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Language Detection Helper
  function detectLanguage(text) {
    const romanUrduPatterns = [
      'kya', 'kia', 'kitna', 'kitne', 'rate', 'chahy', 'chahye', 'chahiye',
      'bhai', 'salam', 'assalam', 'janab', 'portacabin', 'kamra', 'bnao', 'bnana',
      'kahan', 'sasta', 'mehanga', 'khareed', 'lena', 'milay', 'karo', 'rabta',
      'paisa', 'batao', 'bataen', 'shukriya', 'theek', 'acha', 'sahi', 'gari', 'chasis',
      'kam', 'kaam', 'hazrat', 'kren', 'krna', 'hoga', 'hota', 'mil', 'sakta', 'apka', 'apke',
      'helo bhai', 'assalam o alaikum', 'assalamu alaikum'
    ];

    const lower = text.toLowerCase();
    let urduScore = 0;
    for (const w of romanUrduPatterns) {
      if (lower.includes(w)) urduScore++;
    }

    // Check Arabic script
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'arabic';
    }

    if (urduScore >= 1) {
      return 'roman_urdu';
    }

    return 'english';
  }

  // Check if user is finalizing, asking for discount, or placing an order
  function isFinalOrderInquiry(text) {
    const orderWords = [
      'order', 'final', 'budget', 'discount', 'book', 'confirm', 'advance',
      'payment', 'deal', 'finalize', 'khareedna', 'sasta', 'kam karo', 'final rate',
      'last price', 'bill', 'quotation', 'invoice', 'chahiye confirm', 'deal done'
    ];
    const lower = text.toLowerCase();
    return orderWords.some(w => lower.includes(w));
  }

  // Save Lead in localStorage for Admin Panel
  function recordLead(leadData) {
    try {
      const leads = JSON.parse(localStorage.getItem('jisr_leads') || '[]');
      leads.unshift({
        id: Date.now(),
        date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
        ...leadData
      });
      localStorage.setItem('jisr_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Lead save error:', e);
    }
  }

  // Multilingual Knowledge Matrix
  function generateGuidanceResponse(userInput) {
    const lang = detectLanguage(userInput);
    const isOrder = isFinalOrderInquiry(userInput);
    const lower = userInput.toLowerCase();

    // Check phone number capture
    const phoneMatch = userInput.match(/(\+?\d{8,14})/);
    if (phoneMatch) {
      recordLead({
        type: isOrder ? '🚨 HIGH-PRIORITY ORDER (Chat)' : 'AI Chat Lead',
        contactNumber: phoneMatch[0],
        language: lang,
        status: isOrder ? 'Urgent Order' : 'New',
        notes: userInput
      });

      playNotificationChime(true);

      if (lang === 'roman_urdu') {
        return {
          text: `✅ **Boht Shukriya!** Aap ka phone number (${phoneMatch[0]}) register ho chuka hai. Hamari senior engineering estimation team ko instant alert bhej diya gaya hai.\n\nEk copy direct **jisralmaliha@gmail.com** aur owner ke mobile WhatsApp par dispatch ho chuki hai. Engineer jald aap se rabta karega!\n\nAgar aap ko foran rabta karna hai to niche click karein:`,
          actions: [
            { type: 'wa', label: '📲 Direct WhatsApp Owner Alert', query: `Salam, maine website chat par contact diya hai (${phoneMatch[0]}). Mujhe urgent quotation aur order final karna hai.` },
            { type: 'mail', label: '📧 Send Email Copy to jisralmaliha@gmail.com', subject: 'Urgent Prefab Order Lead', body: `Client Phone: ${phoneMatch[0]}\nDetails: ${userInput}` }
          ]
        };
      } else {
        return {
          text: `✅ **Thank You!** We have logged your contact number (${phoneMatch[0]}). Your request has been dispatched to **jisralmaliha@gmail.com** and our senior engineering desk.\n\nA senior estimator will reach out to you directly via WhatsApp / Call. For urgent crane dispatch or instant quotation:`,
          actions: [
            { type: 'wa', label: '📲 WhatsApp Senior Engineer Now', query: `Hello Jisr Al Maliha, I shared my contact (${phoneMatch[0]}) on the website AI chat. Need urgent formal quotation.` },
            { type: 'mail', label: '📧 Email Direct Order to jisralmaliha@gmail.com', subject: 'Urgent Prefab Order Request', body: `Client Phone: ${phoneMatch[0]}\nDetails: ${userInput}` }
          ]
        };
      }
    }

    // 1. ORDER FINALIZATION & BUDGET / DISCOUNT
    if (isOrder) {
      recordLead({
        type: '🚨 HIGH-PRIORITY BUDGET / ORDER (Chat)',
        language: lang,
        status: 'Urgent Order',
        notes: userInput
      });

      playNotificationChime(true);

      if (lang === 'roman_urdu') {
        return {
          text: `🚨 **Order Finalization & Special Budget Deal:**\nJi bilkul! Hamara factory administration direct deal par best discount offer karta hai. Order final karne aur owner ko instant notification bhejne ke liye niche diye gaye buttons par click karein. Owner ke mobile WhatsApp aur **jisralmaliha@gmail.com** par foran notification chala jayega!`,
          actions: [
            { type: 'wa', label: '📲 WhatsApp Owner: Final Order & Budget Deal', query: `Salam Jisr Al Maliha! Mai apna order aur budget final karna chahta hoon. Details: ${userInput}` },
            { type: 'mail', label: '📧 Email Order Alert to jisralmaliha@gmail.com', subject: 'URGENT: Client Ready to Finalize Order & Budget', body: `Client Inquiry: ${userInput}\nStatus: Ready to finalize order.\nPlease send final invoice/quotation.` }
          ]
        };
      } else {
        return {
          text: `🚨 **Order Finalization & Best Factory Budget Deal:**\nUnderstood! For final order confirmations, special contractor discounts, and instant invoice preparation, please notify our management desk directly below. An instant push notification will alert the owner on WhatsApp and **jisralmaliha@gmail.com**!`,
          actions: [
            { type: 'wa', label: '📲 WhatsApp Owner: Finalize Order Now', query: `Hello Jisr Al Maliha, I would like to finalize my order and budget. Details: ${userInput}` },
            { type: 'mail', label: '📧 Send Official Order to jisralmaliha@gmail.com', subject: 'URGENT ORDER CONFIRMATION & BUDGET', body: `Inquiry details: ${userInput}\nPlease prepare formal invoice.` }
          ]
        };
      }
    }

    // 2. PRICING & RATES
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('kitna') || lower.includes('kitne') || lower.includes('how much') || lower.includes('paisa')) {
      if (lang === 'roman_urdu') {
        return {
          text: `💰 **Factory Direct Pricing & Complete Rates:**\n• **Single Luxury Washroom (1.2m x 1.2m):** AED 3,200 se start.\n• **20ft Site Office Cabin (6m x 3m):** AED 9,500 se start.\n• **40ft Multi-Room Executive Cabin (12m x 3m):** AED 17,500 se start.\n\n**Sab units mein shamil hai:**\n✔ Heavy-duty steel I-beam chassis foundation (crane lifting hooks ke sath)\n✔ 50mm / 75mm thermally insulated fire-rated sandwich panels\n✔ Concealed wiring, DB box, LED lights, AC point aur double-glazed sliding windows.\n\nAap ko kis size ki zaroorat hai aur delivery kis Emirate mein chahiye? Apna phone number likhein hum exact formal quotation tayar kar ke bhejte hain!`,
          actions: [
            { type: 'wa', label: '💬 Get Exact Price on WhatsApp', query: `Salam Jisr Al Maliha, mujhe instant price quotation chahiye.` },
            { type: 'mail', label: '📧 Request Formal Price Sheet via Email', subject: 'Price Sheet Request', body: 'Please send complete prefabricated price catalog.' }
          ]
        };
      } else {
        return {
          text: `💰 **Factory-Direct Pricing & Specifications:**\n• **Single Washroom Unit (1.2m x 1.2m):** Starting from AED 3,200\n• **20ft Standard Site Office (6m x 3m):** Starting from AED 9,500\n• **40ft Executive Modular Cabin (12m x 3m):** Starting from AED 17,500\n\n**Standard Inclusions:**\n✔ Heavy-duty steel chassis with crane lifting hooks\n✔ 50mm/75mm fire-rated thermally insulated sandwich panels\n✔ Pre-wired distribution board, LED lights, split AC points, aluminum sliding windows with security grill.\n\nPlease share your required size and delivery Emirate for an exact quotation!`,
          actions: [
            { type: 'wa', label: '💬 Get Fast Quote on WhatsApp', query: 'Hello Jisr Al Maliha, please send exact price quote.' },
            { type: 'mail', label: '📧 Email jisralmaliha@gmail.com for Price List', subject: 'Quotation Request', body: 'Please provide quotation for prefabricated cabins.' }
          ]
        };
      }
    }

    // 3. PREFAB WASHROOMS & TOILETS
    if (lower.includes('washroom') || lower.includes('toilet') || lower.includes('bathroom') || lower.includes('ablution') || lower.includes('bath')) {
      if (lang === 'roman_urdu') {
        return {
          text: `🚿 **Prefab Luxury Washrooms & Toilet Blocks Ki Complete Detail:**\n• **Fittings:** High-grade porcelain ceramic English/Arabic commode, modern wash basin, chrome taps.\n• **Plumbing:** Pre-fitted concealed copper pipes, instant water heater connection aur ventilation exhaust fan.\n• **Wall & Floor:** 100% waterproof insulated panels, non-slip aluminum checkered plate ya ceramic tiles floor.\n• **Models:** Single unit (1.2x1.2m), double cubicle (2.4x1.2m), aur multi-stall worker ablution blocks.\n\nAap ko single unit chahiye ya commercial labor ablution block?`,
          actions: [
            { type: 'wa', label: '💬 Washroom Drawings & Pricing on WhatsApp', query: 'Salam, mujhe prefabricated washroom units ki drawings aur prices chahiye.' }
          ]
        };
      } else {
        return {
          text: `🚿 **Prefabricated Commercial & Luxury Washroom Blocks:**\n• **Sanitary Ware:** Premium white porcelain WC (European or Oriental), ceramic basin, chrome bibcocks.\n• **Plumbing & Power:** Concealed copper plumbing, water heater connection, electrical exhaust fan.\n• **Flooring & Panels:** Waterproof insulated sandwich panels, non-slip aluminum checkered plate or tiled flooring.\n• **Configurations:** Single units (1.2x1.2m), double cubicles (2.4x1.2m), multi-stall ablution blocks for labor camps.`,
          actions: [
            { type: 'wa', label: '💬 Request Washroom Catalog on WhatsApp', query: 'Hello, please send prefabricated washroom specifications.' }
          ]
        };
      }
    }

    // 4. PORTA CABINS & SITE OFFICES
    if (lower.includes('office') || lower.includes('cabin') || lower.includes('porta') || lower.includes('kamra') || lower.includes('container') || lower.includes('site')) {
      if (lang === 'roman_urdu') {
        return {
          text: `🏢 **Site Office Porta Cabins Ki Complete Guidence:**\n• **Sizes Available:** 3x3m (10x10ft), 6x3m (20x10ft), 9x3m (30x10ft), 12x3m (40x10ft), ya custom size.\n• **Insulation:** 50mm / 75mm fire-rated PU / Rockwool sandwich panels jo UAE ki 50°C garmi ko andar nahi aane dete.\n• **Structure:** Heavy structural steel I-beam frame aur crane lifting points taake site par crane se asani se shift ho sake.\n• **Interior:** False ceiling, heavy vinyl floor, 2 sliding windows with safety grill, DB box aur AC points ready to plug.\n\nAap ko open hall office chahiye ya manager cabin + toilet + pantry wala layout?`,
          actions: [
            { type: 'wa', label: '💬 Request Office Floor Plan on WhatsApp', query: 'Salam, mujhe porta cabin office floor plan aur price chahiye.' }
          ]
        };
      } else {
        return {
          text: `🏢 **Porta Cabins & Modular Site Offices Specifications:**\n• **Standard Dimensions:** 3x3m (10x10ft), 6x3m (20x10ft), 12x3m (40x10ft), and custom project layouts.\n• **Thermal Performance:** 50mm/75mm fire-rated PU sandwich panels engineered for UAE extreme climate.\n• **Chassis Foundation:** Heavy-duty I-beam steel chassis with integrated crane lifting eye-bolts.\n• **Interior Turnkey:** Heavy vinyl flooring, false ceiling, LED fixtures, distribution board, and split AC pre-installation.`,
          actions: [
            { type: 'wa', label: '💬 Inquire Office Layout on WhatsApp', query: 'Hello, please provide modular office plans and specifications.' }
          ]
        };
      }
    }

    // 5. DOUBLE STOREY & WORKER CAMPS
    if (lower.includes('double') || lower.includes('storey') || lower.includes('two') || lower.includes('camp') || lower.includes('accommodation') || lower.includes('mazdoor') || lower.includes('labor')) {
      if (lang === 'roman_urdu') {
        return {
          text: `🏗️ **2-Storey Modular Buildings & Labor Camp Accommodation:**\n• Stackable modular system jo construction sites par jagah bachata hai.\n• External heavy-duty galvanized steel staircases, safety railings aur upper corridor walkways shamil hain.\n• Labor accommodation, dining mess halls, security guard accommodation, aur executive staff quarters.\n• Sharjah SEDD License #922593 ke tehat Civil Defence approved standards.`,
          actions: [
            { type: 'wa', label: '💬 Camp Drawings on WhatsApp', query: 'Salam, mujhe 2-storey modular camp accommodation ki details chahiye.' }
          ]
        };
      } else {
        return {
          text: `🏗️ **2-Storey Modular Buildings & Labor Camp Accommodation:**\n• Space-saving stackable modular architecture engineered for major UAE construction projects.\n• Includes external galvanized steel staircases, walkways, and safety handrails.\n• Full turnkey configurations: dormitory rooms, dining halls, recreation cabins, and central ablution blocks.\n• Fully compliant with UAE Civil Defence fire safety regulations (SEDD #922593).`,
          actions: [
            { type: 'wa', label: '💬 Request Modular Camp Specs', query: 'Hello, please send two-storey modular camp details.' }
          ]
        };
      }
    }

    // 6. DELIVERY & COVERAGE ACROSS UAE
    if (lower.includes('delivery') || lower.includes('kahan') || lower.includes('sharjah') || lower.includes('dubai') || lower.includes('abu dhabi') || lower.includes('ajman') || lower.includes('rak') || lower.includes('al ain')) {
      if (lang === 'roman_urdu') {
        return {
          text: `🚚 **UAE Ke Tamam 7 Emirates Mein Delivery:**\n• Sharjah (Maliha Road factory se Same Day delivery available hai)\n• Dubai, Abu Dhabi, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain, aur Al Ain.\n• Flatbed trailer transport ke sath crane offloading aur site positioning ki complete service available hai.`,
          actions: [
            { type: 'wa', label: '💬 Check Delivery Schedule on WhatsApp', query: 'Salam, mujhe delivery schedule check karna hai.' }
          ]
        };
      } else {
        return {
          text: `🚚 **Turnkey Delivery Across All 7 UAE Emirates:**\n• Direct from our Maliha Road, Sharjah fabrication yard.\n• Serving Sharjah, Dubai, Abu Dhabi, Ajman, RAK, Fujairah, UAQ, and Al Ain.\n• Includes specialized flatbed transportation, crane offloading, and on-site positioning.`,
          actions: [
            { type: 'wa', label: '💬 Check Delivery Timeline on WhatsApp', query: 'Hello, what is the delivery timeline to my site?' }
          ]
        };
      }
    }

    // 7. GMAIL & CONTACT NUMBERS
    if (lower.includes('gmail') || lower.includes('email') || lower.includes('number') || lower.includes('phone') || lower.includes('rabta') || lower.includes('contact')) {
      if (lang === 'roman_urdu') {
        return {
          text: `📞 **Official Contact Lines & Email:**\n• **Official Email:** jisralmaliha@gmail.com\n• **Direct Factory Call:** +971 56 938 6872\n• **WhatsApp Line 1:** +971 54 523 0105\n• **WhatsApp Line 2:** +971 52 863 4547\n• **Address:** Maliha Road, Industrial Area, Sharjah, UAE.\n\nAap jisralmaliha@gmail.com par email bhej kar instant confirmation le sakte hain!`,
          actions: [
            { type: 'mail', label: '📧 Send Email to jisralmaliha@gmail.com', subject: 'Inquiry for Prefabricated Cabins', body: 'Hello, I need quotation for prefabricated units.' },
            { type: 'wa', label: '💬 Open WhatsApp Line 1', query: 'Salam Jisr Al Maliha team, rabta karna chahta hoon.' }
          ]
        };
      } else {
        return {
          text: `📞 **Official Contact & Engineering Hotlines:**\n• **Official Email:** jisralmaliha@gmail.com\n• **Direct Call:** +971 56 938 6872\n• **WhatsApp Line 1:** +971 54 523 0105\n• **WhatsApp Line 2:** +971 52 863 4547\n• **Factory Yard:** Maliha Road, Industrial Area, Sharjah, UAE.\n\nAll inquiries sent to jisralmaliha@gmail.com receive immediate priority responses!`,
          actions: [
            { type: 'mail', label: '📧 Email jisralmaliha@gmail.com', subject: 'Prefabricated Inquiry', body: 'Hello, please send quotation.' },
            { type: 'wa', label: '💬 WhatsApp Support Hotline', query: 'Hello Jisr Al Maliha team, inquiry regarding prefab houses.' }
          ]
        };
      }
    }

    // Default Fallback
    if (lang === 'roman_urdu') {
      return {
        text: `Salam! **Jisr Al Maliha Prefabricated Houses TR. L.L.C** mein welcome.\nHum UAE ke certified manufacturer hain (SEDD License #922593).\n\nHum aap ko **Porta Cabins, Prefab Luxury Washrooms, Site Offices, Labor Camps, Security Cabins aur Mobile Caravans** ke baray mein complete guidance faraham karte hain.\n\nAap ko kis cheez ki zaroorat hai? Apna required size aur phone number share karein taake formal quotation WhatsApp aur **jisralmaliha@gmail.com** par bhej sakein!`,
        actions: [
          { type: 'wa', label: '💬 Chat with Senior Engineer on WhatsApp', query: 'Salam Jisr Al Maliha, mujhe guidance chahiye.' },
          { type: 'mail', label: '📧 Email jisralmaliha@gmail.com', subject: 'General Prefab Inquiry', body: 'Hello, I would like guidance on prefabricated units.' }
        ]
      };
    } else {
      return {
        text: `Hello! Welcome to **Jisr Al Maliha Prefabricated Houses TR. L.L.C** (SEDD License #922593).\n\nWe provide complete engineering guidance for **Porta Cabins, Prefab Washrooms, Modular Offices, Labor Camps, Guard Booths, and Mobile Caravans** across all 7 UAE Emirates.\n\nPlease share your required dimensions, product type, or phone number so we can prepare an instant formal quotation for you, or email directly to **jisralmaliha@gmail.com**!`,
        actions: [
          { type: 'wa', label: '💬 Chat on WhatsApp (+971 54 523 0105)', query: 'Hello Jisr Al Maliha, I need guidance on prefabricated units.' },
          { type: 'mail', label: '📧 Email jisralmaliha@gmail.com', subject: 'Quotation Request', body: 'Hello, please provide quotation for prefabricated units.' }
        ]
      };
    }
  }

  // Initialize Chat UI
  function initAIChatWidget() {
    // 1. Launcher UI
    const launcher = document.createElement('div');
    launcher.className = 'jisr-ai-launcher';
    launcher.id = 'jisrAiLauncher';

    launcher.innerHTML = `
      <!-- Greeting Popout -->
      <div class="jisr-ai-greeting-bubble" id="jisrGreetingBubble">
        <button class="jisr-ai-greeting-close" id="jisrGreetingClose">&times;</button>
        <div style="font-weight:800; color:#f59e0b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-headset"></i> 24/7 Engineering Support
        </div>
        <strong>Chat here for full guidance & instant pricing</strong>, or email <span style="color:#fbbf24; text-decoration:underline;">jisralmaliha@gmail.com</span>!
      </div>

      <!-- Trigger Button -->
      <div class="jisr-ai-btn" id="jisrAiToggleBtn" title="Chat here for full guidance">
        <i class="fa-solid fa-comments"></i>
        <div class="jisr-ai-online-dot"></div>
      </div>

      <!-- Label Pill (User Requested Text) -->
      <div class="jisr-ai-pill" id="jisrAiPill">
        <div class="jisr-ai-pill-dot"></div>
        <span>Chat here for full guidance</span>
      </div>
    `;

    // 2. Chat Modal Window
    const modal = document.createElement('div');
    modal.className = 'jisr-chat-modal';
    modal.id = 'jisrChatModal';

    modal.innerHTML = `
      <!-- Header -->
      <div class="jisr-chat-header">
        <div class="jisr-chat-header-info">
          <div class="jisr-chat-avatar"><i class="fa-solid fa-robot"></i></div>
          <div>
            <h4 class="jisr-chat-title">Jisr Al Maliha AI Desk</h4>
            <div class="jisr-chat-subtitle">
              <i class="fa-solid fa-circle" style="font-size:8px;"></i> Online 24/7 &bull; English &amp; Roman Urdu
            </div>
            <a href="mailto:jisralmaliha@gmail.com" class="jisr-chat-email-badge">
              <i class="fa-solid fa-envelope"></i> jisralmaliha@gmail.com
            </a>
          </div>
        </div>
        <div class="jisr-chat-controls">
          <button class="jisr-chat-btn-ctrl" id="jisrChatMinimize" title="Minimize">&minus;</button>
          <button class="jisr-chat-btn-ctrl" id="jisrChatClose" title="Close">&times;</button>
        </div>
      </div>

      <!-- Messages Body -->
      <div class="jisr-chat-messages" id="jisrChatMessages">
        <div class="jisr-msg jisr-msg-bot">
          السلام عليكم / Welcome to <strong>Jisr Al Maliha Prefabricated Houses TR. L.L.C</strong> (SEDD License #922593)!
          <br><br>
          Main aap ka 24/7 AI Engineering Assistant hoon. Aap **English** ya **Roman Urdu** mein sawaal pooch sakte hain. Porta Cabins, Prefab Washrooms, Modular Offices, Sandwich Panels, ya Delivery ke hawale se mukammal guidance haasil karein!
          <div class="jisr-msg-time">Just now</div>

          <!-- Quick Action Chips -->
          <div class="jisr-chat-chips">
            <span class="jisr-chip" data-query="Porta cabin rates aur sizes bataen">🏢 Cabin Rates (Roman Urdu)</span>
            <span class="jisr-chip" data-query="Prefab washroom details aur pricing">🚿 Prefab Washrooms</span>
            <span class="jisr-chip" data-query="Mujhe order final karna hai aur discount budget chahiye">🚨 Final Order &amp; Budget Deal</span>
            <span class="jisr-chip" data-query="UAE delivery schedule and crane offload">🚚 UAE Delivery Schedule</span>
            <a href="mailto:jisralmaliha@gmail.com?subject=Urgent%20Quotation%20Request%20-%20Jisr%20Al%20Maliha" class="jisr-chip" style="background:rgba(239, 68, 68, 0.18); color:#fca5a5; border-color:rgba(239,68,68,0.45);">
              📧 Email: jisralmaliha@gmail.com
            </a>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="jisr-typing" id="jisrTypingIndicator">
          <div class="jisr-dot"></div>
          <div class="jisr-dot"></div>
          <div class="jisr-dot"></div>
          <span style="font-size:11px; color:#94a3b8; margin-left:6px;">AI is drafting response...</span>
        </div>
      </div>

      <!-- Input Bar -->
      <form class="jisr-chat-input-bar" id="jisrChatForm">
        <input type="text" class="jisr-chat-input" id="jisrChatInput" placeholder="Sawaal poochein ya size likhein (Urdu / English)..." required autocomplete="off">
        <button type="submit" class="jisr-chat-send" title="Send message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    `;

    // 3. Exit Intent Retention Box
    const exitBox = document.createElement('div');
    exitBox.className = 'jisr-exit-intent-box';
    exitBox.id = 'jisrExitBox';
    exitBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#f59e0b; font-size:15px;"><i class="fa-solid fa-bell"></i> Wait! Before you leave...</span>
        <button style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;" id="jisrExitClose">&times;</button>
      </div>
      <p style="margin:0 0 12px; font-size:13px; color:#cbd5e1; line-height:1.45;">
        Need an instant quotation, special contractor budget, or technical drawings? Get direct response in 10 minutes!
      </p>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a href="https://wa.me/971545230105?text=Hello%20Jisr%20Al%20Maliha%2C%20I%20am%20looking%20for%20an%20instant%20budget%20quote%20for%20porta%20cabins." target="_blank" style="flex:1; background:#25d366; color:#0b1526; padding:8px 12px; border-radius:8px; text-align:center; font-weight:700; font-size:12px; text-decoration:none;">
          <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
        </a>
        <a href="mailto:jisralmaliha@gmail.com?subject=Urgent%20Order%20Inquiry" style="flex:1; background:#f59e0b; color:#0b1526; padding:8px 12px; border-radius:8px; text-align:center; font-weight:700; font-size:12px; text-decoration:none;">
          <i class="fa-solid fa-envelope"></i> Email jisralmaliha@gmail.com
        </a>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(modal);
    document.body.appendChild(exitBox);

    // Event Bindings
    const toggleBtn = document.getElementById('jisrAiToggleBtn');
    const pill = document.getElementById('jisrAiPill');
    const greetingBubble = document.getElementById('jisrGreetingBubble');
    const greetingClose = document.getElementById('jisrGreetingClose');
    const closeBtn = document.getElementById('jisrChatClose');
    const minBtn = document.getElementById('jisrChatMinimize');
    const chatForm = document.getElementById('jisrChatForm');
    const chatInput = document.getElementById('jisrChatInput');
    const chatMessages = document.getElementById('jisrChatMessages');
    const typingIndicator = document.getElementById('jisrTypingIndicator');
    const exitClose = document.getElementById('jisrExitClose');

    function openChat() {
      modal.classList.add('open');
      greetingBubble.classList.remove('show');
      exitBox.classList.remove('active');
      chatInput.focus();
    }

    function closeChat() {
      modal.classList.remove('open');
    }

    toggleBtn.addEventListener('click', () => {
      if (modal.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    pill.addEventListener('click', openChat);
    greetingBubble.addEventListener('click', (e) => {
      if (e.target !== greetingClose) openChat();
    });

    greetingClose.addEventListener('click', (e) => {
      e.stopPropagation();
      greetingBubble.classList.remove('show');
    });

    closeBtn.addEventListener('click', closeChat);
    minBtn.addEventListener('click', closeChat);
    exitClose.addEventListener('click', () => exitBox.classList.remove('active'));

    // Show greeting bubble after 2.5 seconds
    setTimeout(() => {
      if (!modal.classList.contains('open')) {
        greetingBubble.classList.add('show');
        playNotificationChime(false);
      }
    }, 2500);

    // Exit intent trigger
    let exitShown = false;
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 15 && !exitShown && !modal.classList.contains('open')) {
        exitShown = true;
        exitBox.classList.add('active');
        playNotificationChime(true);
      }
    });

    // Quick Action Chips Click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('jisr-chip') && e.target.getAttribute('data-query')) {
        const query = e.target.getAttribute('data-query');
        sendMessage(query);
      }
    });

    // Handle Form Submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      sendMessage(text);
      chatInput.value = '';
    });

    function sendMessage(text) {
      // User bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'jisr-msg jisr-msg-user';
      userBubble.textContent = text;
      const userTime = document.createElement('div');
      userTime.className = 'jisr-msg-time';
      userTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      userBubble.appendChild(userTime);

      chatMessages.insertBefore(userBubble, typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Show typing indicator
      typingIndicator.classList.add('active');
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Generate Response
      setTimeout(() => {
        typingIndicator.classList.remove('active');

        const resp = generateGuidanceResponse(text);
        const botBubble = document.createElement('div');
        botBubble.className = 'jisr-msg jisr-msg-bot';

        let formattedText = resp.text.replace(/\n/g, '<br>');
        // bold markdown replacement
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        botBubble.innerHTML = formattedText;

        // Render Action Buttons if available
        if (resp.actions && resp.actions.length > 0) {
          const actContainer = document.createElement('div');
          actContainer.className = 'jisr-msg-actions';

          resp.actions.forEach(act => {
            const a = document.createElement('a');
            a.className = 'jisr-action-btn';

            if (act.type === 'wa') {
              a.classList.add('jisr-btn-wa-order');
              a.target = '_blank';
              a.href = 'https://wa.me/971545230105?text=' + encodeURIComponent(act.query || '');
              a.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${act.label}`;
            } else if (act.type === 'mail') {
              a.classList.add('jisr-btn-mail-order');
              a.href = `mailto:jisralmaliha@gmail.com?subject=${encodeURIComponent(act.subject || 'Inquiry')}&body=${encodeURIComponent(act.body || '')}`;
              a.innerHTML = `<i class="fa-solid fa-envelope"></i> ${act.label}`;
            }

            actContainer.appendChild(a);
          });

          botBubble.appendChild(actContainer);
        }

        const botTime = document.createElement('div');
        botTime.className = 'jisr-msg-time';
        botTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        botBubble.appendChild(botTime);

        chatMessages.insertBefore(botBubble, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        playNotificationChime(false);
      }, 650);
    }
  }

  // Auto initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChatWidget);
  } else {
    initAIChatWidget();
  }
})();
