const doccrypt = require('./doccrypt')


test('ok', () => {
    expect(1).toBe(1)
});
  
test('2k key', async () => {
    const dc = new doccrypt.DocCrypt({'password': 'hi', 'salt': 'moo', 'keylength': 256})
    const key = await dc.key()
    expect(key).not.toBeNull()
    expect(key.length).toBe(256)
})

test('32 byte iv', async () => {
    const dc = new doccrypt.DocCrypt({'ivlength': 32})
    const iv = await dc.iv()
    expect(iv).not.toBeNull()
    expect(iv.length).toBe(32)
})

test('cipher', async () => {
    const dc = new doccrypt.DocCrypt({'password': 'pw'})
    const enc = await dc.encrypt("test")
    console.log(enc)
    const denc = await dc.decrypt(enc)
    console.log(denc)

    expect('test').toEqual(denc)
})