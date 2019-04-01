
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.hunger = 5
		this.sleepiness = 5
		this.boredom = 5
		this.display = 'https://vignette.wikia.nocookie.net/tamagotchi/images/5/52/Acchitchi_fired_up.png/revision/latest?cb=20150412182449'
		this.name = prompt("What is your Tamagatchi's name?")
	}
	eat(){
		this.hunger += 3
		console.log(this.hunger + ' is the tamagatchis hunger level');
	}
	sleep(){

	}
	ageUp(){

	}
	morph(){

	}
	die(){

	}
	play(){

	}
}

const game = {
	time: 0,
	lightsOn: true,
	createTamagatchi(){
		myTamagatchi = new Tamagatchi() //instantiates tamagatchi
		console.log(myTamagatchi);
		const $disp = $('<img/>').attr('src', myTamagatchi.display)
		$('#playground').append($disp)
	},
	startTimer(){

	}
}

$('#action-buttons').on('click', (e) => {
	const $buttonClicked = $(e.target).text()
	console.log($buttonClicked);
	if ($buttonClicked === 'Create Tamagatchi') {
		game.createTamagatchi()
	}

})























