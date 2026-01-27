(() => {
	const button = document.querySelector('[data-ascii-menu-button]');
	const root = document.querySelector('[data-ascii-mobile-nav]');
	const sheet = root?.querySelector('[data-ascii-mobile-sheet]');
	if (!(button instanceof HTMLButtonElement)) return;
	if (!(root instanceof HTMLElement)) return;
	if (!(sheet instanceof HTMLElement)) return;

	const closeEls = Array.from(root.querySelectorAll('[data-ascii-menu-close]'));

	let isOpen = false;
	let previousOverflow = '';

	function setExpanded(expanded) {
		button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
	}

	function lockScroll(lock) {
		if (lock) {
			previousOverflow = document.documentElement.style.overflow || '';
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = previousOverflow;
		}
	}

	function open() {
		if (isOpen) return;
		isOpen = true;
		root.hidden = false;
		setExpanded(true);
		lockScroll(true);
		// trigger transition
		requestAnimationFrame(() => {
			root.classList.add('is-open');
		});
	}

	function close() {
		if (!isOpen) return;
		isOpen = false;
		setExpanded(false);
		lockScroll(false);
		root.classList.remove('is-open');
		// wait for transition before hiding
		window.setTimeout(() => {
			if (!isOpen) root.hidden = true;
		}, 180);
	}

	button.addEventListener('click', () => {
		if (isOpen) close();
		else open();
	});

	for (const el of closeEls) {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			close();
		});
	}

	root.addEventListener('click', (e) => {
		const target = e.target;
		if (!(target instanceof Element)) return;
		// Close when clicking a link inside the sheet
		if (target.closest('a')) close();
	});

	window.addEventListener('keydown', (e) => {
		if (!isOpen) return;
		if (e.key === 'Escape') close();
	});

	// Safety: if resized to desktop while open, close.
	window.addEventListener('resize', () => {
		if (!isOpen) return;
		if (window.matchMedia('(min-width: 720px)').matches) close();
	});
})();
