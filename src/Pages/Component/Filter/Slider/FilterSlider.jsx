import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import "./FilterSlider.css";
const FilterSlider = ({ filter, set }) => {
  useEffect(() => {
    set({
      Contrast: 100,
      Brightness: 100,
      Saturation: 100,
      Sepia: 0,
      GrayScale: 0,
    });
  }, []);
  return (
    <div className="Filterslider_cont">
      <div className="Filterslideritem">
        <div id="sliderhead"> Contrast</div>
        {/* {console.log(filter)} */}
        <Slider
          className="Filterslider"
          value={filter.Contrast}
          max={200}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) =>
            set((prevdata) => ({
              ...prevdata,
              Contrast: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="Filterslideritem">
        <div id="sliderhead">Brightness</div>

        <Slider
          className="Filterslider"
          value={filter.Brightness}
          max={200}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) =>
            set((prevdata) => ({
              ...prevdata,
              Brightness: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="Filterslideritem">
        <div id="sliderhead">Saturation</div>

        <Slider
          className="Filterslider"
          value={filter.Saturation}
          max={200}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) =>
            set((prevdata) => ({
              ...prevdata,
              Saturation: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="Filterslideritem">
        <div id="sliderhead">Sepia</div>

        <Slider
          className="Filterslider"
          value={filter.Sepia}
          max={200}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) =>
            set((prevdata) => ({
              ...prevdata,
              Sepia: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="Filterslideritem">
        <div id="sliderhead">Gray Scale</div>

        <Slider
          className="Filterslider"
          value={filter.GrayScale}
          max={200}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) =>
            set((prevdata) => ({
              ...prevdata,
              GrayScale: Number(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default FilterSlider;
