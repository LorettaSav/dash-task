/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaDroplet, FaCoins } from "react-icons/fa6";

function Menu({ onSaveOption }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (value) => {
    setSelectedButton(value);
    onSaveOption(value);
  };

  return (
    <div className="text-center bg-indigo-950 text-white">
      <h2 className="mb-1"> Statistics </h2>
      <hr className="border-white border mb-3" />
      <ul className="text-left">
        <li
          onClick={() => handleClick("Deposits")}
          className="flex pt-1 pb-1 pl-1 ${} hover:bg-white hover:text-black hover:cursor-pointer hover:fill-black mb-1 rounded-md items-center"
          style={{
            textDecoration:
              selectedButton === "Deposits" ? "underline" : "none",
          }}
        >
          <FaCoins className="fill-indigo-400 hover:fill-blue-950 mr-1" />
          Deposits
        </li>
        <li
          onClick={() => handleClick("Users")}
          className="flex pt-1 pb-1 pl-1 hover:bg-white hover:text-black hover:cursor-pointer mb-1 rounded-md items-center"
          style={{
            textDecoration: selectedButton === "Users" ? "underline" : "none",
          }}
        >
          <FaUser className="fill-indigo-400 hover:fill-blue-950 mr-1" /> Users
        </li>
        <li
          onClick={() => handleClick("Trades")}
          className="flex pt-1 pb-1 pl-1 hover:bg-white hover:text-black mb-1  hover:cursor-pointer rounded-md items-center"
          style={{
            textDecoration: selectedButton === "Trades" ? "underline" : "none",
          }}
        >
          <FaDroplet className="fill-indigo-400 hover:fill-blue-950 mr-1" />
          Trades
        </li>
      </ul>
    </div>
  );
}

export default Menu;
