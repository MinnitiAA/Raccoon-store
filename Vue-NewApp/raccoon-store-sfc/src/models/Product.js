export default class Product {
    constructor({
        id, name, price, image,
        category='',
        rating = 0,
        reviews = 0,
        description = '',
        features = []
    }) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
        this.image = image;
        this.category = category;
        this.rating = rating;
        this.reviews = reviews;
        this.description = description;
        this.features = features;
    }

    hasFeature(feature) {
        return this.features.includes(feature)
    }

    get formattedPrice() {
        return `$${this.price.toFixed(2)}`;
    }
}