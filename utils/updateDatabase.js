import { readFileSync } from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export default async function updateDatabase() {
  console.log("DataBase Update Funtion Called");

  let DbData
  let localData = readFileSync('./data/data.json').toString()

  // * Get data from database
  try {
    const res = await axios.get(`${process.env.BASE_URL}${process.env.GIST_ID}`);
    DbData = res.data.files['data.json'].content;
    // console.log(DbData);
  } catch (err) {
    console.error(err);
  }

  // * Compare it with DB and return new data
  let newAlbums = []  // * Albums not in DB
  for (const album of JSON.parse(localData).albums) {
    if (!JSON.parse(DbData).albums.find(albumDB => albumDB['name'] === album.name)) { // * TRUE if the album does not exists in DB
      newAlbums.push(album)
    }
  }

  // * Check if new albums exist
  const newAlbumCount = newAlbums.length
  console.log(newAlbumCount + " new Album(s) found");

  const newData = { // * New album data with all albums
    "albums": JSON.parse(DbData).albums.concat(newAlbums)
  }

  if (newAlbumCount !== 0) {

    // * Make a Patch request to add data to DB
    const data = JSON.stringify({ "description": "Add New Album Data", "files": { "data.json": { "content": JSON.stringify(newData, null, 4) } } });

    const config = {
      method: 'patch',
      url: `${process.env.BASE_URL}${process.env.GIST_ID}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GIST_ACCESS_TOKEN}`
      },
      data
    };

    try {
      const patchRequest = await axios(config)
      // console.log(patchRequest);
    } catch (error) {
      console.log(error);
    }
  }
}
