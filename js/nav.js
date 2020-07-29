document.addEventListener('DOMContentLoaded', () => {
  // Activate sidebar nav
  let sideBarElements = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideBarElements);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status != 200) return;

        // Load list menu link
        document
          .querySelectorAll('.topnav, .sidenav')
          .forEach((sideBarElement) => {
            sideBarElement.innerHTML = xhttp.responseText;
          });

        // Sign event listener for each menu link
        document
          .querySelectorAll('.sidenav a, .topnav a')
          .forEach((sideBarElement) => {
            sideBarElement.addEventListener('click', (event) => {
              //Close sidenav
              let sidenav = document.querySelector('.sidenav');
              M.Sidenav.getInstance(sidenav).close();

              //Load Called content page
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  //Load Page Content
  let page = window.location.hash.substr(1);
  if (page == '') page = 'matches';
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        const content = document.querySelector('#body-content');

        if (page === 'matches') {
          getMatches();
        }
        // } else if (page == 'saved') {
        //   getSavedArticles();
        // }

        if (page === 'team') {
          getTeam();
        }

        if (page === 'players') {
          getPlayers();
        }

        if (page === 'saved-matches') {
          getSavedMatches();
        }

        if (page === 'saved-players') {
          getSavedPlayers();
        }
        if (xhttp.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p>Ups.. halaman tidak dapat diakses</p>';
        }
      }
    };
    xhttp.open('GET', 'pages/' + page + '.html', true);
    xhttp.send();
  }
});
