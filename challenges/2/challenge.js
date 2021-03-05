/*
 * Normalização de estruturas
 */

/* ENUNCIADO
 *
 * Você esta montando uma nova interface e observa que seria mais prático
 * de organizar a informação se a estrutura que vem da API fosse normalizada
 * 
 * Considere que o INPUT é oque recebemos da API e o OUTPUT a forma normalizada
 * que você precisa para continuar a interface. 
 * 
 * Seu retorno deve ser derivado de INPUT e compatível com OUTPUT.
 *
 */

/*
 * [INPUT] Object
 * {
 *   "id": "6197b77e-3942-11ea-a137-2e728ce88125",
 *   "user": {
 *     "id": "6197ba94",
 *     "name": "Laura"
 *   },
 *   "reports": [
 *     {
 *       "id": "51ddf1a9",
 *       "result": {
 *         "document": "356.4325-10",
 *         "status": "em análise",
 *       }
 *     }
 *   ]
 * }
 *
 * [OUTPUT] Object
 *  {
 *   "results": {
 *     "6197b77e-3942-11ea-a137-2e728ce88125": {
 *       id: "6197b77e-3942-11ea-a137-2e728ce88125",
 *       user: "6197ba94",
 *       reports: ["51ddf1a9"]
 *     }
 *   },
 *   "users": {
 *     "6197ba94": { "id": "6197ba94", "name": "Laura" }
 *   },
 *   "reports": {
 *     "51ddf1a9": {
 *        "id": "51ddf1a9",
 *        "user": "6197ba94",
 *        "document": "356.4325-10",
 *        "status": "em análise",
 *      }
 *    }
 *  }
 */

const normalizeData = (input) =>{
    let output = {
        results:{
            [input.id]: {
                "id" : input.id,
                "user" : input.user.id,
                "reports": []
            }
        },
        users:{
            [input.user.id]: {
                "id" : input.user.id,
                "name": input.user.name
            }
        },
        reports:{}
    }

    input.reports.forEach(report => {
        output.reports[report.id] = {
            "id": report.id,
            "user": input.user.id,
            "document" : report.result.document,
            "status" : report.result.status
        };
        output.results[input.id].reports.push(report.id);
    });
    return output;
}

module.exports = normalizeData
