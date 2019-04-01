
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.hunger = 5
		this.sleepiness = 5
		this.boredom = 5
		this.maxAttr = 10
		this.interval = 60
		this.rate = 2
		this.display = 'https://vignette.wikia.nocookie.net/tamagotchi/images/5/52/Acchitchi_fired_up.png/revision/latest?cb=20150412182449'
		this.name = 'Wes'
	}
	eat(){
		
		this.hunger -= 3
		console.log(this.hunger + ' is the tamagatchis hunger level');
		if (this.hunger <= 0) {
			this.hunger = 0
		}
		$('#hunger').text(this.hunger)
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
		$('#boredom').text(myTamagatchi.boredom)
		$('#sleepiness').text(myTamagatchi.sleepiness)
		$('#hunger').text(myTamagatchi.hunger)
		this.startTimer()
	},
	startTimer(){
		setInterval(() => {
			this.time++
			$('#timer').text(this.time)
			if (this.time % myTamagatchi.interval === 0) {
				this.increaseAtt()
			}
		}, 100)
	},
	printClock(){

	},
	increaseAtt(){
		if (myTamagatchi.hunger < (myTamagatchi.maxAttr - myTamagatchi.rate)) {
			myTamagatchi.hunger += myTamagatchi.rate
			$('#hunger').text(myTamagatchi.hunger)
		} 
		if (myTamagatchi.boredom < (myTamagatchi.maxAttr - myTamagatchi.rate)) {
			myTamagatchi.boredom += myTamagatchi.rate
			$('#boredom').text(myTamagatchi.boredom)
		}
		if (myTamagatchi.sleepiness < (myTamagatchi.maxAttr - myTamagatchi.rate)) {
			myTamagatchi.sleepiness += myTamagatchi.rate
			$('#sleepiness').text(myTamagatchi.sleepiness)
		}

	},
	feed(){
		myTamagatchi.eat()
	}

}




//event listeners for all action buttons
$('#action-buttons').on('click', (e) => {
	const buttonClicked = $(e.target).text()
	console.log(buttonClicked);
	if (buttonClicked === 'Create Tamagatchi') {
		//when the create tamagatchi button is clicked the game.createTamagatchi method is called
		game.createTamagatchi()

	}
	if (buttonClicked === 'Feed') {
		game.feed()
	}

})























