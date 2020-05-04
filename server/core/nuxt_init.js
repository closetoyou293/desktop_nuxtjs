import path from 'path';
import { Nuxt, Builder } from 'nuxt';

export function Init(){
    const configNuxt = require(path.resolve('./nuxt.config.js'));
    configNuxt.dev = !(process.env.NODE_ENV === 'production');
    const nuxt = new Nuxt(configNuxt);
    
    return new Promise((res,rej) => {
        if (configNuxt.dev) {
            const builder = new Builder(nuxt);
            builder.build()
            .then(() => {
                res(nuxt);
            });
        } else {
            res(nuxt);
        }
        
    });
}