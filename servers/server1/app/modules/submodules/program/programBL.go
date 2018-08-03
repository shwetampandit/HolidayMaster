package program

// FetchProgram fetch program file
func (blProgram *BLProgram) FetchProgram() (map[string]interface{}, error) {

	return map[string]interface{}{
		"$1": true,
	}, nil
}
