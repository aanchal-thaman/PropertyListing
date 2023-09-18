import {
  faBed,
  faCalendarDays,
  faCoins,
  faGlobe,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import React from 'react'; 
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the CSS for styling the slider


const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [priceRange, setPriceRange] = React.useState([0, 10000]); 
  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };
  const [types, setTypes] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState();
  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >

        {type !== "list" && (
          <>
            <div className="headerTitle">
              Search Properties
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem" >
                <FontAwesomeIcon icon={faGlobe} className="headerIcon" />
                <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="headerSearchText"  
                >
                  <option value="" defaultValue disabled >Select a destination</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Navi Mumbai">Navi Mumbai</option>
                  <option value="Thane">Thane</option>
                  <option value="Thane">Suburban</option>
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCoins} className="headerIcon" />
                <div className="headerSearchText">
                <Slider
                  min={0} 
                  max={10000} 
                  range 
                  value={priceRange} 
                  onChange={handlePriceRangeChange}
                  />
                  ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <select
                    value={types}
                    onChange={(e) => setTypes(e.target.value)}
                    className="headerSearchText"   
                >
                  <option value="" defaultValue disabled selected>Select a Type</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Resorts">Resorts</option>
                  <option value="Resorts">Villas</option>
                  <option value="Resorts">Guest houses</option>
                </select>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
