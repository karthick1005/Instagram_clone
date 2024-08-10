import "./Toggle.css";
export const Toggle = ({ handlechange, ischecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        name=""
        id="check"
        className="toggle"
        onChange={handlechange}
        checked={ischecked}
      />
      <label htmlFor="check">darkmode </label>
    </div>
  );
};
