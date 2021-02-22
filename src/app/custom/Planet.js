import EventEmitter from 'eventemitter3';
import utils from '../utils';
import Person from './Person';

export default class Planet extends EventEmitter {

    constructor(name, config, peopleData) {
        super();

        this.name = name;
        this.config = config;
        this.peopleData = peopleData;
        this.population = [];
    }

    static get events() {
        return {
            PERSON_BORN: 'person_born',
            POPULATING_COMPLETED: 'populating_completed'
        }
    }

    get populationCount() {
        return this.population.length;
    }

    async populate() {
        if (this.peopleData.length !== 0) {
            const element = this.peopleData.shift();
            await utils.delay(this.config.populationDelay);
            const person = new Person(element.name, element.height, element.mass);
            this.population.push(person);
            this.emit(Planet.events.PERSON_BORN, { filmUrls: element.films });
            this.populate();
        }
        else {
            this.emit(Planet.events.POPULATING_COMPLETED);
        }
    }

}
