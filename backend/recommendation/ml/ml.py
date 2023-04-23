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

feature_list = np.array(pickle.load(open("featurevector.pkl", "rb")))
filename = pickle.load(open("filenames.pkl", "rb"))

model=ResNet50(weights='imagenet', include_top=False, input_shape=(224,224,3))
model.trainable=False
model=tf.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

st.title('fashion recommendation system')

def save_uploaded_file(uploaded_file):
    try:
        with open(os.path.join('uploads',uploaded_file.name),'wb') as f:
            f.write(uploaded_file.getbuffer())
        return 1
    except:
        return 0

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
    neighbors = NearestNeighbors(n_neighbors=6, algorithm="brute", metric="euclidean")
    neighbors.fit(feature_list)
    distance, indices = neighbors.kneighbors([features])
    return indices

uploaded_file = st.file_uploader("Choose an image")
print(uploaded_file)
if uploaded_file is not None:
    if save_uploaded_file(uploaded_file):
        display_image = Image.open(uploaded_file)
        resized_image = display_image.resize((200,200))
        st.image(resized_image)

        features = extract_feature(os.path.join('uploads',uploaded_file.name),model)

        indices = recommend(features, feature_list)

        col1,col2,col3,col4,col5 = st.beta_columns(5)

        with col1:
            st.image(filename[indices[0][1]])
        with col2:
            st.image(filename[indices[0][2]])
        with col3:
            st.image(filename[indices[0][3]])
        with col4:
            st.image(filename[indices[0][4]])
        with col5:
            st.image(filename[indices[0][5]])
    else:
        st.header("Some error occurred in file upload")