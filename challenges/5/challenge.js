/*
 * Paginação
 */

/* ENUNCIADO
 *
 *  Você deve escrever uma função de paginação de listas que receba o número da página e o número de itens por página como parâmetros
 *  e retorne no seguinte formato:
 * 
 * 
 *  {
        currentPage: 1,
        perPage: 10,
        total: 20,
        totalPages: 2,
        data: [
            {
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur (...)"
            },
            [...]
        ]
    }
 */

const posts = require('./posts.json')

const paginate = (data , pageNumber = 1 , itemsPerPage = 10 ) => {
    if(!Array.isArray(data)){
        throw 'Expect array and got string';
    }
    const paginateObject = {
        currentPage: 0,
        perPage: 0,
        total: data.length,
        totalPages: 0,
        data
    };


    if(itemsPerPage > paginateObject.total){
        itemsPerPage = paginateObject.total;
    }
    
    paginateObject.perPage = itemsPerPage;

    paginateObject.totalPages = Math.ceil(paginateObject.total / itemsPerPage);
    
    if(pageNumber > paginateObject.totalPages){
        pageNumber = paginateObject.totalPages;
    }
    paginateObject.currentPage = pageNumber;

    paginateObject.data = paginateObject.data.slice(
        (paginateObject.currentPage - 1) * paginateObject.perPage,
        (paginateObject.currentPage - 1) * paginateObject.perPage
        + paginateObject.perPage
    );

    return paginateObject;
}

module.exports = paginate