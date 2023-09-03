import React, { useState, useEffect } from "react";
import { API } from "../API";
import axios from "axios";
import classes from "./Comments.module.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      const first100Comments = res.data.slice(0, 100);
      console.log(first100Comments);
      setComments(first100Comments);
    });
  }, []);

  const filteredComments = comments.filter((comment) =>
    comment.postId.toString().includes(filter)
  );
  const handlePostSelect = (postId) => {
    setSelectedPost(postId);
    const selectionOfComments = comments.filter(
      (comment) => comment.postId === postId
    );
    setPostComments(selectionOfComments);
  };

  return (
    <div className={classes.container}>
      <div className="mb-3 mx-4 my-4">
        <input
          className="form-control"
          value={filter}
          placeholder="Filter by Id"
          onChange={(e) => {
            setFilter(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <h2>List of Comments</h2>
      <div className={classes.wrapper}>
        <div className={classes["left-side"]}>
          <table class="table caption-top">
            <thead>
              <tr>
                <th className={classes.thead} scope="col">
                  Post Id
                </th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Body</th>
              </tr>
            </thead>
            {filteredComments.map((comment) => (
              <tbody key={comment.id}>
                <tr
                  onClick={() => {
                    handlePostSelect(comment.postId);
                    console.log("hello");
                  }}
                >
                  <tr>{comment.postId}</tr>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={classes["right-side"]}>
          {selectedPost && (
            <div>
              <h3>Selected Comments {selectedPost} </h3>
              <ul>
                {postComments.map((comment) => (
                  <li>
                    Name: {comment.name} <span> Email: {comment.email}</span>
                    <span>Body: {comment.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
