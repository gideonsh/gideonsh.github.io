import React, { useState, useEffect } from "react";
import classes from "./MultiPlayer.module.css";
import Player from "./Player";

const useMultiAudio = (urls, playIsOn) => {
  const [seconds, setSeconds] = useState(0);

  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.map((url) => {
      return {
        url,
        playing: false,
      };
    })
  );

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (newPlayers[targetIndex].playing === false) {
      const timer = setTimeout(() => {
        newPlayers[targetIndex].playing = true;
      }, seconds * 1000);
      setPlayers(newPlayers);
      return () => clearTimeout(timer);
    } else {
      newPlayers[targetIndex].playing = false;
    }

    setPlayers(newPlayers);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playIsOn) {
      sources.forEach((source, i) => {
        players[i].playing ? source.audio.play() : source.audio.pause();
      });
      setSeconds(8);
    } else {
      sources.forEach((source, i) => {
        source.audio.pause();
      });
    }
  });

  return [players, toggle];
};

const MultiPlayer = (props) => {
  const [players, toggle] = useMultiAudio(props.urls, props.playIsOn);

  return (
    <div>
      {players.map((player, i) => (
        <Player key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
  );
};

export default MultiPlayer;
