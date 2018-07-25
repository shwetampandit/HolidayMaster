package routes

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/middleware"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/routebuildermdl"

	"github.com/gin-gonic/contrib/jwt"
	"github.com/gin-gonic/gin"
)

func Init(g *gin.Engine) {
	o := g.Group("/o")
	o.Use(middleware.DummyMiddleware())
	r := g.Group("/r")
	r.Use(jwt.Auth("mysupersecretpassword"))
	c := r.Group("/c")
	routebuildermdl.Init(o, r, c)
}
