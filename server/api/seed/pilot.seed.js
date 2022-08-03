// Archivo character.seed.js

import mongoose from 'mongoose';

// Imporatmos el modelo Pet en este nuevo archivo.
import { Pilot } from '../models/Pilot.Model.js';

const pilots = [
    {
        name: 'Jack Miller',
        dorsal: 43,
        nacionality: 'Australia',
        image: 'https://photos.motogp.com/riders/a/5/a5febc67-0055-4a60-a5ec-ba061d9c1564/profile/main/43-Jack-Miller-Rider_DS_4907@1x.png'
      },
      {
        name: 'Francesco Bagnaia',
        dorsal: 63,
        nacionality: 'Italia',
        image: 'https://photos.motogp.com/riders/e/a/eac63974-aeee-4f62-81a4-f9588a47009d/profile/main/63_Francesco_Bagnaia@1x.png'
      },
      {
        name: 'Mark Marquez',
        dorsal: 93,
        nacionality: 'Spain',
        image: 'https://photos.motogp.com/riders/e/0/e03e7860-40be-4079-beef-7dd7d2ccee8a/profile/main/93_Marc_Marquez@1x.png'
      },
      {
        name: 'Pol Espargaro',
        dorsal: 44,
        nacionality: 'Spain',
        image: 'https://photos.motogp.com/riders/4/7/476655a3-3059-4902-840e-f05c2355617e/profile/main/44_Pol_Espargaro@1x.png'
      },
      {
        name: 'Aleix Espargaro',
        dorsal: 11,
        nacionality: 'Spain',
        image: 'https://photos.motogp.com/riders/1/3/131debbc-5003-4aa0-aec6-8d11d29f76b9/profile/main/41-Aleix-Espargaro-Rider_DS_5304@1x.png'
      },
      {
        name: 'Maverick Viñales',
        dorsal: 12,
        nacionality: 'Spain',
        image: 'https://photos.motogp.com/riders/2/3/23a96a16-899d-4543-bfe1-833002a446f6/profile/main/12_Maverick_Vinales_MotoGP_Rider_DS_5246@1x.png'
      },
      {
        name: 'Valentino Rossi',
        dorsal: 46,
        nacionality: 'Spain',
        
        image: 'https://photos.motogp.com/riders/e/3/e31a303a-aa26-4f46-8188-f9805042302c/profile/main/_0001_46-Valentino-Rossi%2C-Rider_A7R1639@1x.png'
      },
      {
        name: 'Fabio Quartararo',
        dorsal: 20,
        nacionality: 'Spain',
        image: 'https://photos.motogp.com/riders/6/9/69b5c348-2840-4dc1-bf7b-457c0683222c/profile/main/20-Fabio-Quartararo@1x.png'
      },
      {
        name: 'Jorge Lorenzo',
        dorsal: 99,
        nacionality: 'Spain',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkGziUre2qSglULKPnxtQWEizwf7g4sWz1XU8agbwRvvzcG6cIJcEITGtqmK1C-ELlAQ&usqp=CAU'
      },
      {
        name: 'Angel Nieto',
        dorsal: 12+1,
        nacionality: 'Spain',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HhhImgmpKKS7ipvffEaxctZkuEAkS0fr5A&usqp=CAU'
      }

];

const pilotDocuments = pilots.map(pilot => new Pilot(pilot));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
.connect('mongodb+srv://root:0810Otto0810@cluster0.ejpzh.mongodb.net/motogp?retryWrites=true&w=majority', {
  //.connect('mongodb://localhost:27017/motogp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allPilots = await Pilot.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allPilots.length) {
      await Pilot.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Pilot.insertMany(pilotDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log('OK!');
  });