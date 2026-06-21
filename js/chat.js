// Create Chat Widget HTML structure
const chatWidgetHTML = `
  <div id="ai-chat-widget" class="chat-widget-container">
    <div id="chat-window" class="chat-window hidden">
      <div class="chat-header">
        <div class="chat-title">
          <i class="fa-solid fa-robot"></i> Sathvik AI
        </div>
        <button id="close-chat" class="chat-close-btn" aria-label="Close Chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="chat-messages" class="chat-messages">
        <div class="chat-message bot">
          Hi! I'm Sathvik's personal AI assistant. I can answer questions about his education, experience, volunteering, or skills. What would you like to know?
        </div>
      </div>
      <form id="chat-form" class="chat-input-area">
        <input type="text" id="chat-input" placeholder="Ask me anything..." autocomplete="off" required />
        <button type="submit" id="send-btn" class="chat-send-btn" aria-label="Send Message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
    <div class="chat-toggle-wrapper">
      <div class="chat-tooltip">Want to know more about me?</div>
      <button id="chat-toggle-btn" class="chat-toggle-btn" aria-label="Open Chat">
        <i class="fa-solid fa-message"></i>
      </button>
    </div>
  </div>
`;

// Inject into body if it doesn't exist
if (!document.getElementById('ai-chat-widget')) {
  document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
}

const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatIcon = chatToggleBtn.querySelector('i');

let isChatOpen = false;
const conversationHistory = [];

function toggleChat() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatWindow.classList.remove('hidden');
    chatWindow.classList.add('fade-in');
    chatIcon.classList.remove('fa-message');
    chatIcon.classList.add('fa-xmark');
    setTimeout(() => chatInput.focus(), 300);
  } else {
    chatWindow.classList.add('hidden');
    chatWindow.classList.remove('fade-in');
    chatIcon.classList.remove('fa-xmark');
    chatIcon.classList.add('fa-message');
  }
}

chatToggleBtn.addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  
  // Simple markdown link parser
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  msgDiv.innerHTML = formattedText;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTypingIndicator() {
  const indicatorDiv = document.createElement('div');
  indicatorDiv.className = 'chat-message bot typing-indicator';
  indicatorDiv.id = 'typing-indicator';
  indicatorDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  chatMessages.appendChild(indicatorDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  conversationHistory.push({ role: 'user', content: userText });
  chatInput.value = '';

  appendTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText, history: conversationHistory.slice(-10) })
    });

    removeTypingIndicator();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 500 && errorData.error && errorData.error.includes("API key not configured")) {
           appendMessage("Backend is ready! Waiting for the site owner to configure the GEMINI_API_KEY in Cloudflare Pages.", 'bot error');
      } else {
           const detailedError = errorData.error || `HTTP ${response.status} ${response.statusText}`;
           appendMessage(`Backend Error: ${detailedError}`, 'bot error');
      }
      return;
    }

    const data = await response.json();
    conversationHistory.push({ role: 'assistant', content: data.reply });
    appendMessage(data.reply, 'bot');

  } catch (error) {
    removeTypingIndicator();
    appendMessage("Oops, something went wrong checking the connection. Please try again.", 'bot error');
    console.error("Chat API Error:", error);
  }
});
