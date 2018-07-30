package models

// Login login object
type Login struct {
	UserID   string   `json:"userId"`
	LoginID  string   `json:"loginId"`
	Password string   `json:"password"`
	Group    []string `json:"group"`
}
