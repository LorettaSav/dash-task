import { HiSquares2X2 } from "react-icons/hi2";
import { LuRefreshCcw } from "react-icons/lu";
import { FaCalendar } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="flex nav gap-x-4 w-full">
      <div className="logoBar flex flex-none bg-indigo-950 items-center min-w-24 justify-center">
        <div className=" bg-indigo-400 text-white text-center rounded-md">
        </div>
        <h1 className="text-white text-lg">View</h1>
      </div>
      <div className="settingsBar flex justify-between bg-indigo-950 h-10 items-center w-full pr-2 pl-2">
        <HiSquares2X2 className="fill-white w-4 h-4" />
        <div className="flex gap-3 items-center rounded-sm">
          <label
            htmlFor="search"
            className="relative text-white focus-within:pl-6 block"
          >
            <FaMagnifyingGlass className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-1" />

            <input
              type="search"
              name="search"
              id="search"
              placeholder="      Search"
              className="form-input w-full bg-gray-700 p-1 rounded-md"
            />
          </label>

          <LuRefreshCcw className="text-white" />
          <FaCalendar className="fill-white" />
          <div className=" w-5 h-5 rounded-xl bg-indigo-400 text-white text-center">
            <h3> LS </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
