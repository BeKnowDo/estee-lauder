const log = console.log
const chalk = require('chalk')
const logNotify = chalk.bgKeyword("yellow").keyword("blue");
const fs = require('fs-extra')
const faker = require('faker')
const args = require('yargs').argv

const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;

console.clear()

class ProductSeeder {
  constructor() {
    // Write file to folder

    this.destination = 'data/products'
    fs.ensureDirSync(this.destination)

    this.splashAuth = new Unsplash({
      applicationId: '3b0330ed6f6ef7e2e5a24cbaf664c1675388396382f6f112366f192c340ee7d4',
      secret: 'e2c810188f7f0f2dbde14c86a9abc31646420fff5ba20b9306efaf79e436998d'
    })

    this.productsCount = args.products || 1
    this.searchTerm = args.search || 'lipstick'
    this.products = []
    this.images = []
  }

  getImages = () => {
    this.splashAuth.search.photos(this.searchTerm, 1, this.productsCount)
      .then(toJson)
      .then(json => {
        const results = json["results"]
        fs.writeFileSync(`${this.destination}/search-results.json`, JSON.stringify(results))
        log(logNotify(`Imported ${results.length} photos from Unsplash`))
        this.images = results
        this.generateProducts()
      })
  }

  generateProducts = () => {

    for (let currentIndex = 0; currentIndex < this.productsCount; currentIndex++) {
      log(`Generating product item: ${currentIndex + 1}`)

      const id = faker.random.uuid()
      const isActive = faker.random.boolean()
      const price = faker.commerce.price()
      const name = faker.commerce.productAdjective()
      const about = faker.company.catchPhraseDescriptor()
      const tags = []
      const maxTags = faker.random.number({ min: 1, max: 3 })
      const image = this.images[currentIndex].urls.small

      // loop through max product tags
      for (let i = 0; i < maxTags; i++) {
        const randomTag = faker.commerce.productMaterial()
        tags.push(randomTag)
      }

      // create our final product object and inject to array
      let product = {
        id,
        isActive,
        price,
        name,
        about,
        tags,
        image
      }

      this.products.push(product)
    }

    log(logNotify(`Generated ${this.products.length} total products`))
    this.products = JSON.stringify(this.products)

    fs.writeFileSync(`${this.destination}/products.json`, this.products)
  }
}

const processProductSeeder = new ProductSeeder
processProductSeeder.getImages()