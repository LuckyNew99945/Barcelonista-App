const base_url = 'https://api.football-data.org/v2/teams/81/';
const match_url = 'https://api.football-data.org/v2/matches/';
const player_url = 'https://api.football-data.org/v2/players/';
const token = '45ad292de75f4c839dd0e2a8f64bed20';

function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log(`Error : ${error}`);
}

function getMatches() {
  if ('caches' in window) {
    caches.match(`${base_url}matches`).then((response) => {
      if (response) {
        response
          .json()
          .then((data) => {
            console.log(data);
            let matchesHTML = '';
            data.matches.forEach((match) => {
              matchesHTML += `
              <div class="row">
              <div class="col s12 m6 l12">
                <div class="card match-card waves-effect">
                <a href="./match.html?id=${match.id}">
                  <div class="card-content big-card white-text">
                    <h3 class="center-align bold-font">${match.competition.name}</h3>
                    <p class="center-align bold-font">MatchDay :${match.matchday}</p>       
                    <h3 class="center-align">${match.homeTeam.name}</h3>
                    <h3 class="center-align">${match.score.fullTime.homeTeam}</h3>
                    <h1 class="center-align">VS</h1>
                    <h3 class="center-align">${match.score.fullTime.awayTeam}</h3>
                    <h3 class="center-align">${match.awayTeam.name}</h3>
                    <h2 class="center-align bold-font">Status :${match.status}</h2>   
                  </div>
                </a>
                  </div>
                </div>
              </div>
            </div>
                  `;
            });
            document.getElementById('matches').innerHTML = matchesHTML;
          })
          .catch(error);
      }
    });
  }
  fetch(`${base_url}matches`, {
    mode: 'cors',
    headers: {
      'X-Auth-Token': token,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      // console.log(data);
      let matchesHTML = '';
      data.matches.forEach((match) => {
        matchesHTML += `
        <div class="row">
        <div class="col s12 m12 l12">
          <div class="card match-card waves-effect">
          <a href="./match.html?id=${match.id}">
            <div class="card-content big-card white-text">
              <h3 class="center-align bold-font">${match.competition.name}</h3>
              <p class="center-align bold-font">MatchDay :${match.matchday}</p>       
              <h3 class="center-align">${match.homeTeam.name}</h3>
              <h3 class="center-align">${match.score.fullTime.homeTeam}</h3>
              <h1 class="center-align">VS</h1>
              <h3 class="center-align">${match.score.fullTime.awayTeam}</h3>
              <h3 class="center-align">${match.awayTeam.name}</h3>
              <h2 class="center-align bold-font">Status :${match.status}</h2>   
            </div>
          </a>
            </div>
          </div>
        </div>
      </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      // console.log(data);
      document.getElementById('matches').innerHTML = matchesHTML;
    })
    .catch(error);
} //done

function getMatchesById() {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');
    console.log(idParam);

    if ('caches' in window) {
      caches.match(`${match_url}${idParam}`).then((response) => {
        if (response) {
          response
            .json()
            .then((data) => {
              // console.log(data);
              let matchHTML = '';
              console.log(data.match);
              matchHTML += `
              <div class="row">
              <div class="col s12 m6 l12">
                <div class="card match-card ">
                  <div class="card-content big-card white-text">
                    <h3 class="center-align bold-font">${data.match.competition.name}</h3>
                    <p class="center-align bold-font">MatchDay :${data.match.matchday}</p>       
                    <h3 class="center-align">${data.match.homeTeam.name}</h3>
                    <h3 class="center-align">${data.match.score.fullTime.homeTeam}</h3>
                    <h1 class="center-align">VS</h1>
                    <h3 class="center-align">${data.match.score.fullTime.awayTeam}</h3>
                    <h3 class="center-align">${data.match.awayTeam.name}</h3>
                    <h2 class="center-align bold-font">Status :${data.match.status}</h2>   
                  </div>  
                  </div>
                </div>
              </div>
            </div>
                  `;
              // Sisipkan komponen card ke dalam elemen dengan id #content
              // console.log(data);
              document.getElementById('body-content').innerHTML = matchHTML;
              resolve(data);
            })
            .catch(error);
        }
      });
    }

    fetch(`${match_url}${idParam}`, {
      mode: 'cors',
      headers: {
        'X-Auth-Token': token,
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        // console.log(data);
        let matchHTML = '';
        console.log(data.match);
        console.log(`${match_url}${idParam}`);
        matchHTML += `
        <div class="row">
        <div class="col s12 m6 l12">
          <div class="card match-card">
            <div class="card-content big-card white-text">
              <h3 class="center-align bold-font">${data.match.competition.name}</h3>
              <p class="center-align bold-font">MatchDay :${data.match.matchday}</p>       
              <h3 class="center-align">${data.match.homeTeam.name}</h3>
              <h3 class="center-align">${data.match.score.fullTime.homeTeam}</h3>
              <h1 class="center-align">VS</h1>
              <h3 class="center-align">${data.match.score.fullTime.awayTeam}</h3>
              <h3 class="center-align">${data.match.awayTeam.name}</h3>
              <h2 class="center-align bold-font">Status :${data.match.status}</h2>   
            </div>
            </div>
          </div>
        </div>
      </div>
            `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        // console.log(data);
        document.getElementById('body-content').innerHTML = matchHTML;
        resolve(data);
      })
      .catch(error);
  });
} //done

function getSavedMatches() {
  getAllMatches().then((match) => {
    console.log(match);
    let matchesHTML = '';

    match.forEach((match) => {
      matchesHTML += `
            <div class="row">
            <div class="col s12 m6 l12">
              <div class="card match-card waves-effect">
              <a href="./match.html?id=${match.id}&saved=true">
              <div class="card-content big-card white-text">
              <h3 class="center-align bold-font">${match.competition.name}</h3>
              <p class="center-align bold-font">MatchDay :${match.matchday}</p>       
              <h3 class="center-align">${match.homeTeam.name}</h3>
              <h3 class="center-align">${match.score.fullTime.homeTeam}</h3>
              <h1 class="center-align">VS</h1>
              <h3 class="center-align">${match.score.fullTime.awayTeam}</h3>
              <h3 class="center-align">${match.awayTeam.name}</h3>
              <h2 class="center-align bold-font">Status :${match.status}</h2>   
            </div> 
              </a>
                </div>
              </div>
            </div>
          </div>
                `;
    });
    document.getElementById('body-content').innerHTML = matchesHTML;
  });
} //done

function getSavedMatchesById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get('id');

  getByIdMatches(idParam).then((data) => {
    console.log(getByIdMatches(idParam));
    let matchHTML = '';
    console.log(data);
    matchHTML += `
          <div class="row">
          <div class="col s12 m6 l12">
            <div class="card match-card">
            <div class="card-content big-card white-text">
            <h3 class="center-align bold-font">${data.match.competition.name}</h3>
            <p class="center-align bold-font">MatchDay :${data.match.matchday}</p>       
            <h3 class="center-align">${data.match.homeTeam.name}</h3>
            <h3 class="center-align">${data.match.score.fullTime.homeTeam}</h3>
            <h1 class="center-align">VS</h1>
            <h3 class="center-align">${data.match.score.fullTime.awayTeam}</h3>
            <h3 class="center-align">${data.match.awayTeam.name}</h3>
            <h2 class="center-align bold-font">Status :${data.match.status}</h2>   
          </div>  
            </a>
              </div>
            </div>
          </div>
        </div>
              `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    // console.log(data);
    document.getElementById('body-content').innerHTML = matchHTML;
  });
} //done

function getPlayers() {
  if ('caches' in window) {
    caches.match(`${base_url}`).then((response) => {
      if (response) {
        response
          .json()
          .then((data) => {
            console.log(data);
            let playersHTML = '';
            data.squad.forEach((squad) => {
              playersHTML += `
              <div class="row">
        <div class="col s12 m6">
          <div class="card large player-card waves-effect">
            <a href="./player.html?id=${squad.id}">
            <div class="card-content white-text">
            <h4>Name : <strong>${squad.name}</strong></h4>
            <h4>position : <strong>${squad.position}</strong></h4>
            <h4>dateOfBirth : <strong>${squad.dateOfBirth.substr(
              0,
              9
            )}</strong></h4>
            <h4>countryOfBirth : <strong>${squad.countryOfBirth}</strong></h4>
            <h4>Nationality : <strong>${squad.nationality}</strong></h4>
            <h4>ShirtNumber : <strong>${squad.shirtNumber}</strong></h4>
            <h4>Role : <strong>${squad.role}</h4>
          </div>
            </a>
          </div>
        </div>
      </div>
                  `;
            });
            console.log(data);
            document.getElementById('players').innerHTML = playersHTML;
          })
          .catch(error);
      }
    });
  }
  fetch(`${base_url}`, {
    mode: 'cors',
    headers: {
      'X-Auth-Token': token,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      let playersHTML = '';
      data.squad.forEach((squad) => {
        playersHTML += `
        <div class="row">
  <div class="col s12 m6">
    <div class="card player-card waves-effect">
      <a href="./player.html?id=${squad.id}">
      <div class="card-content white-text">
        <h4>Name : <strong>${squad.name}</strong></h4>
        <h4>position : <strong>${squad.position}</strong></h4>
        <h4>dateOfBirth : <strong>${squad.dateOfBirth.substr(
          0,
          10
        )}</strong></h4>
        <h4>countryOfBirth : <strong>${squad.countryOfBirth}</strong></h4>
        <h4>Nationality : <strong>${squad.nationality}</strong></h4>
        <h4>ShirtNumber : <strong>${squad.shirtNumber}</strong></h4>
        <h4>Role : <strong>${squad.role}</strong></h4>
      </div>
      </a>
    </div>
  </div>
</div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      console.log(data);
      document.getElementById('players').innerHTML = playersHTML;
    })
    .catch(error);
} //done

function getSavedPlayers() {
  getAllPlayers().then((player) => {
    console.log(player);
    let playerHTML = '';

    player.forEach((player) => {
      playerHTML += `
      <div class="row">
<div class="col s12 m6">
  <div class="card player-card">
    <a href="./player.html?id=${player.id}&saved=true">
    <div class="card-content white-text">
    <h4>Name : <strong>${player.name}</strong></h4>
    <h4>position : <strong>${player.position}</strong></h4>
    <h4>dateOfBirth : <strong>${player.dateOfBirth}</strong></h4>
    <h4>countryOfBirth : <strong>${player.countryOfBirth}</strong></h4>
    <h4>Nationality : <strong>${player.nationality}</strong></h4>
    <h4>ShirtNumber : <strong>${player.shirtNumber}</strong></h4>
    <h4>Role : <strong>${player.role}</strong></h4>
  </div>
    </a>
  </div>
</div>
</div>
          `;
    });
    document.getElementById('body-content').innerHTML = playerHTML;
  });
} //done

function getPlayersById() {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');
    console.log(idParam);

    if ('caches' in window) {
      caches.match(`${player_url}${idParam}`).then((response) => {
        if (response) {
          response
            .json()
            .then((data) => {
              console.log(data);
              let playersHTML = '';

              playersHTML += `
                <div class="row">
          <div class="col s12 m6">
            <div class="card player-card">
            <div class="card-content white-text">
            <h4>Name : <strong>${data.name}</strong></h4>
            <h4>position : <strong>${data.position}</strong></h4>
            <h4>dateOfBirth : <strong>${data.dateOfBirth.substr(
              0,
              10
            )}</strong></h4>
            <h4>countryOfBirth : <strong>${data.countryOfBirth}</strong></h4>
            <h4>Nationality : <strong>${data.nationality}</strong></h4>
            <h4>ShirtNumber : <strong>${data.shirtNumber}</strong></h4>
          
          </div>
            </div>
          </div>
        </div>
                    `;

              // Sisipkan komponen card ke dalam elemen dengan id #content
              console.log(data);
              document.getElementById('body-content').innerHTML = playersHTML;
              resolve(data);
            })
            .catch(error);
        }
      });
    }

    fetch(`${player_url}${idParam}`, {
      mode: 'cors',
      headers: {
        'X-Auth-Token': token,
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        console.log(data);
        let playersHTML = '';

        playersHTML += `
          <div class="row">
    <div class="col s12 m6">
      <div class="card player-card">
      <div class="card-content white-text">
      <h4><strong>Name : <strong>${data.name}</strong></h4>
      <h4><strong>position : <strong>${data.position}</strong></h4>
      <h4><strong>dateOfBirth : <strong>${data.dateOfBirth.substr(
        0,
        10
      )}</strong></h4>
      <h4><strong>countryOfBirth : <strong>${data.countryOfBirth}</strong></h4>
      <h4><strong>Nationality : <strong>${data.nationality}</strong></h4>
      <h4><strong>ShirtNumber : <strong>${data.shirtNumber}</strong></h4>
    </div>
      </div>
    </div>
  </div>
  
  
  
              `;

        // Sisipkan komponen card ke dalam elemen dengan id #content
        console.log(data);
        document.getElementById('body-content').innerHTML = playersHTML;
        resolve(data);
      })
      .catch(error);
  });
} //done

function getSavedPlayersById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get('id');

  getByIdPlayers(idParam).then((data) => {
    console.log(data);
    let playersHTML = '';

    playersHTML += `
        <div class="row">
  <div class="col s12 m6">
    <div class="card player-card">
    <div class="card-content white-text">
    <h4>Name : <strong>${data.name}</strong></h4>
    <h4>position : <strong>${data.position}</strong></h4>
    <h4>dateOfBirth : <strong>${data.dateOfBirth.substr(0, 10)}</strong></h4>
    <h4>countryOfBirth : <strong>${data.countryOfBirth}</h4>
    <h4>Nationality : <strong>${data.nationality}</strong></h4>
    <h4>ShirtNumber : <strong>${data.shirtNumber}</strong></h4>
  </div>
    </div>
  </div>
</div>
            `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    console.log(data);
    document.getElementById('body-content').innerHTML = playersHTML;
  });
} //done

function getTeam() {
  if ('caches' in window) {
    caches.match(`${base_url}`).then((response) => {
      if (response) {
        response
          .json()
          .then((data) => {
            console.log(data);
            let teamHTML = '';
            teamHTML += `
       
      
      <div class="col s12 m7 l12">
      <div class="card">
        <div class="card-image">
          <img src="/images/profile-image.png" />
        </div>
        <div class="card-content left-align">
          <h4>based on :</h4>
          <p>${data.area.name}</p>
          <h4>name :</h4>
          <p>${data.name}</p>
          <h4>shortname :</h4>
          <p>${data.shortname}</p>
          <h4>founded :</h4>
          <p>${data.founded}</p>
          <h4>home stadium :</h4>
          <p>${data.venue}</p>
          <h4>address :</h4>
          <p>${data.address}</p>
          <h4>phone :</h4>
          <p>${data.phone}</p>
          <h4>website :</h4>
          <p>${data.website}</p>
          <h4>email :</h4>
          <p>${data.email}</p>

        </div>
      </div>
    </div>
  </div>
    
      
            `;

            document.getElementById('team').innerHTML = teamHTML;
          })
          .catch(error);
      }
    });
  }
  fetch(`${base_url}`, {
    mode: 'cors',
    headers: {
      'X-Auth-Token': token,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      let teamHTML = '';
      teamHTML += `
       
      
      <div class="col s12 m7 l12">
      <div class="card">
        <div class="card-image">
          <img src="/images/profile-image.png" />
        </div>
        <div class="card-content left-align">
          <h4>based on :</h4>
          <p>${data.area.name}</p>
          <h4>name :</h4>
          <p>${data.name}</p>
          <h4>shortname :</h4>
          <p>${data.shortname}</p>
          <h4>founded :</h4>
          <p>${data.founded}</p>
          <h4>home stadium :</h4>
          <p>${data.venue}</p>
          <h4>address :</h4>
          <p>${data.address}</p>
          <h4>phone :</h4>
          <p>${data.phone}</p>
          <h4>website :</h4>
          <p>${data.website}</p>
          <h4>email :</h4>
          <p>${data.email}</p>

        </div>
      </div>
    </div>
  </div>
    
      
            `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      console.log(data);
      document.getElementById('team').innerHTML = teamHTML;
    })
    .catch(error);
}
