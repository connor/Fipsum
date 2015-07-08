function fipsum() {

	var els,textarea,length,ta_length,i;

	els 		= document.querySelectorAll('input');
	textareas   = document.querySelectorAll('textarea');
	length 		= els.length;
	ta_length 	= textareas.length;
	i 			= 0;

	for ( i; i < length; i ++ ) {

		if (els[i].isVisible(els[i])) {
			switch ( els[i].type ) {
				case 'submit' :
				case 'hidden' :
					break;

				case 'text' :
					els[i].value = getRandomStringWithSpaces(1, 4);
					break;

				case 'url' :
					els[i].value = ('http://' + getRandomStringWithNoSpaces(1, 4) + '.com');
					break;

				case 'email' :
					els[i].value = (getRandomStringWithNoSpaces(1, 2) + '@' + getRandomStringWithNoSpaces(1, 4) + '.com');
					break;

				case 'date' :
					els[i].value = getRandomDate();
					break;

				case 'time' :
					els[i].value = getRandomTime();
					break;

				case 'datetime' :
				case 'datetime-local' :
					els[i].value = getRandomDate() + 'T' + getRandomTime();
					break;

				case 'month' :
					els[i].value = getRandomMonthYear();
					break;

				case 'week' :
					els[i].value = getRandomWeek();
					break;

				case 'number' :
				case 'range' :

					var max,min,value;
					if (els[i].max) {
						max = els[i].max;
					}
					else {
						max = randomFromTo(0, 1000);
					}

					if (els[i].min) {
						min = els[i].min;
					}
					else {
						min = randomFromTo(0, 1000);
					}

					value = randomFromTo(min, max);

					if (els[i].step) {
						value -= (value % els[i].step);
					}

					els[i].value = value;
					break;

				case 'tel' :
					els[i].value = getRandomTel();
					break;

				case 'color' :
					els[i].value = getRandomColor();
					break;

				case 'checkbox' :
				case 'radio' :
					if (Math.random() < 0.5) {
						els[i].checked = true;
					}
					break;

				case 'textarea' :
					els[i].value = getRandomParagraphWithSpaces(1, 4);
					break;

				default :
					els[i].value = getRandomStringWithSpaces(1, 4);
					break;
			}
		}
	}

	for ( var t = 0; t < ta_length; t++ ) {
		if (textareas[t].isVisible(textareas[t])) {
			textareas[t].value = getRandomParagraphWithSpaces(10, 20);
		}
	}

}

function getRandomParagraphWithSpaces(min, max) {
	var wordCount = randomFromTo(min, max);
	var wordLength = pseudoSentences.length;
	var i = 0;
	var out = '';

	while (i < wordCount) {
		out += pseudoSentences[randomFromTo(0, (wordLength - 1))] + ' ';
		i++;
	}

	return out;
}

function getRandomStringWithSpaces(min, max) {
	var wordCount = randomFromTo(min, max);
	var wordLength = pseudoWords.length;
	var i = 0;
	var out = '';

	while (i < wordCount)	{
		out += pseudoWords[randomFromTo(0, (wordLength - 1))] + ' ';
		i++;
	}

	return out;
}

function getRandomStringWithNoSpaces(min, max) {
	var wordCount = randomFromTo(min, max);
	var wordLength = pseudoWords.length;
	var i = 0;
	var out = '';

	while (i < wordCount) {
		out += pseudoWords[randomFromTo(0, (wordLength - 1))];
		i++;
	}

	return out.toLowerCase();
}

function getRandomDate() {
	return  getRandomMonthYear() + '-' + zeroPad(randomFromTo(1, 29), 2);
}

function getRandomTime() {
	return zeroPad(randomFromTo(0, 23), 2) + ':' + zeroPad(randomFromTo(1, 59), 2) + ':' + zeroPad(randomFromTo(1, 59), 2);
}

function getRandomMonthYear() {
	return randomFromTo(1912, 2011) + '-' + zeroPad(randomFromTo(1, 12), 2);
}

function getRandomWeek() {
	return randomFromTo(1912, 2011) + '-W' + zeroPad(randomFromTo(1, 52), 2);
}

function getRandomTel() {
	return '1 ' + '(' + randomFromTo(100, 999) + ')' + ' ' + randomFromTo(100, 999) + '-' + randomFromTo(1000, 9999);
}

function zeroPad(num,count) {
	var numZeropad = num + '';
	while(numZeropad.length < count) {
		numZeropad = "0" + numZeropad;
	}
	return numZeropad;
}

function getRandomColor() {
	return '#'+Math.floor( Math.random()*16777215 ).toString(16).toUpperCase();
}

var pseudoWords = Array('Pharetra', 'Ridiculus', 'Venenatis', 'Egestas', 'Lorem', 'Mattis', 'Dolor', 'Quam', 'Venenatis', 'Ultricies', 'Tortor', 'Vehicula', 'Justo', 'Ipsum', 'Purus', 'Nibh', 'Ornare', 'Condimentum', 'Sem', 'Justo', 'Ornare', 'Ridiculus', 'Dolor', 'Inceptos');
var pseudoSentences = Array('Morbi leo risus, porta ac consectetur ac, vestibulum at eros.', 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.', 'Donec ullamcorper nulla non metus auctor fringilla.', 'Aenean lacinia bibendum nulla sed consectetur.', 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.');

function randomFromTo(from, to) {
	return Math.floor( Math.random() * (to - from + 1) + from );
}

// initialize the context menu
chrome.contextMenus.create({
  "title": "Fipsum",
  "contexts": ["page"],
  "type" : "normal",
  "onclick" : function(info, tab) {
  	chrome.tabs.executeScript(null, {
  		code:"fipsum()"
  	});
  }
});