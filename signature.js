(function ($){
$.fn.signature = function () {
	var template = '<div class="container"><div class="sig-container"><input class="signature-input placeholder" type="text" value="" maxlength="20"/><div class="mask"></div><div class="signature-pretty"></div></div><div class="scrubber"></div></div>';

	this.html(template);
	this.addClass('signature');

	var $mask = this.find('.mask');
	var $signaturePretty = this.find('.signature-pretty');
	var $scrubber = this.find('.scrubber');
	var $signatureInput = this.find('.signature-input');
	var $container = this.find('.container');

	var placeHolderText = 'Enter signature...';

	$signatureInput.val(placeHolderText);

	function updateElems () {
		var scrubberLocation = $scrubber.css('left').replace(/[^-\d\.]/g, '');
		$signaturePretty.width(scrubberLocation - 40);
		$mask.width(scrubberLocation - 20);

		$([$mask, $container]).toggleClass("success", (scrubberLocation === "260"));
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
				setTimout(function () {
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