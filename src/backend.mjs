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

export async function surfaceORprice(surface, price){
    const SurPricerecords = await pb.collection('maison').getFullList( { filter : `surface>${surface}` , filter : `prix<${price}` }) ;
    return SurPricerecords
}

export async function agentID(id){
    const Agentrecords = await pb.collection('agent').getOne(id) ;
    return Agentrecords
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
        console.lof("Une erreur est survenue en lisant la liste des maisons", error);
    }
}