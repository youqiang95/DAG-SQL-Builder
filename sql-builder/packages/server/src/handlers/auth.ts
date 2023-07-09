export class Author {
    constructor(){}

    public async auth(uid:any, token:any){
        return {
            result: 'success',
            data: {
                maxAge: 86400*1000
            },
            err: null
        }
    }
}