const api = "Psfp3XBsyMvLwL2QlEP8DNwd7rNUrmil";
let endPoint = "trending";
let type = "gifs";

const toggleType = (t) => {
    document.getElementById(type).classList.remove('active');
    document.getElementById(t).classList.add('active');
    type = t;
    populateData();
}

const toggleEndPoint = () => {
    if (endPoint === 'trending') {
        document.getElementById('search-inp').disabled = false;
        document.getElementById('search-btn').disabled = false;
        document.getElementById('search-input').style.visibility = "visible";
        document.getElementById('toggle-div').style = "position:relative; right:0px;";

        endPoint = 'search';
    } else {
        document.getElementById('search-inp').disabled = true;
        document.getElementById('search-btn').disabled = true;
        document.getElementById('search-input').style.visibility = "hidden";
        document.getElementById('toggle-div').style = "position:absolute; right:0px;";
        endPoint = 'trending';
    }
}

const fetchData = async (q) => {
    let url = `https://api.giphy.com/v1/${type}/${endPoint}?api_key=${api}`;
    if (endPoint === 'search') url += `&q=${q}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

const populateData = async () => {
    const q = document.getElementById('search-inp').value;
    const data = await fetchData(q);

    let html = "";
    for (var i of data.data) {
        const title = i.title;
        const url = i.url;
        const imgsrc = i.images.fixed_height.url;
        html +=
            `
        <div class="data">
          <a href="${url}" target="_blank">
            <img class="data-img" src="${imgsrc}" alt="${title}">
          </a>
          <div class="bottom">
          <div class="text">${title}</div>
          </div>
        </div>
        `
    }
    if (data.data.length === 0) html = "No data availabale for this search"
    document.getElementById('content').innerHTML = html;
}
populateData();

let bg = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
let bgIncMode = [1, 1, 1];
setInterval(gradientBg, 10);
function gradientBg() {
    let pos = Math.floor(Math.random() * 2.999);

    if (bg[pos] > 250 && bgIncMode[pos]) bgIncMode[pos] = 0;
    else if (bg[pos] < 20 && !bgIncMode[pos]) bgIncMode[pos] = 1;

    if (bgIncMode[pos]) bg[pos]++;
    else bg[pos]--;

    document.body.style.backgroundColor = `rgba(${bg[0]},${bg[1]},${bg[2]},1)`;
}