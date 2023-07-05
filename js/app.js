// Перевірка підтримки webp, додавання класа webp чи no-webp для HTML
export function isWebp() {
  // Перевірка підтримки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Додавання класу _webp чи _no-webp для HTML
  testWebP(function (support) {
    let className = support === true? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

export function pageWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

// $('select').niceSelect();

// Меню
var menu_btn = document.querySelector('.menu-btn');
menu_btn.onclick = function(){
  this.parentElement.classList.toggle('open');
}

var submenu_btn = document.querySelectorAll('.menu-item-has-children > a');
for (var i = 0; i < submenu_btn.length; i++) {
  submenu_btn[i].onclick = function(){
    this.parentElement.classList.toggle('_active')
  };
}

if (document.querySelector('[data-services]')) {
  const services_sl = new Swiper('[data-services]', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
		loop: true,
    speed: 800,
    navigation: false,
    pagination: {
      el: "[data-services] .pag",
      clicable: true,
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    }
  });
};

if (document.querySelector('[data-reviews]')) {
  const reviews_sl = new Swiper('[data-reviews]', {
    slidesPerView: 1,
    grid: {
      rows: 2,
    },
    spaceBetween: 30,
    speed: 800,
    navigation: false,
    pagination: {
      el: "[data-reviews] .pag",
      clicable: true,
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });
};

if (document.querySelector('[data-team]')) {
  const team_sl = new Swiper('[data-team]', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: false,
		loop: true,
    speed: 800,
    navigation: false,
    pagination: {
      el: "[data-team] .pag",
      clicable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 107,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 50,
      }
    }
  });
};


if(document.querySelector('#tarrifs')){
	// получаем массив всех вкладок
	const tabs = document.querySelectorAll(".fb-pricing__tab");
	// получаем массив всех блоков с содержимым вкладок
	const contents = document.querySelectorAll(".fb-pricing__body");

	// запускаем цикл для каждой вкладки и добавляем на неё событие
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", ( event ) => {

			// сначала нам нужно удалить активный класс именно с вкладок
			let tabsChildren = event.target.parentElement.children;
			for (let t = 0; t < tabsChildren.length; t++) {
				tabsChildren[t].classList.remove("fb-pricing__tab--active");
			}
			// добавляем активный класс
			tabs[i].classList.add("fb-pricing__tab--active");
			// теперь нужно удалить активный класс с блоков содержимого вкладок
			let tabContentChildren = event.target.parentElement.nextElementSibling.children;
      console.log(tabContentChildren);
			for (let c = 0; c < tabContentChildren.length; c++) {
				tabContentChildren[c].classList.remove("fb-pricing__body--active");
			}
			// добавляем активный класс
			contents[i].classList.add("fb-pricing__body--active");

		});
	}
};

// Accordion
if ($('.accordion').length) {
  $('.accordion').accordion({
    onChanging: function onChanging() {
      $(this).closest('.accordion').toggleClass('is-active');
    }
  });
  $('[data-accordion-close]').on('click', function (evt) {
    evt.preventDefault();
    $('.accordion').accordion('close', 0);
  });
};


$('#price').keyup(function() {
    $(this).attr('size', $(this).val().length)
});

// Калькулятор
$(function () {

	if (document.querySelector('#pricing')) {		

		$('#pricing').bind("change", function() {
			if($('#dr__check').is(':checked')){ 
				$('#dr__check').attr('checked', true);
				$('.dr-wrapper').removeClass('no-active');
			} else {
				$('#dr__check').removeAttr('checked');
				$('.dr-wrapper').addClass('no-active');
				$('#dr_input_value').val('0');
				$('#dr_price').val('0')
				calculate_price();
			}

			if($('#traffic__check').is(':checked')){ 
				$('#traffic__check').attr('checked', true);
				$('.traffic-wrapper').removeClass('no-active');
			} else {
				$('#traffic__check').removeAttr('checked');
				$('.traffic-wrapper').addClass('no-active');
				$('#traffic_input_value').val('0');
				$('#traffic_price').val('0')
				calculate_price();
			}

			if($('#word_count__check').is(':checked')){ 
				$('#word_count__check').attr('checked', true);
				$('.pricing-wrapper').removeClass('no-active');
			} else {
				$('#word_count__check').removeAttr('checked');
				$('.pricing-wrapper').addClass('no-active');
				$('#word_count_input_value').val('0');
				$('#word_count_price').val('0')
				calculate_price();
			}

			if($('#dr__check').attr("checked") != 'checked' && $('#traffic__check').attr("checked") != 'checked') {
				$('.card-btn').addClass('disabled');
			} else {
				$('.card-btn').removeClass('disabled');
			}
		});

		$('#dr_price').bind("change", function () {
			calculate_price();
		});

		$('#traffic_price').bind("change", function () {
			calculate_price();
		});

		$("#word_count_price").bind("change", function () {
			calculate_price();
		});

		$("#domain_qty_value").bind("change keyup input", function () {
			if ($(this).val() == 0) {
				$(this).val('1');
			}
			if ($(this).val() > 100) {
				$(this).val('100');
			}
			calculate_price();
		});

		const $block = $('#site_count').clone()
		var domain_qty_value = $("#domain_qty_value").val(),
				value = 1,
				count = 1;
		$('.plus').on("click", function () {
			value = parseInt(value + 1);
			$("#domain_qty_value").val(value);
			calculate_price();
			count += 1;
			$('#url_anchor_text').attr('placeholder', "URL and Anchor Text in quantity " + count)
		});

		$('.minus').on("click", function () {
			if ($("#domain_qty_value").val() <= 1) {
				$("#domain_qty_value").val(value);
			} else {
				value = parseInt(value - 1);
				$("#domain_qty_value").val(value);
			}
			count -= 1;
			$('#url_anchor_text').attr('placeholder', "URL and Anchor Text in quantity " + count)
			calculate_price();
		});

		var dr_slider = document.getElementById('dr_input_slider');
		noUiSlider.create(dr_slider, {
			start: 20,
			snap: true,
			behaviour: 'drag',
			tooltips: true,
			connect: [true, false],
			range: {
				'min': 20,
				'25%': 30,
				'50%': 40,
				'75%': 50,
				'max': 60
			},
			format: wNumb({
				decimals: '0',
				prefix: '',
				suffix: ''
			})
		});
		dr_slider.noUiSlider.on('update', function (value) {
			$("#dr_value").html(value);
			$("#dr_input_value").val(value);

			switch ($("#dr_input_value").val()) {
				case '20':
					var dr_price = '25';
					break;
				case '30':
					var dr_price = '40';
					break;
				case '40':
					var dr_price = '55';
					break;
				case '50':
					var dr_price = '75';
					break;
				case '60':
					var dr_price = '100';
					$('#dr_value').text('60+');
					$('#dr_input_slider .noUi-tooltip').text('60+');
					break;
			}
			$("#dr_price").val(dr_price).trigger("change");
		});

		var traffic_slider = document.getElementById('traffic_input_slider');;
		noUiSlider.create(traffic_slider, {
			start: 1000,
			snap: true,
			behaviour: 'drag',
			tooltips: true,
			connect: [true, false],
			range: {
				'min': 1000,
				'20%': 5000,
				'40%': 10000,
				'60%': 15000,
				'80%': 20000,
				'max': 25000,
			},
			format: wNumb({
				decimals: '0',
				prefix: '',
				suffix: ''
			})
		});
		traffic_slider.noUiSlider.on('update', function (value) {
			$("#traffic_value").html(value);
			$("#traffic_input_value").val(value);

			switch ($("#traffic_input_value").val()) {
				case '1000':
					var traffic_price = '25';
					break;
				case '5000':
					var traffic_price = '45';
					break;
				case '10000':
					var traffic_price = '65';
					break;
				case '15000':
					var traffic_price = '90';
					break;
				case '20000':
					var traffic_price = '115';
					break;
				case '25000':
					var traffic_price = '145';
					$('#traffic_value').text('25000+');
					$('#traffic_input_slider .noUi-tooltip').text('25000+');
					break;
			}
			$("#traffic_price").val(traffic_price).trigger("change");
		});

		var word_count_slider = document.getElementById('word_count_input_slider');
		noUiSlider.create(word_count_slider, {
			start: 500,
			snap: true,
			behaviour: 'drag',
			tooltips: true,
			connect: [true, false],
			range: {
				'min': 100,
				'5%': 200,
				'10%': 300,
				'15%': 400,
				'20%': 500,
				'25%': 600,
				'30%': 700,
				'35%': 800,
				'40%': 900,
				'45%': 1000,
				'50%': 1100,
				'55%': 1200,
				'60%': 1300,
				'65%': 1400,
				'70%': 1500,
				'75%': 1600,
				'80%': 1700,
				'85%': 1800,
				'90%': 1900,
				'max': 2000
			},
			format: wNumb({
				decimals: '0',
				prefix: '',
				suffix: ''
			})
		});
		word_count_slider.noUiSlider.on('update', function (value) {
			$("#word_count").html(value);
			$("#word_count_input_value").val(value);

			switch ($("#word_count_input_value").val()) {
				case '100':
					var word_count_price = '5';
					break;
				case '200':
					var word_count_price = '10';
					break;
				case '300':
					var word_count_price = '15';
					break;
				case '400':
					var word_count_price = '20';
					break;
				case '500':
					var word_count_price = '25';
					break;
				case '600':
					var word_count_price = '30';
					break;
				case '700':
					var word_count_price = '35';
					break;
				case '800':
					var word_count_price = '40';
					break;
				case '900':
					var word_count_price = '45';
					break;
				case '1000':
					var word_count_price = '50';
					break;
				case '1100':
					var word_count_price = '55';
					break;
				case '1200':
					var word_count_price = '60';
					break;
				case '1300':
					var word_count_price = '65';
					break;
				case '1400':
					var word_count_price = '70';
					break;
				case '1500':
					var word_count_price = '75';
					break;
				case '1600':
					var word_count_price = '80';
					break;
				case '1700':
					var word_count_price = '85';
					break;
				case '1800':
					var word_count_price = '90';
					break;
				case '1900':
					var word_count_price = '95';
					break;
				case '2000':
					var word_count_price = '100';
					break;
			}
			$("#word_count_price").val(word_count_price).trigger("change");
		});

		/* Continue Button */
		$(document.body).on('click', '#abc_packages_continue', function () {
			// e.preventDefault();

			var dr_input_value = $("#dr_input_value").val(),
				dr_price = $("#dr_price").val(),
				traffic_input_value = $("#traffic_input_value").val(),
				traffic_price = $("#traffic_price").val(),
				word_count_input_value = $("#word_count_input_value").val(),
				word_count_price = $("#word_count_price").val(),
				domain_qty_value = $("#domain_qty_value").val(),
				total_amount = $("#total_amount").text();

			if (domain_qty_value == 0) {
				/** Set Default domain qty to 1 */
				$("#domain_qty_value").focus();
				$("#domain_qty_value").val(1);
				calculate_price();
				return false;
			}

			var data = {
				dr: dr_input_value,
				dr_price: dr_price,
				traffic: traffic_input_value,
				traffic_price: traffic_price,
				word_count: word_count_input_value,
				word_count_price: word_count_price,
				qty: domain_qty_value,
				total: total_amount,
			};

			$("#order_price").html(total_amount);
			$("#order_dq").html(domain_qty_value);
			$("#order_dr_price").html(dr_price);
			$("#order_dr_value").html(dr_input_value);
			$("#order_traffic_price").html(traffic_price);
			$("#order_traffic_value").html(traffic_input_value);
			$("#order_word_count_price").html(word_count_price);
			$("#order_word_count_value").html(word_count_input_value);

			$("#order_price_form").val(total_amount);
			$("#order_dq_form").val(domain_qty_value);
			$("#order_dr_price_form").val(dr_price);
			$("#order_dr_value_form").val(dr_input_value);
			$("#order_traffic_price_form").val(traffic_price);
			$("#order_traffic_value_form").val(traffic_input_value);
			$("#order_word_count_price_form").val(word_count_price);
			$("#order_word_count_value_form").val(word_count_input_value);

			// $.fancybox.close();
			$.fancybox.open({
				src: '#abc_packages_order_details',
			});

		});

		/* Calculate DR/Traffic Price */
		function calculate_price() {
			var dr_price = $("#dr_price").val(),
				traffic_price = $("#traffic_price").val(),
				word_price = $("#word_count_price").val(),
				qty = $("#domain_qty_value").val(),
				dr_wrapper = $('.dr-wrapper'),
				traffic_wrapper = $('.traffic-wrapper');

			var price_sum = parseFloat(dr_price) + parseFloat(traffic_price) + parseFloat(word_price);

			var amount = price_sum * qty;

			var total = amount.toFixed(2);
			var total_price = $('#total_price').val(total);
			$('#total_amount').html(total_price.val());
		}

		$(document.body).on('click', '#change_package', function (e) {
			$.fancybox.close();
		});
	};
});

// $(".menu-btn").click(function () {
//   document.getElementById('menu').style.width = '100%';
  
// });

// $(".closebtn").click(function () {
//   document.getElementById('menu').style.width = '0';
// });

// Search
// var search = document.querySelectorAll('.search__button');
// for (var i = 0; i < search.length; i++) {
//   search[i].onclick = function(){
//     this.parentElement.classList.toggle('_open')
//   };
// }

// Like
// var apart_like = document.querySelectorAll('.best-item__like');
// for (var i = 0; i < apart_like.length; i++) {
//   apart_like[i].onclick = function(){
//     this.classList.toggle('_active');
//   }
// }

// Reviews_more
// var reviews_more = document.querySelectorAll('.review__body-more');
// for (var i = 0; i < reviews_more.length; i++) {
//   reviews_more[i].onclick = function(){
//     this.parentElement.classList.toggle('_open');
//     if(this.innerHTML == 'Скрыть полный отзыв') {
//       this.innerHTML = 'Читать полный отзыв'
//     } else {
//       this.innerHTML = 'Скрыть полный отзыв'
//     }
//   }
// }




// Маска телефону
// $("#form_tel").inputmask({"mask": "+7 (999) 999-99-99"});


// Filter dropdown
// var dropdown__btn = document.querySelectorAll('.dropdown__btn');
// for (var i = 0; i < dropdown__btn.length; i++) {
//   dropdown__btn[i].onclick = function(){
//     this.parentElement.classList.toggle('show');
//   }
// }

// window.onclick = function(event) {
//   if (!event.target.matches('.dropdown__btn')) {
//     var dropdowns = document.getElementsByClassName("dropdown__content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.parentElement.classList.contains('show')) {
//         openDropdown.parentElement.classList.remove('show');
//       }
//     }
//   }
// }



// $("#dev_tabs").skeletabs({
//   autoplay: false,
//   autoplayInterval: 3000,
//   pauseOnFocus: true,
//   pauseOnHover: false,
//   breakpoint: 992,
//   startIndex: 0,
//   panelHeight: 'adaptive',
//   resizeTimeout: 100,
//   selectEvent: 'click',
//   slidingAccordion: true,
//   transitionDuration: 500
// });


// Form validator
// $( "#login_form" ).validate({
//   errorElement: "span",
//   rules: {
//     login_email: {
//       required: true,
//       email: true,
//     },
//     login_password: {
//       required: true,
//       minlength: 6,
//     }
//   },
//   messages: {
//     login_email: {
//       required: "Error text",
//       email: "Error text",
//     },
//     login_password: {
//       required: "Error text",
//       minlength: "Error text",
//     }
//   }
// });