"use client";

import { FC, useEffect, useState } from "react";
import css from "./about.module.scss";

const About: FC = () => {
  const [highlightAlpha, setHighlightAlpha] = useState(false);

  useEffect(() => {
    setHighlightAlpha(window.location.hash == "#alpha");
  }, []);

  return (
    <div className={css.root}>
      <div className={css.container}>
        <h2>Welcome to Epoch!</h2>
        <p>
          Epoch is a forums based website where users can create their own
          spaces and participate in others' spaces.
        </p>
        <div id="alpha" className={css.alpha} data-highlight={highlightAlpha}>
          <p>
            Epoch is currently in <b>alpha!</b> It's missing a TON of features!
            Such as...
          </p>
          <ul>
            <li>Space roles/permissions</li>
            <li>Editing posts</li>
            <li>Deleting posts</li>
            <li>Editing comments</li>
            <li>Deleting comments</li>
            <li>Replying to comments (nested comments)</li>
            <li>Joining spaces</li>
            <li>Viewing user profiles</li>
            <li>And a ton of other stuff as well!</li>
          </ul>
          <p>
            So I am working on these features slowly but surely, but they will
            come! Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
