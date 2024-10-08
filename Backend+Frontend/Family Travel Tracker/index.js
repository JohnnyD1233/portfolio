import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv"

const app = express();
const port = 3000;
env.config();


const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const countriesNames = await checkCountriesNames(countries);
  let users = await checkforusers();
  let color = await checkforcolor(currentUserId);
  res.render("index.ejs", {
    countriesNames,
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

app.post("/add", async (req, res) => {
  try {
    const input = req.body["country"];
    let PlaceID = await checkcountry(input);
    await checkexistingcountry(PlaceID);
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;
    await db.query(
      "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
      [countryCode, currentUserId]
    );
    res.redirect("/");
  } catch (err) {
    const countries = await checkVisisted(currentUserId);
    const countriesNames = await checkCountriesNames(countries);
    let users = await checkforusers();
    let color = await checkforcolor(currentUserId);
    res.render("index.ejs", {
      countriesNames,
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
      error: err.message,
    });
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    const selectedCountry = req.body.delete;
    console.log(selectedCountry);
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [selectedCountry.toLowerCase()]
    );
    const countryCode = result.rows[0].country_code;
    await db.query(
      "DELETE FROM visited_countries WHERE country_code = $1 AND user_id = $2;",
      [countryCode, currentUserId]
    );
    console.log("Deleted the country: "+ selectedCountry)
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});


app.post("/user", async (req, res) => {
  console.log(req.body);
  if (req.body.user) {
    let users = await checkforusers();
    currentUserId = req.body.user;
    console.log("current user id:", req.body.user);
    const countries = await checkVisisted(currentUserId);
    const countriesNames = await checkCountriesNames(countries);
    let color = await checkforcolor(currentUserId);
    console.log("current user color is:", color);
    res.render("index.ejs", {
      countriesNames,
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
    });
  } else {
    res.render("new.ejs");
  }
});

// handling the post route for creating new user 
app.post("/new", async (req, res) => {
  console.log(req.body);
  const newUsername = req.body.name;
  const newUsercolor = req.body.color;
  await db.query("INSERT INTO users (name,color) VALUES ($1,$2)", [
    newUsername,
    newUsercolor,
  ]);
  const results = checkforusers(newUsername);
  console.log(results);
  res.redirect("/");
});

// checking the country names of country codes 
async function checkCountriesNames(countries) {
  // Create an array of promises for the db.query calls
  const countryQueries = countries.map(async (country) => {
    const result = await db.query(
      "SELECT country_name FROM countries WHERE country_code = $1",
      [country]
    );
    return result.rows[0].country_name;
  });

  // Wait for all the promises to resolve
  const countriesNames = await Promise.all(countryQueries);

  // Log the result after all queries have completed
  // console.log(countriesNames);
  return countriesNames;
}


// searching the added country  
async function checkcountry(answer) {
  let checkResult = await db.query(
    "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ",
    [answer.toLowerCase()]
  );
  if (checkResult.rows.length >= 1) {
    let PlaceID = checkResult.rows[0].country_code;
    console.log("Adding " + PlaceID);
    return PlaceID;
  } else {
    throw new Error("Error adding your country please check for typos");
  }
}

// cheking the user color 
async function checkforcolor(id) {
  const result = await db.query("SELECT color FROM users WHERE id = $1", [id]);
  return result.rows[0].color;
}

// checking users 
async function checkforusers(username) {
  if (username) {
    const result = await db.query("SELECT id FROM users WHERE name = $1", [
      username,
    ]);
    // console.log(result.rows[0]);
    return result.rows[0].id;
  } else {
    const results = await db.query("SELECT * FROM users");
    // console.log(results.rows);
    return results.rows;
  }
}

// checking all visited countries of the selected id
async function checkVisisted(currentUserId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = visited_countries.user_id WHERE users.id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// checking if input country already existing already 
async function checkexistingcountry(PlaceID) {
  let existingcountry = await db.query(
    "SELECT country_code FROM visited_countries WHERE country_code = $1 AND user_id = $2 ",
    [PlaceID,currentUserId]
  );
  if (existingcountry.rows.length >= 1) {
    console.log("this country has already added: " + PlaceID);
    throw new Error("this country has already added");
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
