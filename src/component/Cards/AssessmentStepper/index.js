import React from 'react';
import './stepper.scss';
import app from '../../../assets/images/app.svg'

export const AssessmentStepper = ( props ) => {

  let { percentage, titleOne, dateOne, commentOne, linkOne, titleTwo, dateTwo, commentTwo, linkTwo, titleThree, dateThree, activeCircle,  } = props;

  return (
    <React.Fragment>
      <div className="stepper-component">
        <div className='lineDisable' ></div>
        <div className="lineActive" style={{ height: percentage + "%" }} />
        <div
          className={`progressBarRound ${percentage > 0 ? "active" : ''} ${activeCircle === 1 ? "activeCircle" : ''}`}
        >
            <div className="circle-text">F</div>
          <div className="stepper-text">
            <p>Forward by <span className="text-black">&nbsp;{titleOne}</span></p>
            <p className="stepper-date">{dateOne}</p>
            <p className="stepper-comment"><span className="text-black">Comments:&nbsp;</span> {commentOne}</p>
            <p className="stepper-link">{linkOne}</p>
          </div>
        </div>
        <div
          className={`progressBarRound ${percentage > 49 ? "active" : ''} ${activeCircle === 2 ? "activeCircle" : ''}`}
        >
            <div className="circle-text">A</div>
          <div className="stepper-text">
            <p><span className="text-black">First Level Assessment</span>&nbsp; completed by &nbsp;<span className="text-black">{titleTwo}</span></p>
            <p className="stepper-date">{dateTwo}</p>
            {/* <p className="stepper-comment"><span className="text-black">Comments:&nbsp;</span> {commentTwo}</p>*/}
            <p className="stepper-link">{linkTwo}</p> 
          </div>
        </div>
        <div
          className={`progressBarRound ${percentage > 99 ? "active" : ''} ${activeCircle === 3 ? "activeCircle" : ''}`}
        >
            <div className="circle-text-img"><img src={app} alt="" width="15px" /></div>
          <div className="stepper-text">
            <p><span className="text-black">{titleThree}</span>&nbsp; created successfully</p>
            <p className="stepper-date">{dateThree}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AssessmentStepper;