import React, { useEffect, useState } from 'react';
import './App.css';
import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3';


function App() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(require('./data/org.csv'));
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

  useEffect(() => {
    d3.csv(url
    ).then((data: any) => {
      console.log(data);
      setData(data);
    });
  }, [url]);

  return (
    <div className="App">
      <div>
      <span>Data File:</span>
      <input type='url' placeholder='Enter CSV file URL' onChange={(e) => setUrl(e.target.value === ""?require('./data/org.csv'):e.target.value)}></input>
      </div>
      
      <OrgChartComponent
        setClick={(click: any) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
      />
      
    </div>
  );
}

export default App;
