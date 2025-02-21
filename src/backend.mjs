// Paul Darle-Felbacq

import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090') ;

export async function allMaisons() {
    const records = await pb.collection('maison').getFullList() ;
    return records
}

export async function oneID(id) {
    const Onerecords = await pb.collection('maison').getOne(id) ;
    return Onerecords
}

export async function allMaisonsFavori(){
    const Favrecords = await pb.collection('maison').getFullList({ filter :'Favori=true' }) ;
    return Favrecords
}

export async function allMaisonsSorted(){
    const Sortrecords = await pb.collection('maison').getFullList({ sort : '+prix' }) ;
    return Sortrecords
}

export async function bySurface(surface){
    const Surfacerecords = await pb.collection('maison').getFullList( { filter : `surface>${surface}` }) ;
    return Surfacerecords
}

export async function byprix(prix){
    const Pricerecords = await pb.collection('maison').getFullList( { filter : `prix>${prix}` }) ;
    return Pricerecords
}

export async function surfaceORprice(surface, price){
    const SurPricerecords = await pb.collection('maison').getFullList( { filter : `surface>${surface}` , filter : `prix<${price}` }) ;
    return SurPricerecords
}

export async function agentID(id){
    const Agentrecords = await pb.collection('agent').getOne(id) ;
    return Agentrecords
}

export async function allAgents() {
    const records = await pb.collection('agent').getFullList() ;
    return records
}

export async function getOffres(){
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
    });
    data = data.map((item) => {
        item.img = pb.files.getURL(item, item.images);
        return item;
     });
    return data;
    } catch(error){
        console.log("Une erreur est survenue en lisant la liste des maisons", error);
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await pb.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function setFavori(house) {
    await pb.collection('maison').update(house.id, {Favori: !house.Favori});
}

export async function allMaisonsByAgentId(id){
    let agentMaisonRecordsID = await pb.collection('maison').getFullList({ filter : `agent_id.id='${id}'`, expand: 'agent_id' }) ;
    agentMaisonRecordsID = agentMaisonRecordsID.map((maison) => {
        maison.imageUrl = pb.files.getURL(maison, maison.images);
        return maison;
    });
    return agentMaisonRecordsID
}