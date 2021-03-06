const {Client} = require('pg');
const client = new Client('postgres://localhost/super_humans');
const faker = require('faker')

const getTitans = async() =>{
    return (await client.query('SELECT * FROM "Titans";')).rows;
};


const getMembers = async(id) => {
    return (await client.query(`SELECT * FROM "Members" WHERE titans_id=${id}`)).rows;
};


const syncAndSeed = async() => {
    const SQL = `
    DROP TABLE IF EXISTS "Members";
    DROP TABLE IF EXISTS "Titans";

    CREATE TABLE "Titans"(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL
    );
    CREATE TABLE "Members"(
        id SERIAL PRIMARY KEY,
        img text NOT NULL,
        bio TEXT NOT NULL,
        titans_id INTEGER REFERENCES "Titans"(id)        
        );

        INSERT INTO "Titans"(name) VALUES('Robin'), ('Beast-Boy'),('Star-Fire'),('Raven'),('Cyborg');

        INSERT INTO "Members"(img,bio, titans_id) VALUES('http://pm1.narvii.com/7014/dc5ff639c8b252b5e5db21187529d2f2036c8641r1-413-356v2_00.jpg','${faker.lorem.paragraphs(2)}',1), ('https://i.pinimg.com/originals/b8/e1/09/b8e109a7f81b0e1b69f1869bd40fe897.jpg','${faker.lorem.paragraphs(2)}',2),('https://static.wikia.nocookie.net/marvel_dc/images/5/50/Starfire_tv2.jpg/revision/latest/top-crop/width/360/height/450?cb=20051025060353','${faker.lorem.paragraphs(2)}',3),
        ('https://static.wikia.nocookie.net/theteentitans/images/9/9a/Raven.jpg/revision/latest/scale-to-width-down/340?cb=20201106071206','${faker.lorem.paragraphs(2)}',4),('https://static.wikia.nocookie.net/theteentitans/images/1/11/Cy.jpg/revision/latest/scale-to-width-down/340?cb=20120717132219','${faker.lorem.paragraphs(2)}',5);

    `;
    await client.query(SQL);
};

module.exports = {
    client,
    syncAndSeed,
    getTitans,
    getMembers
}