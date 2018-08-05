package login

import (
	"fmt"
	"io/ioutil"
	"mime/multipart"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/utiliymdl/guidmdl"
	"github.com/tidwall/gjson"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/filemdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/routebuildermdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/dalmdl/dao"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"

	"GolangFullStack/servers/server1/app/models"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/servicebuildermdl"
)

// BLLogin inherits servicebuildermdl
type BLLogin struct {
	servicebuildermdl.AbstractBusinessLogicHolder
}

// Init - login package initialise
func init() {
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
	//routebuildermdl.RegisterNormalService("LoginService", CheckLoginService, false, false)

	routebuildermdl.RegisterFormBasedService("RegisterUserService", RegisterUserService, false, true)

}

// CheckLoginService is login service return result and error
func CheckLoginService(rs *gjson.Result) (interface{}, error) {

	// create new instance of BLLogin per Service
	blLogin := BLLogin{}
	// This allocate memory for each service
	blLogin.New()
	// SetCustomData insert any custom data you want to use further
	blLogin.SetCustomData("inputData", rs)
	// GetSB returns serviceBuilder instance
	result, err := servicebuildermdl.GetSB("LoginService", &blLogin.AbstractBusinessLogicHolder).
		// AddStep add step by step BL logics in your service
		// For more information visit http://github.com/oleksandr/conditions
		AddStep("Step 1", "$1 ==  true", blLogin.GetLoginFileData, blLogin.CheckLogin, blLogin.ErrorFunction).
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
func (blLogin *BLLogin) GetLoginFileData(ab *servicebuildermdl.AbstractBusinessLogicHolder) error {
	// GetDAO return instance of dalmdl
	data, err := dalmdl.GetDAO().
		// FilePath Set file Path
		FilePath(models.GetLoginFilePath()).
		// IsCacheable cache your data with query
		IsCacheable().
		// You can use queries while fetching data from FDB
		// for more information kindly visit http://github.com/tidwall/gjson
		Query("*").
		Run()
	if err != nil {
		return err
	}
	// SetResultset set result of DAO for further use
	blLogin.SetResultset("loginData", data)
	return nil
}

// RegisterUserService RegisterUser in fdb
func RegisterUserService(form *multipart.Form) (interface{}, error) {
	files, ok := form.File["file"]
	fmt.Println(len(files))
	if !ok {
		err := errormdl.Wrap("File attribute Not found")
		loggermdl.LogError(err)
		return nil, err
	}
	user, extractErr := extractRegistrationServiceData(form)
	if extractErr != nil {
		loggermdl.LogError(extractErr)
		return nil, extractErr
	}
	blLogin := BLLogin{}
	blLogin.New()
	blLogin.SetCustomData("inputData", user)
	_, err := servicebuildermdl.GetSB("RegisterUserService", &blLogin.AbstractBusinessLogicHolder).
		AddStep("Step 1", "$1 > 0", blLogin.GetLoginFileData, blLogin.AppendToLoginData, blLogin.ErrorFunction).
		Run(saveUserInfo)
	if err != nil {
		return nil, err
	}

	saveError := SaveUserPic(files[0], user.UserID)
	if saveError != nil {
		loggermdl.LogError(saveError)
		return nil, saveError
	}
	return user, nil
}

func saveUserInfo(ab *servicebuildermdl.AbstractBusinessLogicHolder) (*interface{}, error) {
	result := ab.GetFinalData()
	out := *result
	ba := []byte(out.(string))
	saveError := filemdl.GetInstance().Save(models.GetLoginFilePath(), ba, true, false)
	if saveError != nil {
		loggermdl.LogError(saveError)
		return nil, saveError
	}
	return result, nil
}

func extractRegistrationServiceData(form *multipart.Form) (models.Login, error) {
	user := models.Login{}

	loginID, ok := form.Value["loginId"]
	if !ok {
		err := errormdl.Wrap("loginId attribute Not found")
		loggermdl.LogError(err)
		return user, err
	}
	user.LoginID = loginID[0]

	password, ok := form.Value["password"]
	if !ok {
		err := errormdl.Wrap("password attribute Not found")
		loggermdl.LogError(err)
		return user, err
	}
	user.Password = password[0]
	groups, ok := form.Value["group"]
	if ok {
		user.Group = groups
	}
	user.UserID = guidmdl.GetGUID()
	return user, nil
}

// SaveUserPic save user display pic
func SaveUserPic(file *multipart.FileHeader, userID string) error {
	multipartFile, openError := file.Open()
	if openError != nil {
		loggermdl.LogError(openError)
		return openError
	}
	ba, readError := ioutil.ReadAll(multipartFile)
	if readError != nil {
		loggermdl.LogError(readError)
		return readError
	}
	path := models.GetUserFilePath(userID)
	saveError := filemdl.GetInstance().Save(path, ba, true, false)
	if saveError != nil {
		loggermdl.LogError(saveError)
		return saveError
	}
	return nil
}
