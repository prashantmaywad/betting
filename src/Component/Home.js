import React, { useEffect, useState } from "react";
import "./Home.css";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@material-ui/icons/Search";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Button,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table,
} from "reactstrap";
import { LOAD_USER, LOAD_PLAYINGUSER } from "./../redux/actionTypes";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [searchUser, setsearchUser] = useState(users);
  const [playingUsers, setplayingUsers] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    var size = users.length;
    setsearchUser(
      users.slice(
        value === 1 ? 0 : value * 10 - 10,
        value * 10 <= size ? value * 10 : size
      )
    );
  };

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json"
      )
      .then((res) => {
        dispatch({ type: LOAD_USER, Users: res.data });
        setsearchUser(res.data.slice(0, 9));
      })
      .catch((ex) => console.log(ex));
  }, [dispatch]);
  const searchuser = (e) => {
    if (e.target && e.target.value) {
      var returnedCandidte = [];
      users.forEach((element) => {
        if (element.Name.startsWith(e.target.value)) {
          returnedCandidte.push(element);
        }
      });
      setsearchUser(returnedCandidte);
    } else {
      setsearchUser(users);
    }
  };
  const handleSelect = (e) => {
    var name = e.target.value;
    var user = users.find((element) => element.Name === name);
    if (e.target.checked) {
      setplayingUsers([...playingUsers, user]);
    } else {
      var index = playingUsers.findIndex((element) => element === user);
      var u = [...playingUsers];
      u.splice(index, 1);
      setplayingUsers([...u]);
    }
    dispatch({ type: LOAD_PLAYINGUSER, Users: playingUsers });
  };
  return (
    <Container fluid className="home">
      <Row>
        <Col xs="2" className="home__left">
          <div className="selectplayercard">
            <h4>Playing 9</h4>
            {playingUsers.length > -1 &&
              playingUsers.map((user) => {
                return (
                  <div>
                    <Card className="selectedUserCard">
                      <CardBody className="selectedUser">
                        <Avatar
                          variant="square"
                          src={user["Profile Image"]}
                        ></Avatar>
                        <div className="nameplat">
                          <CardTitle tag="h8">{user.Name}</CardTitle>
                          <CardTitle className="picename" tag="h9">
                            {user.Bet}
                            {user.Price}
                          </CardTitle>
                        </div>
                        <div>
                          <AttachMoneyIcon classname="money" />
                          {user.Price}{" "}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            <Link to="/playing">
              <Button className="btn__start" size="lg" color="primary">
                Start
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs="10" className="home__rigth">
          <div className="table__heading">
            <h4>Select Playing 9</h4>
          </div>
          <div className="table__search">
            <SearchIcon />
            <TextField
              onChange={searchuser}
              type="search"
              id="standard-basic"
              label="Search Player"
            />
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>SELECT</th>
                  <th>PLAYER Name</th>
                  <th>LEVEL</th>
                  <th>AVATAR</th>
                  <th>BETS</th>
                  <th>WINS</th>
                  <th>LOSS</th>
                  <th>
                    {" "}
                    <AttachMoneyIcon classname="money" />
                    PRICE
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchUser &&
                  searchUser.length > 0 &&
                  searchUser.map((user, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <Checkbox
                            onChange={handleSelect}
                            value={user.Name}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </th>
                        <td>{user.Name}</td> <td></td>
                        <td>
                          <Avatar
                            variant="square"
                            src={user["Profile Image"]}
                          ></Avatar>
                        </td>
                        <td>{user.Bet}</td>
                        <td></td>
                        <td></td>
                        <td> {user.Price}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          <div className="pagination">
            <Pagination
              color="primary"
              count={users / 10}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
