import { Template } from 'meteor/templating';
import brain from 'brain.js';

import './main.html';

Template.chatbot.onCreated(function chatbotOnCreated() {
  this.response = '';
});

Template.chatbot.helpers({
  response() {
    return '';
  },
});

Template.chatbot.events({
  'click button'(event, instance) {

  },
});
