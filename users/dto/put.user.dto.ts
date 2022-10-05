/**
 * Création d'une interface @PutUserDto
 * qui représente un @objet DAO(objet d'accès aux données)
 * qui modifira un utilistaeur d'accès au données dans 
 * la partie métier de l'API
 */

export interface PutUserDto {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    permissionLevel: number;
}
