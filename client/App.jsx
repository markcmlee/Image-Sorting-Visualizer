import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './components/Title.jsx'
import PreSort from './components/PreSort.jsx';
import ImageVisualizer from './components/ImageVisualizer.jsx';

const App = () => {
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(10);
  const [link, setLink] = useState(null);
  const [numSwaps, setNumSwaps] = useState(0);
  const [isEverythingValid, setIsEverythingValid] = useState(false);

  if (!isEverythingValid) {
    return (
      <>
        <div className="titleContainer">
          <Title />
        </div>
        <div className="formContainer">
          <PreSort
            cols={cols}
            setCols={setCols}
            rows={rows}
            setRows={setRows}
            link={link}
            setLink={setLink}
            setIsEverythingValid={setIsEverythingValid}
          />
        </div>
      </>
    )
  } else {
    return (
      <div>
        <ImageVisualizer 
          cols={cols}
          rows={rows}
          link={link}
          numSwaps={numSwaps}
          setNumSwaps={setNumSwaps}
        />
      </div>
    )
  }
};

export default App;
