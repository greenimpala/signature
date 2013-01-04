$(function () {
	var $mask = $('.mask');
	var $signaturePretty = $('.signature-pretty');
	var $scrubber = $('.scrubber');
	var $signatureInput = $('.signature-input');
	var placeHolderText = "Enter signature..."

	$signatureInput.val(placeHolderText);

	function updateElems () {
		var scrubberLocation = $scrubber.css('left').replace(/[^-\d\.]/g, '');
		$signaturePretty.width(scrubberLocation - 40);
		$mask.width(scrubberLocation - 20);

		$('.container, .mask').toggleClass("success", (scrubberLocation === "260"));
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
});