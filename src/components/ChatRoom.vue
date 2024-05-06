<template>
  <div class="chat-room">
    <h3>Simple Chat
    </h3>
    <div class="message-container">
      <ul class="messages">
        <li v-for="message in messages" :key="message.id" :class="{ 'my-message': message.source === 'user', 'ai-message': message.source === 'ai' }">
          <span v-html="formatMessage(message.text)"></span>
        </li>
      </ul>
    </div>
    <div class="input-container">
      <PTextarea v-model="newMessage" placeholder="Type a message..." class="p-inputtext-sm chat-ptextarea" />
      <PButton label="Send" @click="sendMessage" class="p-button-success" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import PTextarea from 'primevue/textarea';
import PButton from 'primevue/button';

export default {
  components: {
    PTextarea,
    PButton
  },
  setup() {
    const messages = ref([]);
    const newMessage = ref('');

    const socket = new WebSocket('ws://localhost:8000/ws');

    function sendMessage() {
      if (newMessage.value.trim()) {
        messages.value.push({ id: Date.now(), text: newMessage.value, source: 'user' });
        socket.send(newMessage.value);
        newMessage.value = '';
      }
    }

    socket.onmessage = (event) => {
      messages.value.push({ id: Date.now(), text: event.data, source: 'ai' });
    };

    function formatMessage(text) {
      return text.replace(/\n/g, '<br>');
    }

    return { messages, newMessage, sendMessage, formatMessage };
  }
};
</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.messages {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.messages li {
  max-width: 70%;
  margin-bottom: 10px;
}

.my-message {
  align-self: flex-start;
  background-color: #007BFF; /* ブルー */
  color: white;
  border-radius: 15px 15px 0 15px;
  padding: 10px;
}

.ai-message {
  align-self: flex-end;
  background-color: #4CAF50; /* グリーン */
  color: white;
  border-radius: 15px 15px 15px 0;
  padding: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.chat-ptextarea {
  flex: 1;
  margin-right: 10px;
}
</style>
