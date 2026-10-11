(function () {
	var root = document.documentElement;
	var toggle = document.getElementById('theme-toggle');
	var meta = document.querySelector('meta[name="theme-color"]');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* Theme */
	function apply(theme) {
		var dark = theme === 'dark';
		root.setAttribute('data-theme', theme);
		toggle.setAttribute('aria-pressed', String(dark));
		toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
		if (meta) meta.setAttribute('content', dark ? '#1f1a2e' : '#f6ecdc');
	}

	apply(root.getAttribute('data-theme') || 'light');

	toggle.addEventListener('click', function () {
		var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		apply(next);
		try { localStorage.setItem('theme', next); } catch (e) {}
	});

	document.getElementById('year').textContent = new Date().getFullYear();

	/* Greeting (doubles as the speech bubble) */
	var greeting = document.getElementById('greeting');
	var restTimer;

	function greetingForNow() {
		var h = new Date().getHours();
		if (h >= 5 && h < 12) return 'Good morning. Cereal weather.';
		if (h >= 12 && h < 18) return 'Good afternoon. Second breakfast?';
		if (h >= 18 && h < 22) return 'Good evening. The lamp is on.';
		return 'Burning the midnight oil? Same.';
	}

	var defaultGreeting = greetingForNow();
	greeting.textContent = defaultGreeting;

	function say(text) {
		greeting.textContent = text;
		clearTimeout(restTimer);
		restTimer = setTimeout(function () { greeting.textContent = defaultGreeting; }, 4000);
	}

	/* Click the avatar */
	var lines = [
		"Hi! Yes, I'm a manager, but I still read the code.",
		'1:1s are my favourite meeting. Honest.',
		'Have you tried turning it off and on again?',
		"Ask me about the games I'm making!",
		"I'd love to hear from you on LinkedIn."
	];
	var lineIndex = 0;

	document.getElementById('avatar-btn').addEventListener('click', function () {
		say(lines[lineIndex]);
		lineIndex = (lineIndex + 1) % lines.length;
	});

	/* Boop the cereal */
	var bowl = document.getElementById('bowl-btn');
	var hoops = bowl.querySelectorAll('.hoop');
	var crunches = 0;

	bowl.addEventListener('animationend', function () { bowl.classList.remove('boop'); });

	bowl.addEventListener('click', function () {
		crunches++;
		if (crunches === 10) say("That's a lot of cereal.");
		else if (crunches === 25) say('Okay, now I am full.');
		else say(crunches === 1 ? 'Crunch!' : 'Crunch x' + crunches);

		if (reduceMotion) return;
		bowl.classList.remove('boop');
		void bowl.offsetWidth;
		bowl.classList.add('boop');

		var hoop = hoops[Math.floor(Math.random() * hoops.length)];
		var dx = (Math.random() - 0.5) * 30;
		hoop.animate([
			{ transform: 'translate(0, 0) rotate(0deg)' },
			{ transform: 'translate(' + dx + 'px, -20px) rotate(200deg)', offset: 0.5 },
			{ transform: 'translate(0, 0) rotate(360deg)' }
		], { duration: 650, easing: 'ease-out' });
	});

	/* Eyes: follow the cursor and blink */
	if (reduceMotion) return;

	var avatar = document.querySelector('.avatar');
	var pupils = document.querySelectorAll('.pupil');
	var eyes = document.querySelectorAll('.eye');
	var frame = null;

	function look(e) {
		if (frame) return;
		frame = requestAnimationFrame(function () {
			frame = null;
			var r = avatar.getBoundingClientRect();
			var dx = e.clientX - (r.left + r.width / 2);
			var dy = e.clientY - (r.top + r.height * 0.4);
			var dist = Math.sqrt(dx * dx + dy * dy) || 1;
			var reach = Math.min(dist / 150, 1) * 2.6;
			var x = (dx / dist) * reach;
			var y = (dy / dist) * reach;
			for (var i = 0; i < pupils.length; i++) {
				pupils[i].setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
			}
		});
	}

	window.addEventListener('pointermove', look);

	function blink() {
		for (var i = 0; i < eyes.length; i++) {
			eyes[i].classList.remove('blink');
			void eyes[i].getBoundingClientRect();
			eyes[i].classList.add('blink');
		}
		setTimeout(scheduleBlink, 0);
	}

	function scheduleBlink() {
		setTimeout(blink, 2500 + Math.random() * 3500);
	}

	scheduleBlink();
})();
