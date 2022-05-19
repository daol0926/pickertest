/* 목표예산 설정 */
function purposeSet(){
	$('.btn-purpose').click(function(){
		$('.purpose-set-wrp').find('.before-won').hide();
		$(this).parents().find('.purpose-set-wrp').addClass('reset-purpose');
	});

	$('.input-purpose').on('input change', function () {
		if ($(this).val() != '') {
			$('.btn-reset-complete').prop('disabled', false);
		}
		else {
			$('.btn-reset-complete').prop('disabled', true);
		}
	});
}


/* datepicker - swiper */
function monthPic(){
	var swiper = new Swiper(".monthSwiper", {
		slidesPerView: 1,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		spaceBetween: 10,
		breakpoints: {
		  640: {
			slidesPerView: 1,
			spaceBetween: 20,
		  },
		  768: {
			slidesPerView: 1,
			spaceBetween: 40,
		  },
		  1024: {
			slidesPerView: 1,
			spaceBetween: 50,
		  },
		},
	  });
}

var dateSwiper;
function datePic(){
	dateSwiper = new Swiper(".dateSwiper", {
		slidesPerView: 7, //한 화면에 노출되는 갯수
		slidesPerGroup: 7, //롤링 갯수
        loop: true, //반복여부
        loopFillGroupWithBlank: true, //빈칸채우는여부
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		spaceBetween: 5,
		breakpoints: {
		  640: {
			slidesPerView: 7,
			spaceBetween: 10,
		  },
		  768: {
			slidesPerView: 7,
			spaceBetween: 20,
		  },
		  1024: {
			slidesPerView: 7,
			spaceBetween: 30,
		  },
		},
	  });

	setCaleandar();
}

/* data picker - 생활비서 */
var currentDate = new Date();
var selectedDate = `${currentDate.getFullYear()}${setNumberFormat(currentDate.getMonth() + 1)}${setNumberFormat(currentDate.getDate())}`;

function setCaleandar(year, month) {
	var setDate = {
		year: year || currentDate.getFullYear(),
		month: month || currentDate.getMonth() + 1,
	}
	var endDate = new Date(setDate.year, setDate.month, 0);
	var week = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

	var $dateSwiper = document.querySelector('.dateSwiper .swiper-wrapper');
	var dateHtml = ''

	var index = 1;
	for (var i = 1; i <= endDate.getDate(); i++) {
		var temp = week[new Date(setDate.year + '-' + setNumberFormat(setDate.month) + '-' + setNumberFormat(i)).getDay()];
		var temp2 = `${setDate.year}${setNumberFormat(setDate.month)}${setNumberFormat(i)}`;

		if (temp2 == selectedDate) {
			dateHtml += `<div class="swiper-slide focused"><a href="#" class="date-select__item" data-target="${temp2}"><span>${temp}</span><span class="num">${setNumberFormat(i)}</span></a></div>`;
			index = i;
		} else {
			dateHtml += `<div class="swiper-slide"><a href="#" class="date-select__item" data-target="${temp2}"><span>${temp}</span><span class="num">${setNumberFormat(i)}</span></a></div>`;
		}
	}

	$dateSwiper.innerHTML = dateHtml;
	dateSwiper.update();
	dateSwiper.slideTo(index - 1, 0);


	$dateSwiper.querySelectorAll('.date-select__item').forEach(item => {
		item.addEventListener('click', (e) => {
			if (document.querySelector(`[data-id="${item.dataset.target}"]`)) {
				var target = document.querySelector(`[data-id="${item.dataset.target}"]`);
				var positionTop = target.getBoundingClientRect().top + window.scrollY;
				var headerH = 0;

				document.querySelectorAll('header').forEach(item => {
					headerH += item.offsetHeight;
				});

				window.scrollTo({top: positionTop - headerH - 52, behavior: 'smooth'});
			}

			e.preventDefault();
		});
	});
}

function setNumberFormat(n) {
	n = n.toString();

	if (n.length < 2) {
		n = '0' + n;
	}

	return n;
}

function calPic() {
	$('.data-month-selec').datepicker({
		firstDay: 1,
		monthNames: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
		minDate: new Date('2022-04-01'),
		showOn: "both",
		dateFormat: "yymmdd",
		//showButtonPanel: true,
		//showAnim: "slideDown",
		//closeText: '닫기',
		dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
		onChangeMonthYear: function (year, month, inst) {
			setCaleandar(year, month);
		},
		// beforeShowDay: function(date) {
		// 	return [true, 'class name'];
		// },
		onSelect: function (dateText) {
			selectedDate = dateText;

			document.querySelectorAll('.date-select__item').forEach((item, index) => {
				var parent = item.parentNode;

				parent.classList.remove('focused');

				if (item.dataset.target == selectedDate) {
					document.querySelector(`[data-target="${selectedDate}"]`).parentNode.classList.add('focused');
					dateSwiper.slideTo(index, 0);
				}
			});

			$('.btn-hide-calendar').trigger('click');
		},
	});

	$('.btn-show-calendar').click(function(){
		$('.date-select').addClass('picker-full');
		$(this).hide();
		$('.dateSwiper').hide();
		$('.btn-hide-calendar').show();
		$(this).parents().find('body').addClass('scroll-y-hidden');
	});
	$('.btn-hide-calendar').click(function(){
		$('.date-select').removeClass('picker-full');
		$(this).hide();
		$('.btn-show-calendar').show();
		$('.dateSwiper').show();
		$(this).parents().find('body').removeClass('scroll-y-hidden');
	});
}