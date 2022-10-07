export interface TypesOfUsers{
    pseudo : string;
    pwd : string;
    prenom : string;
    nom : string;
    email : string;
    bio : string;
}

export interface userId extends TypesOfUsers {
    id : number;
}