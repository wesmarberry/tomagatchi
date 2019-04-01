
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.ageInterval = 120 //seconds until tamagatchi ages up
		this.hunger = 5
		this.sleepiness = 5
		this.boredom = 5
		this.maxAttr = 10 // maximum tamagatchi's attributes can go before it dies
		this.interval = 60 // seconds until tamagatchi's attributes increase
		this.rate = 2 // rate at which tamagatchi's attributes increase
		this.display = 'https://vignette.wikia.nocookie.net/tamagotchi/images/5/52/Acchitchi_fired_up.png/revision/latest?cb=20150412182449'
		this.name = ''
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
		console.log('Tamagatchi is sleeping');
		clearInterval(game.awakeTimer)
		let sleepingTime = 0
		game.sleepTimer = setInterval(() => {
			sleepingTime++
			console.log(sleepingTime);
			if (sleepingTime % 20 === 0) {
				this.sleepiness--
			}
			$('#sleepiness').text(this.sleepiness)
		}, 100)
		
	}
	wakeUp(){
		console.log('Tamagatchi is awake');
		clearInterval(game.sleepTimer)
		let awakeTime = 0
		game.awakeTimer = setInterval(() => {
			awakeTime++
			console.log(awakeTime);
			if (awakeTime % 20 === 0) {
				this.sleepiness++
			}
			$('#sleepiness').text(this.sleepiness)
		}, 100)

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


//when form is submitted stores name in myTamagatchi and displays user input of tamagatchi name
$('form').on('submit', (e) => {
	e.preventDefault()
	const inputValue = $('#tamagatchi-name').val()
	myTamagatchi.name = inputValue
	$('#name').text(inputValue)
	$('#tamagatchi-name').val('')

})


const game = {
	time: 0,
	lightsOn: true,
	sleepTimer: '',
	awakeTimer: '',
	createTamagatchi(){
		myTamagatchi = new Tamagatchi() //instantiates tamagatchi
		console.log(myTamagatchi);
		const $disp = $('<img/>').attr('src', myTamagatchi.display)
		$('#playground').append($disp)
		$('#boredom').text(myTamagatchi.boredom)
		$('#sleepiness').text(myTamagatchi.sleepiness)
		$('#hunger').text(myTamagatchi.hunger)
		this.startTimer()
		myTamagatchi.wakeUp()
	},
	startTimer(){
		setInterval(() => {
			this.time++
			$('#timer').text(this.time)
			if (this.time % myTamagatchi.interval === 0) {
				this.increaseHunger()
			}

		}, 100)
	},
	printClock(){

	},
	increaseHunger(){
		//hunger increases at the rate defined in the myTamagatchi class
		if (myTamagatchi.hunger < (myTamagatchi.maxAttr - myTamagatchi.rate)) {
			myTamagatchi.hunger += myTamagatchi.rate
			$('#hunger').text(myTamagatchi.hunger)
		} 
		// if (myTamagatchi.boredom < (myTamagatchi.maxAttr - myTamagatchi.rate)) {
		// 	myTamagatchi.boredom += myTamagatchi.rate
		// 	$('#boredom').text(myTamagatchi.boredom)
		// }
		// if (myTamagatchi.sleepiness < (myTamagatchi.maxAttr - myTamagatchi.rate) && lightsOn === true) {
		// 	myTamagatchi.sleepiness += 1
		// 	$('#sleepiness').text(myTamagatchi.sleepiness)
		// } else if ()

	},
	feed(){
		myTamagatchi.eat()
	},
	lightSwitch(){
		if (this.lightsOn === true) {
			this.lightsOn = false
			$('body').css('background-color', 'grey')
			myTamagatchi.sleep()
		} else {
			this.lightsOn = true
			$('body').css('background-color', 'white')
			myTamagatchi.wakeUp()
		}
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
	if (buttonClicked === 'Feed' && game.lightsOn === true) {
		game.feed()
	} else {
		console.log('Cannot feed Tamagatchi');
	}
	if (buttonClicked === 'Lightswitch') {
		game.lightSwitch()
	}
})























