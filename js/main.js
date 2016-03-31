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