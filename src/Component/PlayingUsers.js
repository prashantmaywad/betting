import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardTitle, CardBody, Button } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import "./Playing.css";

function PlayingUsers({ user }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState();

  const playingUsers = useSelector((state) => state.PlayingUser);
  const randomGe = () => {
    setNumber(Math.floor(Math.random() * 9) + 1);
  };

  return (
    <div className="playingUsers">
      {playingUsers.length > -1 &&
        playingUsers.map((user) => {
          return (
            <Card className="playusercard">
              <CardBody className="selectedUser">
                <Avatar variant="square" src={user["Profile Image"]}></Avatar>
                <div className="nameplat">
                  <CardTitle tag="h8">{user.Name}</CardTitle>
                  <CardTitle className="picename" tag="h9">
                    {user.Bet} {user.Price}
                  </CardTitle>
                </div>
                <div>{user.Price} </div>
              </CardBody>
            </Card>
          );
        })}
      <Button
        color="primary"
        className="btn1"
        onClick={randomGe}
        size="lg"
      >
        {number ? number : "Play"}
      </Button>
    </div>
  );
}

export default PlayingUsers;
