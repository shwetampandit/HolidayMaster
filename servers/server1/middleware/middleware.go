package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func DummyMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("Middleware is called")
		c.Next()
	}
}
