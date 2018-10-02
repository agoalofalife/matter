function generate() {
    let cache = [];
    return (number = 10) =>  {
        if (cache.length === 0) {
            for (let i = 0; i < number; i++) {
                cache.push(
                    {
                        id:faker.random.number(),
                        email:faker.internet.email(),
                        phone:faker.phone.phoneNumber(),
                        confirmed:faker.random.boolean(),
                        created_at:'2018-19-08 18:40:06',
                        sign_in_at:'2018-20-08 18:40:06'
                    }
                );
            }
        }
        return cache.slice();
    }
}
let rawData = generate();

module.exports = rawData;