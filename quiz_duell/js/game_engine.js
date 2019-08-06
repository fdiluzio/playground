Game = {

	players: [],
	categoryScreens: [2, 3],
	categoryScreen: 0,
	usedCategories: [],
	currentCategoryIndex: null,
	gameData: null,
	round: null,
	playerIndex: null,
	questionIndex: 0,
	answerBtns: null,
	initialized: false,
	animating: false,
	progressbar: null,

	makePlayers: function() {
		$('[data-player]').each(function(index, el) {
			var name = this.value;
			if (name.length === 0) {
				name = 'Spieler ' + (index + 1);
			}
			Game.players.push(new Player(name));
		});
		Game.getCategory();
	},
	getCategory: function() {

		if (!Game.initialized) {
			$('.pie-cat-label').each(function(index, el) {
				$(el).text(Data.categories[index].name);
				Game.players[0].data.push({
					category: Data.categories[index].name,
					score: 0
				});
				Game.players[1].data.push({
					category: Data.categories[index].name,
					score: 0
				});
			});
		}

		if (Game.usedCategories.length && Game.usedCategories.length % 3 === 0) {
			Game.categoryScreen += 1;
		}

		if (Game.usedCategories.length != Data.count()) {
			Transition.gotoScreen(Game.categoryScreens[Game.categoryScreen]);
		} else {

			Transition.gotoScreen(6);

			var gameTemplate = $('#gameover'),
				statistics = gameTemplate.find('.statistics'),
				winner = gameTemplate.find('.winner'),
				i;
			for (i = 0; i < Game.players.length; i += 1) {
				statistics.append(Game.players[i].scoreCard());
			}

			if (Game.players[0].getScore() > Game.players[1].getScore()) {
				winner.html(Game.players[0].name);
			} else if (Game.players[1].getScore() > Game.players[0].getScore()) {
				winner.html(Game.players[1].name);
			} else {
				winner.html('Unentschieden');
			}

			winner.velocity("callout.tada");

			winner.velocity({
					'borderColor': ['#04FFFF', '#FFF']
				}, {
					duration: 1000,
					loop: 5
				}

			);

			winner.velocity("callout.tada");


		}

	},
	setCategory: function(category) {
		if (Game.ready === true && $.inArray(category, Game.usedCategories) < 0) {
			Game.init(category);
		}
	},
	init: function(category) {

		Game.playerIndex = 0;
		Game.usedCategories.push(category);
		Game.currentCategoryIndex = category;
		Game.gameData = Data.getCategory(category);
		Game.questionIndex = 0;

		if (!Game.initialized) {
			Game.answerBtns = $('.answers button').on('click', Game.checkAnswer);
			Game.question = $('.question h2');
			Game.progressbar = $("#progressbar");
		}

		Game.initialized = true;

		var categoryEl = $('#start-round');
		categoryEl.find('h1').text(Game.gameData.name);
		categoryEl.find('button').text(Game.players[Game.playerIndex].name);
		$('#figure-category').attr('src', 'art/category/' + (Game.currentCategoryIndex + 1) + '.jpg');

		// close category animation then play
		$("path").eq(category).velocity({
			scale: 0.5,
			translateX: 165,
			translateY: 165,
			fill: '#0999A8',
			opacity: 0.5
		}, {
			complete: function() {
				Game.startRound();
			}
		});
	},
	startRound: function() {
		Game.round += 1;
		Transition.gotoScreen(5);
	},
	play: function() {

		var currentData = Game.gameData.questions[Game.questionIndex],
			answer = currentData.answer - 1,
			currentItem,
			i, callback;

		callback = function() {

			Game.question.text(currentData.question);


			for (i = 0; i < 4; i += 1) {
				currentItem = Game.answerBtns.eq(i);
				currentItem.text(currentData.answers[i]);
				currentItem.data('answer', false);
				if (i === answer) {
					currentItem.data('answer', true);
				}
			}

			Game.startCountDownTimer();
			Game.ready = true;

		};

		Transition.gotoScreen(4, callback);

	},

	checkAnswer: function(e) {

		if (Game.ready) {

			var button = $(this),
				correct = button.data('answer');

			Game.stopCountDownTimer();
			Game.ready = false;

			if (correct) {
				Game.players[Game.playerIndex].addScore(Game.currentCategoryIndex);
				button.addClass('answer-correct');
			} else {
				button.addClass('answer-wrong');

				$(this).parent().find('button').each(function(i, el) {

					if ($(this).data('answer') === true) {
						$(this).addClass('answer-correct').velocity('callout.swing');
					}
				})
			}

			// window.setTimeout(function() {
			// 	Game.ready = true;
			// 	Game.nextQuestion();
			// 	Game.answerBtns.removeClass().addClass('answer-neutral');
			// }, 5000);

		}





	},

	continue: function() {

		Game.ready = true;
		Game.nextQuestion();
		Game.answerBtns.removeClass().addClass('answer-neutral');

	},

	nextQuestion: function() {

		if (Game.ready) {

			Game.stopCountDownTimer();
			Game.ready = false;


			Game.questionIndex += 1;
			if (Game.questionIndex < Game.gameData.questions.length) {

				Game.play();

			} else {
				// player 2

				for (i = 0; i < 4; i += 1) {
					currentItem = Game.answerBtns.eq(i);
					currentItem.text('');
				}

				Game.playerIndex += 1;
				if (Game.playerIndex < (Game.players.length)) {
					var categoryEl = $('#start-round');
					categoryEl.find('button').text(Game.players[Game.playerIndex].name);
					Game.questionIndex = 0;
					window.setTimeout(function() {
						Transition.gotoScreen(5);
					}, 0);
				} else {
					// round done
					$('.score').each(function(index, el) {
						var scoreArea = $(el).empty();
						for (var i = 0; i < Game.players.length; i += 1) {
							scoreArea.append(Game.players[i].lastScore(Game.currentCategoryIndex));
						}
					});
					Game.getCategory();
				}
			}

		}
	},
	startCountDownTimer: function() {
		Game.stopCountDownTimer();
		Game.progressbar.velocity({
			width: [0, '100%'],
			backgroundColor: ['#FF0000', '#00FF00'],
		}, {
			duration: (30 * 1000),
			complete: function() {
				Game.nextQuestion();
			}
		});
	},
	stopCountDownTimer: function() {
		Game.progressbar.velocity('stop');
	}
};

Player = function(name) {

	this.name = name;
	this.score = 0;
	this.data = [];

	this.addScore = function(index) {
		this.data[index].score += 1;
		this.score += 1;
	};

	this.getScore = function() {
		return this.score;
	};

	this.scoreCard = function() {

		var i,
			markup = '<table width="320px" cellspacing="0" cellpadding="0" border="0" style="text-align:left;margin:2em auto;font-size: 1.2em;">';

		markup += '<tr colspan="2"><td>' + this.name;
		markup += '</td></tr>';

		for (i = 0; i < this.data.length; i += 1) {
			markup += '<tr><td>';
			markup += this.data[i].category;
			markup += '</td><td>';
			markup += this.data[i].score;
			markup += '</td></tr>';
		}

		markup += '<tr><td style="padding:10px;background-color:rgba(0,0,0,0.5)">Gesamtpunkte';
		markup += '</td><td style="padding:10px;background-color:rgba(0,0,0,0.5)">' + this.score;
		markup += '</td></tr>';

		markup += '</table>';

		return markup;

	};

	this.lastScore = function(category) {

		var i,
			markup = '';

		markup = '<table border="0" cellspacing="0" cellpadding="0">';
		markup += '<tr><td>';
		markup += this.name;
		markup += '</td><td>';
		markup += this.data[category].score;
		markup += '</td></tr></table>';

		return markup;

	};

	return this;
};
