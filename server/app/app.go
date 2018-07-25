package app

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app/modules/submodules/login"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/app/modules/submodules/program"
)

// Init :- all packages
func Init() {
	login.Init()
	program.Init()
}
