import React from "react"
import Pdf from "assets/images/pdf.svg"
import Xls from "assets/images/xls.svg"
export const ReportsTable = ({data,...rest}) =>{ 
    console.log('datadata', data)
    
    return(
        <div className="bg-white reports-table"> 
            <div className="p-0 d-flex justify-content-between p-3 px-4 pr-5 align-items-center">
                <h3 className="fw-600 m-0">{data&&data?.name}</h3>
            </div>
            <div className='table-section'>
                <div className='table-head d-flex align-items-center justify-content-start  p-3 px-4 pr-5'>
                    <div className='pr-4'>S.No</div>
                    <div className='d-flex justify-content-between w-100'>
                        <div>List of Reports</div>
                        <div>Download as</div>
                    </div>
                </div>
                {data&&data?.report?.map((item,index) =><div className="table-row d-flex align-items-center justify-content-start p-3 px-4 pr-5 border-bottom">
                <div className='sno-col pr-4'>{index+1}</div>
                    <div className='d-flex justify-content-between w-100'>
                         <div>{item.reportName}</div>
                        <div>
                            <img 
                                src={Xls} 
                                className="pl-1 pdf-icon" 
                                alt="XLS"
                                onClick={() => rest.downloadAsset(data.service,2,item)}
                            />
                            <img 
                                src={Pdf} 
                                className="pl-1 xls-icon" 
                                alt="Pdf"
                                onClick={() => rest.downloadAsset(data.service,1,item)}
                            />
                        </div>
                    </div>
                </div> )}
            </div>
        </div>
    )
}