
//class for newborn tamagatchi
class Tamagatchi {
	constructor(){
		this.age = 0
		this.ageInterval = 24 //seconds until tamagatchi ages up
		this.morphAge1 = 1 //age at which tamagatchi will morph the first time
		this.morphAge2 = 4 //age at which tamagatchi will morph the second time
		this.hunger = 5 // base hunger attribute
		this.sleepiness = 5 // base sleepiness attribute
		this.boredom = 5 // base boredom attribute
		this.maxAttr = 10 // maximum tamagatchi's attributes can go before it dies
		this.hungerInterval = 12 // seconds until tamagatchi's hunger increases
		this.hungerDown = 3 // rate at which hunger goes down when tamagatchi is fed
		this.hungerRate = 2 // rate at which tamagatchi's hunger increases
		this.boredomInterval = 20 // seconds until tamagatchis boredom increases
		this.boredomDown = 4 // rate at which boredom goes down when tamagatchi is played with 
		this.boredomRate = 4 // rate at which tamagatchi's boredom increases
		this.sleepRate = 4 // number of seconds until tamagatchi's sleep either increases or decreases
		this.dead = false
		this.phases = [
			['https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png', 'https://cdn.bulbagarden.net/upload/thumb/0/02/Blasty.png/230px-Blasty.png'],
			['https://vignette.wikia.nocookie.net/pokemon-revolution/images/4/41/004Charmander_OS_anime_2.png/revision/latest?cb=20150625082016', 'https://pre00.deviantart.net/fe39/th/pre/i/2016/365/e/8/charmeleon_by_natsuakai-d5lq58r.png', 'https://static.pokemonpets.com/images/monsters-images-300-300/6-Charizard.png'],
			['https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png', 'hhttp://www.sclance.com/pngs/ivysaur-png/ivysaur_png_722324.png', 'https://cdn.bulbagarden.net/upload/thumb/a/ae/003Venusaur.png/1200px-003Venusaur.png']
			]
		this.rand = Math.floor(Math.random() * 3)
		this.display = this.phases[this.rand][0]
		this.name = '' // to be set with a form submission
	}
	eat(){
		this.hunger -= this.hungerDown
		if (this.hunger <= 0) { //prevents adding hunger when Tamagatchi is fully fed
			this.hunger = 0
		}
		$('#hunger').text(this.hunger) //displays new hunger value
	}
	sleep(){
		//adds one to sleepiness every 20 seconds lights are on
		if (game.sleepingTime % this.sleepRate === 0 && game.sleepingTime !== 0) {
				this.sleepiness--
			}
		if (this.sleepiness <= 0) {
			this.sleepiness = 0
		} 
		$('#sleepiness').text(this.sleepiness) //displays sleepiness
	}
	wakeUp(){
		//adds 1 to tamagatchi's sleepiness every 20 seconds
			if (game.awakeTime % this.sleepRate === 0 && game.awakeTime !== 0) {
				this.sleepiness++
			}
			// if sleepiness gets to the max attribute limit tamagatchi dies
			if (this.sleepiness === this.maxAttr) {
				game.causeOfDeath = 'Sleepiness'
				this.die()
			} 
			$('#sleepiness').text(this.sleepiness)
	}
	ageUp(){
		this.age++
		// displays that the tamagatchi got older in the message board
		$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' got older!'))
		// updates age on message board
		$('#age').text(this.age)
		// morphs the tamagatchi based on age
		if (this.age === this.morphAge1) {
			this.morph1()
		} else if (this.age === this.morphAge2) {
			this.morph2()
		} else if (this.age === 10) { // if the age get to 10 tamagatchi dies of natural causes and player wins
			game.causeOfDeath = 'Natural Causes'
			this.die()
		}
	}
	morph1(){
		this.maxAttr = 15 // new max attribute
		this.hungerInterval = 6 
		this.hungerRate = 2 // rate at which tamagatchi's hunger increases
		this.hungerDown = 4
		this.boredomInterval = 12// seconds until tamagatchis boredom increases
		this.boredomDown = 3
		this.boredomRate = 5 // rate at which tamagatchi's boredom increases
		this.sleepRate = 2
		this.display = this.phases[this.rand][1]
		// loop for animation when tamagatchi evolves
		for (let i = 0; i < 50; i++) {

		$("#playground img")
	        .fadeOut(1, () => {
	            $("#playground img").attr('src', this.display);
	        })
	        .fadeIn(1, () => {
	        	$("#playground img").attr('src', this.display);
	        });
    	}
		$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' evolved!'))
		$('#death').text(this.maxAttr)
	}
	morph2(){
		this.maxAttr = 25
		this.hungerInterval = 6
		this.hungerRate = 4 // rate at which tamagatchi's hunger increases
		this.hungerDown = 6
		this.boredomInterval = 12 // seconds until tamagatchis boredom increases
		this.boredomDown = 4
		this.boredomRate = 6 // rate at which tamagatchi's boredom increases
		this.sleepRate = 2
		this.display = this.phases[this.rand][2]
		for (let i = 0; i < 50; i++) {
			$("#playground img")
	        .fadeOut(1, () => {
	            $("#playground img").attr('src', this.display);
	        })
	        .fadeIn(1, () => {
	        	$("#playground img").attr('src', this.display);
	        });
    	}
		$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' evolved!'))
		$('#death').text(this.maxAttr)
	}
	die(){
		if (game.causeOfDeath === 'Natural Causes') {
			clearInterval(game.gameTimer)
			clearInterval(game.sleepTimer)
			clearInterval(game.awakeTimer)
			game.lightsOn = false
			this.dead = true
			$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' died of ' + game.causeOfDeath + '. YOU WIN!')).css('color', 'green')
		} else {
			clearInterval(game.gameTimer)
			clearInterval(game.sleepTimer)
			clearInterval(game.awakeTimer)
			game.lightsOn = false
			this.dead = true
			$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' died of ' + game.causeOfDeath + '. GAME OVER')).css('color', 'red')
		}
	}
	play(){

		//subtracts from tamagatchi's boredom when the play button is clicked
		this.boredom -= this.boredomDown
		if (this.boredom <= 0) {
			this.boredom = 0
		}
		$('#boredom').text(this.boredom)
	}

}

// class Tamagatchi2 extends Tamagatchi {
// 	constructor(morphAt, hunger, sleepiness, boredom, maxAttr, hungerInterval, hungerDown, hungerRate, boredomInterval, boredomDown, boredomRate, display){
// 		super(age, ageInterval, morphAt, hunger, sleepiness, boredom, maxAttr, hungerInterval, hungerDown, hungerRate, boredomInterval, boredomDown, boredomRate, display, name);
// 	}
// }




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
	seconds: 0,
	minutes: 0,
	lightsOn: true,
	gameTimer: '',
	sleepingTime: 0,
	boredomTime: 0,
	awakeTime: 0,
	causeOfDeath: '',
	bounceSpeed: 3000,
	oldX: 0,
	createTamagatchi(){
		myTamagatchi = new Tamagatchi() //instantiates tamagatchi

		//creates image of the tamagatchi
		const $disp = $('<img/>').attr('src', myTamagatchi.display)
		$disp.css({'left': '0px'})
		//puts tamagatchi display on the DOM
		$('#playground').append($disp)
		// this.bounce($disp)
		//displays initial boredom
		$('#boredom').text(myTamagatchi.boredom)
		//displays initial sleepiness
		$('#sleepiness').text(myTamagatchi.sleepiness)
		//displays initial hunger
		$('#hunger').text(myTamagatchi.hunger)
		//starts the timer
		this.startTimer()
		this.bounce()
		$('form').hide()
	},
	startTimer(){
		//starts the timer
		this.gameTimer = setInterval(() => {
			this.time++
			this.seconds++
			if (this.time % 60 === 0) {
				this.minutes += 1
				this.seconds = 0
			}
			$('#seconds').text(this.seconds)
			$('#minutes').text(this.minutes)
			//displays the time on the DOM
			$('#timer').text(this.time)
			//if the current time is divisible by the hunger interval it increases the hunger by the hunger rate
			//hunger still increases while tamagatchi is asleep
			if (this.time % myTamagatchi.hungerInterval === 0) {
				this.increaseHunger()
			}
			//if the current time is divisible by the boredom interval then it increases the boredom by the boredom rate
			//tamagatchi cannot get more bored while alseep so this only runs when the lights are on
			if (this.boredomTime % myTamagatchi.boredomInterval === 0 && this.boredomTime !== 0) {
				this.increaseBoredom()
			}
			//if the current time reaches 2 min then tamagatchi ages up
			if (this.time % myTamagatchi.ageInterval == 0) {
				myTamagatchi.ageUp()
			}
			if (this.lightsOn === true) {
				myTamagatchi.wakeUp()
				this.sleepingTime = 0
				this.awakeTime++
				this.boredomTime++
			} else if (this.lightsOn === false) {
				myTamagatchi.sleep()
				this.awakeTime = 0
				this.sleepingTime++
			}
			// this.bounce()
			
		}, 1000)
	},
	increaseHunger(){
		//hunger increases at the rate defined in the myTamagatchi class
		if (myTamagatchi.hunger < myTamagatchi.maxAttr) {
			myTamagatchi.hunger += myTamagatchi.hungerRate
			$('#hunger').text(myTamagatchi.hunger)
		}
		if (myTamagatchi.hunger >= myTamagatchi.maxAttr) {
			this.causeOfDeath = 'Hunger'
			myTamagatchi.die()
		}
	},
	increaseBoredom(){
		//boredom is increased at the rate defined in the tamagatchi class
		if (myTamagatchi.boredom < myTamagatchi.maxAttr) {
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
		if (myTamagatchi.dead === true) {
			$('#message-ul').prepend($('<li/>').text('You cannot feed ' + myTamagatchi.name + ', it is DEAD'));
		} else {
		myTamagatchi.eat()
		$('#message-ul').prepend($('<li/>').text('You fed ' + myTamagatchi.name + '.'))
		}
	},
	lightSwitch(){
		//when the lightswitch button is clicked if the lights are on they turn off and the background color becomes grey
		if (this.lightsOn === true) {
			this.lightsOn = false
			$('.overlay-div').css('background-color', 'rgba(0,0,0,0.6)')
			//the sleep method is called and starts tracking the sleep
			myTamagatchi.sleep()
			$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' went to sleep.'))
		} else {
			//turns lights back on if theyre off.  turns background color back to white
			this.lightsOn = true
			this.bounce()
			$('.overlay-div').css('background-color', 'rgba(0,0,0,0)')
			//the wakeUp method is called and starts tracking how long the tamagatchi is awake
			$('#message-ul').prepend($('<li/>').text(myTamagatchi.name + ' woke up!'))
			myTamagatchi.wakeUp()
		}
	},
	play(){
		//runs play only if the lights are on because you cant play with the tamagatchi while its asleep
		if (this.lightsOn === true) {
			myTamagatchi.play()
			$('#message-ul').prepend($('<li/>').text('You played with ' + myTamagatchi.name + '!'))
		} else if (myTamagatchi.dead === true) {
			$('#message-ul').prepend($('<li/>').text('You cannot play with ' + myTamagatchi.name + ', it is DEAD'));
		} else {
			$('#message-ul').prepend($('<li/>').text('You cannot play with  ' + myTamagatchi.name + ', it is sleeping.'))
		}
	},
	bounce(){
		//const
		if (this.lightsOn === true) {
			const max = 300
			const min = -300
			const newX = Math.floor(Math.random() * (max - min)) + min
			const newSpeed = this.bounceSpeed + Math.floor(Math.random() * 10)
			if (newX >= this.oldX) {
				$('img').css('transform', 'scaleX(-1)')
				this.oldX = newX
			} else {
				$('img').css('transform', 'scaleX(1)')
				this.oldX = newX
			}

			$('img').animate({
				'left': newX + 'px',
			}, this.bounceSpeed, 'linear', () => {
				this.bounce()
			})
		}

	},
	

}




//event listeners for all action buttons
$('#action-buttons').on('click', (e) => {
	const buttonClicked = $(e.target).text()
	if (buttonClicked === 'Create Tamagatchi') {
		//when the create tamagatchi button is clicked the game.createTamagatchi method is called
		game.createTamagatchi()

	}
	if (myTamagatchi.dead === true) {
		$('#message-ul').prepend($('<li/>').text("You can't do anything with " + myTamagatchi.name + ', it is DEAD'));

	} else if (buttonClicked === 'Feed' && game.lightsOn === true) {
		game.feed()
	} else if (buttonClicked == 'Feed' && game.lightsOn === false){
		$('#message-ul').prepend($('<li/>').text('You cannot feed ' + myTamagatchi.name + ', it is asleep'));
	} else if (buttonClicked === 'Lightswitch') {
		game.lightSwitch()
	} else if (buttonClicked === 'Play!') {
		game.play()
	} 
})

$('#new-game').on('click', () => {
	window.location.reload()
})























