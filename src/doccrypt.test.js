const doccrypt = require('./doccrypt')


test('ok', () => {
    expect(1).toBe(1)
});
  
test('2k key', async () => {
    const key = await doccrypt.DocCrypt.key('hi', 'moo', 256)
    expect(key).not.toBeNull()
    expect(key.length).toBe(256)
})

test('32 byte iv', async () => {
    const iv = await doccrypt.DocCrypt.iv(32)
    expect(iv).not.toBeNull()
    expect(iv.length).toBe(32)
})

test('cipher', async () => {
    const dc = new doccrypt.DocCrypt.aes256cbc()
    const enc = await dc.encryptString('pw', 'salt', "test")
    console.log(enc)
    enc.password = 'pw'
    enc.salt = 'salt'
    const denc = await dc.decryptString(enc)
    console.log(denc)

    expect('test').toEqual(denc)
})

test('bad password', async () => {
    const dc = new doccrypt.DocCrypt.aes256cbc()
    const enc = await dc.encryptString('pw', 'salt', "test")
    console.log(enc)
    enc.password = 'pw-wrong'
    enc.salt = 'salt'
    const denc = await dc.decryptString(enc).catch(e => Promise.resolve("ok"))
    console.log(denc)
    expect('ok').toEqual(denc)
})

test('cipher w/ JSON', async () => {
    const dc = new doccrypt.DocCrypt.aes256cbc()
    let enc = await dc.encryptString('pw', 'salt', "test")
    console.log(enc)
    enc.password = 'pw'
    enc.salt = 'salt'

    enc = JSON.stringify(enc)
    console.log(`encoded ${enc}`)
    enc = JSON.parse(enc)

    const denc = await dc.decryptString(enc)
    console.log(denc)

    expect('test').toEqual(denc)
})

test('getCiphers', () => {
    for (var v of doccrypt.DocCrypt.getCiphers()) {
        console.info(`Cipher ${v}`)
    }
})

test('salt', () => {
    const s = doccrypt.DocCrypt.salt(32)
    expect(s.length).toBe(64)
})