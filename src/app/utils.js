/**
 * Here you can define helper functions to use across your app.
 */
async function delay(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, t * 1000);
    })
};

async function fetchPlanets() {
    const planets = [];

    let response = await fetch('https://swapi.booost.bg/api/planets/');
    let data = await response.json();
    let retrievedPlanets = planets.concat(data.results);

    while (data.next) {
        response = await fetch(`${data.next}`);
        data = await response.json();
        retrievedPlanets = retrievedPlanets.concat(data.results);
    }

    return retrievedPlanets.find(planet => planet.population === '0');
}

async function fetchPeople() {
    const people = [];

    for (let index = 1; index < 11; index++) {
        let response = await fetch(`https://swapi.booost.bg/api/people/${index}`);
        let data = await response.json();
        people.push(data);
    }
    return people;
}

export default { delay, fetchPlanets, fetchPeople }