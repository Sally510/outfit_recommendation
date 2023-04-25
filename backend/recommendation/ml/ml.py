import streamlit as st
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
import cv2
import numpy as np
from numpy.linalg import norm
import pickle
from sklearn.neighbors import NearestNeighbors
import os
from tqdm import tqdm
from PIL import Image

feature_list = np.array(pickle.load(open(os.getcwd() + "/recommendation/ml/data/featurevector.pkl", "rb")))
filename = pickle.load(open(os.getcwd() + "/recommendation/ml/data/filenames.pkl", "rb"))

model=ResNet50(weights='imagenet', include_top=False, input_shape=(224,224,3))
model.trainable=False
model=tf.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

base_path = os.path.join(os.getcwd(), 'uploads')  

def save_uploaded_file(name, file):
    try:
        if not os.path.exists(base_path):
            os.makedirs(base_path)
        path = os.path.join(base_path, name)
        with open(path,'wb') as f:
            f.write(file)
        return True
    except:
        return False

def extract_feature(img_path, model):
    img=cv2.imread(img_path)
    img=cv2.resize(img, (224,224))
    img=np.array(img)
    expand_img=np.expand_dims(img, axis=0)
    pre_img=preprocess_input(expand_img)
    result=model.predict(pre_img).flatten()
    normalized = result/norm(result)
    return normalized

def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=7, algorithm="brute", metric="euclidean")
    neighbors.fit(feature_list)
    distance, indices = neighbors.kneighbors([features])
    indices1 = indices[0]
    filenames = []
    for i in indices1:
        filenames.append(filename[i])        
    print(filenames)
    return filenames

def process_image(name, image):
    if save_uploaded_file(name, image):
        features = extract_feature(os.path.join(base_path, name), model)

        return recommend(features, feature_list)