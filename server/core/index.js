import path from 'path';
import http from 'http';
import localIpV4Address from 'local-ipv4-address';

//Init
import * as Nuxt from './nuxt_init';
import * as Express from './express_init';
import * as Socket from './socket_init';
import * as Mongo from './mongodb_init';

//lib
import Log from '../lib/log';

export default class Core {
    constructor(){
        this.Config = require(path.resolve('./app.config.js'));
        this.Log = new Log();
        this.Msg = require(path.resolve(`./lang/${this.Config.lang}`));
        this.App = Express.Init(this.Config);
        this.HTTP = http.createServer(this.App);
        this.IO = Socket.Init(this.HTTP);

        
        this.DB = null;
        //List
        this.APIs = [];
        this.Routes = [];
        this.Sockets = [];
        this.Models = [];
    }
    async Run(){
        this.Log.Show('----------Build-----------')
        try {
            let MongoConect = await Mongo.Init(this);
            let BuildModel = await Mongo.BuildModel(this.Models, this);
            let BuildAPI = await Express.BuildAPI(this.APIs, this);
            let BuildIO = await Socket.BuildIO(this.Sockets, this);

            let nuxt = await Nuxt.Init();
            this.App.use(nuxt.render);
            this.DB = BuildModel

            this.HTTPStart();
            global.Server = this;
        }
        catch(e){
            this.Log.Error(e);
            this.Log.Show('--------Build Done---------')
        }
    }
    HTTPStart(){
        this.Log.Show('--------Build Done---------')
        this.HTTP.listen(process.env.PORT || this.Config.port);

        this.Log.Show(`${this.Msg.server.start}`);
        
        if(!(process.env.NODE_ENV === 'production')){
            if(this.Config.port !== '80') return this.Log.Show(`http://localhost:${this.Config.port}`);
            localIpV4Address().then((ipv4) => {
                this.Log.Show(`http://${ipv4}`);
            });
        }
    }
}