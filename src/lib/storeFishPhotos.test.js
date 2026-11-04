import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { CATALOG } from './tank.js'
import { fishPhotoFrame, storeFishPhoto } from './storeFishPhotos.js'

test('every fish has a bundled high-resolution Green Aqua store photograph and measured subject', () => {
  for (const fish of CATALOG.fish) {
    const photo = storeFishPhoto(fish)
    assert.ok(photo, fish.id)
    assert.ok(photo.source.startsWith('https://greenaqua.hu/en/'), fish.id)
    assert.ok(photo.original.startsWith('https://greenaqua.hu/media/catalog/product/'), fish.id)
    assert.ok(!photo.original.includes('/cache/'), 'use the original photograph, not a thumbnail')
    assert.ok(photo.width >= 1000 && photo.height >= 1000, fish.id)
    const bytes = readFileSync(new URL(`../../public${photo.path}`, import.meta.url))
    assert.equal(bytes.length, photo.bytes, fish.id)
    assert.ok(bytes[0] === 0xff && bytes[1] === 0xd8 || bytes.subarray(1, 4).toString() === 'PNG', 'bundled file is a raster photograph')
    const [left, top, right, bottom] = photo.bounds
    assert.ok(left >= 0 && top >= 0 && right <= 1 && bottom <= 1 && right > left && bottom > top, fish.id)
  }
})

test('photo framing centers the entire fish and retains fins in wide, narrow and tall cards', () => {
  for (const fish of CATALOG.fish) for (const [width, height] of [[340, 185], [280, 185], [520, 185], [200, 230]]) {
    const photo = storeFishPhoto(fish), style = fishPhotoFrame(photo, width, height)
    const renderedWidth = parseFloat(style.width) / 100 * width
    const renderedHeight = renderedWidth * photo.height / photo.width
    const [left, top, right, bottom] = photo.bounds
    const offsetX = width / 2 - renderedWidth * (left + right) / 2
    const offsetY = height / 2 - renderedHeight * (top + bottom) / 2
    assert.ok(offsetX + left * renderedWidth >= width * .0599)
    assert.ok(offsetX + right * renderedWidth <= width * .9401)
    assert.ok(offsetY + top * renderedHeight >= height * .0799)
    assert.ok(offsetY + bottom * renderedHeight <= height * .9201)
    assert.equal(style.transform, `translate(${-(left + right) * 50}%, ${-(top + bottom) * 50}%)`)
  }
  assert.ok(!JSON.stringify(fishPhotoFrame(storeFishPhoto(CATALOG.fish[0]), 0, 0)).includes('NaN'))
})
