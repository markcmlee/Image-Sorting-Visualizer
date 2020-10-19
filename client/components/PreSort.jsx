import React, { useState } from "react";
import styled from 'styled-components';

const PreSort = (props) => {
  const {setRows, setCols, setLink, setIsEverythingValid, cols, rows, link} = props;

  const colsOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (value < 10) setCols(10);
    if (value > 200) setCols(200);
    setCols(value)
  }

  const rowsOnChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (value < 10) setRows(10);
    if (value > 200) setRows(200);
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
            min="10"
            max="200"
            defaultValue={rows}
            id="rowInput"
            onChange={rowsOnChange} 
            style={{width: "75px", float: "right"}}  
          />
        </label>
        <br />

        <label>Number of Columns: 
          <input
            type="number"
            min="10"
            max="200"
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
        <br />

        <button id="submitButton" onClick={handleSubmit}>Start Sorting!</button>
      </form>
  )
}

export default PreSort;