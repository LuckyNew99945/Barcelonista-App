let dbMatch = idb.open('barcelonista-match', 1, (upgradeDb) => {
  let matchObjectStore = upgradeDb.createObjectStore('matches', {
    keyPath: 'id',
  });
  matchObjectStore.createIndex('match', 'match', { unique: false });
});

let dbPlayer = idb.open('barcelonista-player', 1, (upgradeDb) => {
  let matchObjectStore = upgradeDb.createObjectStore('players', {
    keyPath: 'id',
  });
  matchObjectStore.createIndex('player', 'player', { unique: false });
});

// let dbPlayer = idb.open('barcelonista-player', 1, (upgradeDb) => {
//   let matchObjectStore = upgradeDb.createObjectStore('players', {
//     keyPath: 'id',
//   });
//   matchObjectStore.createIndex('player', 'player', {
//     unique: false,
//   });
// });

function matchSaveForLater(matches) {
  dbMatch
    .then((db) => {
      let tx = db.transaction('matches', 'readwrite');
      let store = tx.objectStore('matches');
      console.log(matches);
      store.add(matches.match);
      return tx.complete;
    })
    .then(() => {
      console.log(' match berhasil di simpan');
    });
}

function getAllMatches() {
  return new Promise((resolve, reject) => {
    dbMatch
      .then((db) => {
        var tx = db.transaction('matches', 'readonly');
        var store = tx.objectStore('matches');
        return store.getAll();
      })
      .then((matches) => {
        resolve(matches);
      });
  });
}

function getByIdMatches(id) {
  return new Promise((resolve, reject) => {
    dbMatch
      .then((db) => {
        let tx = db.transaction('matches', 'readonly');
        let store = tx.objectStore('matches');
        console.log(db);
        return store.get(id);
      })
      .then((match) => {
        resolve(match);
      });
  });
}
function playerSaveForLater(player) {
  dbPlayer
    .then((db) => {
      let tx = db.transaction('players', 'readwrite');
      let store = tx.objectStore('players');
      console.log(player);
      store.add(player);
      return tx.complete;
    })
    .then(() => {
      console.log(' player berhasil di simpan');
    });
}

function getAllPlayers() {
  return new Promise((resolve, reject) => {
    dbPlayer
      .then((db) => {
        var tx = db.transaction('players', 'readonly');
        var store = tx.objectStore('players');
        return store.getAll();
      })
      .then((players) => {
        resolve(players);
      });
  });
}

function getByIdPlayers(id) {
  return new Promise((resolve, reject) => {
    dbPlayer
      .then((db) => {
        let tx = db.transaction('players', 'readonly');
        let store = tx.objectStore('players');
        console.log(db);
        return store.get(id);
      })
      .then((player) => {
        resolve(player);
      });
  });
}

// function playerSaveForLater(players) {
//   dbPlayer
//     .then((db) => {
//       let tx = db.transaction('players', 'readwrite');
//       let store = tx.objectStore('players');
//       console.log(players);
//       store.add(players.position);
//       return tx.complete;
//     })
//     .then(() => {
//       console.log(' player berhasil di simpan');
//     });
// }

// function getAllPlayers() {
//   return new Promise((resolve, reject) => {
//     dbPlayer
//       .then((db) => {
//         var tx = db.transaction('players', 'readonly');
//         var store = tx.objectStore('players');
//         return store.getAll();
//       })
//       .then((players) => {
//         resolve(players);
//       });
//   });
// }

// function getByIdPlayers(id) {
//   return new Promise((resolve, reject) => {
//     dbPlayer
//       .then((db) => {
//         let tx = db.transaction('players', 'readonly');
//         let store = tx.objectStore('players');
//         console.log(db);
//         return store.get(id);
//       })
//       .then((player) => {
//         resolve(player);
//       });
//   });
// }

// var dbPromised = idb.open('news-reader', 1, function (upgradeDb) {
//   var articlesObjectStore = upgradeDb.createObjectStore('articles', {
//     keyPath: 'id',
//   });
//   articlesObjectStore.createIndex('post_title', 'post_title', {
//     unique: false,
//   });
// });

// function saveForLater(article) {
//   dbPromised
//     .then(function (db) {
//       var tx = db.transaction('articles', 'readwrite');
//       var store = tx.objectStore('articles');
//       console.log(article);
//       store.add(article.match);
//       return tx.complete;
//     })
//     .then(function () {
//       console.log('Artikel berhasil di simpan.');
//     });
// }

// let dbPromised = idb.open('news-reader', 1, (upgradeDb) => {
//   let articlesObjectStore = upgradeDb.createObjectStore('articles', {
//     keyPath: 'ID',
//   });
//   articlesObjectStore.createIndex('post_title', 'post_title', {
//     unique: false,
//   });
// });

// function saveForLater(article) {
//   dbPromised
//     .then((db) => {
//       let tx = db.transaction('articles', 'readwrite');
//       let store = tx.objectStore('articles');
//       console.log(article);
//       store.add(article.match);
//       return tx.complete;
//     })
//     .then(() => {
//       console.log('Artikel berhasil di simpan');
//     });
// }

// function getAll() {
//   return new Promise((resolve, reject) => {
//     dbPromised
//       .then((db) => {
//         let tx = db.transaction('articles', 'readonly');
//         let store = tx.objectStore('articles');
//         return store.getAll();
//       })
//       .then((articles) => {
//         resolve(articles);
//       });
//   });
// }

// function getById(id) {
//   return new Promise((resolve, reject) => {
//     dbPromised
//       .then((db) => {
//         const tx = db.transaction('articles', 'readonly');
//         const store = tx.objectStore('articles');
//         return store.get(id);
//       })
//       .then((article) => {
//         resolve(article);
//       });
//   });
// }
