import React from "react";
const User = ({ user }) => {
  const { owner, name, description, language } = user;
  return (
    <div className="user">
      <div className="image">
        <img src={owner.avatar_url} alt={name} />
      </div>
      <div className="user-info">
        <h3>{name}</h3>
        <small>{description}</small>
        <small>Language : {language}</small>
      </div>
    </div>
  );
};

export default User;
