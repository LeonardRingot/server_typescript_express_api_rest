/**
 * Création d'une interface @CreateUserDto
 * qui représente un @objet DAO(objet d'accès aux données)
 * qui permetra de créer un utilistaeur dans 
 * la partie métier de l'API
 */

export interface CreateUserDto {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    permissionLevel?: number;
}
