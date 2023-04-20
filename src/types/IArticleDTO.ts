export default interface IArticleDTO {
    id: number;
    creationDate: string;
    title: string;
    description: string;
    content: string;
    firstName: string;
    lastName: string;
    externalId: number;
    isPublished: boolean;
    imagePath: string;
}