(function () {
	var root = document.documentElement;
	var toggle = document.getElementById('theme-toggle');
	var meta = document.querySelector('meta[name="theme-color"]');

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
})();
