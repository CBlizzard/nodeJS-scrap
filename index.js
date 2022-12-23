const puppeteer = require('puppeteer')
const fs = require('fs');

async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.traversymedia.com/")

    // await page.screenshot({path: "eg.png", fullPage: true})
    // await page.pdf({path: "eg.pdf", format: 'A4' })

    // const html = await page.content();

    // const title = await page.evaluate( () => document.title )

    //   page ke structure pe depend karta hai ki kya likh rahe ho

    // const links = await page.evaluate( ()=> 
    //     Array.from( document.querySelectorAll('a'), (e)=>e.href ) 
    // );

    const courses = await page.evaluate( ()=> 
        Array.from( document.querySelectorAll('#courses .card'), (e)=>({
            title: e.querySelector('.card-body h3').innerText,
            level: e.querySelector('.card-body .level').innerText,
            url: e.querySelector('.card-footer a').href,
            promo: e.querySelector('.card-footer .promo-code .promo').innerText,
        }) ) 
    );
    //save data to file
    fs.writeFile('courses.json', JSON.stringify(courses),  (err)=>{
        if(err) throw err
        console.log( "file saved" );
    })
    


    await browser.close();
}

run()
console.log( "ROLLINGUUUU, THUNDAAAAA" );