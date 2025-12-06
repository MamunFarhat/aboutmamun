from pathlib import Path
text = Path('styles.css').read_text()
old = '''
.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 50%, var(--text-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
    text-shadow: 0 0 30px rgba(119, 168, 168, 0.2);
}

[data-theme= dark] .hero-title {
    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 50%, #ffffff 100%);
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.title-line {
    display: block;
}
'''
new = '''
.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: transparent;
}

.title-line {
    display: inline-block;
    background: var(--hero-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
    text-shadow: 0 0 30px var(--hero-shadow);
}
'''
if old not in text:
    raise SystemExit('pattern not found')
Path('styles.css').write_text(text.replace(old, new, 1))
