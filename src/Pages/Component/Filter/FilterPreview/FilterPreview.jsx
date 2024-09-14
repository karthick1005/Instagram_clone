import React from "react";
import { filterValues } from "../Utilits/Utilitis";
import "./FilterPreview.css";
const FilterPreview = ({ setfilter, current }) => {
  return (
    <div className="filterpreviewcont">
      {filterValues.map((val, i) => {
        return (
          <div
            className={`Filterpreviewpic ${
              current === val.class ? "active" : ""
            }`}
            onClick={() => setfilter(val.class)}
          >
            <img src="/Aden.jpg" alt="" className={val.class} />
            <p>{val.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilterPreview;
