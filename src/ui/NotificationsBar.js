const NOTIFICATION_SECTION_ID = "notification-section-id";
const NOTIFICATION_MSG_CLASS = "notification-msg";
const HIDE_NOTIFICATION_MSG_CLASS = "notification-msg__hide";
const ANIMATION_TIME = 1000;

export default class NotificationBar {
  #notificationSectionElement;
  #displayTime;

  constructor(displayTime) {
    this.#displayTime = displayTime * 1000;
    this.#notificationSectionElement = document.getElementById(
      NOTIFICATION_SECTION_ID
    );
  }

  displayMessage(id, title, body) {
    this.#notificationSectionElement.appendChild(
      this.#buildMessage(id, title, body)
    );

    setTimeout(() => {
      const msgElement = document.getElementById(getMessageId(id));
      msgElement.classList.add(HIDE_NOTIFICATION_MSG_CLASS);

      setTimeout(() => {
        this.#notificationSectionElement.removeChild(msgElement);
      }, ANIMATION_TIME);
    }, this.#displayTime);
  }

  #buildMessage(id, title, body) {
    const newMsgElement = document.createElement("div");
    newMsgElement.id = getMessageId(id);
    newMsgElement.classList.add(NOTIFICATION_MSG_CLASS);
    newMsgElement.innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
    `;
    return newMsgElement;
  }
}

function getMessageId(id) {
  return `${NOTIFICATION_MSG_CLASS}-${id}`;
}
