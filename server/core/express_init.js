import _ from 'lodash';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import compression from 'compression';

const MongoStore = connectMongo(session);

export function Init(config){
    let App = express();

    App.use(cors());
    App.use(bodyParser.json({limit: '50mb'}));
    App.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    App.use(compression({ level: 9, threshold: 0 }));
    
    App.use(helmet.frameguard());
    App.use(helmet.xssFilter());
    App.use(helmet.noSniff());
    App.use(helmet.ieNoOpen());
    App.use(helmet.hsts({ maxAge: 15778476, includeSubDomains: true, force: true }));
    App.disable('x-powered-by');

    App.use(cookieParser());
    if(config.database && config.secret){
        App.use(session({
            secret: config.secret,
            resave: false,
            saveUninitialized: true,
            unset: 'destroy',
            store: new MongoStore({
                url: config.database,
                ttl: 30 * 24 * 60 * 60 //30days
            })
        }));
    }

    return App;
}

export function BuildAPI(List, Server){
    return new Promise((res, rej) => {
        let APIList = [];
        if(Array.isArray(List) == false) return rej(Server.Msg.build.api.false);
        if(List.length < 1) return res();

        List.forEach(e => {
            if(!e.name || !e.path) return rej(Server.Msg.build.api.false);

            //Check route name
            let nameCheck = _.find(APIList, (o) => { return o == e.name; });
            if(nameCheck) return rej(Server.Msg.build.api.dupe);
            APIList.push(e.name);

            //Set Api
            let Api = express.Router();
            Server.App.use(`/api/${e.name}`, Api);

            if(!e.use){
                e.path(Api);
            } else {
                Api.use((req, res, next) => {
                    e.use(req, res, next);
                });
                e.path(Api);
            }

            //Done
            if(APIList.length == List.length){
                Server.Log.Show(Server.Msg.build.api.true);
                res();
            }
        }); 
    });
}