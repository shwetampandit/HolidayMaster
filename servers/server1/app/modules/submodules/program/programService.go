package program

import (
	"GolangFullStack/servers/server1/app/models"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/dalmdl/dao"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/servicebuildermdl"
)

// Init :- program Package
func init() {
	GetProgramsMaster()
}

// BLProgram : BLHolder
type BLProgram struct {
	servicebuildermdl.AbstractBusinessLogicHolder
}

// GetProgramsMaster is used to get program file
func GetProgramsMaster() {
	blProgram := BLProgram{}
	blProgram.New()
	// service := servicebuildermdl.GetSB("GetProgramsMaster", &blProgram.AbstractBusinessLogicHolder).
	// 	AddStep("Fetch Program", "$1 == true", blProgram.GetProgramFileData, blProgram.FetchProgram, nil)

	// routebuildermdl.RegisterMasterService("GetProgramsMaster", service, true, true)
}

// GetProgramFileData load program file data
func (blProgram *BLProgram) GetProgramFileData(bl *servicebuildermdl.AbstractBusinessLogicHolder) error {
	programs, err := dalmdl.GetDAO().FilePath(models.GetProgramFilePath()).Query("*").Run()
	if errormdl.CheckErr(err) != nil {
		return errormdl.CheckErr(err)
	}

	blProgram.SetFinalData(programs.Value())
	return nil
}
