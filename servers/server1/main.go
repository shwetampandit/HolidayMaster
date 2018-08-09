package main

import (
	_ "GolangFullStack/servers/server1/app"
	"GolangFullStack/servers/server1/app/models"
	"GolangFullStack/servers/server1/routes"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/errormdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/configmdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"

	"github.com/gin-gonic/gin"
)

func main() {
	g := gin.Default()
	initializeAll((g))
	err := g.Run(":" + models.Config.AppPort)
	if errormdl.CheckErr(err) != nil {
		loggermdl.LogError(err)
	}
}

func initializeAll(g *gin.Engine) {
	// Read config and set for global use
	err := setconfig()
	if err != nil {
		loggermdl.LogError("Error while setting config parameters: ", err)
		panic(err)
	}
	loggermdl.Init(models.Config.LogDir, 5, 2048, 2, 1)

	models.DBROOTPATH = models.Config.DatabaseDir
	loggermdl.LogInfo(models.DBROOTPATH)
	// Routes Init
	routes.Init(g)

}

func setconfig() error {
	_, err := configmdl.InitConfig(models.GetConfigFilePath(), &models.Config)
	if err != nil {
		loggermdl.LogError("err: ", err)
		return err
	}

	// mongoConErr := mongodb.Init("config/mongo-config.toml", "clickerpointhost")
	// if mongoConErr != nil {
	// 	loggermdl.LogError("mongoConErr: ", mongoConErr)
	// }

	return nil
}
