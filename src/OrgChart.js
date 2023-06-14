import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);
  const borderColor = {
    "rakbank": "#EB2544",
    "contractor": "blue",
    "vendor": "green" 
  }

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 160)
        .onNodeClick((d, i, arr) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .nodeContent((d, i, arr, state) => {
          return `
            <div style="background-color:none;margin-left:1px;height:${
              d.height 
            }px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height
              }px;padding-top:0px;background-color:white;border:3px solid ${borderColor[d.data.company]};">

               <div style="padding:10px; text-align:center">
                   <div style="color:#EB2544;font-size:16px;font-weight:bold"> ${
                     d.data.name
                   } </div>
                   <div style="color:#404040;font-size:12px;margin-top:4px"> ${
                     d.data.positionName
                   } </div>
                   <div style="color:#404040;font-size:12px;margin-top:4px"><b>Specialization:</b> ${
                    d.data.skill
                  } </div>
                   <div style="color:#404040;font-size:12px;margin-top:4px"><b>Project:</b> ${
                    d.data.currentProject
                  } </div>
                  <div style="color:#404040;font-size:12px;margin-top:4px"><b>Project End date:</b> ${
                    d.data.projectEndDate
                  } </div>
                  ${d.data.company !== 'rakbank'?'<div style="color:#404040;font-size:12px;margin-top:4px"><b>Contract End date:</b>'+d.data.contractEndDate+'</div>':''}
               </div> 
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                 <div> Manages:  ${d.data._directSubordinates} 👤</div>  
                 <div> Oversees: ${d.data._totalSubordinates} 👤</div>    
               </div>
              </div>     
      </div>
  `;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} style={{height: '1200px', backgroundColor: '#f6f6f6'}}/>
    </div>
  );
};
