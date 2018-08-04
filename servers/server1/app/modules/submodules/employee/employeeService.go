package employee

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/dalmdl/mongodb"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/routebuildermdl"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/servicebuildermdl"
	"github.com/tidwall/gjson"
	"gopkg.in/mgo.v2/bson"
)

//Instantiate business logic holder
func init() {
	routebuildermdl.RegisterNormalService("CheckActiveEmployeesSVC", CheckActiveEmployees, false, false)

	query := `{"profileId":"~1"}`
	routebuildermdl.RegisterMasterService("GetEmployeeMasterDataSVC", false, false).
		IsCachable().
		MongoService("Customer", query).
		SetArgs("profileId").
		Register()
}

// CheckActiveEmployees is login service return result and error
func CheckActiveEmployees(rs *gjson.Result) (interface{}, error) {

	mongoDAO := mongodb.GetMongoDAO("Customer")
	mongoQuery := bson.M{}
	customerObj, customerDataError := mongoDAO.GetData(mongoQuery)

	if customerDataError != nil {
		loggermdl.LogError("DBError : ", customerDataError)
		return nil, customerDataError
	}

	blHolder := GetEmployeeBL()
	blHolder.SetResultset("employeeEmails", customerObj)
	result, err := servicebuildermdl.GetSB("CheckBL1", &blHolder.AbstractBusinessLogicHolder).
		AddStep("Checking mahendra email", "$1 == true", nil, blHolder.ValidateMahendraEmail, blHolder.ErrorFunction).
		Run(nil)
	if err != nil {
		return nil, err
	}
	output := *result

	return output, nil
}
