import React from "react";
import { useSelector, useDispatch } from "react-redux";

function PlayingUsers({ user }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const playing = useSelector((state) => state.PlayingUser);
  console.log(users);
  console.log(playing);
  return (
    <div className="playingUsers">
      <div>
        {playing.map((element) => {
          return <div></div>;
        })}
      </div>
    </div>
  );
}

export default PlayingUsers;
