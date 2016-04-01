var $ = jQuery;

$(function() {
	var originals = $('.sectionz.container section');
	var dups = originals.clone();
	dups.find('a').each(function() {
		$(this).replaceWith($('<span class="link">' + this.innerHTML + '</span>'));
	});
	$('.sectionz.container').append(dups);
	dups.wrapAll('<div class="dups"></div>');
});


function fixSize() {

	var header = $('h1');
	var maxIterations = 40;
	// console.log('enter');
	// console.log(header.height(), header.css('line-height'));
	while(header.height() > parseFloat(header.css('line-height')) && maxIterations > 0) {
		var fontSize = parseFloat(header.css('font-size'));
		// console.log(header.css('font-size'));
		var newFontSize = fontSize-1;
		// console.log('setting to '+ newFontSize);
		header.css('font-size', newFontSize+'px');
		maxIterations--;
	}
	maxIterations = 10;
	var headerInside = $('h1 span');
	var prevHeight = headerInside.height();
	var wordSpacingNow = 0;
	while(headerInside.width() < header.width() && headerInside.height() == prevHeight && maxIterations > 0) {
		wordSpacingNow = parseInt(header.css('word-spacing'));
		// console.log(wordSpacingNow);
		header.css('word-spacing', wordSpacingNow+1);
		maxIterations--;
	}
	if(wordSpacingNow>0)
		header.css('word-spacing', wordSpacingNow-1);
	// if(header.height() > parseInt(header.css('line-height'))) {
	// 	header.css('font-size', parseInt(header.css('font-size')) -3);
	// 	$('main').css('width', $('main').width() - 5);
	// }
}