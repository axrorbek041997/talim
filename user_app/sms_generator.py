import requests
from requests.structures import CaseInsensitiveDict
import json


def getToken():
    url = "https://notify.eskiz.uz/api/auth/login"

    data = {
        'email': 'auabdul87@gmail.com',
        'password': "h7PlM6nVwrPPFmVWkYZxqbdNbtpJUa5gVUGDX6VU"
    }

    resp = requests.post(url, data=data)

    return json.loads(resp.text)['data']['token']


def sendSMS(phone, code):
    url = "https://notify.eskiz.uz/api/message/sms/send"

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    headers["Authorization"] = f"Bearer {getToken()}"

    data = {
        "mobile_phone": phone,
        "message": f"edu.profedu.uz platformasida ro‘yxatdan o‘tish uchun tasdiqlash kodi {code}. Kodni hech kimga ko‘rsatmang.",
        "from": "4546",
        "callback_url": "http://0000.uz/test.php"
    }

    resp = requests.post(url, data=data, headers=headers)

    return resp.status_code

