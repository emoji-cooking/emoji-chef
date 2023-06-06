const dotenv = require('dotenv');
const pool = require('pool');
const process = require('process');
import { Request, Response, NextFunction } from 'express';
const emojis = require('./data/emojis.json');
const { knownEmojis } = require('./data/knownEmojis');
import { Emoji } from './types';

dotenv.config();

//set up new pool for our db
const PG_URI = process.env.PG_URI;
const db = new pool({
    connectionString: PG_URI
})



const combosController = {
    getCombos: async (req : Request, res: Response, next: NextFunction) => {
        try {
            //some SQL query here to get the mashed emoji based on user inputs
        } catch (error) {
            console.log('err: ', error);
            return next({getCombos: error})
        }
    },

    getEmojis: async (req: Request, res: Response, next: NextFunction) => {
        //filter our emojis json obj to only have the emojis with unicodes from knownEmojis
        const knownFiltered = emojis.filter((obj: Emoji) => knownEmojis.includes(obj.unicode.toLowerCase().replaceAll(' ', '-')));
        
        const sql = knownFiltered.map(emoji => `(${emoji.id}, ${emoji.emoji}, ${emoji.name.replace(/ /g,"-")}, ${emoji.unicode.toLowerCase()}, ${emoji.category.name}, ${emoji.keywords}, ${emoji.version})`);
        const query = `INSERT INTO public.emoji_combos (_id, emoji, slug, unicode, category, keywords, version)`

    }
}

export {};
