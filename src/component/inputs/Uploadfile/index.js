import React, { Fragment, useState } from 'react'
import { validateUploadSize } from 'helpers'
import toast from 'helpers/Toast'

export default function Uploadfile({ uploadedFileName,label, id, isOptional=false, onChange, name, isMult, error,isUploading, accept, size }) {
    return (
        <Fragment>
            <div className={`upload-input ${!uploadedFileName ? 'browse' : ''}`}>
                <div className="custom-upload-file">
                    <span className="upload-icon">
                        <i className={`${!uploadedFileName ? "fa fa-arrow-up" : "icon-doc"}`}></i>
                    </span>
                    <a>{isUploading ? "Uploading..." : uploadedFileName ? uploadedFileName : label}</a>
                    <div className="text-lighGrey-2 ml-auto">
                        <span className="fw-300 mr-3">{isOptional ? '( Optional ) ' : ''}</span>
                        <span className={`cursor-pointer ${isUploading?'text-lighGrey' : 'text-primary'} browse`} onClick={() => {
                            document.getElementById(id).click()
                        }}>
                            {!uploadedFileName ? 'Browse' : 'Change'}
                        </span>
                    </div>
                </div>
                <div className="text-lighGrey-2 d-flex justify-content-end align-items-end flex-column py-2 pr-2">
                    <small>
                        <strong>Maximum upload size</strong> :  5MB; 
                    </small>
                    <small> 
                        <strong>Upload types</strong> : pdf / doc / docx / png / jpg; 
                    </small>
                </div>
                <input
                    type="file"
                    id={id}
                    className="d-none"
                    name={name}
                    disabled={isUploading}
                    onChange={({ target }) => {
                        if(validateUploadSize(target))
                            onChange(name, target.files)
                        else toast('File upload size should be less than 5MB','error')
                    }}
                    multiple={isMult}
                    accept={accept}
                />
                <strong className="text-danger small">
                    {error ? error[0] : ''}
                </strong>
            </div>

        </Fragment>

    )
}

Uploadfile.defaultProps = {
    accept:"image/png, image/jpeg, application/pdf,.xls, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}