crypto = require ('node:crypto')

class DocCrypt {
    constructor(parameters = {}) {
        this.keylength = parameters['keylength'] || 32
        this.ivlength = parameters['ivlength'] || 16
        this.algorithm = parameters['algorithm'] || 'aes-256-cbc'
        this.password = parameters['password']
        this.salt = parameters['salt'] || 'salt'
    }

    async key() {
        return new Promise((resolve, reject) => {
            crypto.scrypt(this.password, this.salt, this.keylength, (err, buff) => {
                if (err) {
                    return reject(err)
                } 

                resolve(buff)
            })
        })
    }

    async iv() {
        return new Promise((resolve, reject) => {
            crypto.randomFill(new Uint8Array(this.ivlength), (err, iv) => {
                if (err) {
                    return reject(err)
                }

                resolve(iv)
            })    
        })
    }

    async encrypt(text, encoding = 'hex') {
        const key = await this.key()
        const iv = await this.iv()
        const cipher = crypto.createCipheriv(this.algorithm, key, iv)

        let ciphertext = cipher.update(text, 'utf8', encoding)
        ciphertext += cipher.final(encoding)
        return Promise.resolve({ciphertext, key, iv, encoding, 'salt': this.salt})
    }

    async decrypt(obj) {

        const key = obj.key || await this.key()
        const iv = obj.iv

        const decipher = crypto.createDecipheriv(this.algorithm, key, iv)
        let decrypted = decipher.update(obj.ciphertext, obj.encoding, 'utf8')
        decrypted += decipher.final('utf8')
        return Promise.resolve(decrypted)
    }
}

module.exports = {
    DocCrypt
}