import { useState } from "react";
import ChartSpace from "./ChartSpace";
import Menu from "./Menu";
import Navbar from "./Navbar";

function Dashboard() {
  const [button, setButton] = useState("");
  const [option, setOption] = useState("");
  const [buttonClicked, setButtonClicked] = useState('');

  const handleClick = (value) => {
    setButtonClicked(value);
    setButton(value);
  };

  const handleSaveOption = (opt) => {
    setOption(opt);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex gap-4 mt-2 w-full">
        <div className="bg-indigo-950 h-screen min-w-24 p-2">
          <Menu onSaveOption={handleSaveOption} />
        </div>
        <div className="w-full">
          <div className="flex w-full border-indigo-400 border divide-x divide-indigo-400 text-center text-white mb-2">
            <button
              className="w-1/4 pl-2 pr-2 pt-1 pb-1 hover:bg-indigo-400"
              onClick={() => handleClick("hourly")}
              value="hourly"
              style={{ textDecoration: buttonClicked === 'hourly' ? "underline" : "none" }}
            >
              <h4>Hourly</h4>
            </button>
            <button
              className="w-1/4 pl-2 pr-2 pt-1 pb-1 hover:bg-indigo-400"
              onClick={() => handleClick("daily")}
              value="daily"
              style={{ textDecoration: buttonClicked === 'daily' ? "underline" : "none" }}
            >
              <h4>Daily</h4>
            </button>
            <button
              className="w-1/4 pl-2 pr-2 pt-1 pb-1 hover:bg-indigo-400"
              onClick={() => handleClick("weekly")}
              value="weekly"
              style={{ textDecoration: buttonClicked === 'weekly' ? "underline" : "none" }}
            >
              <h4>Weekly</h4>
            </button>
            <button
              className="w-1/4 pl-2 pr-2 pt-1 pb-1 hover:bg-indigo-400"
              onClick={() => handleClick("monthly")}
              value="monthly"
              style={{ textDecoration: buttonClicked === 'monthly' ? "underline" : "none" }}
            >
              <h4>Monthly</h4>
            </button>
          </div>

          <div>
            <ChartSpace chart={button} option={option} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
