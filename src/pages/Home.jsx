import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  padding: 10px 70px;
  width: 900px;
`;
const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 12px;
  column-gap: 12px;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 250px;
  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 250px;
  height: 220px;
`;
const ImgName = styled.p`
  margin-top: 4px;
  font-weight: 600;
  font-size: 22px;
`;
const ImgTxt = styled.p`
  font-size: 14px;
  opacity: 0.5;
  margin-top: 5px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
`;
const ProfileIntro = styled.div`
  margin-left: 10px;
`;
const ProfileTitle = styled.h1`
  font-weight: 600;
  font-size: 26px;
  margin-bottom: 2px;
`;
const ProfileTxt = styled.p`
  font-size: 17px;
  opacity: 0.7;
`;
const ProfileImgCount = styled.p`
  margin-top: 13px;
  font-size: 15px;
  font-weight: 600;
`;
const Button = styled.button`
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

function Home() {
  const [imgCount, setImgCount] = useState(0);
  const [img, setImg] = useState([]);
  const navigate = useNavigate();

// 가져와 사용하기~
  useEffect(() => {
    axios.get(`https://gallery.jmoomin.com/imageAll`).then((res) => {
      setImg(res.data);
    });
    axios
      .get(`https://gallery.jmoomin.com/imageSize`)
      .then((res) => setImgCount(res.data));
  }, []);
// ~가져와 사용하기

  return (
    <Container>
      <Main>
        <Button onClick={() => navigate(-1)}>
          <FaRegHandPointLeft />
        </Button>
        <Profile>
          <ProfileImg
            src="img.jpg"
            alt=""
            width="110"
            height="110"
          ></ProfileImg>
          <ProfileIntro>
            <ProfileTitle>likelion_11th_frontend</ProfileTitle>
            <ProfileTxt>
              멋쟁이사자처 11기 여러분의 소중한 추억들 보관합니다.😎
            </ProfileTxt>
            <ProfileImgCount>게시물 {imgCount}개</ProfileImgCount>
          </ProfileIntro>
        </Profile>
        <ImgGrid>
          {img.length === 0 ? (
            <h1>게시물이 없습니다.</h1>
          ) : (
            img.map((img) => {
              return (
                <ItemContainer
                  onClick={() => navigate(`/feed/${img.id.slice(5, 6)}`)}
                >
                  <Img key={img.id} alt="#" src={img.imageURL}></Img>
                  <ImgName>{img.imageName}</ImgName>
                  <ImgTxt>{img.imageText}</ImgTxt>
                </ItemContainer>
              );
            })
          )}
        </ImgGrid>
      </Main>
    </Container>
  );
}
export default Home;