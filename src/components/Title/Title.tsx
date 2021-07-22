import React from 'react';
import './Title.global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Title = () => {
  return (
    <div className="title">
      <h1 className="pv2 bb flex ph2 measure f4">
        CPU and Weather Temperature Correlation
      </h1>
      <div className="h-25 flex justify-start items-center f4 bb pl2">
        <div className="icon f4">
          <FontAwesomeIcon icon={faFileAlt} />
        </div>
        <h2 className="ml2 f5">Latest Readings</h2>
      </div>
      <div className="h-50 flex justify-start items-center f4 bb pl2">
        <div className="icon f4">
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <h2 className="ml2 f5">Reading Trends</h2>
      </div>
      <div className="flex justify-start items-center f4 pl2 pt1">
        <div className="icon f4">
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <h2 className="ml2 f5">Summary</h2>
      </div>
    </div>
  );
};

export default Title;
