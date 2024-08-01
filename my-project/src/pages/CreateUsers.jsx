// import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function CreateUsers() {
  const url = "http://localhost:8888/users";
  const navigate = useNavigate();
  async function addData(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.name.value;
    const body = new URLSearchParams({
      name,
      email,
      password,
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      navigate("/");
      console.log(json);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Link to="/">
        <div className="justify-self-start flex items-center gap-2 hover:text-blue-500">
          <FaArrowLeft />
          Back to List Data
        </div>
      </Link>
      <form onSubmit={addData} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Fullname</label>
          <input name="name" type="text" className="border px-4 p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input name="email" type="email" className="border px-4 p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input name="password" type="password" className="border px-4 p-2" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default CreateUsers;
