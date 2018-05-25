'use strict';

const fs = require('fs');

const storage = module.exports = {};

const dataDirectory = `${__dirname}/../../data`;

storage.fetchAll = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(`${dataDirectory}/`, (err, items) => {
      let record= [];
      for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
        fs.readFile(items[i], (err, data) => {
          if (err) {
            reject(err);
          }
          if (data) {
            record[i] = JSON.parse(data.toString());

          } else {
            reject('Nothing found');
          }
        });
        resolve(record);
      }
    });
  });
};

storage.fetchOne = (id) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        let record = JSON.parse(data.toString());
        resolve(record);
      } else {
        reject('Nothing found');
      }
    });
  });
};

storage.updateOne = (id, updateRecord) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${id}.json`;
    let text = JSON.stringify(updateRecord);
    text.id = id;
    fs.writeFile(file, text, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(updateRecord);
      }
    });
  });
};

storage.deleteOne = (id) => {

};

//this method creates a file wiht the name of the data and then uses the fs module to add the record to the file as text
storage.save = (record) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${record.id}.json`;
    let text = JSON.stringify(record);
    fs.writeFile(file, text, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(record);
      }
    });
  });
};
