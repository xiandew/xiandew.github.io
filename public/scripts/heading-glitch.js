(() => {
	const prefersReducedMotion =
		window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	// Match the common "scramble appear" character set used on rysa.app.
	const CHARACTERS =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~';
	const DEFAULT_SPEED = 75; // 1..100
	const DEFAULT_SCRAMBLED_LETTERS = 10;
	const DEFAULT_MODE = 'left'; // left | center | right | random
	const KEEP_SPACES = true;
	const MATCH_CASE = true;

	function clamp(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}

	function lerp(a, b, t) {
		return a + (b - a) * t;
	}

	function escapeHtml(text) {
		return String(text)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function splitLastWord(text) {
		const normalized = String(text).trim().replace(/\s+/g, ' ');
		if (!normalized) return null;
		const parts = normalized.split(' ');
		
		// Apply glitch to last few words based on character length
		// Target 15-30 characters for the glitch effect
		const MIN_GLITCH_CHARS = 15;
		const MAX_GLITCH_CHARS = 30;
		
		if (parts.length === 1) {
			// Single word - only glitch if sentence is short enough
			return normalized.length <= MAX_GLITCH_CHARS 
				? { before: '', word: parts[0] }
				: null;
		}
		
		// Build glitch portion from the end
		let glitchText = '';
		let glitchWords = [];
		for (let i = parts.length - 1; i >= 0; i--) {
			const testText = parts.slice(i).join(' ');
			if (testText.length > MAX_GLITCH_CHARS) break;
			glitchText = testText;
			glitchWords = parts.slice(i);
		}
		
		// Ensure we have at least MIN_GLITCH_CHARS (or just use last word)
		if (glitchText.length < MIN_GLITCH_CHARS && parts.length > 1) {
			glitchWords = [parts[parts.length - 1]];
			glitchText = parts[parts.length - 1];
		}
		
		// Don't glitch the entire sentence
		if (glitchWords.length === parts.length) {
			glitchWords = parts.slice(-Math.max(1, Math.floor(parts.length / 2)));
		}
		
		const beforeWords = parts.slice(0, parts.length - glitchWords.length);
		return { 
			before: beforeWords.length > 0 ? beforeWords.join(' ') + ' ' : '', 
			word: glitchWords.join(' ')
		};
	}

	function ensureGlitchSpan(heading) {
		if (!(heading instanceof HTMLElement)) return null;
		if (heading.querySelector('.ascii-glitch-word')) return heading.querySelector('.ascii-glitch-word');

		const originalText = heading.textContent || '';
		const split = splitLastWord(originalText);
		if (!split) return null;

		heading.textContent = '';
		if (split.before) heading.appendChild(document.createTextNode(split.before));

		const wrapper = document.createElement('span');
		wrapper.className = 'ascii-glitch-word';
		wrapper.dataset.target = split.word;

		const measure = document.createElement('span');
		measure.className = 'ascii-glitch-measure';
		measure.setAttribute('aria-hidden', 'true');
		measure.textContent = split.word;

		const overlay = document.createElement('span');
		overlay.className = 'ascii-glitch-overlay';
		overlay.textContent = split.word;

		wrapper.appendChild(measure);
		wrapper.appendChild(overlay);
		heading.appendChild(wrapper);
		return wrapper;
	}

	function makeScrambledVariant(targetText) {
		const out = [];
		let last = '';
		for (let i = 0; i < targetText.length; i++) {
			const ch = targetText[i];
			if (KEEP_SPACES && ch === ' ') {
				out.push(ch);
				continue;
			}
			let next;
			do {
				next = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
				if (MATCH_CASE && ch) {
					next = ch === ch.toUpperCase() ? next.toUpperCase() : next.toLowerCase();
				}
			} while (next === last && CHARACTERS.length >= 8);
			out.push(next);
			last = next;
		}
		return out.join('');
	}

	function intervalMsFromSpeed(speed) {
		const s = clamp(Number(speed) || DEFAULT_SPEED, 1, 100);
		// Approx. match Framer component mapping: 1..100 => 200ms..2ms
		return lerp(200, 2, (s - 1) / 99);
	}

	function renderScrambleAppear(el, targetText, scrambledText, progress, scrambledLetters, mode) {
		const len = targetText.length;
		const r = Math.max(1, Math.floor(scrambledLetters || DEFAULT_SCRAMBLED_LETTERS));
		const t = clamp(progress, 0, 1);
		let parts;

		if (mode === 'center') {
			const mid = Math.ceil(len / 2);
			const half = Math.max(Math.floor(r / 2), 1);
			const leftEdge = lerp(mid, -half, t);
			const rightEdge = lerp(mid + half, 0, t);

			const leftA = clamp(Math.floor(leftEdge), 0, len);
			const leftB = clamp(Math.floor(rightEdge), 0, mid);
			const rightA = clamp(len - Math.floor(leftEdge), 0, len);
			const rightB = clamp(len - Math.floor(rightEdge), mid, len);

			parts = [
				{ text: targetText.slice(0, leftA), type: 'hidden' },
				{ text: scrambledText.slice(leftA, leftB), type: 'scrambled' },
				{ text: targetText.slice(leftB, rightB), type: 'revealed' },
				{ text: scrambledText.slice(rightB, rightA), type: 'scrambled' },
				{ text: targetText.slice(rightA), type: 'hidden' },
			];
		} else if (mode === 'right') {
			const start = lerp(len, -r, t);
			const end = lerp(len + r, 0, t);
			const a = clamp(Math.floor(start), 0, len);
			const b = clamp(Math.floor(end), 0, len);
			parts = [
				{ text: targetText.slice(0, a), type: 'hidden' },
				{ text: scrambledText.slice(a, b), type: 'scrambled' },
				{ text: targetText.slice(b), type: 'revealed' },
			];
		} else if (mode === 'random') {
			// Keep our implementation deterministic-ish: random is hard to match exactly.
			// Fall back to left, which is what most headings use.
			return renderScrambleAppear(el, targetText, scrambledText, progress, scrambledLetters, 'left');
		} else {
			// left
			const start = lerp(-r, len, t);
			const end = lerp(0, len + r, t);
			const a = clamp(Math.floor(start), 0, len);
			const b = clamp(Math.floor(end), 0, len);
			parts = [
				{ text: targetText.slice(0, a), type: 'revealed' },
				{ text: scrambledText.slice(a, b), type: 'scrambled' },
				{ text: targetText.slice(b), type: 'hidden' },
			];
		}

		const html = parts
			.filter((p) => p.text.length > 0)
			.map((p) => {
				const escaped = escapeHtml(p.text);
				if (p.type === 'hidden') return `<span style="opacity:0">${escaped}</span>`;
				return `<span>${escaped}</span>`;
			})
			.join('');

		el.innerHTML = html || escapeHtml(targetText);
	}

	function scrambleAppear(el, targetText, {
		speed = DEFAULT_SPEED,
		scrambledLetters = DEFAULT_SCRAMBLED_LETTERS,
		mode = DEFAULT_MODE,
	} = {}) {
		if (!(el instanceof HTMLElement)) return () => {};

		const text = String(targetText);
		const tickMs = intervalMsFromSpeed(speed);
		const durationMs = tickMs * (text.length + Math.max(1, scrambledLetters));

		let rafId = 0;
		let intervalId = 0;
		let stopped = false;
		let scrambled = makeScrambledVariant(text);
		const start = performance.now();

		intervalId = window.setInterval(() => {
			scrambled = makeScrambledVariant(text);
		}, Math.max(10, Math.floor(tickMs)));

		function frame(now) {
			if (stopped) return;
			const t = clamp((now - start) / durationMs, 0, 1);
			renderScrambleAppear(el, text, scrambled, t, scrambledLetters, mode);
			if (t < 1) rafId = requestAnimationFrame(frame);
			else {
				window.clearInterval(intervalId);
				el.textContent = text;
			}
		}

		rafId = requestAnimationFrame(frame);

		return () => {
			stopped = true;
			window.clearInterval(intervalId);
			cancelAnimationFrame(rafId);
			el.textContent = text;
		};
	}

	function trigger(heading) {
		const wrapper = ensureGlitchSpan(heading);
		if (!wrapper) return;
		if (wrapper.dataset.asciiGlitchRunning === '1') return;
		wrapper.dataset.asciiGlitchRunning = '1';
		wrapper.dataset.asciiGlitchHasRun = '1';

		const target = wrapper.dataset.target || wrapper.textContent || '';
		const overlay = wrapper.querySelector('.ascii-glitch-overlay') || wrapper;

		wrapper.classList.add('ascii-glitching');

		if (typeof wrapper.__asciiGlitchStop === 'function') wrapper.__asciiGlitchStop();
		wrapper.__asciiGlitchStop = scrambleAppear(overlay, target, {
			speed: DEFAULT_SPEED,
			scrambledLetters: DEFAULT_SCRAMBLED_LETTERS,
			mode: DEFAULT_MODE,
		});

		const tickMs = intervalMsFromSpeed(DEFAULT_SPEED);
		const durationMs = tickMs * (String(target).length + DEFAULT_SCRAMBLED_LETTERS);
		window.setTimeout(() => {
			wrapper.classList.remove('ascii-glitching');
			overlay.textContent = target;
			if (typeof wrapper.__asciiGlitchStop === 'function') wrapper.__asciiGlitchStop();
			wrapper.__asciiGlitchStop = null;
		}, Math.ceil(durationMs + 60));
	}

	const headings = Array.from(
		document.querySelectorAll('[data-ascii-glitch]')
	);
	for (const h of headings) ensureGlitchSpan(h);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					const span = entry.target?.querySelector?.('.ascii-glitch-word');
					if (span) span.dataset.asciiGlitchRunning = '0';
					continue;
				}
				trigger(entry.target);
			}
		},
		{ root: null, threshold: 0.25 }
	);

	for (const h of headings) observer.observe(h);
})();
