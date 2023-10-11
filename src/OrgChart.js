import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const [chart, setChart] = useState(new OrgChart());
  // const chart = new OrgChart();
  const [url, setUrl] = useState(require('./data/org2.csv'));
  const [data, setData] = useState(null);

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);
  const borderColor = {
    "TBH": "#EB2544",
    "Employee": "#EB2544",
    "RakBank": "#EB2544",
    "Contractor": "blue",
    "Atribs": "blue",
    "Dicetek": "blue",
    "Bourntec": "blue",
    "QK": "blue",
    "Wipro": "green",
    "Optimum": "blue"
  }

  const backgroundColor = {
    "Flex": "#faeabe",
    "Fixed": "#fcdee0"
  }

  const flag = {
    "Offshore": "🇮🇳",
    "Onsite": "🇦🇪"
  }

  useEffect(() => {

  }, [url]);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    d3.csv(url
    ).then((data) => {
      setData(data);
      console.log(data);
      if (data && d3Container.current) {
        // if (!chart) {
        //   chart = new OrgChart();
        // }
        chart
          //.layout('left')
          .container(d3Container.current)
          .data(data)
          //.nodeWidth((d) => 140 )
          //.nodeHeight((d) => d.data.name.length >= 22? 50:d.data.name.length >= 15? 40:20 )
          .nodeWidth((d) => 150 )
          .nodeHeight((d) => d.data._directSubordinates > 0 || d.data._totalSubordinates > 0?70:50)
          .childrenMargin((d) => 40)
          .neightbourMargin((d) => 30)
          .compactMarginBetween((d) => 20)
          .compactMarginPair((d) => 20)
          
          .nodeContent((d, i, arr, state) => {
            let footer = '';
            if(d.data._directSubordinates > 0 || d.data._totalSubordinates > 0) {
              footer = `
              <div style="display:flex;justify-content:space-between;width:100%;">
                <div style="text-align:left">${d.data._directSubordinates} 👤</div>  
                <div style="text-align:right">${d.data._totalSubordinates} 👥</div>    
              </div>
              `
            }
            
            return `
                <div style="height:${d.height}px;border-radius:4px;overflow:visible;border:2px solid ${borderColor[d.data.Category]};padding:3px; display: flex;flex-flow: column;justify-content: center;align-items: center;background-color:${backgroundColor[d.data.Pool]}">
                  <span style="position:absolute;right:4px;top:2px">${flag[d.data.Location]}</span>
                  <div style="color:${borderColor[d.data.Category]};font-size:14px;font-weight:bold;display:block">${d.data.id}</div>
                  <div style="color:black;font-size:12px;font-weight:normal;valign:middle;display:block">${d.data["New Title"]}</div>
                  ${footer}
                </div>
                
                `;
          //      +
          //     //<div style="color:#404040;font-size:12px;margin-top:4px"><b>Specialization:</b> ${d.data.skill
          //     // } </div>  
          //     // <div style="color:#404040;font-size:12px;margin-top:4px"><b>Project:</b> ${
          //     //   d.data.currentProject
          //     // } </div>
          //     // <div style="color:#404040;font-size:12px;margin-top:4px"><b>Project End date:</b> ${
          //     //   d.data.projectEndDate
          //     // } </div>
          //     // ${d.data.company !== 'rakbank'?'<div style="color:#404040;font-size:12px;margin-top:4px"><b>Contract End date:</b>'+d.data.contractEndDate+'</div>':''}
          //     `</div> 
          //          <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
          //            <div> Manages:  ${d.data._directSubordinates} 👤</div>  
          //            <div> Oversees: ${d.data._totalSubordinates} 👤</div>    
          //          </div>
          //         </div>     
          // </div>`
          })
          .compact(true)
          .render()
          .expandAll()
          //.fullscreen('body')
          ;
      }
    });

  }, [url, d3Container.current]);

  return (
    <div>
      <div>
        <span>Data File:</span>
        <input type='url' placeholder='Enter CSV file URL' onChange={(e) => setUrl(e.target.value === "" ? require('./data/org.csv') : e.target.value)}></input>
        <button
          onClick={() => chart.exportImg({full:true, scale: 7})}
          className="btn btn-action-button waves-effect waves-light"
        >
          export full img
        </button>
      </div>
      <div ref={d3Container} style={{ height: '3380px', width: '100%', backgroundColor: '#f6f6f6' }} />
    </div>
  );
};
