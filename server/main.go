package main

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app/models"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/routes"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/configmdl"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/loggermdl"

	"github.com/gin-gonic/gin"
)

func main() {
	g := gin.Default()
	initializeAll((g))
	g.Run(":" + models.Config.AppPort)
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

	// App Init
	app.Init()
}

func setconfig() error {
	_, err := configmdl.InitConfig(models.GetConfigFilePath(), &models.Config)
	if err != nil {
		loggermdl.LogError("err: ", err)
		return err
	}
	return nil
}
