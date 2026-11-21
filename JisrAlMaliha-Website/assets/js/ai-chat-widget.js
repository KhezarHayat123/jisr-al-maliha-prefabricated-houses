/* ========================================================
   JISR AL MALIHA - 24/7 AI LIVE SUPPORT & CHAT WIDGET
   Left-Aligned Floating Widget with Auto-Reply & Animations
   ======================================================== */

(function () {
  'use strict';

  // Inject Styles dynamically if not already loaded
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
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0b1526 0%, #1e293b 100%);
        border: 2px solid #f59e0b;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(245, 158, 11, 0.3);
        position: relative;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .jisr-ai-btn:hover {
        transform: scale(1.08) translateY(-2px);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(245, 158, 11, 0.5);
        border-color: #fbbf24;
      }
      .jisr-ai-btn i {
        font-size: 26px;
        color: #f59e0b;
        transition: transform 0.3s ease;
      }
      .jisr-ai-btn:hover i {
        transform: rotate(10deg) scale(1.1);
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
        border: 1px solid rgba(245, 158, 11, 0.35);
        padding: 8px 14px;
        border-radius: 24px;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .jisr-ai-pill:hover {
        border-color: #f59e0b;
        background: #1e293b;
        transform: translateX(3px);
      }
      .jisr-ai-pill-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #10b981;
      }

      /* Greeting Bubble Popup */
      .jisr-ai-greeting-bubble {
        position: absolute;
        bottom: 74px;
        left: 0;
        width: 290px;
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid rgba(245, 158, 11, 0.4);
        padding: 14px 16px;
        border-radius: 14px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        font-size: 13px;
        line-height: 1.45;
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
        left: 24px;
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
        font-size: 14px;
        cursor: pointer;
        padding: 2px 6px;
      }
      .jisr-ai-greeting-close:hover {
        color: #f59e0b;
      }

      /* Chat Modal Drawer (Left Aligned) */
      .jisr-chat-modal {
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 380px;
        max-width: calc(100vw - 36px);
        height: 560px;
        max-height: calc(100vh - 48px);
        background: #090e17;
        border: 1px solid rgba(245, 158, 11, 0.35);
        border-radius: 18px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65), 0 0 30px rgba(245, 158, 11, 0.15);
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f59e0b;
        color: #0b1526;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 800;
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
      }
      .jisr-chat-title {
        font-size: 14px;
        font-weight: 700;
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
        color: #f59e0b;
        text-decoration: none;
        display: inline-block;
        margin-top: 2px;
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
        max-width: 84%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.45;
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
        margin-top: 4px;
        text-align: right;
      }

      /* Quick Action Chips */
      .jisr-chat-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 6px;
      }
      .jisr-chip {
        background: rgba(245, 158, 11, 0.12);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: #fbbf24;
        padding: 6px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
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
        border-top: 1px solid rgba(245, 158, 11, 0.2);
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
        width: 38px;
        height: 38px;
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

  // Knowledge Base & AI Auto-Reply Matrix
  const KNOWLEDGE_BASE = [
    {
      keywords: ['hi', 'hello', 'salam', 'hey', 'start', 'help'],
      reply: "مرحباً بكم في جسر المليحة لتجارة البيوت الجاهزة! Welcome to Jisr Al Maliha Prefabricated Houses. We are UAE certified manufacturers of Porta Cabins, Luxury Washrooms, and Site Offices (SEDD #922593). How can we assist you today?"
    },
    {
      keywords: ['price', 'cost', 'quote', 'quotation', 'rate', 'how much'],
      reply: "Our factory-direct prices vary by dimensions and finish:\n• Single Washroom (1.2m x 1.2m): Starts from AED 3,200\n• 20ft Site Office Cabin (6m x 3m): Starts from AED 9,500\n• 40ft Multi-Room Cabin (12m x 3m): Starts from AED 17,500\nAll units include thermal sandwich panels, steel chassis, electrical wiring & DB box. Please provide your required size and delivery Emirate for an exact quote!"
    },
    {
      keywords: ['washroom', 'toilet', 'bathroom', 'ablution', 'wc'],
      reply: "Our prefabricated washrooms feature:\n• High-grade porcelain ceramic WC & basins\n• Waterproof PVC / PU insulated sandwich panels\n• Concealed copper plumbing & instant water heater\n• Heavy-duty non-slip aluminum checkered or ceramic tile floors\nAvailable in single units (1.2x1.2m), double cubicles (2.4x1.2m), and commercial ablution blocks."
    },
    {
      keywords: ['office', 'cabin', 'porta', 'site office', 'executive'],
      reply: "Jisr Al Maliha Porta Cabins are engineered for the UAE summer:\n• 50mm / 75mm / 100mm fire-rated insulated sandwich panels\n• Heavy-duty I-beam steel chassis foundation (crane hoistable)\n• Pre-wired distribution board, LED lights, and split AC provisions\n• Sliding double-glazed windows with security grilles.\nSizes available: 3x3m, 6x3m, 9x3m, 12x3m, or custom builds."
    },
    {
      keywords: ['double', 'storey', 'two', 'stackable', 'camp', 'accommodation'],
      reply: "Yes! We specialize in 2-Storey Modular Accommodation & Site Offices. Units are modular, stackable, and include external heavy-duty galvanized steel staircases, safety handrails, and upper deck walkways. Ideal for construction projects and labor camps."
    },
    {
      keywords: ['delivery', 'sharjah', 'dubai', 'abu dhabi', 'ajman', 'rak', 'fujairah', 'uaaq', 'al ain'],
      reply: "We deliver across all 7 UAE Emirates (Sharjah, Dubai, Abu Dhabi, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain, and Al Ain). Delivery includes flatbed transport, crane offloading, and on-site positioning."
    },
    {
      keywords: ['license', 'sedd', 'certified', 'sharjah', 'approved'],
      reply: "Jisr Al Maliha Prefabricated Houses TR. L.L.C is officially licensed under Sharjah Economic Development Department (SEDD License #922593) with full compliance to UAE engineering and Civil Defence fire standards."
    },
    {
      keywords: ['call', 'phone', 'number', 'whatsapp', 'contact', 'mobile'],
      reply: "You can reach our engineering team directly via:\n📞 Direct Call: +971 56 938 6872\n💬 WhatsApp Line 1: +971 54 523 0105\n💬 WhatsApp Line 2: +971 52 863 4547\n📧 Email: jisralmaliha@gmail.com"
    },
    {
      keywords: ['email', 'gmail', 'mail'],
      reply: "Our official factory email is: jisralmaliha@gmail.com\nAny inquiry sent here receives an instant automated response and formal quotation from our senior engineering estimator."
    }
  ];

  function getAutoReply(userInput) {
    const text = userInput.toLowerCase();

    // Check for phone number patterns
    const phoneMatch = text.match(/(\+?\d{8,14})/);
    if (phoneMatch) {
      // Save lead locally
      try {
        const leads = JSON.parse(localStorage.getItem('jisr_leads') || '[]');
        leads.unshift({
          id: Date.now(),
          date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
          type: 'AI Live Chat Lead',
          contactNumber: phoneMatch[0],
          notes: 'Captured via Left AI Live Chat Assistant: ' + userInput
        });
        localStorage.setItem('jisr_leads', JSON.stringify(leads));
      } catch (e) {}

      return "✅ Thank you! We have logged your contact number (" + phoneMatch[0] + "). An official quote will be dispatched to jisralmaliha@gmail.com and our senior engineer will contact you via WhatsApp shortly!\n\nWould you also like us to email you our 2026 PDF Product Catalog?";
    }

    // Match keywords
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => text.includes(k))) {
        return item.reply;
      }
    }

    // Default Fallback
    return "Thank you for your message! Our engineering desk specializes in Custom Porta Cabins, Prefab Washrooms, Modular Camps, and Steel Structures.\n\nPlease share your required dimensions, product type, and phone number so we can prepare an instant formal quotation for you, or email directly to jisralmaliha@gmail.com.";
  }

  // Create DOM Elements
  function initAIChat() {
    // 1. Launcher Container
    const launcher = document.createElement('div');
    launcher.className = 'jisr-ai-launcher';
    launcher.id = 'jisrAiLauncher';

    launcher.innerHTML = `
      <!-- Greeting Popout -->
      <div class="jisr-ai-greeting-bubble" id="jisrGreetingBubble">
        <button class="jisr-ai-greeting-close" id="jisrGreetingClose">&times;</button>
        <div style="font-weight:700; color:#f59e0b; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-robot"></i> 24/7 AI Engineering Desk
        </div>
        Need an instant quote or technical specifications? Chat with our AI support or email <strong style="color:#fbbf24;">jisralmaliha@gmail.com</strong>!
      </div>

      <!-- Trigger Button -->
      <div class="jisr-ai-btn" id="jisrAiToggleBtn" title="Chat with 24/7 AI Engineering Support">
        <i class="fa-solid fa-comments"></i>
        <div class="jisr-ai-online-dot"></div>
      </div>

      <!-- Text Pill -->
      <div class="jisr-ai-pill" id="jisrAiPill">
        <div class="jisr-ai-pill-dot"></div>
        <span>AI Support 24/7</span>
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
              <i class="fa-solid fa-circle" style="font-size:8px;"></i> Online 24/7 &bull; Instant Auto-Reply
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
          السلام عليكم / Hello! Welcome to <strong>Jisr Al Maliha Prefabricated Houses TR. L.L.C</strong>. 
          I am your 24/7 AI Engineering Assistant. Ask me about Porta Cabins, Prefab Washrooms, Modular Offices, Sandwich Panels, or Delivery across all 7 UAE Emirates!
          <div class="jisr-msg-time">Just now</div>

          <!-- Quick Action Chips -->
          <div class="jisr-chat-chips">
            <span class="jisr-chip" data-query="Porta Cabin Prices">🏢 Porta Cabin Prices</span>
            <span class="jisr-chip" data-query="Prefab Washrooms">🚿 Prefab Washrooms</span>
            <span class="jisr-chip" data-query="Double Storey Modular">🏗️ 2-Storey Modular</span>
            <span class="jisr-chip" data-query="Delivery Across UAE">🚚 Delivery Schedule</span>
            <span class="jisr-chip" data-query="Official Phone Numbers">📞 Phone & WhatsApp</span>
            <a href="mailto:jisralmaliha@gmail.com?subject=Prefabricated%20Houses%20Quotation%20Request" class="jisr-chip" style="background:rgba(239, 68, 68, 0.15); color:#fca5a5; border-color:rgba(239,68,68,0.4);">
              📧 Email jisralmaliha@gmail.com
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
        <input type="text" class="jisr-chat-input" id="jisrChatInput" placeholder="Ask pricing, sizes, delivery..." required autocomplete="off">
        <button type="submit" class="jisr-chat-send" title="Send message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(modal);

    // Event Listeners
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

    function openChat() {
      modal.classList.add('open');
      greetingBubble.classList.remove('show');
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

    // Show greeting bubble after 2.5 seconds
    setTimeout(() => {
      if (!modal.classList.contains('open')) {
        greetingBubble.classList.add('show');
      }
    }, 2500);

    // Handle Quick Chips
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('jisr-chip') && e.target.getAttribute('data-query')) {
        const query = e.target.getAttribute('data-query');
        sendMessage(query);
      }
    });

    // Form Submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      sendMessage(text);
      chatInput.value = '';
    });

    function sendMessage(text) {
      // Append User Message
      const userBubble = document.createElement('div');
      userBubble.className = 'jisr-msg jisr-msg-user';
      userBubble.textContent = text;
      const userTime = document.createElement('div');
      userTime.className = 'jisr-msg-time';
      userTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      userBubble.appendChild(userTime);

      chatMessages.insertBefore(userBubble, typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Show Typing Indicator
      typingIndicator.classList.add('active');
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate AI Processing & Auto-Reply
      setTimeout(() => {
        typingIndicator.classList.remove('active');

        const replyText = getAutoReply(text);
        const botBubble = document.createElement('div');
        botBubble.className = 'jisr-msg jisr-msg-bot';
        botBubble.innerHTML = replyText.replace(/\n/g, '<br>');

        const botTime = document.createElement('div');
        botTime.className = 'jisr-msg-time';
        botTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        botBubble.appendChild(botTime);

        chatMessages.insertBefore(botBubble, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 700);
    }
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChat);
  } else {
    initAIChat();
  }
})();
