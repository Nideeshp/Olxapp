import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";

function Posts() {
  const { firebaseApp } = useContext(FirebaseContext);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firebaseApp.firestore().collection("products").get();
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setPostDetails(allPost);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [firebaseApp, setPostDetails]);

  const handleProductClick = (product) => {
    setPostDetails(product); // Set the PostDetails context before navigating
    navigate('/view');
  };

  // Check if postDetails is an array before using .map
  if (!Array.isArray(postDetails)) {
    return <p>Loading...</p>; // or handle the loading state as needed
  }

  return (
    <div className="postParentDiv">
      <div className="cards">
        {postDetails.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
