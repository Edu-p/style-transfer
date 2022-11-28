from re import I
import string
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
from fastapi.responses import StreamingResponse
import cycleGAN as cycleGAN
from PIL import Image
import numpy as np
import PIL.Image as Image
from array import array
import os 
import io
from typing import Dict
import base64
from fastapi import File
from PIL import Image

class imageItem(BaseModel):
    num: int
    img: bytes 


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/vector_image")
async def image_endpoint(item:imageItem):
    
    item_dict = item.dict()

    img_header = item_dict['img'][:23]

    with open("image_received_target/imageUnstylized.png", "wb") as fh:
        fh.write(base64.decodebytes(item_dict['img'][22:]))
    img_path_new = cycleGAN.runModel(path_image_to_transfer='C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/image_received_target', choosed_model=int(item_dict["num"]))
    
    encoded_string = img_header

    with open(img_path_new, "rb") as image_file:
        encoded_string += base64.b64encode(image_file.read())

    
    return encoded_string  