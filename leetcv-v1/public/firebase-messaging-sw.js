importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDRJyUvBkkPuC4HE98Dq9-4ozgzFWHZ5_E",
  authDomain: "leetcv-prod.firebaseapp.com",
  projectId: "leetcv-prod",
  storageBucket: "leetcv-prod.appspot.com",
  messagingSenderId: "643653913591",
  appId: "1:643653913591:web:8552dc73f031925c0e7cf2",
  measurementId: "G-KXTSPC3V7M",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    image: payload.data.imageUrl,
    data: {
      time: new Date(Date.now().toString()),
      click_action: payload.data.click_action,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  const clickAction = event.notification.data.click_action;
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === clickAction && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
  );
});
