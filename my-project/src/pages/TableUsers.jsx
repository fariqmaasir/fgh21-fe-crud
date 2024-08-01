import React from "react";
import { FaTrash, FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
function TableUsers() {
  const url = "http://localhost:8888/users";
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function data() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const datas = json.results;
        setData(datas);
      } catch (err) {
        console.error(err.message);
      }
    }
    data();
  }, []);
  async function deleteUsers(id) {
    try {
      const response = await fetch(url + "/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const datas = json.results;
      setData(datas);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="flex flex-col justify-center w-screen h-screen items-center gap-3">
      <div className="">
        <Link to="/create-users">
          <button className="bg-green-500 p-2 px-10 rounded-xl text-white font-semibold outline-none">
            Create Data
          </button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="border border-2 p-2">Id</th>
              <th className="border border-2 p-2">Name</th>
              <th className="border border-2 p-2">Email</th>
              <th className="border border-2 p-2">Setting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-2 p-2">0</td>
              <td className="border border-2 p-2">Ilyas</td>
              <td className="border border-2 p-2">ilyayas@mail.com</td>
              <td className="border border-2 p-2">
                <span className="flex gap-1">
                  <button className="bg-red-400 p-1.5 rounded">
                    <FaTrash className="text-white" />
                  </button>
                  <button className="bg-green-400 p-1.5 rounded">
                    <Link to="/edit-users">
                      <FaPen className="text-white" />
                    </Link>
                  </button>
                </span>
              </td>
            </tr>
            {data.map((users) => (
              <tr key={users.id}>
                <td className="border border-2 p-2">{users.id}</td>
                <td className="border border-2 p-2">{users.name}</td>
                <td className="border border-2 p-2">{users.email}</td>
                <td className="border border-2 p-2">
                  <span className="flex gap-1">
                    <button
                      onClick={() => deleteUsers(users.id)}
                      className="bg-red-400 p-1.5 rounded"
                    >
                      <FaTrash className="text-white" />
                    </button>
                    <button className="bg-green-400 p-1.5 rounded">
                      <Link
                        to={`/edit-users/${users.id}`}
                        // state={{ id: users.id }}
                      >
                        <FaPen className="text-white" />
                      </Link>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableUsers;
