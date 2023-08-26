const socket = io();

const messagesContainer = document.querySelector('.messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

function wordToEmoji(word) {
  const emojiMap = {
    "happy": "😄",
    "sad": "😢",
    "love": "❤️",
    "angry": "😡",
    "laugh": "😂",
    "cool": "😎",
    "cry": "😭",
    "confused": "😕",
    "heart": "💖",
    "star": "⭐"
  };

  const lowerCaseWord = word.toLowerCase();
  if (emojiMap.hasOwnProperty(lowerCaseWord)) {
    return emojiMap[lowerCaseWord];
  } else {
    return word; // Return the original word if no matching emoji found
  }
}

function convertSentenceToEmojis(sentence) {
  const words = sentence.split(' ');
  const convertedWords = words.map(word => wordToEmoji(word));
  return convertedWords.join(' ');
}

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    const emojiMessage = convertSentenceToEmojis(message); // Convert matching words to emojis
    socket.emit('message', emojiMessage);
    messageInput.value = '';
  }
});

socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `
    <div class="message sent">
      <div class="message-content">${message}</div>
    </div>
  `;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
