function fipsum() {

	var els,textarea,length,ta_length,i;

	els 		= document.querySelectorAll('input');
	textareas	= document.querySelectorAll('textarea');
	selects		= document.querySelectorAll('select');
	length		= els.length;
	ta_length	= textareas.length;
	sel_length	= selects.length;
	i			= 0;

	for ( i; i < length; i ++ ) {

		if (els[i].isVisible(els[i])) {
			switch ( els[i].type ) {
				case 'submit' :
				case 'hidden' :
					break;

				case 'text' :
					setValue(els[i], getRandomStringWithSpaces(1, 4));
					break;

				case 'url' :
					setValue(els[i], ('http://' + getRandomStringWithNoSpaces(1, 4) + '.com'));
					break;

				case 'email' :
					setValue(els[i], (getRandomStringWithNoSpaces(1, 2) + '@' + getRandomStringWithNoSpaces(1, 4) + '.com'));
					break;

				case 'date' :
					setValue(els[i], getRandomDate());
					break;

				case 'time' :
					setValue(els[i], getRandomTime());
					break;

				case 'datetime' :
				case 'datetime-local' :
					setValue(els[i], getRandomDate() + 'T' + getRandomTime());
					break;

				case 'month' :
					setValue(els[i], getRandomMonthYear());
					break;

				case 'week' :
					setValue(els[i], getRandomWeek());
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

					setValue(els[i], value);
					break;

				case 'tel' :
					setValue(els[i], getRandomTel());
					break;

				case 'color' :
					setValue(els[i], getRandomColor());
					break;

				case 'checkbox' :
				case 'radio' :
					if (Math.random() < 0.5) {
						els[i].checked = true;
					}
					break;

				default :
					setValue(els[i], getRandomStringWithSpaces(1, 4));
					break;
			}
		}
	}

	for ( var t = 0; t < ta_length; t++ ) {
		if (textareas[t].isVisible(textareas[t])) {
			setValue(textareas[t], getRandomParagraphWithSpaces(10, 20));
		}
	}

	for ( var s = 0; s < sel_length; s++ ) {
		if (selects[s].isVisible(selects[s])) {

			var isMultiple = selects[s].multiple;
			var children = selects[s].getElementsByTagName('option');

			//	Clear selections, randomly check them again
			for (var c = children.length - 1; c >= 0; c--) {
				children[c].selected = false;
			}

			for (var c = children.length - 1; c >= 0; c--) {
				if (Math.random() < 0.5 && children[c].value != "") {
					children[c].selected = true;
					if (!isMultiple) {
						break;
					}
				}
			}
		}
	}
}

function setValue(el, value)
{
	if (!el.value.length) {
		el.value = value;
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
	return  getRandomMonthYear() + '-' + zeroPad(randomFromTo(1, 28), 2);
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