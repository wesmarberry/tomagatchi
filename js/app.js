
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.ageInterval = 120 //seconds until tamagatchi ages up
		this.hunger = 5
		this.sleepiness = 5
		this.boredom = 5
		this.maxAttr = 10 // maximum tamagatchi's attributes can go before it dies
		this.hungerInterval = 60 // seconds until tamagatchi's hunger increases
		this.hungerRate = 2 // rate at which tamagatchi's hunger increases
		this.boredomInterval = 100 // seconds until tamagatchis boredom increases
		this.boredomRate = 4 // rate at which tamagatchi's boredom increases
		this.display = 'https://vignette.wikia.nocookie.net/tamagotchi/images/5/52/Acchitchi_fired_up.png/revision/latest?cb=20150412182449'
		this.name = '' // to be set with a form submission
	}
	eat(){
		this.hunger -= 3
		console.log(this.hunger + ' is the tamagatchis hunger level');
		if (this.hunger <= 0) { //prevents adding hunger when Tamagatchi is fully fed
			this.hunger = 0
		}
		$('#hunger').text(this.hunger) //displays new hunger value
	}
	sleep(){
		console.log('Tamagatchi is sleeping');
		clearInterval(game.awakeTimer) // clears the timer tracking how long tamagatchi has been awake
		let sleepingTime = 0

		//sets a timer to track how long the tamagatchi has been sleeping

		game.sleepTimer = setInterval(() => {
			sleepingTime++
			console.log(sleepingTime);

			//subtracts from the sleepiness by one every twenty seconds

			if (sleepingTime % 20 === 0) {
				this.sleepiness--
			}
			if (this.sleepiness <= 0) {
				this.sleepiness = 0
			}
			$('#sleepiness').text(this.sleepiness) //displays sleepiness
		}, 100)
		
	}
	wakeUp(){
		console.log('Tamagatchi is awake');
		clearInterval(game.sleepTimer) // clears timer that tracks how long tamagatchi has been asleep
		let awakeTime = 0

		//sets timer to track how long tamagatchi is awake

		game.awakeTimer = setInterval(() => {
			awakeTime++
			// console.log(awakeTime);

			//adds 1 to tamagatchi's sleepiness every 20 seconds
			if (awakeTime % 20 === 0) {
				this.sleepiness++
			}
			if (this.sleepiness === this.maxAttr) {
				console.log('sleepiness killing him');
				game.causeOfDeath = 'Sleepiness'
				clearInterval(game.awakeTimer)
				this.die()
			} 
			$('#sleepiness').text(this.sleepiness)
		}, 100)

	}
	ageUp(){
		this.age++
		$('#age').text(this.age)
	}
	morph(){

	}
	die(){
		clearInterval(game.gameTimer)
		clearInterval(game.sleepTimer)
		clearInterval(game.awakeTimer)
		$('#playground').prepend($('<h1/>').text('Your Tamagatchi Died of ' + game.causeOfDeath + '. Game Over').css('color', 'red'))
	}
	play(){

		//subtracts from tamagatchi's boredom when the play button is clicked
		this.boredom -= 4
		if (this.boredom <= 0) {
			this.boredom = 0
		}
		$('#boredom').text(this.boredom)
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
	gameTimer: '',
	sleepTimer: '',
	awakeTimer: '',
	causeOfDeath: '',
	createTamagatchi(){
		myTamagatchi = new Tamagatchi() //instantiates tamagatchi
		console.log(myTamagatchi);

		//creates image of the tamagatchi
		const $disp = $('<img/>').attr('src', myTamagatchi.display)
		//puts tamagatchi display on the DOM
		$('#playground').append($disp)
		//displays initial boredom
		$('#boredom').text(myTamagatchi.boredom)
		//displays initial sleepiness
		$('#sleepiness').text(myTamagatchi.sleepiness)
		//displays initial hunger
		$('#hunger').text(myTamagatchi.hunger)
		//starts the timer
		this.startTimer()
		//starts tracking the time tamagatchi is awake
		myTamagatchi.wakeUp()
	},
	startTimer(){
		//starts the timer
		this.gameTimer = setInterval(() => {
			this.time++
			//displays the time on the DOM
			$('#timer').text(this.time)
			//if the current time is divisible by the hunger interval it increases the hunger by the hunger rate
			//hunger still increases while tamagatchi is asleep
			if (this.time % myTamagatchi.hungerInterval === 0) {
				this.increaseHunger()
			}
			//if the current time is divisible by the boredom interval then it increases the boredom by the boredom rate
			//tamagatchi cannot get more bored while alseep so this only runs when the lights are on
			if (this.time % myTamagatchi.boredomInterval === 0 && this.lightsOn === true) {
				console.log("boredom interval reached");
				this.increaseBoredom()
			}
			//if the current time reaches 2 min then tamagatchi ages up
			if (this.time % myTamagatchi.ageInterval == 0) {
				myTamagatchi.ageUp()
			}
		}, 100)
	},
	printClock(){

	},
	increaseHunger(){
		//hunger increases at the rate defined in the myTamagatchi class
		if (myTamagatchi.hunger < myTamagatchi.maxAttr) {
			myTamagatchi.hunger += myTamagatchi.hungerRate
			$('#hunger').text(myTamagatchi.hunger)
		}
		if (myTamagatchi.hunger >= myTamagatchi.maxAttr) {
			console.log('Died in ingrease hunger');
			this.causeOfDeath = 'Hunger'
			myTamagatchi.die()
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
	increaseBoredom(){
		//boredom is increased at the rate defined in the tamagatchi class
		if (myTamagatchi.boredom < myTamagatchi.maxAttr) {
			console.log('boredom increased');
			myTamagatchi.boredom += myTamagatchi.boredomRate
			$('#boredom').text(myTamagatchi.boredom)
		} 
		if (myTamagatchi.boredom >= myTamagatchi.maxAttr) {

			this.causeOfDeath = 'Boredom'
			myTamagatchi.die()
		}
	},
	feed(){
		//feed is run when the feed button is clicked causing the tamagatchi to eat
		myTamagatchi.eat()
	},
	lightSwitch(){
		//when the lightswitch button is clicked if the lights are on they turn off and the background color becomes grey
		if (this.lightsOn === true) {
			this.lightsOn = false
			$('body').css('background-color', 'grey')
			//the sleep method is called and starts tracking the sleep
			myTamagatchi.sleep()
		} else {
			//turns lights back on if theyre off.  turns background color back to white
			this.lightsOn = true
			$('body').css('background-color', 'white')
			//the wakeUp method is called and starts tracking how long the tamagatchi is awake
			myTamagatchi.wakeUp()
		}
	},
	play(){
		//runs play only if the lights are on because you cant play with the tamagatchi while its asleep
		if (this.lightsOn === true) {
			myTamagatchi.play()
		} else {
			console.log("Tamagatchi can't play it's sleeping");
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
	if (buttonClicked === 'Play!') {
		game.play()
	}
})























