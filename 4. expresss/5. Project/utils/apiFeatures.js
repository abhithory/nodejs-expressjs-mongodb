class APIFeatures {
    // localhost:3000/api/v1/tours?duration[gte]=4&sort=price&fields=name,price&page=3&limit=3

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        let queryObj = { ...this.queryString };
        // 1B) Basic filtring
        const excludedFields = ["page", "sort", "limit", "fields"]
        excludedFields.forEach(el => delete queryObj[el]);
        // 1A) Advance Filtring
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, match => `$${match}`);
        queryObj = JSON.parse(queryStr);

        this.query = this.query.find(queryObj);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            // localhost:3000/api/v1/tours?sort=duration,-maxGroupSize
            const sortBy = this.queryString.sort.split(',').join(" ");
            this.query = this.query.sort(sortBy);

        } else {
            this.query = this.query.sort("-createdAt")
        }

        return this
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select("-__v")
        }
        return this
    }

    pagination() {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 15;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this
    }
}


module.exports = APIFeatures;