// api.js — Data fetching layer
// Responsible for all HTTP/fetch calls to the backend

class CategoryDatabase {
    async getCategories() {
        let results = await fetch('includes/data.php');
        return results.json();
    }
}

class ProductsDatabase {
    async getProducts(category) {
        let results = await fetch('includes/sendtophp.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json; charset=utf-8'
            },
            'body': JSON.stringify(category)
        });
        return await results.json();
    }
} 

export { CategoryDatabase, ProductsDatabase };
