
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.hunger = 5
		this.sleepiness = 5
		this.boredom = 5
		this.name = prompt("What is your Tamagatchi's name?")
	}
	eat(){
		this.hunger += 3
		console.log(this.hunger + ' is the tamagatchis hunger level');
	}
}
