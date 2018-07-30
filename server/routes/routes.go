package routes

import (
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/GolangFullStack/server/middleware"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/corepkgv2/routebuildermdl"

	"github.com/gin-gonic/gin"
)

// Init :- Init route
func Init(g *gin.Engine) {
	o := g.Group("/o")
	o.Use(middleware.DummyMiddleware())
	r := g.Group("/r")
	// r.Use(jwt.Auth(models.JWTKey))
	c := r.Group("/c")
	// c.Use(aclmdl.ACLMiddleware("config/roleenforcer.csv", models.JWTKey, "group"))
	routebuildermdl.Init(o, r, c)
}
