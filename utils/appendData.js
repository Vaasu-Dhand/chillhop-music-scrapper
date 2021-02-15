import jsonfile from 'jsonfile';

export default (data) => {

  console.log(data);

  jsonfile.writeFile('data.json', data, { flag: 'a' })
  .then(res => {
    console.log('Album Data Saved')
  })
  .catch(error => console.error(error))
}
