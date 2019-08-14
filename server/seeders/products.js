const destination = 'data/products'

const fs = require('fs-extra')
const faker = require('faker')
const args = require('yargs').argv
const log = console.log

const productsCount = args.products || 1
let products = []

// Create a user object until we reach our userCount argument
for (let currentIndex = 0; currentIndex < productsCount; currentIndex++) {
  console.log(args)

  const id = faker.random.uuid()
  const isActive = faker.random.boolean()
  const price = faker.commerce.price()
  const picture = faker.commerce.productName()
  const name = faker.commerce.productAdjective()
  const about = faker.company.catchPhraseDescriptor()
  const tags = []
  const maxTags = faker.random.number({ min: 1, max: 6 })


  for (let i = 0; i < maxTags; i++) {
    const randomTag = faker.commerce.productMaterial()
    tags.push(randomTag)
  }


  let product = {
    id,
    isActive,
    price,
    picture,
    name,
    about,
    tags
  }

  products.push(product)
}
products = JSON.stringify(products)

// Write file to folder
fs.ensureDirSync(destination)

fs.writeFileSync(`${destination}/products.json`, products)
