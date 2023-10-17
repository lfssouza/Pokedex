const teste = document.getElementById('pokemons')

const storedPokemonNumber = localStorage.getItem('pokemonNumber');


let offset = storedPokemonNumber

function loadPoke(offset){
    api.getPoke(offset).then((pkms) => {
        const ht = pkms.map((pk) => `
        <div class="pokemon ${pk.type}">
        <a href="index.html" class="volta"> ᐊ </a>
        <span class="name">${pk.name}</span>
        <div class="details">
                    <ol class="types">
                    ${pk.types.map((type) => `<li class="type ${pk.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pk.photo}" alt="${pk.name}">
                </div>
        </div>
        <h1 class="base">Base Stats</h1>
        <div class="all_stats">
        <ol class="statsName">
        ${pk.statsname.map((statname) => `<li class="stat_name ${pk.statname}">${statname}</li>`).join('')}    
        </ol>
        <ol class="stats">
        ${pk.stats.map((stat, index) => `<li class="stat-bar" style="width: ${stat}%; background-color: ${getBarColor(index)}">${stat}</li>`).join('')}
        </ol>
        </div>
        `).join('');
        teste.innerHTML += ht
    })
}

loadPoke(offset)

function getBarColor(index) {
    const colors = ['#2ecc71', '#e74c3c', '#9f00ed', '#b81414', '#701198', '#5353ec']; 
    return colors[index % colors.length];
}