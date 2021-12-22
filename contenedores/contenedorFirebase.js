const admin = require("firebase-admin");
const config = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "http://desafioapi-1778a.firebaseio.com"
});

const db = admin.firestore()

module.exports = class ContenedorFirebase{
  constructor(collectionName){
	  this.collection = db.collection(collectionName);
  }

  	async getById(_id){
		try{
			const doc = await this.collection.doc(_id).get();
			if(!doc.exists){
				return "No se encontró el elemento";
			}
			return {...doc.data(), _id}
		}
		catch(err){
			return {};
		}
	}

	async save(_elemento){

		const doc = await this.collection.add(_elemento);
		return doc;
	}
	
	async updateById(_elemento){

		const doc = await this.collection.doc(_elemento.id);

		const res = await doc.update(_elemento);
		
		return res;
		
	}

	async getAll(){
		const resultado = [];
		const snapshot = await this.collection.get();
		snapshot.forEach(elem => {
			resultado.push({id: elem.id, ...elem.data()});
		})

		return resultado;
	}

	async deleteById(_id){
		try{
			const doc = await this.collection.doc(_id);
			if(!await (await doc.get()).exists){
				return "No se encontró el elemento";
			}
			return await doc.delete();
		}
		catch(err){
			console.log(err)
			return {};
		}
	}

	async deleteAll(){
		const snapshot = await this.collection.get();
		snapshot.docs.forEach(elem => {
			elem.ref.delete()
		})

		return {}
	}

}

console.log("Firebase conectado correctamente");