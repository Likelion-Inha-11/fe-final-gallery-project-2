import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaRegHandPointLeft } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #9c9c9c;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0px 70px 40px 70px;
  width: 900px;
`;
const Head = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
`;
const HeadText = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 600;
  }
  p {
    margin-top: 10px;
  }
`;
const Img = styled.img`
  width: 90%;
  height: 700px;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentInput = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 25px;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
    padding: 17px 0px 14px 8px;
  }
  button {
    width: 10%;
    position: absolute;
    right: 0;
    top: 13px;
    border: none;
    background-color: inherit;
    color: #067bcc;
    font-weight: 600;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 13px 0px;
  position: relative;
  div {
    display: flex;
    width: 90%;
    margin-left: 15px;
    p:nth-child(1) {
      font-weight: 600;
      margin-right: 20px;
    }
  }
  button {
    width: 10%;
    position: absolute;
    right: 0;
    border: none;
    background-color: inherit;
    opacity: 0.5;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const CommentsCount = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-left: 22px;
  margin-bottom: 10px;
`;
const Btn = styled.button`
  &:hover {
    cursor: pointer;
  }
  font-size: 40px;
  position: absolute;
  top: 30px;
  opacity: 0.8;
  border: none;
  background-color: transparent;
  left: 20px;
`;

function Feed() {
  const { feedId } = useParams();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  function UploadComment() {
    axios.post(`https://gallery.jmoomin.com/image${feedId}/comments`, {
      commentBody: comment,
    });
    axios
      .get(`https://gallery.jmoomin.com/image${feedId}/comments`)
      .then((res) => {
        console.log(res);
        setComments(res.data);
        setComment("");
      });
  }
  function DeleteComment(id) {
    axios.delete(`https://gallery.jmoomin.com/image${feedId}/comments/${id}`);
  }

  useEffect(() => {
    axios.get(`https://gallery.jmoomin.com/imageAll`).then((res) => {
      setData(res.data.filter((v) => v.id === `image${feedId}`)[0]);
    }, []);
  }, []);

  useEffect(() => {
    axios
      .get(`https://gallery.jmoomin.com/image${feedId}/comments`)
      .then((res) => setComments(res.data));
  }, [feedId, comments]);

  return (
    <Container>
      <Main>
        <Btn onClick={() => navigate(-1)}>
          <FaRegHandPointLeft />
        </Btn>
        <Head>
          <HeadText>
            <h1>{data.imageName}</h1>
            <p>{data.imageText}</p>
          </HeadText>
          <p>댓글 {comments.length}개</p>
        </Head>
        <Img src={data.imageURL}></Img>
        <CommentBox>
          <CommentInput>
            <input
              type="text"
              placeholder="댓글 작성..."
              onChange={(event) => setComment(event.target.value)}
              value={comment}
            ></input>
            <button onClick={() => UploadComment()}>게시</button>
          </CommentInput>
          <CommentsCount>
            <p>{comments.length} Comments</p>
          </CommentsCount>
          <CommentList>
            {comments.map((comment) => {
              return (
                <Comment key={comment.id}>
                  <div>
                    <p>익명</p>
                    <p>{comment.commentBody}</p>
                  </div>
                  <button onClick={() => DeleteComment(comment.id)}>
                    삭제
                  </button>
                </Comment>
              );
            })}
          </CommentList>
        </CommentBox>
      </Main>
    </Container>
  );
}
export default Feed;