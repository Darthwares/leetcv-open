import React from "react";

interface RedirectUserProps {
  handle: string;
  username: string;
}

const RedirectUser = ({ handle, username }: RedirectUserProps) => {
  
  return (
    <a
      href={`${location.origin}/r/${handle}`}
      rel="noreferrer"
      className="hover:underline"
    >
      {username}
    </a>
  );
};

export default RedirectUser;
