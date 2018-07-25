package login

import (
	"encoding/json"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app/models"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/routebuildermdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/dalmdl/dao"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/servicebuildermdl"
)

// BLHolder inherits servicebuildermdl
type BLHolder struct {
	servicebuildermdl.AbstractBusinessLogicHolder
}

// Init - login package initialise
func Init() {
	// This is response header as an optional data send with result
	// This response header is apply when LoginService called
	routebuildermdl.CreateResponseHeader("LoginService").
		// Enable its response to be cached at client end
		// This is very critical operation
		EnableReponseCache().
		// AddMethod add methods with data
		// These are client methods
		AddMethod("TestMethod", nil).
		// SetResponseHeader set response header with return data
		SetResponseHeader()

	// Register Your serviced with restricted and role based configuration
	routebuildermdl.RegisterNormalService("LoginService", CheckLoginService, false, false)
}

// CheckLoginService is login service return result and error
func CheckLoginService(data []byte) (interface{}, error) {

	login := models.Login{}
	unmarshalError := json.Unmarshal(data, &login)
	if errormdl.CheckErr(unmarshalError) != nil {
		loggermdl.LogError(unmarshalError)
		return nil, errormdl.CheckErr(unmarshalError)
	}
	// create new instance of BLHolder per Service
	blHolder := BLHolder{}
	// This allocate memory for each service
	blHolder.Build()
	// SetCustomData insert any custom data you want to use further
	blHolder.SetCustomData("inputData", login)
	// GetSB returns serviceBuilder instance
	result, err := servicebuildermdl.GetSB("LoginService", &blHolder.AbstractBusinessLogicHolder).
		// AddStep add step by step BL logics in your service
		// For more information visit http://github.com/oleksandr/conditions
		AddStep("Step 1", "$1 ==  true", blHolder.GetLoginFileData, blHolder.CheckLogin, blHolder.ErrorFunction).
		// Run Method with exceute your logic and return result and error as per
		Run(nil)
	if err != nil {
		return nil, err
	}
	output := *result
	return output.(bool), nil
}

// GetLoginFileData is return login file data
// This function is used to get data from fdb by calling generic DAO
func (blHolder *BLHolder) GetLoginFileData(ab *servicebuildermdl.AbstractBusinessLogicHolder) error {
	// GetDAO return instance of dalmdl
	data, err := dalmdl.GetDAO().
		// FilePath Set file Path
		FilePath(models.GetLoginFilePath()).
		// IsCacheable cache your data with query
		IsCacheable(true).
		// You can use queries while fetching data from FDB
		// for more information kindly visit http://github.com/tidwall/gjson
		Query("*").
		Run()
	if err != nil {
		return err
	}
	// SetResultset set result of DAO for further use
	blHolder.SetResultset("loginData", data)
	return nil
}
