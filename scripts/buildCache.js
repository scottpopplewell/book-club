fs = require("fs");

const baseUrl =
  "https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352";

const fetchData = (url, file) => {
  fetch(`${baseUrl}${url ?? ""}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.status + " " + response.statusText);
    })
    .then((json) =>
      fs.writeFile(
        `public/cache/${file}`,
        JSON.stringify(json, null, 2),
        callback
      )
    )
    .catch(callback);
};

const callback = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log("Success");
};

fetchData("", "books.json");
fetchData("/tabs/Book%20Stats", "stats.json");
fetchData("/tabs/Reader%20Stats", "readerStats.json");

fs.writeFile(
  `public/cache/config.json`,
  JSON.stringify(
    {
      last_updated: new Date().toISOString(),
    },
    null,
    2
  ),
  callback
);
