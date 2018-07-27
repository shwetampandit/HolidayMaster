package models

const (
	// JWTKey is jwt auth token creation key
	JWTKey = "mysupersecretpassword"
)

var (
	// DBROOTPATH global db path
	DBROOTPATH = ""

	// Config - configuration for application
	Config AppConfig
)

// GetLoginFilePath GetLoginFilePath
func GetLoginFilePath() string {
	return DBROOTPATH + "login.json"
}

// GetConfigFilePath return config filepath
func GetConfigFilePath() string {
	return "config/config.toml"
}

// GetProgramFilePath return programs master
func GetProgramFilePath() string {
	return DBROOTPATH + "programs.json"
}
