(function ($){
$.fn.signature = function () {
	if (!this.is(':checkbox')) {
		throw new Error('Must be used on a checkbox.');
	}
	var template = '<div class="container"><div class="sig-container"><input class="signature-input placeholder" type="text" value="" maxlength="20"/><div class="mask"></div><div class="signature-pretty"></div></div><div class="scrubber"></div></div>';

	var $checkbox = this;
	var $el = $(document.createElement('div')).html(template);
	var $mask = $el.find('.mask');
	var $signaturePretty = $el.find('.signature-pretty');
	var $scrubber = $el.find('.scrubber');
	var $signatureInput = $el.find('.signature-input');
	var $container = $el.find('.container');
	var placeHolderText = 'Enter signature...';

	this.prop('checked', false).hide(); // Hide input
	this.after($el); // Add signature to DOM
	$el.addClass('signature');
	$signatureInput.val(placeHolderText);

	function updateElems () {
		var scrubberLocation = $scrubber.css('left').replace(/[^-\d\.]/g, '');
		$signaturePretty.width(scrubberLocation - 40);
		$mask.width(scrubberLocation - 20);

		$([$mask, $container]).toggleClass("success", (scrubberLocation === "260"));
		$checkbox.prop('checked', (scrubberLocation === "260"));
	}

	$scrubber.draggable({
		containment: $('.container'),

		drag: updateElems,

		start: function () {
			if ($signatureInput.val() === placeHolderText) {
				return false;
			}
		},

		stop: function (e) {
			var scrubberLocation = $scrubber.css('left').replace(/[^-\d\.]/g, '');

			if(scrubberLocation < 260) {
				$scrubber.animate({ left: 0 }, {
					duration: 200,
					step: updateElems
				});
			} else {
				// Clear current callstack
				// Needed when scrubber is slid very fast
				setTimeout(function () {
					updateElems();
				}, 0);
			}
		}
	});

	$signatureInput.blur(function () {
		if (!this.value) {
			$(this).addClass('placeholder');
			this.value = placeHolderText;
		}
	});

	$signatureInput.focus(function () {
		this.value = this.value === placeHolderText ? "" : this.value;
		$(this).removeClass('placeholder');
	});

	$signatureInput.keyup(function (e) {
		$signaturePretty.html(this.value);
	});
};
}(jQuery));