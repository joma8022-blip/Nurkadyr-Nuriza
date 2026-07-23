const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");


const app = express();


app.use(cors());

app.use(express.json());



// ======================
// TELEGRAM
// ======================


const BOT_TOKEN = "8901082940:AAHcL9GQnwyoflMdKZDN51K7HaJ1DMBr7dg";

const CHAT_ID = "6217152918";




// ======================
// REVIEWS
// ======================


let reviews = [];


if(fs.existsSync("reviews.json")){

    reviews = JSON.parse(
        fs.readFileSync("reviews.json")
    );

}



// ======================
// RECEIVE REVIEW
// ======================


app.post("/review", async (req,res)=>{


    const review = req.body;



    reviews.push(review);



    fs.writeFileSync(
        "reviews.json",
        JSON.stringify(
            reviews,
            null,
            2
        )
    );




    const message = `

⭐ KADRY MOSCOW REVIEW


👤 Имя:
${review.name}


⭐ Оценка:
${review.stars}


💬 Отзыв:

${review.message}

`;



    await axios.post(

        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

        {

            chat_id: CHAT_ID,

            text: message

        }

    );




    res.json({

        success:true

    });



});




// ======================
// START SERVER
// ======================


app.listen(3001, ()=>{
console.log("KADRY MOSCOW REVIEW SERVER STARTED ON PORT 3001");
});