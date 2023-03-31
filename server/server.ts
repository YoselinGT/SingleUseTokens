import express,{Application} from 'express'
import token from "../routes/token";
import cors from 'cors'

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        token: '/api/singleusetoken'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8081';

        this.middleware();

        this.routes();
    }

    middleware(){

        //CORS
        this.app.use(cors());

        //Lectura del boy
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.token,token)
    }

    listen(){
        this.app.listen(this.port,()=> {
            console.log('Servidor corriendo en puerto '+this.port)
        })
    }

}

export default Server