import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/global.scss";
import { Clock } from "../components/Clock";
import { selectFilteredVotes } from "../store/votes/selectors.js";
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
  const dispatch = useDispatch();

  const [shownoSorting, setShownoSorting] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [showUserVotes, setShowUserVotes] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [likedSongs, setLikedSongs] = useState([]);
  const [dislikedSongs, setDislikedSongs] = useState([]);
  const [songVoters, setSongVoters] = useState([]);
  const [currentUsersData, setCurrentUsersData] = useState([]);

  const onClickShowUserList = () => setShowUserList(true);
  const onClickShowUserVotes = () => setShowUserVotes(true);

  const hideUserList = () => setShowUserList(false);
  const hideUserVotes = () => setShowUserVotes(false);

  const votes = useSelector(selectFilteredVotes(shownoSorting));

  //---------------------FIND USERS FROM VOTED SONG-----------------------

  const findUsers = (songId, type) => {
    let userArray = [];
    if (type === "like") {
      userArray = votes.filter(
        (v) => Number(v.song_id) === Number(songId) && Number(v.like) === 1
      );
    } else if (type === "dislike") {
      userArray = votes.filter(
        (v) => Number(v.song_id) === Number(songId) && Number(v.dislike) === 1
      );
    }
    setSongVoters(userArray);
  };

  //---------------------STATS COLORING EQUATION----------------------------

  const percentage_coloring = (song) => {
    return (song / currentUsersData.length) * 100;
  };
  //-----------------VOTING SYSTEM------------------------------

  //Create liked/disliked arrays
  const votesStats = () => {
    const likedSongs = [];
    const dislikedSongs = [];

    votes.forEach((v) => {
      const key = `${v.song_id} + ${v.title} + ${v.artist}`;

      if (v.like === 1) {
        likedSongs[key] = (likedSongs[key] || 0) + 1;
      } else {
        dislikedSongs[key] = (dislikedSongs[key] || 0) + 1;
      }
    });
    // Convert the likedSongs object into an array
    const likedSongsArray = Object.entries(likedSongs).map(([key, likes]) => {
      const [song_id, title, artist] = key.split("+");
      return { song_id, title, artist, likes };
    });

    const dislikedSongsArray = Object.entries(dislikedSongs).map(
      ([key, dislikes]) => {
        const [song_id, title, artist] = key.split("+");
        return { song_id, title, artist, dislikes };
      }
    );
    setLikedSongs(likedSongsArray);
    setDislikedSongs(dislikedSongsArray);
    console.log("votesstats working...:", likedSongsArray, dislikedSongsArray);
  };

  //-----------------CREATION OF USER_DATA_ARRAY-------------------------------
  const usersLoggedIn = () => {
    let usersDataArray = [];
    const Users = new Set(votes.map((v) => v.user_id));

    Users.forEach((u) => {
      const userVote = votes.find((v) => u === v.user_id);
      if (userVote) {
        const userData = {
          user_id: userVote.user_id,
          username: userVote.username,
          show_no: userVote.show_no,
          prefs: [],
        };
        const userPrefs = votes.filter((v) => u === v.user_id);
        userPrefs.forEach((vote) => {
          if (vote.like === 1) {
            userData.prefs.push({
              song_id: vote.song_id,
              title: vote.title,
              like: 1,
            });
          }
          if (vote.dislike === 1) {
            userData.prefs.push({
              song_id: vote.song_id,
              title: vote.title,
              like: 0,
            });
          }
        });
        usersDataArray.push(userData);
      }
    });
    setCurrentUsersData(usersDataArray);
    console.log("at userLoggedin final userDataArray: ", usersDataArray);
  };

  //---------------------DEPENDENCIES---------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVotes());
      const savedSorting =
        localStorage.getItem("muziek_route_shownoSorting") || "0";
      setShownoSorting(savedSorting);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (shownoSorting !== "") {
      votesStats();
      usersLoggedIn();
    }
  }, [shownoSorting]);

  useEffect(() => {
    if (dataFetched) {
      usersLoggedIn();
      votesStats();
      setDataFetched(false);
    }
  }, [dataFetched]);

  //-----------------RENDER--------------------------------

  return (
    <>
      <Container
        style={{
          backgroundColor: "black",
          backgroundImage: `url('V_M_fiets_BG.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "start",
          minHeight: "100vh",
          width: "100vw",
        }}
        fluid
        className="text-white"
      >
        <Row className="mb-1 me-0 text-white text-center">
          {!localStorage.muziekRoute_username ||
          localStorage.muziekRoute_username.startsWith("user-") ? (
            <div className="mt-5 fs-1">⭐️Muziek Routers ADMIN Page⭐️</div>
          ) : (
            <div className="mt-5 fs-1">
              ⭐️Welkom
              {/* {user.username} */}
              ⭐️
            </div>
          )}
        </Row>
        <Clock />

        <Row className="mb-2 ms-5 me-5">
          <Col md={4}>
            <Form.Select
              id="shownoSorting"
              name="show_no Sorting"
              className="fs-4"
              value={shownoSorting}
              onChange={(e) => {
                setShownoSorting(e.target.value);
                localStorage.setItem(
                  "muziek_route_shownoSorting",
                  e.target.value
                );
              }}
            >
              <option value="0">All Concerts</option>
              <option value="13">Concert 13h</option>
              <option value="14">Concert 14h</option>
              <option value="15">Concert 15h</option>
              <option value="16">Concert 16h</option>
            </Form.Select>
          </Col>
          <Col md={8}>
            <Button
              variant="warning"
              className="fs-4 fw-b text-center w-100"
              onClick={() => {
                onClickShowUserList();
              }}
            >
              {currentUsersData.length} users logged in
            </Button>
          </Col>{" "}
        </Row>
        <Row className="ms-5 me-5 mb-3">
          <Button
            variant="success"
            className="fs-4 fw-b mt-3 text-center"
            onClick={async () => {
              try {
                await dispatch(fetchVotes());
                setDataFetched(true);
              } catch (error) {
                console.error("Error fetching votes:", error);
              }
            }}
          >
            get stats:
          </Button>
        </Row>
        {likedSongs.map((s) => {
          return (
            <Row
              className="mb-3 ms-5 me-5 fs-6"
              key={`s-${s.song_id}`}
              onClick={() => {
                findUsers(s.song_id, "like");
                onClickShowUserVotes();
              }}
            >
              <li className="SongBlockLike">
                <div
                  className="percentage_coloring_like"
                  style={{ width: percentage_coloring(s.likes) + "%" }}
                />
                <div
                  className="songTextLike"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                >
                  👍 {s.title} by {s.artist} (score: {s.likes} votes)
                </div>
              </li>
            </Row>
          );
        })}
        {dislikedSongs.map((s) => {
          return (
            <Row
              className="mb-3 ms-5 me-5 fs-6"
              key={`s-${s.title}`}
              onClick={() => {
                findUsers(s.song_id, "dislike");
                onClickShowUserVotes();
              }}
            >
              <li className="SongBlockdisLike">
                <div
                  className="percentage_coloring_dislike"
                  style={{ width: percentage_coloring(s.dislikes) + "%" }}
                />
                <div
                  className="songTextdisLike"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                >
                  👎 {s.title} by {s.artist} (score: {s.dislikes} votes)
                </div>
              </li>
            </Row>
          );
        })}
        <Row className="d-flex fs-3 justify-content-center align-items-center">
          Powered by Apple
          <Image
            size={30}
            src="Moose-Icon(Small).png"
            alt="logo not found!"
            className="text-left"
            style={{ width: "10%", height: "auto" }}
          />
          Moose
        </Row>
      </Container>

      {/* -o-o-o- MENU -o-o-o-o-o-o-oo-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

      <Modal show={showUserList} onHide={hideUserList} className="modalList">
        <Row className="ms-2 me-2">
          <Button variant="warning" className="ms-auto" onClick={hideUserList}>
            Back to Main
          </Button>
        </Row>
        <Modal.Header className="d-flex align-items-center">
          <div className="d-flex flex-column w-100">
            <Modal.Title className="fs-1 fw-b text-center">
              User List
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {currentUsersData.length > 0 ? (
            currentUsersData.map((u) => {
              return (
                <div key={`vote-${u.user_id}`}>
                  <Row className="mt-1 fs-5 mb-2">
                    <Col md={5}>
                      (#{u.user_id}) 👉 {u.username} ⇢ {u.show_no}h
                    </Col>
                    <Col md={6}>
                      {u.prefs.length > 0 ? (
                        u.prefs.map((p) => (
                          <p key={p.song_id}>
                            {p.like ? <>💖 {p.title}</> : <>🤮 {p.title}</>}
                          </p>
                        ))
                      ) : (
                        <>No preferences</>
                      )}
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })
          ) : (
            <>No users found</>
          )}
        </Modal.Body>

        <Modal.Body className="d-flex fs-3 justify-content-between align-items-center">
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

      {/* -o-o-o- VOTERS FOR ONE SONG-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o--o--o-o-o-o- */}

      <Modal show={showUserVotes} onHide={hideUserVotes} className="modalList">
        <Row className="ms-2 me-2">
          <Button variant="warning" className="ms-auto" onClick={hideUserVotes}>
            Back to Main
          </Button>
        </Row>
        <Modal.Header className="d-flex align-items-center">
          <div className="d-flex flex-column w-100">
            <Modal.Title className="fs-3 text-center">
              Votes for&nbsp;&nbsp;
              <b>{!songVoters[0] ? <>no one</> : songVoters[0].title}</b>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="fs-2 text-center">
          {songVoters.map((s) => {
            return <p key={s.user_id}>{s.username},</p>;
          })}
        </Modal.Body>
        <Button
          variant="warning"
          onClick={() => {
            hideUserVotes();
          }}
        >
          Back to Main
        </Button>
      </Modal>
    </>
  );
}
