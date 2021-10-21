import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def sendPush(title, msg, registration_token, dataObject=None):
    message = messaging.Notification(
        notification=messaging.Notification(
            title = title,
            body = msg,
        ),
        data = dataObject,
        tokens = registration_token,
    )

    response = messaging.send_multicast(message)
    print('Successfully sent message: ', response)