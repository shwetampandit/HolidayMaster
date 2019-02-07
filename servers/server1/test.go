package main

import "fmt"

func t1(i int) {
	fmt.Println(&i)
}

func main() {
	var a = 10
	fmt.Println("Address of a : ", &a)
	a = 20
	fmt.Println("Address of a : ", &a)
	t1(67)
}
