import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './components/Title.jsx'
import PreSort from './components/PreSort.jsx';
import ImageVisualizer from './components/ImageVisualizer.jsx';

const App = () => {
  const [cols, setCols] = useState(50);
  const [rows, setRows] = useState(50);
  const [link, setLink] = useState(null);
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
        />
      </div>
    )
  }
};

export default App;
