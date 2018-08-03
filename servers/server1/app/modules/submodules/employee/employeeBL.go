package employee

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/servicebuildermdl"
)

//BLEmployee struct to hold object of business logic holder
type BLEmployee struct {
	servicebuildermdl.AbstractBusinessLogicHolder
}

func GetEmployeeBL() *BLEmployee {
	b := BLEmployee{}
	b.New()
	return &b
}

//ValidateMahendraEmail func
func (blEmployee *BLEmployee) ValidateMahendraEmail() (map[string]interface{}, error) {

	resultSet, _ := blEmployee.GetDataResultset("employeeEmails")
	resultFound := false

	if resultSet.Get("#.email").Get("0").String() == "mahendrav@mkcl.org" {
		blEmployee.SetFinalData("Hello")
		resultFound = true
	} else {
		blEmployee.SetFinalData("Bye")
	}

	return map[string]interface{}{
		"$1": resultFound,
	}, nil
}

// ErrorFunction is a recovery function, execute while your output validation fails
func (blEmployee *BLEmployee) ErrorFunction() (map[string]interface{}, error) {
	// You can write your recovery logic here
	return nil, errormdl.Wrap("User Not Found")
}
