from flask import Flask, request, jsonify, send_file
import json
import os
import base64

from myCloud2 import *
from blacklist import *

app = Flask(__name__)
#app.config["DEBUG"] = True

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('myList',[])
    return response

@app.route('/api/v1/myWordCloud', methods=['POST', 'GET'])
def api_myList():
    data = request.get_json()
    
    data = data.get('myList')
    data = data.split(',')
    
    data = blacklist(data)
    data = ' '.join(data)

    image = myCloud2(data)

    nom_image ='temp.png'
    image.save('./myclouds/'+nom_image)

    image = base64.b64encode(open('./myclouds/'+nom_image,"rb").read())
    return image

if __name__ == "__main__":
	app.run(host='0.0.0.0')
