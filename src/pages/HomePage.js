import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import "../style/global.scss";
import { Clock } from "../components/Clock";
import { selectVotes } from "../store/votes/selectors.js";
// import {
//   bootstrapUser,
//   resetFavData,
//   resetUserLoginData,
// } from "../store/admin/slice.js";
// import {
//   removeUser,
//   sendHate,
//   sendLike,
//   resetVotes,
// } from "../store/admin/actions";
import {
  Container,
  Col,
  Image,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { fetchVotes } from "../store/votes/actions";

export default function HomePage() {
  const votes = useSelector(selectVotes);
  //   const fav = userFav.favArray;
  //   const songList = useSelector(selectSongList);
  //   const songsByTitle = useSelector(selectSongsByTitle);
  //   const songsByArtist = useSelector(selectSongsByArtist);
  //   const userId = userFav.userId;
  //   const username = userFav.username;

  const dispatch = useDispatch();

  const [shownoSorting, setShownoSorting] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  //   const [showLyrics, setShowLyrics] = useState(false);
  //   const [showBioPat, setShowBioPat] = useState(false);
  //   const [showBioAnousch, setShowBioAnousch] = useState(false);
  //   const [showContact, setShowContact] = useState(false);
  //   const [chosenSong, setChosenSong] = useState("");
  //   const [listSorting, setListSorting] = useState("names");
  //   const [nextSong, setNextSong] = useState("");
  //   const [previousSong, setPreviousSong] = useState("");
  const onClickShowUserList = () => setShowUserList(true);
  //   const onClickShowSongs = () => setShowSongs(true);
  //   const onClickShowLyrics = () => setShowLyrics(true);
  //   const onClickShowBioPat = () => setShowBioPat(true);
  //   const onClickShowBioAnousch = () => setShowBioAnousch(true);
  //   const onClickShowContact = () => setShowContact(true);

  const hideUserList = () => setShowUserList(false);
  //   const hideSongs = () => setShowSongs(false);
  //   const hideLyrics = () => setShowLyrics(false);
  //   const hideBioPat = () => setShowBioPat(false);
  //   const hideBioAnousch = () => setShowBioAnousch(false);
  //   const hideContact = () => setShowContact(false);

  //   const searchFavData = (favId) => {
  //     return fav.find((u) => u.id === favId);
  //   };
  //   //--------------Lyrics SORTING---------------------------

  //   const sortedSongList = (s) => {
  //     if (s === "id") return songList;
  //     if (s === "title") return songsByTitle;
  //     if (s === "artist") return songsByArtist;
  //     if (s === "favorites") return findLikes();
  //     else return songList;
  //   };

  //   const findLikes = () => {
  //     let array1 = fav.filter((s) => s.like === 1);
  //     let likedSongs = array1.map((t) => songList.find((i) => i.id === t.id));
  //     return likedSongs.filter((song) => song);
  //   };
  //-----------------VOTING SYSTEM------------------------------

  //all votes:
  const allVotes = () => votes.length;

  const mostLikedSong = () => {
    const likedSongs = {};
    const dislikedSongs = {};

    votes.forEach((v) => {
      const key = `${v.title} by ${v.artist}`; // Create a key for the song

      if (v.like === 1) {
        // If the song is liked
        likedSongs[key] = (likedSongs[key] || 0) + 1; // Increment the count
      } else {
        // If the song is disliked
        dislikedSongs[key] = (dislikedSongs[key] || 0) + 1; // Increment the count
      }
    });

    // Convert the likedSongs object into an array
    const likedSongsArray = Object.entries(likedSongs).map(([key, likes]) => {
      const [title, artist] = key.split(" by "); // Split the key back into title and artist
      return { title, artist, likes }; // Return the desired format
    });

    // Convert the dislikedSongs object into an array
    const dislikedSongsArray = Object.entries(dislikedSongs).map(
      ([key, dislikes]) => {
        const [title, artist] = key.split(" by "); // Split the key back into title and artist
        return { title, artist, dislikes }; // Return the desired format
      }
    );

    console.log("Liked Songs:", likedSongsArray);
    console.log("Disliked Songs:", dislikedSongsArray);

    return { likedSongsArray, dislikedSongsArray }; // Return both arrays
  };

  //----------------------LOGGED IN USERS---------------------------

  const usersLoggedIn = () => {
    const uniqueUsers = new Set(votes.map((v) => v.user_id));
    return uniqueUsers.size;
  };

  //old:
  //   const usersLoggedIn = () => {
  //     const counts = {};
  //     votes.forEach((v) => {
  //       counts[v.user_id] = (counts[v.user_id] || 0) + 1;
  //     });
  //     const sum = Object.values(counts).reduce((acc, value) => acc + value, 0);
  //     return sum;
  //   };

  //-----------------DEPENDENCIES-------------------------------

  useEffect(() => {
    dispatch(fetchVotes());
    !localStorage.muziek_route_shownoSorting
      ? setShownoSorting("13")
      : setShownoSorting(localStorage.getItem("muziek_route_shownoSorting"));
  }, []);

  //-----------------RENDER--------------------------------

  return (
    <>
      <Container
        style={{
          backgroundColor: "black",
          backgroundImage: `url('V_M_fiets_BG.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "start",
          backgroundRepeat: "2",
          height: "100vh",
          width: "100vw",
          zIndex: 1,
        }}
        fluid
        className="text-white"
      >
        <Row className="mb-5 me-0 text-white text-center">
          {!localStorage.muziekRoute_username ||
          localStorage.muziekRoute_username.startsWith("user-") ? (
            <div className="mt-5 fs-1">⭐️Muziek Routers ADMIN Page !⭐️</div>
          ) : (
            <div className="mt-5 fs-1">
              ⭐️Welkom
              {/* {userFav.username} */}
              ⭐️
            </div>
          )}
        </Row>
        <Clock />

        <Row className="mb-5 me-0">
          <Col md={4}>
            <Form.Select
              id="shownoSorting"
              name="show_no Sorting"
              className="fs-3 ms-3 me-20"
              value={shownoSorting}
              onChange={(e) => {
                setShownoSorting(e.target.value);
                usersLoggedIn();
                localStorage.setItem(
                  "muziek_route_shownoSorting",
                  e.target.value
                );
              }}
            >
              <option>Choose Concert</option>
              <option value="13">Concert 13h</option>
              <option value="14">Concert 14h</option>
              <option value="15">Concert 15h</option>
              <option value="16">Concert 16h</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Button
              variant="warning"
              className="fs-4 fw-b ms-0 me-0 text-center"
              onClick={() => {
                onClickShowUserList();
              }}
            >
              {usersLoggedIn()} users logged in
            </Button>
          </Col>
          <div>Votes graph with modal userVotes</div>
          <Button
            variant="warning"
            className="fs-4 fw-b ms-0 me-0 text-center"
            onClick={() => {
              mostLikedSong();
            }}
          >
            get stats:
          </Button>
        </Row>
        <Row></Row>
      </Container>

      {/* -o-o-o- MENU -o-o-o-o-o-o-oo-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}
      <Modal show={showUserList} onHide={hideUserList}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="fs-1 fw-b">User List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {votes.map((v) => {
            return (
              <Row key={`vote-${v.id}`} className="mt-1 fs-5 mb-2">
                id: {v.user_id}, username: <b>{v.username}</b> likes and
                dislike...
              </Row>
            );
          })}
        </Modal.Body>
        <Modal.Body className="d-flex justify-content-between align-items-center">
          <div>
            Powered by Apple
            <Image
              size={30}
              src="Moose-Icon(Small).png"
              alt="logo not found!"
              className="text-left"
              style={{ width: "10%", height: "auto" }}
            />
            Moose
          </div>
          <Button
            variant="secondary"
            className="ms-auto"
            onClick={hideUserList}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
      {/* -o-o-o- SONGLIST -o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}
      {/* <Modal show={showUserVotes} onHide={hideUserVotes} className="modalList">
        <Row className="ms-2 me-2">
          <Button
            variant="warning"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Row>
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column w-100">
            <Modal.Title className="fs-6 fw-b">
              Song List: <p>(click on title for lyrics)</p>
            </Modal.Title>
          </div>
          <div>
            <Button
              variant="secondary"
              className="fs-6 fw-b ms-2"
              onClick={() => {
                dispatch(resetFavData());
              }}
            >
              Reset
            </Button>
          </div>{" "}
        </Modal.Header>
        <Modal.Header className="mb-4">
          <Form.Select
            id="sortList"
            name="sortSongList"
            className="fs-3"
            value={listSorting}
            onChange={(e) => {
              setListSorting(e.target.value);
              localStorage.setItem("songListSorting", e.target.value);
            }}
          >
            <option value="id">Sort list by:</option>
            <option value="title">List by Song Title</option>
            <option value="artist">List by Artist Name</option>
            <option value="favorites">List only your Favorites</option>
          </Form.Select>
        </Modal.Header>

        {sortedSongList(listSorting).map((song) => {
          return (
            <Row key={song.id} className="align-items-center ms-2 mb-2">
              <Col md={8} className="text-start fs-1">
                <Button
                  variant={searchFavData(song.id)?.color || "outline-secondary"}
                  className="text-light fs-4 fw-b text-start w-100"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add shadow to the text
                  }}
                  onClick={() => {
                    setChosenSong(song);
                    onClickShowLyrics();
                    hideSongs();
                  }}
                >
                  {song.title} - {song.artist}
                </Button>
              </Col>
              {!searchFavData(song.id) ? (
                <NoLike key={song.id} id={song.id} />
              ) : (
                fav.map((u) => {
                  if (u.id === song.id) {
                    if (u.like === 1 && u.dislike === 0) {
                      return <Like key={`like-${u.id}`} id={song.id} />;
                    } else if (u.like === 0 && u.dislike === 1) {
                      return <DisLike key={`dislike-${u.id}`} id={song.id} />;
                    } else if (u.like === 0 && u.dislike === 0) {
                      return <NoLike key={`dislike-${u.id}`} id={song.id} />;
                    }
                  }
                  return null;
                })
              )}
            </Row>
          );
        })}

        <Row className="mt-5 mb-3">
          <Button
            variant={!localStorage.muziekRoute_username ? "secondary" : "info"}
            className="text-left fs-1"
            onClick={async () => {
              if (!userId && !username) {
                hideSongs();
                navigate("./login");
              } else {
                try {
                  await dispatch(resetVotes(userId));
                  sendPrefs();
                  alert("SUCCESS! We have received your concert preferences");
                } catch (error) {
                  alert("Failed to erase login data. Please try again.");
                }
              }
            }}
          >
            Send us your Musical Preferences!
          </Button>
        </Row>
        <Modal.Body className="text-end">
          <Button
            variant="danger"
            className="me-5"
            onClick={async () => {
              try {
                await dispatch(removeUser(userId));
                dispatch(resetUserLoginData());
                alert("Your Login Data is now erased");
              } catch (error) {
                alert("Failed to erase login data. Please try again.");
              }
            }}
          >
            Reset Login Data
          </Button>

          <Button
            variant="warning"
            onClick={() => {
              hideSongs();
              onClickShowMenu();
            }}
          >
            Back to Menu
          </Button>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
