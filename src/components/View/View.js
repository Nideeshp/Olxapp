import React, { useEffect, useContext, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);
  const { firebaseApp } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (postDetails && postDetails.userId) {
          const { userId } = postDetails;
          const userRef = firebaseApp.firestore().collection('users').doc(userId);
          const doc = await userRef.get();

          if (doc.exists) {
            const userData = doc.data();
            setUserDetails(userData);
          } else {
            console.error('User not found');
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserDetails();
  }, [firebaseApp, postDetails]);

  return (
    <div className="viewParentDiv">
      {postDetails && postDetails.url ? (
        <div className="imageShowDiv">
          <img src={postDetails.url} alt="" />
        </div>
      ) : (
        <p>Loading image...</p>
      )}

      <div className="rightSection">
        <div className="productDetails">
          {postDetails ? (
            <>
              {postDetails.price && (
                <p>&#x20B9; {postDetails.price}</p>
              )}
              {postDetails.name && (
                <span>{postDetails.name}</span>
              )}
              {postDetails.category && (
                <p>{postDetails.category}</p>
              )}
              {postDetails.date && (
                <span>{postDetails.date}</span>
              )}
            </>
          ) : (
            <p>Loading post details...</p>
          )}
        </div>

        {userDetails.username ? (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
}

export default View;
