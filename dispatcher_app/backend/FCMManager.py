import firebase_admin
from firebase_admin import auth, credentials, messaging

cred = credentials.Certificate("/Users/julieveitch/Desktop/Praca-Dyplomowa/praca-dyplomowa/dispatcher_app/backend/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def sendPush(title, msg, registration_token):
    message = messaging.Message(
        notification=messaging.Notification(
            title = title,
            body = msg,
        ),
        token = registration_token,
    )

    response = messaging.send(message)
    print('Successfully sent message: ', response)