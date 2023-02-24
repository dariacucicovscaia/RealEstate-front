export default interface Page<T> {
    content: T[];
    currentPage : number;
    elementsPerPage : number;
    totalElements : number;
}
