import React, { useState } from "react";
import styled from 'styled-components';

const PreSort = (props) => {
  const {setRows, setCols, setLink, setIsEverythingValid, cols, rows, link} = props;

  const colsOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (value < 5) setCols(5);
    if (value > 20) setCols(20);
    setCols(value)
  }

  const rowsOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (value < 5) setRows(5);
    if (value > 20) setRows(20);
    setRows(value)
  }

  const linkOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    if (value.match(/\.(jpeg|jpg|gif|png)$/) != null) setLink(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link !== null) setIsEverythingValid(true);
  }

  return (
    <form className="inputForm">
      <label>Number of Rows: 
        <input
          type="number"
          min="5"
          max="20"
          defaultValue={rows}
          id="rowInput"
          onChange={rowsOnChange} 
          style={{width: "75px", float: "right"}}  
        />
      </label>

      <label>Number of Columns: 
        <input
          type="number"
          min="5"
          max="20"
          defaultValue={cols}
          id="colInput"
          onChange={colsOnChange} 
          style={{width: "75px", float: "right"}}  
        />
      </label>

      <label>Image URL:
        <input
          type="text"
          id="linkInput"
          onChange={linkOnChange}  
          style={{float: "right", width: "75%"}}
        />
      </label>

      <button id="submitButton" onClick={handleSubmit}>Start Sorting!</button>
    </form>
  )
}

export default PreSort;