import React,{ useContext } from "react"
import { LangContext } from "helpers"
export const language={

	mobileNumber:{ en:'Mobile Number',tn:'sdsd' },
	sourceOfInformation:{ en:'Source of Information',tn:'' },
	nameOfYouth:{ en:"Name of the Youth",tn:'' },
	address:{ en:'Address',tn:''},
	fatherAndHusbandName:{en:"Father's / Husband's Name",tn:""},
	dob:{ en:"Date of Birth",tn:'' },
	age:{ en:"Age",tn:'' },
	gender:{ en:'Gender',tn:'' },
	religion:{en:"Religion",tn:''},
	community:{ en:"Community",tn:"" },
	educationQualification:{  en:"Education Qualification",tn:'' },
	govtIDProofTypeForAddress:{ en:"Govt ID Proof Type for address",tn:'' },
    govtIDNumber:{ en:"Govt ID Number",tn:""},
    natureOfMigration:{ en:"Nature of Migration",tn:"" },
    nameOfThePlaceReturnedFrom:{ en:"Name of the place returned from",tn:"" },
    previousOccupationOfTheMigrationReturnee:{ en:'Previous Occupation of the Migration Returnee',tn:"" },

}

export const getLangLabel = (key) =>{

let  langLabel = useContext(LangContext)

return language[key][langLabel]

}