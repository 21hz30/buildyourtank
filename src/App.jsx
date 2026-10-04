import { useEffect, useRef, useState } from 'react'
import Icon from './components/Icon'
import Catalog from './components/Catalog'
import Dialog from './components/Dialog'
import TankScene from './components/TankScene'
import { IDEAS, SIZES, STORAGE_KEY, careForTank, changeItem, changeSetup, createTank, getHealth, loadTank, readSnapshot, remainingCoins, simulate, snapshotLink, tankCost, today } from './lib/tank'

function initialWorkspace() {
  const snapshot = readSnapshot(window.location.hash)
  let tank = snapshot.tank
  if (!tank) { try { tank = loadTank(window.localStorage) } catch { tank = createTank() } }
  return { tank, readOnly: Boolean(snapshot.tank), invalid: snapshot.invalid }
}

export default function App() {
  const [workspace, setWorkspace] = useState(initialWorkspace)
  const { tank, readOnly } = workspace
  const [tab, setTab] = useState('fish')
  const [dialog, setDialog] = useState(null)
  const [notice, setNotice] = useState(workspace.invalid ? 'That tank link could not be opened. Here is your own tank.' : '')
  const [feeding, setFeeding] = useState(false)
  const [changedWater, setChangedWater] = useState(false)
  const [storageOkay, setStorageOkay] = useState(true)
  const [shareCopied, setShareCopied] = useState(false)
  const actionTimer = useRef(null)
  const nameRef = useRef(null)
  const shareInput = useRef(null)
  const health = getHealth(tank)
  const size = SIZES.find(size => size.id === tank.size)
  const balance = remainingCoins(tank)
  const dateKey = today()

  useEffect(() => {
    if (readOnly) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tank)); setStorageOkay(true) } catch { setStorageOkay(false) }
  }, [tank, readOnly])
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 4200)
    return () => clearTimeout(timer)
  }, [notice])
  useEffect(() => () => clearTimeout(actionTimer.current), [])

  function update(next) { setWorkspace(current => ({ ...current, tank: next })) }
  function apply(result) {
    if (readOnly) return
    if (result.error) { setNotice(result.error); return }
    update(result.tank)
  }
  function care(action) {
    if (readOnly) return
    const result = careForTank(tank, action)
    if (result.error) { setNotice(result.error); return }
    update(result.tank)
    setNotice(action === 'feed' ? `A little snack for your swimmers. +${result.reward} coins!` : `Fresh water, happy fish. +${result.reward} coins!`)
    clearTimeout(actionTimer.current)
    setFeeding(action === 'feed'); setChangedWater(action === 'water')
    actionTimer.current = setTimeout(() => { setFeeding(false); setChangedWater(false) }, 3200)
  }
  function save() {
    const next = { ...tank, savedAt: new Date().toISOString() }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); update(next); setStorageOkay(true); setNotice('Saved! Your tank will be here in this browser next time.') } catch { setStorageOkay(false); setNotice('This browser cannot save right now. Use Share to keep a tank snapshot link.') }
  }
  function adoptSnapshot() {
    const copy = { ...tank, name: `${tank.name.slice(0, 29)} (my copy)`, care: {}, savedAt: null }
    setWorkspace({ tank: copy, readOnly: false, invalid: false })
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setNotice('Your own copy, ready for a little personal touch.')
  }
  function chooseIdea(idea) {
    const next = { ...createTank(), name: idea.name, fish: idea.fish, plants: idea.plants, sand: idea.sand }
    if (readOnly) history.replaceState(null, '', window.location.pathname + window.location.search)
    setWorkspace({ tank: next, readOnly: false, invalid: false }); setDialog(null)
    setNotice('A fresh starting point. Make it yours!')
  }
  async function copyShare() {
    const url = snapshotLink(tank, window.location.href)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(url)
      setShareCopied(true)
    } catch { shareInput.current?.focus(); shareInput.current?.select(); setNotice('Select and copy the link to share this snapshot.') }
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><span className="brand-mark"><Icon name="fish" size={28} /></span><span>build<span className="brand-light">your</span>tank<span className="brand-dot">.</span></span></a>
      <nav className="topnav" aria-label="Main navigation">
        <button className="active" onClick={() => document.getElementById('builder').scrollIntoView({ behavior: 'smooth', block: 'start' })}>My tank</button>
        <button onClick={() => setDialog('ideas')}>Tank ideas</button>
        <button onClick={() => setDialog('help')}>How it works</button>
      </nav>
      <div className="wallet" aria-label={`${balance} coins remaining`}><span className="coin-symbol">✦</span><strong>{balance}</strong><span>coins</span></div>
      <button className="mobile-help icon-button" aria-label="How it works" onClick={() => setDialog('help')}><Icon name="info" /></button>
    </header>

    <main>
      <div className="page-heading"><div><h1>A little world.<br /><em>All yours.</em><span className="heading-spark">✳</span></h1></div><div className="heading-description"><p>Pick your fish. Plant something green. <br />Make a little space to slow down.</p><span><span className="small-dot" />No sign-up. Just a little curiosity.</span></div></div>
      {readOnly && <div className="snapshot-banner"><span>You’re visiting a shared tank snapshot.</span><button onClick={adoptSnapshot}>Make it mine <Icon name="arrow" size={16} /></button></div>}
      <section className="builder-grid" id="builder" aria-label="Build your aquarium">
        <div className="tank-column">
          <div className="tank-toolbar"><div className="tank-name"><input ref={nameRef} aria-label="Tank name" value={tank.name} readOnly={readOnly} maxLength={40} onChange={event => update({ ...tank, name: event.target.value })} onBlur={() => { if (!tank.name.trim()) update({ ...tank, name: 'My little world' }) }} />{!readOnly && <button className="icon-button" aria-label="Rename tank" onClick={() => { nameRef.current.focus(); nameRef.current.select() }}><Icon name="edit" size={14} /></button>}</div><span className="tank-day"><span className="small-dot" /> Day 01</span></div>
          <div className="scene-frame"><div className="scene-meta"><span>{size.name} <span className="meta-divider">/</span> Freshwater</span><span><Icon name="sun" size={14} />A sunny little afternoon</span></div><TankScene tank={tank} feeding={feeding} changedWater={changedWater} /><div className="scene-bottom"><span>{size.litres} L of possibility</span><span className="live-indicator"><i />{readOnly ? 'Snapshot' : 'Your living canvas'}</span></div></div>
          <div className="care-bar"><button disabled={readOnly} onClick={() => care('feed')} className={tank.care.feed === dateKey ? 'task-done' : ''}><span className="care-icon peach"><Icon name="food" size={18} /></span><span>Feed fish<small>{tank.care.feed === dateKey ? 'Done for today' : '+5 coins · daily'}</small></span>{tank.care.feed === dateKey && <Icon name="check" size={14} />}</button><button disabled={readOnly} onClick={() => care('water')} className={tank.care.water === dateKey ? 'task-done' : ''}><span className="care-icon blue"><Icon name="droplet" size={18} /></span><span>Change water<small>{tank.care.water === dateKey ? 'Done for today' : '+8 coins · daily'}</small></span>{tank.care.water === dateKey && <Icon name="check" size={14} />}</button><button className="preview-button" onClick={() => setDialog('preview')}><Icon name="clock" size={18} /><span>30 days later</span><Icon name="arrow" size={15} /></button></div>
          <div className="health-strip"><div><span>Swimmers</span><strong>{health.fishCount}<small>little lives</small></strong></div><div><span>Water pH</span><strong>{health.ph}<small>{Number(health.ph) < 7 ? 'slightly acidic' : 'near neutral'}</small></strong></div><div><span>Room to breathe</span><strong>{health.load > health.capacity ? 'A little crowded' : 'Comfortable'}<small>{health.load} / {health.capacity} bioload</small></strong></div><div className="health-status"><span className={`health-dot ${health.load > health.capacity ? 'warning' : ''}`} /><span>{health.status}<small>Learning model</small></span></div></div>
          {health.warnings.length > 0 && <div className="tank-tip"><Icon name="info" size={16} /><p>{health.warnings[0]}</p></div>}
        </div>
        <Catalog tank={tank} tab={tab} onTab={setTab} readOnly={readOnly} onItem={(type, id, delta) => apply(changeItem(tank, type, id, delta))} onSetup={(field, value) => apply(changeSetup(tank, field, value))} />
      </section>
      <div className="workspace-footer"><span className="save-status"><Icon name={storageOkay ? 'check' : 'info'} size={15} />{readOnly ? 'A shared moment, frozen in time.' : storageOkay ? 'Your changes are saved in this browser.' : 'Browser saving is unavailable. Keep a snapshot link.'}</span><div><button className="secondary-button" onClick={() => { setShareCopied(false); setDialog('share') }}><Icon name="share" size={16} />Share tank</button>{readOnly ? <button className="primary-button" onClick={adoptSnapshot}>Make it mine <Icon name="arrow" size={16} /></button> : <button className="primary-button" onClick={save}>{tank.savedAt ? <Icon name="check" size={16} /> : null}Save my tank <Icon name="arrow" size={16} /></button>}</div></div>
      <div className="bottom-note"><span className="note-star">✳</span><p>A little creativity. A little science. A whole lot of calm.</p><button onClick={() => setDialog('help')}>Made for curious minds <Icon name="arrow" size={14} /></button></div>
    </main>
    <footer className="footer"><span>Built with curiosity. Grown with care.</span><span>A student passion project <span className="footer-heart">♡</span></span><button onClick={() => setDialog('ideas')}>Try a tank idea <Icon name="arrow" size={13} /></button></footer>
    {notice && <div className="toast" role="status"><span className="toast-dot" />{notice}</div>}

    {dialog === 'help' && <Dialog title="A small world. A simple start." onClose={() => setDialog(null)}>
      <p className="dialog-intro">You don’t need to know everything about fishkeeping. Start with a little curiosity.</p>
      <ol className="help-steps"><li><span>01</span><div><h3>Build a little habitat</h3><p>Use your 100 starter coins to choose fish, plants, and a home. Remove an item to get its coins back.</p></div></li><li><span>02</span><div><h3>Give it a little care</h3><p>Feed and change water once each day to earn coins. Watch the tips for space and compatibility.</p></div></li><li><span>03</span><div><h3>See what might happen</h3><p>Preview 30 days of growth, save your tank, or share a read-only snapshot with a friend.</p></div></li></ol>
      <div className="dialog-note"><Icon name="info" size={18} /><p>This prototype saves in this browser. A shared link keeps a snapshot, not live updates. Clearing browser storage removes your local tank. Water values, coins, and growth are simplified learning examples, not real fishkeeping advice.</p></div>
      <button className="primary-button dialog-cta" onClick={() => setDialog(null)}>Let’s make something <Icon name="arrow" size={16} /></button>
    </Dialog>}
    {dialog === 'ideas' && <Dialog title="Borrow a little inspiration." className="ideas-dialog" onClose={() => setDialog(null)}>
      <p className="dialog-intro">Three little starting points. Every one is yours to change. Choosing an idea replaces your current setup.</p>
      <div className="ideas-grid">{IDEAS.map(idea => { const sample = { ...createTank(), ...idea }; return <button key={idea.id} className="idea" onClick={() => chooseIdea(idea)}><TankScene tank={sample} mini /><h3>{idea.name}</h3><p>{idea.note}</p><span>{tankCost(sample)} / 100 coins <Icon name="arrow" size={16} /></span></button> })}</div>
    </Dialog>}
    {dialog === 'preview' && <PreviewDialog tank={tank} onClose={() => setDialog(null)} />}
    {dialog === 'share' && <Dialog title="Pass on a little calm." onClose={() => setDialog(null)}>
      <div className="share-preview"><TankScene tank={tank} mini /></div><p className="dialog-intro">Anyone with this link can view this tank snapshot and make their own copy. Your original stays yours.</p>
      <label className="share-label" htmlFor="share-link">Your tank snapshot link</label><div className="share-field"><input ref={shareInput} id="share-link" readOnly value={snapshotLink(tank, window.location.href)} onFocus={event => event.target.select()} /><button onClick={copyShare}>{shareCopied ? 'Copied!' : 'Copy link'}{shareCopied && <Icon name="check" size={15} />}</button></div><p className="share-note">Share again after editing to send a fresh snapshot.</p>
    </Dialog>}
  </div>
}

function PreviewDialog({ tank, onClose }) {
  const result = simulate(tank)
  return <Dialog title="A little look into the future." onClose={onClose}>
    <div className="preview-scene"><TankScene tank={tank} mini /><span>DAY 30</span></div><h3 className="preview-outlook">{result.outlook}</h3><div className="preview-results"><div><span>Water balance</span><strong>{result.quality}%</strong></div><div><span>Your greenery</span><strong>{result.growth}</strong></div><div><span>Room to breathe</span><strong>{result.load > result.capacity ? 'Needs more room' : 'Comfortable'}</strong></div></div>
    <p className="preview-explanation">{result.warnings.length ? result.warnings.join(' ') : 'Your plants and filter have enough capacity for this setup. Regular small water changes help keep things balanced.'}</p><div className="dialog-note"><Icon name="info" size={18} /><p>A simplified 30-day estimate assuming regular care. This preview does not age or change your saved tank.</p></div><button className="primary-button dialog-cta" onClick={onClose}>Back to my tank <Icon name="arrow" size={16} /></button>
  </Dialog>
}
