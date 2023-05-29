const NOTIFICATION_SECTION_ID = "notification-section-id";
const NOTIFICATION_MSG_CLASS ='notification-msg'
const ANIMATION_TIME = 1000

export default class NotificationBar {
  #notificationSectionElement;
  #currentNotifications;
  #displayTime;

  constructor(displayTime) {
    this.#displayTime = displayTime * 1000;
    this.#currentNotifications = []
    this.#notificationSectionElement = document.getElementById(
      NOTIFICATION_SECTION_ID
    );
    console.log(this)
  }
  something() {
    console.log('fsdfsf')
  }
  displayMessage(id, title, body) {
    this.#currentNotifications.push({id, title, body})
    this.#renderMessages()

    setTimeout(() => {
      const msgElement = document.getElementById(getMessageId(id))
      
      msgElement.style.transform = "translateX(150%)";
      msgElement.style.opacity = 0
      this.#currentNotifications = this.#currentNotifications.filter((notification) => notification.id != id)

      setTimeout(() => {
        this.#notificationSectionElement.removeChild(msgElement)
      }, ANIMATION_TIME)
    }, this.#displayTime)
  }

  #renderMessages() {
    const messages = this.#currentNotifications.map((notification) => 
      this.#buildMessage(notification.id, notification.title, notification.body)).reverse().join('')
    this.#notificationSectionElement.innerHTML = messages
  }

  #buildMessage(id, title, body) {
    return `
      <div class="${NOTIFICATION_MSG_CLASS}" id="${getMessageId(id)}">
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
    `
  }
}

function getMessageId(id) {
  return `${NOTIFICATION_MSG_CLASS}-${id}`
}
