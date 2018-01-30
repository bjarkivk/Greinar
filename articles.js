/* útfæra greina virkni */
const express = require('express');

const routes = express.Router();
const metamarked = require('meta-marked');

let batman = {};
let corporate = {};
let deloren = {};
let lorem = {};
let BatmanData = {};
let CorporateData = {};
let DelorenData = {};
let LoremData = {};


const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);

async function readArticles() {
  try {
    BatmanData = await readFileAsync('./articles/batman-ipsum.md');
    CorporateData = await readFileAsync('./articles/corporate-ipsum.md');
    DelorenData = await readFileAsync('./articles/deloren-ipsum.md');
    LoremData = await readFileAsync('./articles/lorem-ipsum.md');
  } catch (e) {
    // console.error('error', e);
  }
  // console.log(data.toString('utf8'));
  batman = metamarked(BatmanData.toString('utf8'));
  corporate = metamarked(CorporateData.toString('utf8'));
  deloren = metamarked(DelorenData.toString('utf8'));
  lorem = metamarked(LoremData.toString('utf8'));

  function changeDate(s) {
    let today = new Date(s);
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${dd}.${mm}.${yyyy}`;
    return today;
  }

  changeDate(batman.meta.date);


  routes.get('/', (req, res) => {
    res.render('index', {
      title: 'Greinasafnið',
      batman_title: batman.meta.title,
      batman_date: changeDate(batman.meta.date),
      batman_slug: batman.meta.slug,
      corporate_title: corporate.meta.title,
      corporate_date: changeDate(corporate.meta.date),
      corporate_image: corporate.meta.image,
      corporate_slug: corporate.meta.slug,
      deloren_title: deloren.meta.title,
      deloren_date: changeDate(deloren.meta.date),
      deloren_slug: deloren.meta.slug,
      lorem_title: lorem.meta.title,
      lorem_date: changeDate(lorem.meta.date),
      lorem_image: lorem.meta.image,
      lorem_slug: lorem.meta.slug,
    });
  });

  routes.get(`/${batman.meta.slug}`, (req, res) => {
    res.render('article', {
      title: batman.meta.title,
      date: changeDate(batman.meta.date),
      htmlstring: batman.html,
    });
  });
  routes.get(`/${corporate.meta.slug}`, (req, res) => {
    res.render('article', {
      title: corporate.meta.title,
      date: changeDate(corporate.meta.date),
      htmlstring: corporate.html,
      image: corporate.meta.image,
    });
  });
  routes.get(`/${deloren.meta.slug}`, (req, res) => {
    res.render('article', {
      title: deloren.meta.title,
      date: changeDate(deloren.meta.date),
      htmlstring: deloren.html,
    });
  });
  routes.get(`/${lorem.meta.slug}`, (req, res) => {
    res.render('article', {
      title: lorem.meta.title,
      date: changeDate(lorem.meta.date),
      htmlstring: lorem.html,
      image: lorem.meta.image,
    });
  });
}
readArticles()/* .catch(err => { console.error(err); }) */;


// console.log(batman.meta.title);


module.exports = routes;
