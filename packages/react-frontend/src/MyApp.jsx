import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
  
]);
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );
  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
      throw new Error("Insert failed");
    })
    .then((data) => {
      setCharacters((prev) => [...prev, data]);
    })
    .catch((error) => {
      console.log(error);
    });
}
  function removeOneCharacter(index) {
    const user = characters[index];

    deleteUser(user.id)
      .then((res) => {
        if (res.ok) {
          const updatedCharacters = [];

          for (let i = 0; i < characters.length; i++) {
            if (i !== index) {
              updatedCharacters.push(characters[i]);
            }
          }
          setCharacters(updatedCharacters);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}
export default MyApp;