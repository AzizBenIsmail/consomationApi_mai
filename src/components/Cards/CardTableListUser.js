import React, { use, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  getAllUsers,
  deletUser,
  updateUser,
  addUser,
} from "../../Service/ApiUser";
export default function CardTable({ color }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const getListUsers = useCallback(async () => {
    await getAllUsers()
      .then((res) => {
        setUsers(res.data.userList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getListUsers();
    console.log(users);
  }, [getListUsers]);

  const handleDelete = async (id) => {
    try {
      await deletUser(id);
      getListUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (newUser) => {
    try {
      await updateUser(newUser._id, newUser);
      getListUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      getListUsers();
    } catch (error) {
      console.log(error);
    }
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List Users
              </h3>
            </div>
            <input
              type="text"
              placeholder="Search by first name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
              className="mb-4 mr-4 px-4 py-2 border rounded text-sm text-black"
            />

            <button
              className="mb-4 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
              onClick={() => {
                setNewUser({
                  firstName: "",
                  lastName: "",
                  age: "",
                  email: "",
                  password: "",
                });
                setIsModalOpen(true);
              }}
            >
              + Add New User
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Nom
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Prenom
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Age
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={
                        user.user_image != "client.png"
                          ? `http://localhost:5000/images/${user.user_image}`
                          : "https://cdn-icons-png.flaticon.com/512/6009/6009864.png"
                      }
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="User Avatar"
                    />

                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {user.firstName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.lastName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2"> {user.age}</span>
                    </div>
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setNewUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-2 px-20">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
            <li>
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs font-semibold w-8 h-8 mx-1 rounded-full flex items-center justify-center leading-tight border border-lightBlue-200 text-white bg-lightBlue-200"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => changePage(i + 1)}
                  className={`text-xs font-semibold w-8 h-8 mx-1 rounded-full flex items-center justify-center leading-tight border ${
                    currentPage === i + 1
                      ? "bg-lightBlue-500 text-white border-lightBlue-500"
                      : "bg-white text-lightBlue-500 border-lightBlue-500"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs font-semibold w-8 h-8 mx-1 rounded-full flex items-center justify-center leading-tight border border-lightBlue-200 text-white bg-lightBlue-200"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isModalOpen && (
        <div className="mt-2">
          <h2 className="text-xl font-bold mb-4">
            {newUser._id ? "Update User" : "Add New User"}
          </h2>{" "}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={handleChange}
            className="mr-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={handleChange}
            className="mr-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email please"
            value={newUser.email}
            onChange={handleChange}
            className="mr-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={newUser.password}
            onChange={handleChange}
            className="mr-2"
          />
          <input
            type="number"
            name="age"
            placeholder="Your Age Please"
            value={newUser.age}
            onChange={handleChange}
          />
          <button
            className=" mt-2 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xl px-14 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className=" mt-2 bg-emerald-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xl px-14 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              newUser._id ? handleUpdate(newUser) : handleAddUser();
              setIsModalOpen(false);
            }}
          >
            {newUser._id ? "update User" : "add New User"}{" "}
          </button>
        </div>
      )}
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
