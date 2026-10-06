import { useEffect, useRef, useState } from 'react'
import Icon from './components/Icon'
import Dialog, { DialogNoticeContext } from './components/Dialog'
import RoomScene from './components/RoomScene'
import TankObserver from './components/TankObserver'
import LearnPage from './components/LearnPage'
import { GuideEditor, GuidePanel, GuideWelcome } from './components/Guide'
import defaultGuide from './content/guide.json'
import { GUIDE_CONFIG_KEY, GUIDE_DESTINATIONS, GUIDE_PROGRESS_KEY, advanceGuide, loadGuide, normalizeGuideProgress } from './lib/guide'
import { HealthStats, HomePage, IdeasPage, MyTanksPage, StorePage, TankWarnings } from './components/Pages'
import { CheckInDialog, GuideDialog, NewTankDialog, PreviewDialog, ResourcesDialog, SetupDialog, SpeciesDialog, TankDetailDialog } from './components/WorkspaceDialogs'
import { createTank, readSnapshot, snapshotLink, today } from './lib/tank'
import { WORKSPACE_KEY, activeTank, addTank, buySupply, careForWorkspace, checkIn, createWorkspace, fertilize, loadWorkspace, purchaseItem, purchaseSetup, replaceTank } from './lib/workspace'

const NAVIGATION = [['my-tanks', 'My tanks'], ['ideas', 'Tank idea'], ['store', 'Fish store'], ['learn', 'Learn']]
function getRoute() {
  const hash = window.location.hash
  if (hash.startsWith('#tank=')) return 'shared'
  const value = hash.replace(/^#\/?/, '').split('?')[0]
  return ['home', 'login', 'shared', ...NAVIGATION.map(item => item[0])].includes(value) ? value : 'home'
}
function restoreWorkspace() {
  try { return loadWorkspace(window.localStorage) } catch { return createWorkspace() }
}

export default function App() {
  const [workspace, setWorkspace] = useState(restoreWorkspace)
  const [route, setRoute] = useState(getRoute)
  const [routeHash, setRouteHash] = useState(() => window.location.hash)
  const [shared, setShared] = useState(() => readSnapshot(window.location.hash))
  const [dialog, setDialog] = useState(null)
  const [notice, setNotice] = useState('')
  const [storageOkay, setStorageOkay] = useState(true)
  const [feeding, setFeeding] = useState(false)
  const [changedWater, setChangedWater] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [nickname, setNickname] = useState('')
  const [onboarding, setOnboarding] = useState(() => {
    try { return loadGuide(window.localStorage, defaultGuide) } catch { return loadGuide({ getItem: () => null }, defaultGuide) }
  })
  const [guideStorageOkay, setGuideStorageOkay] = useState(true)
  const pendingGuide = useRef(null)
  const highlightTimer = useRef(null)
  const { guide, progress } = onboarding
  const actionTimer = useRef(null)
  const shareInput = useRef(null)
  const tank = activeTank(workspace)
  const isPublicPage = ['home', 'login', 'shared'].includes(route)
  const checkedIn = workspace.checkIn.date === today()

  useEffect(() => {
    const handleRoute = () => {
      setRoute(getRoute())
      setRouteHash(window.location.hash)
      setShared(readSnapshot(window.location.hash))
      setDialog(null)
      setFeeding(false)
      setChangedWater(false)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])
  useEffect(() => {
    try { localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace)); setStorageOkay(true) } catch { setStorageOkay(false) }
  }, [workspace])
  useEffect(() => {
    document.title = `${NAVIGATION.find(item => item[0] === route)?.[1] || (route === 'login' ? 'Welcome' : route === 'shared' ? 'Shared tank' : 'A little world, all yours')} · Build Your Tank`
  }, [route])
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 5000)
    return () => clearTimeout(timer)
  }, [notice])
  useEffect(() => () => clearTimeout(actionTimer.current), [])
  useEffect(() => {
    try {
      localStorage.setItem(GUIDE_CONFIG_KEY, JSON.stringify(guide))
      localStorage.setItem(GUIDE_PROGRESS_KEY, JSON.stringify(progress))
      setGuideStorageOkay(true)
    } catch { setGuideStorageOkay(false) }
  }, [guide, progress])
  useEffect(() => {
    if (isPublicPage || !pendingGuide.current) return
    const pending = pendingGuide.current
    pendingGuide.current = null
    if (pending.welcome) setDialog({ type: 'guide-welcome' })
    else revealGuideFeature(pending)
  }, [route, routeHash, isPublicPage])
  useEffect(() => () => clearTimeout(highlightTimer.current), [])

  function enterWorkspace(event) {
    event.preventDefault()
    if (progress.status === 'new') pendingGuide.current = { welcome: true }
    window.location.hash = '/my-tanks'
  }
  function goToGuideStep(step) {
    setDialog(null)
    const nextHash = `#/${GUIDE_DESTINATIONS[step.destination].route}`
    if (window.location.hash !== nextHash) window.location.hash = nextHash
    window.scrollTo({ top: 0 })
  }
  function startGuide() {
    const next = progress.status === 'completed'
      ? { version: 1, status: 'active', stepId: guide.steps[0].id, reviewed: [] }
      : { ...progress, status: 'active' }
    setOnboarding(current => ({ ...current, progress: next }))
    goToGuideStep(guide.steps.find(step => step.id === next.stepId) || guide.steps[0])
  }
  function pauseGuide() {
    setOnboarding(current => ({ ...current, progress: { ...current.progress, status: current.progress.status === 'completed' ? 'completed' : 'paused' } }))
    setDialog(null)
  }
  function jumpGuide(id) {
    const step = guide.steps.find(item => item.id === id)
    if (!step) return
    setOnboarding(current => ({ ...current, progress: { ...current.progress, stepId: id, status: 'active' } }))
    goToGuideStep(step)
  }
  function nextGuide() {
    const next = advanceGuide(progress, guide)
    setOnboarding(current => ({ ...current, progress: next }))
    if (next.status === 'completed') open('guide-welcome')
    else goToGuideStep(guide.steps.find(step => step.id === next.stepId))
  }
  function revealGuideFeature(destination) {
    setNotice('')
    if (destination.dialog) { open(destination.dialog, destination.dialog === 'observe' ? tank : undefined); return }
    document.querySelectorAll('.guide-highlight').forEach(element => element.classList.remove('guide-highlight'))
    clearTimeout(highlightTimer.current)
    const target = document.querySelector(`[data-guide="${destination.target}"]`)
    if (!target) return
    target.classList.add('guide-highlight')
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: target.tagName === 'MAIN' ? 'start' : 'center' })
    target.focus({ preventScroll: true })
    highlightTimer.current = setTimeout(() => target.classList.remove('guide-highlight'), 4500)
  }
  function openGuideFeature(step) {
    const destination = GUIDE_DESTINATIONS[step.destination]
    const nextHash = `#/${destination.route}`
    if (window.location.hash !== nextHash) { pendingGuide.current = destination; window.location.hash = nextHash }
    else revealGuideFeature(destination)
  }
  function saveGuide(config) {
    setOnboarding(current => ({ guide: config, progress: normalizeGuideProgress(current.progress, config) }))
    setDialog(null)
    setNotice('Guide updated. Export your script or JSON from Edit guide & script to keep a copy.')
  }

  function open(type, data) { setNotice(''); setShareCopied(false); setDialog({ type, data }) }
  function apply(result, success) {
    if (result.error) { setNotice(result.error); return false }
    setWorkspace(result.workspace)
    if (success) setNotice(success)
    return true
  }
  function select(id) {
    setWorkspace(current => current.tanks.some(item => item.id === id) ? { ...current, activeId: id } : current)
    setFeeding(false); setChangedWater(false)
  }
  function item(type, id, delta = 1) { return apply(purchaseItem(workspace, type, id, delta), delta > 0 ? 'A new little addition to your selected tank' : 'Item removed Its coins are back in your bag') }
  function setup(field, value) { apply(purchaseSetup(workspace, field, value), 'A fresh little change to your setup') }
  function update(next) { setWorkspace(current => replaceTank(current, next)) }
  function care(action) {
    const result = careForWorkspace(workspace, action)
    if (!apply(result, action === 'feed' ? `A little snack for your swimmers. +${result.reward} coins!` : `Fresh water, happy fish. +${result.reward} coins!`)) return
    clearTimeout(actionTimer.current)
    setFeeding(action === 'feed'); setChangedWater(action === 'water')
    actionTimer.current = setTimeout(() => { setFeeding(false); setChangedWater(false) }, 3200)
  }
  function create(input) {
    if (apply(addTank(workspace, input), 'A new world, ready for your personal touch')) {
      setDialog(null)
      if (route !== 'my-tanks') window.location.hash = '/my-tanks'
    }
  }
  function save() {
    const next = replaceTank(workspace, { ...tank, savedAt: new Date().toISOString() })
    try { localStorage.setItem(WORKSPACE_KEY, JSON.stringify(next)); setWorkspace(next); setStorageOkay(true); setNotice('Saved! All your tanks and supplies will be here in this browser next time') } catch { setStorageOkay(false); setNotice('This browser cannot save right now Keep a snapshot using Share tank') }
  }
  async function copyShare() {
    try { await navigator.clipboard.writeText(snapshotLink(tank, window.location.href)); setShareCopied(true) } catch { shareInput.current?.focus(); shareInput.current?.select(); setNotice('Select and copy the link to share this snapshot') }
  }
  const close = () => setDialog(null)

  return <DialogNoticeContext.Provider value={notice}><div className="app-shell">
    {!isPublicPage && <div className="resourcebar"><span className="resourcebar-message">A little ecosystem goes a long way</span><div className="resource-items"><button className="resource-coins" onClick={() => open('resources')} aria-label={`${workspace.coins} coins Open my bag`}><span className="tiny-coin" /><strong>{workspace.coins}</strong><span>coins</span></button><button onClick={() => open('resources')} aria-label={`${workspace.resources.food} food portions`}><Icon name="food" size={15} /><strong>{workspace.resources.food}</strong><span>food</span></button><button className="resource-water" onClick={() => open('resources')} aria-label={`${workspace.resources.water} water care refills`}><Icon name="droplet" size={15} /><strong>{workspace.resources.water}</strong><span>water care</span></button><button className="bag-button" aria-label="Open my bag" onClick={() => open('resources')}><Icon name="bag" size={15} /><span>My bag</span></button><button className={`daily-checkin ${checkedIn ? 'collected' : ''}`} onClick={() => open('checkin')}><Icon name={checkedIn ? 'check' : 'calendar'} size={15} />{checkedIn ? 'Checked in today' : 'Daily check-in'}{!checkedIn && <span>+20</span>}</button></div></div>}
    <header className={`topbar ${isPublicPage ? 'public-topbar' : ''}`}><a className="brand" href="#/home"><span className="brand-mark"><Icon name="fish" size={28} /></span><span>build<span className="brand-light">your</span>tank<span className="brand-dot"></span></span></a><nav className="topnav" aria-label="Main navigation">{isPublicPage ? <><a href="#/ideas">Tank idea</a><a href="#/learn">Learn</a><button onClick={() => open('guide')}>How it works</button></> : NAVIGATION.map(([id, label]) => <a key={id} href={`#/${id}`} className={route === id ? 'active' : ''} aria-current={route === id ? 'page' : undefined}>{label}</a>)}</nav>{isPublicPage ? <a className="secondary-button login-link" href="#/login">Log in <Icon name="arrow" size={15} /></a> : <div className="workspace-tools"><button className="guide-entry" onClick={() => open('guide-welcome')}><Icon name="book" size={16} />Guide</button><button className="profile-button" onClick={() => open('guide-welcome')} aria-label="Open workspace guide"><span className="avatar">{nickname ? nickname[0].toUpperCase() : 'G'}</span><span>{nickname || 'Guest'}</span><Icon name="down" size={13} /></button></div>}</header>
    {!isPublicPage && progress.status === 'active' && <GuidePanel guide={guide} progress={progress} onJump={jumpGuide} onNext={nextGuide} onPause={pauseGuide} onAction={openGuideFeature} onEdit={() => open('guide-editor')} storageOkay={guideStorageOkay} />}
    {route === 'home' && <HomePage />}
    {route === 'login' && <main className="login-page"><div className="login-art"><RoomScene tank={{ ...createTank(), size: '120p' }} compact showDimensions={false} /><h2>A small space<br /><em>Entirely yours</em></h2></div><div className="login-form"><h1>Your little world<br />is waiting</h1><p>Give your demo workspace a name, or drop in as a guest</p><form onSubmit={enterWorkspace}><label className="form-label" htmlFor="nickname">What should we call you? <small>optional</small></label><input className="form-input" id="nickname" placeholder="Your nickname" maxLength={24} value={nickname} onChange={event => setNickname(event.target.value)} /><button className="primary-button dialog-cta" type="submit">Enter my workspace <Icon name="arrow" size={16} /></button></form><a className="guest-link" href="#/my-tanks" onClick={enterWorkspace}>Continue as a guest</a><div className="entry-note"><Icon name="info" size={17} /><p>This is the demo entry Your tanks save in this browser Account login and cross-device saving will be available when cloud accounts are connected</p></div></div></main>}
    {route === 'my-tanks' && <MyTanksPage workspace={workspace} onSelect={select} onCreate={() => open('create')} onUpdate={update} onItem={item} onSetup={setup} onCare={care} onFertilize={() => apply(fertilize(workspace), 'A small dose for your plants Nutrients increased by one')} onDialog={open} feeding={feeding} changedWater={changedWater} onSave={save} storageOkay={storageOkay} />}
    {route === 'ideas' && <IdeasPage workspace={workspace} onView={sample => open('tank-detail', sample)} />}
    {route === 'store' && <StorePage workspace={workspace} onSelect={select} onItem={item} onSetup={setup} onSupply={id => apply(buySupply(workspace, id), 'A little restock Your new supplies are in My bag')} onDetails={details => open('species', details)} />}
    {route === 'learn' && <LearnPage />}
    {route === 'shared' && <main className="shared-page"><div className="section-heading"><div><h1>A little world, <em>shared</em></h1><p>A read-only moment from someone’s aquarium</p></div></div>{shared.tank ? <><h2>{shared.tank.name}</h2><RoomScene tank={shared.tank} /><HealthStats tank={shared.tank} /><TankWarnings tank={shared.tank} /><div className="shared-actions"><a className="secondary-button" href="#/my-tanks">Back to my tanks</a><button className="primary-button" onClick={() => create({ ...shared.tank, name: `${shared.tank.name.slice(0, 29)} (my copy)` })}>Make my own copy <Icon name="plus" size={16} /></button></div><p className="page-footnote">This link is a snapshot, not live updates Making a copy uses your local demo coins</p></> : <div className="empty-state"><h2>This tank link could not be opened</h2><p>You can still return to your own saved tanks</p><a className="primary-button" href="#/my-tanks">Open my tanks <Icon name="arrow" size={16} /></a></div>}</main>}
    <footer className="footer"><a className="footer-brand" href="#/home">buildyourtank</a><span>Built with curiosity Grown with care</span><span>A student passion project <span className="footer-heart">♡</span></span></footer>
    {notice && !dialog && <div className="toast" role="status"><span className="toast-dot" />{notice}</div>}
    {dialog?.type === 'create' && <NewTankDialog coins={workspace.coins} onCreate={create} onClose={close} />}
    {dialog?.type === 'setup' && <SetupDialog tank={tank} onSetup={setup} onClose={close} />}
    {dialog?.type === 'guide' && <GuideDialog onClose={close} />}
    {dialog?.type === 'guide-welcome' && <GuideWelcome guide={guide} progress={progress} onStart={startGuide} onClose={pauseGuide} onEdit={() => open('guide-editor')} storageOkay={guideStorageOkay} />}
    {dialog?.type === 'guide-editor' && <GuideEditor guide={guide} defaults={defaultGuide} onSave={saveGuide} onClose={close} storageOkay={guideStorageOkay} />}
    {dialog?.type === 'checkin' && <CheckInDialog workspace={workspace} checkedIn={checkedIn} onClaim={() => apply(checkIn(workspace), 'Hello again! 20 coins added to your bag')} onClose={close} />}
    {dialog?.type === 'resources' && <ResourcesDialog workspace={workspace} onClose={close} />}
    {dialog?.type === 'tank-detail' && <TankDetailDialog tank={dialog.data} onObserve={sample => open('observe', sample)} onCopy={sample => create({ ...sample, name: `${sample.name.slice(0, 29)} (my copy)` })} onClose={close} />}
    {dialog?.type === 'observe' && <TankObserver tank={dialog.data} onClose={close} />}
    {dialog?.type === 'species' && <SpeciesDialog item={dialog.data} onAdd={(type, id) => { if (item(type, id)) close() }} onClose={close} />}
    {dialog?.type === 'preview' && <PreviewDialog tank={tank} onClose={close} />}
    {dialog?.type === 'share' && <Dialog title="Pass on a little calm" onClose={close}><RoomScene tank={tank} compact /><p className="dialog-intro">Anyone with this link can view this tank snapshot and create a copy Your original stays yours</p><label className="share-label" htmlFor="share-link">Your tank snapshot link</label><div className="share-field"><input ref={shareInput} id="share-link" readOnly value={snapshotLink(tank, window.location.href)} onFocus={event => event.target.select()} /><button onClick={copyShare}>{shareCopied ? 'Copied!' : 'Copy link'}</button></div><p className="share-note">Send a new link after editing to share a fresh snapshot</p></Dialog>}
  </div></DialogNoticeContext.Provider>
}
