const webpush = require('web-push');

const vapidKeys = {
  publicKey:
    'BJmlURnx2eyRV-rpBzXXhNK_ZLI1fvZS3xqLB-fCpE68KrUMH_Lx-UsWlwnAmzBk9PawmjHlgautBLw1BSRiNOA',
  privateKey: '46iwYbkbT3vZW1_Jwc-r5unsD27PZ7V_x9gSOcr0EPQ',
};

webpush.setVapidDetails(
  'mailto:mbilly99945@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/dTGBcMQkVzg:APA91bFOIykIXo7v7yg-n40pS_6y-2Jas0gjIiX8uUHZglWq09Z4V2_K1ppf-JT5fpedV05jsRcnXMzdi42mcLTc9RMynCckueRksXkypbLr67tDBXh2EhzQjBtqK0kkp34i29fg-krb',
  keys: {
    p256dh:
      'BE6is8+iqdvm+nQ+UngHyOprBtqOhMvl4zMLul2WOQ0/NI+h8M3+5/Cex+celyJ5u+iXHnVJLvq45Z5wHNrB5y8=',
    auth: '/7rjUoxtwQNc6Ka4LQ+x/Q==',
  },
};

const payload = 'Good!Now U Are Barcelonista';

let option = {
  gcmAPIKey: '707542315163',
  TTL: 60,
};

webpush.sendNotification(pushSubscription, payload, option);
