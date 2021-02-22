import EventEmitter from 'eventemitter3';
import utils from '../utils';
import Planet from './Planet';
import Film from './Film';

export default class StarWarsUniverse extends EventEmitter {
    constructor() {
        super();

        this.films = [];
        this.planet = null;
    }

    static get events() {
        return {
            FILM_ADDED: 'film_added',
            UNIVERSE_POPULATED: 'universe_populated'
        }
    }

    async init() {
        const planet0 = await utils.fetchPlanets();
        const peopleData = await utils.fetchPeople();
        const planet = new Planet(planet0.name, { populationDelay: 1 }, peopleData);

        const self = this;
        planet.on('person_born', function _onPersonBorn(filmUrls) {
            const arrFilmUrls = filmUrls.filmUrls;
            arrFilmUrls.forEach(filmUrl => {
                if (!self.films.some(e => e.url === filmUrl)) {
                    const newFilm = new Film(filmUrl);
                    self.films.push(newFilm);
                    this.emit(StarWarsUniverse.events.FILM_ADDED);
                }
            });
        });
        planet.on('populating_completed', () => { this.emit(StarWarsUniverse.events.UNIVERSE_POPULATED) });

        this.planet = planet;
        planet.populate();
    }
}