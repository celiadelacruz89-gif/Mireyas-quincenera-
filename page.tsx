'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Music2, Pause, Play, Volume2, VolumeX, Snowflake, ChevronDown, Gift, Clock3 } from 'lucide-react';

const EVENT_DATE = new Date('2027-01-23T21:00:00-07:00').getTime();
const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Hawkins+Ballroom+900+Hawkins+Road+El+Paso+TX+79915';
const photos = ['/photos/mireya-main.jpg', '/photos/mireya-1.jpg', '/photos/mireya-2.jpg', '/photos/mireya-3.jpg'];

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => { const update = () => setRemaining(Math.max(0, EVENT_DATE - Date.now())); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, []);
  const units = remaining === null ? ['--','--','--','--'] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60].map(v => String(v).padStart(2, '0'));
  return <div className="countdown">{units.map((v, i) => <div className="countbox" key={i}><strong>{v}</strong><span>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</span></div>)}</div>;
}

function Portrait({ src, className = '' }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`portrait ${className}`}>
    {!failed ? <img src={src} alt="Mireya in her quinceañera gown" onError={() => setFailed(true)} /> : null}
    {failed && <div className="portrait-placeholder"><Snowflake size={36} strokeWidth={1} /><span>Mireya</span><small>PHOTO COMING SOON</small></div>}
  </div>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  async function enter() {
    if (opening) return;
    setOpening(true);
    // Play from the actual tap so mobile browsers permit sound.
    const audio = audioRef.current;
    if (audio) { audio.muted = false; setMuted(false); try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } }
    timerRef.current = setTimeout(() => { setEntered(true); window.scrollTo({ top: 0, behavior: 'instant' }); }, 1900);
  }
  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); setPlaying(false); }
    else { try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } }
  }
  function toggleMute() { const audio = audioRef.current; if (!audio) return; audio.muted = !audio.muted; setMuted(audio.muted); }

  return <>
    <audio ref={audioRef} src="/music/blue-velvet.mp3" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!entered && <div className={`intro ${opening ? 'opening' : ''}`}>
      <div className="intro-stars" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 9) % 100}%`, top: `${(i * 29 + 7) % 100}%`, animationDelay: `${(i % 9) * -.45}s` }}>✦</i>)}</div>
      <div className="intro-heading"><span className="eyebrow">YOU ARE CORDIALLY INVITED</span><h1>A Winter <em>Wonderland</em></h1><p>MIREYA BERTOLLI · MIS XV AÑOS</p></div>
      <button className="envelope-trigger" onClick={enter} disabled={opening} aria-label="Open Mireya's quinceañera invitation">
        <div className="envelope"><div className="envelope-back"/><div className="letter"><span>YOU'RE INVITED TO</span><b>Mis XV Años</b><strong>Mireya</strong><span>JANUARY 23, 2027</span></div><div className="flap"/><div className="envelope-front"/><div className="seal">MB</div></div>
        <span className="tap-label">{opening ? 'OPENING YOUR INVITATION…' : '✧ TAP THE ENVELOPE TO OPEN ✧'}</span>
      </button>
      <p className="intro-bottom">AN ENCHANTED EVENING BEGINS HERE</p>
    </div>}

    <main className={entered ? 'site visible' : 'site'}>
      <div className="snow" aria-hidden="true">{Array.from({ length: 45 }, (_, i) => <span key={i} style={{ left: `${(i * 43 + 7) % 100}%`, animationDelay: `${(i * -1.13)}s`, animationDuration: `${7 + (i % 8)}s`, fontSize: `${7 + (i % 8)}px` }}>✧</span>)}</div>
      <header className="topbar"><span className="monogram">MB</span><span>MIS XV AÑOS · JANUARY 23, 2027</span><a href="#details">THE DETAILS</a></header>
      <section className="hero" id="top"><div className="arch arch-left"/><div className="arch arch-center"/><div className="arch arch-right"/><div className="hero-glimmer">✧</div><div className="hero-content"><p className="eyebrow">YOU ARE CORDIALLY INVITED TO</p><div className="ornament">✧ ❄ ✧</div><h1>A Winter <em>Wonderland</em></h1><div className="divider-fancy">✦ ───────── ✦ ───────── ✦</div><p className="eyebrow">CELEBRATING THE FIFTEENTH BIRTHDAY OF</p><h2>Mireya Bertolli</h2><p className="eyebrow">MIS XV AÑOS</p><p className="date-line">SATURDAY · JANUARY 23 · 2027</p><a className="scroll-cue" href="#welcome">SCROLL TO ENTER <ChevronDown size={17}/></a></div></section>
      <section className="welcome section" id="welcome"><div className="section-ornament">✧ ❄ ✧</div><p className="eyebrow dark">A NIGHT TO REMEMBER</p><h2>Once Upon a <em>Winter's Night</em></h2><p className="prose">With hearts full of joy, we invite you to celebrate a magical milestone as Mireya steps into her fifteenth year. Join us for an evening of sparkle, memories, and a little winter magic.</p><Portrait src={photos[0]} className="main-portrait"/><div className="caption-line">MIREYA · MIS XV AÑOS</div></section>
      <section className="count-section section"><div className="section-ornament">✦ ✧ ✦</div><p className="eyebrow">THE MAGIC BEGINS IN</p><h2>Counting Down to <em>Forever Memories</em></h2><Countdown/><p className="date-line">JANUARY 23, 2027</p></section>
      <section className="details section" id="details"><div className="section-ornament">❄</div><p className="eyebrow dark">THE CELEBRATION</p><h2>An Enchanted <em>Evening</em></h2><div className="detail-card"><div className="card-ornament">✧ ❄ ✧</div><h3>Hawkins Ballroom</h3><p>900 Hawkins Road<br/>El Paso, Texas 79915</p><div className="detail-rule"/><div className="detail-row"><Clock3 size={20}/><span>Saturday, January 23, 2027<br/><b>9:00 PM – 1:00 AM</b></span></div><a className="outline-button" href={DIRECTIONS} target="_blank" rel="noopener noreferrer"><MapPin size={17}/> GET DIRECTIONS</a></div></section>
      <section className="gallery-section section"><div className="section-ornament">✧ ❄ ✧</div><p className="eyebrow dark">A GLIMPSE OF THE MAGIC</p><h2>Moments of <em>Wonder</em></h2><div className="gallery">{photos.slice(1).map((src, i) => <Portrait key={src} src={src} className={`gallery-photo photo-${i + 1}`}/>)}</div></section>
      <section className="notes-section section"><div className="section-ornament">✦</div><p className="eyebrow">A FEW LOVELY DETAILS</p><h2>Before the <em>Magic</em></h2><div className="note-grid"><div className="note"><Snowflake size={27} strokeWidth={1}/><h3>Dress Code</h3><p>We kindly ask our guests<br/><b>not to wear light blue.</b></p></div><div className="note"><Gift size={27} strokeWidth={1}/><h3>Gifts</h3><p>A money box will be available.<br/>Traditional gifts are welcome.</p></div></div></section>
      <footer><div className="footer-snow">✧ ❄ ✧</div><h2>Thank You for Being<br/>Part of My <em>Story</em></h2><p>WITH LOVE, MIREYA</p><div className="footer-monogram">MB</div><small>JANUARY 23, 2027 · EL PASO, TEXAS</small></footer>
      <div className="music-player"><Music2 size={16}/><div className="track"><strong>Blue Velvet</strong><small>Bobby Vinton</small></div><button onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button><button onClick={toggleMute} aria-label={muted ? 'Unmute music' : 'Mute music'}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button></div>
    </main>
  </>;
}
