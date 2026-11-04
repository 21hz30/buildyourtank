import React from 'react'
import { createRoot } from 'react-dom/client'
import { CATALOG } from '../src/lib/tank'
import { fishModelSvg } from '../src/lib/fishModels'
import { plantModelUri } from '../src/lib/plantModels'

const plants = new URLSearchParams(location.search).get('type') === 'plants'
const filter = new URLSearchParams(location.search).get('ids')?.split(',')
createRoot(document.getElementById('root')).render(<><h1>{plants ? 'Plant models · foliage and cultivar checks' : 'Fish models · species anatomy checks'}</h1><main>{CATALOG[plants ? 'plants' : 'fish'].filter(item=>!filter || filter.includes(item.id)).map(item => <article key={item.id} data-species={item.id}>{plants ? <img style={{width:'100%',height:170,objectFit:'contain'}} src={plantModelUri(item.name,item.plantType)} alt={`${item.name} model`} /> : <div className="fish-model-check" dangerouslySetInnerHTML={{__html:fishModelSvg(item, `check-${item.id}`)}} />}<p>{item.name}</p></article>)}</main></>)
