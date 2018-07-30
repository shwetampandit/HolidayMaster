package login

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app/models"
	"github.com/tidwall/sjson"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"
)

// CheckLogin verify usename and password
func (m *BLHolder) CheckLogin() (map[string]interface{}, error) {
	inputData, ok := m.GetDataInterface("inputData")
	if !ok {
		return nil, errormdl.Wrap("Data Not Found: inputData")
	}
	rs, ok1 := m.GetDataResultset("loginData")
	if !ok1 {
		return nil, errormdl.Wrap("Data Not Found")
	}
	loginInput, casteOk := inputData.(models.Login)
	if !casteOk {
		return nil, errormdl.Wrap("Data Casting Error")
	}
	// For this types of queries kindly visit http://github.com/tidwall/gjson
	password := rs.Get("#[loginId ==" + loginInput.LoginID + "].password").String()
	loggermdl.LogInfo(password == loginInput.Password)
	m.SetFinalData(password == loginInput.Password)
	// this is output validation
	// For more information kindly visit http://github.com/oleksandr/conditions
	return map[string]interface{}{
		"$1": password == loginInput.Password,
	}, nil
}

// ErrorFunction is a recovery function, execute while your output validation fails
func (m *BLHolder) ErrorFunction() (map[string]interface{}, error) {
	// You can write your recovery logic here
	return nil, errormdl.Wrap("User Not Found")
}

// AppendToLoginData append object in login data
func (m *BLHolder) AppendToLoginData() (map[string]interface{}, error) {
	inputData, ok := m.GetDataInterface("inputData")
	if !ok {
		return nil, errormdl.Wrap("Data Not Found: inputData")
	}
	rs, ok1 := m.GetDataResultset("loginData")
	if !ok1 {
		return nil, errormdl.Wrap("Data Not Found")
	}

	result, setError := sjson.Set(rs.String(), "-1", inputData)
	if setError != nil {
		loggermdl.LogError(setError)
		return nil, setError
	}
	m.SetFinalData(result)
	return map[string]interface{}{
		"$1": len(result),
	}, nil
}
