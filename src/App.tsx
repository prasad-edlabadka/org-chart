import React, { useEffect, useState } from 'react';
import './App.css';
import { OrgChartComponent } from './OrgChart';

import { Canvg } from 'canvg';


function App() {
  
  
  let addNodeChildFunc: any = null;

  function addNode() {
    const node = {
      nodeId: 'new Node',
      parentNodeId: 'O-6066',
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId: any) {
    // console.log('d3', d3.event);
    alert('clicked ' + nodeId);
  }


  

  return (
    <div className="App">
      
      
      <OrgChartComponent
        setClick={(click: any) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
      />
      
    </div>
  );
}

export default App;
