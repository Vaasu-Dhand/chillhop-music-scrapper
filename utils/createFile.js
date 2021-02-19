import fs from 'fs'

export default createFile = () => {

  const schema = '{"albums": [ ';

  // Create a data.json file
  fs.writeFileSync('./data/data.json', schema, (err) => {
    if (err) console.error(err);
    console.log('File Created');
  });
};
