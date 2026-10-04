export default function Icon({ name, size = 20, ...props }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    down: <path d="m7 10 5 5 5-5" />,
    fish: <><path d="M5 12c3-6 10-7 15 0-5 7-12 6-15 0Zm0 0-4-4v8l4-4Z" /><circle cx="15" cy="11" r=".7" fill="currentColor" /></>,
    leaf: <><path d="M19 4C10 4 5 9 5 15c0 2 2 4 4 4 6 0 10-5 10-15Z" /><path d="m5 19 9-9" /></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><path d="M8 3v6m8 0v6m-6 0v6" /></>,
    share: <><path d="M12 15V3m-4 4 4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    droplet: <><path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12Z" /><path d="M8 15c0 2 1 3 3 3" /></>,
    food: <><path d="m8 5 8 1-1 13H7L8 5Z" /><path d="m7 10 9 1M9 2h6" /><circle cx="11" cy="15" r="1.2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    edit: <><path d="m16 4 4 4L8 20H4v-4L16 4ZM13 7l4 4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l1.4 1.4m13.2 13.2L20 20M4 20l1.4-1.4M18.6 5.4 20 4" /></>,
  }
  return <svg {...props} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.info}</svg>
}
