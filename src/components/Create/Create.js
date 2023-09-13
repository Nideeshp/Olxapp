import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import "firebase/storage";
import { useNavigate } from "react-router-dom"; 


const Create = () => {
  const { firebaseApp } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate=useNavigate()

  const date=new Date()

  const handleSubmit = () => {
    if (image) {
      const imageRef = firebaseApp.storage().ref(`/image/${image.name}`);

      imageRef
        .put(image)
        .then(({ ref }) => {
          return ref.getDownloadURL();
        })
        .then((url) => {
          console.log(url);

          firebaseApp.firestore().collection("products").add({
            name,
            category,
            price,
           url, 
           userId:user.uid,
           createdAt:date.toDateString()
          });
          navigate('/')
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      console.log("No image selected.");
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
