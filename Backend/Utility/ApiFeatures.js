class ApiFeatures{
    
    constructor(query , queryStr){
        //query -> Obj of Products.find;
        //queryStr -> Obj of All Parameters
        this.query = query;
        this.queryStr = queryStr;
    }

    print(){
        console.log('this is the api features',this.queryStr,this.query);
    }
    
    search(){
        // If keyword is present search accorndingly;
        const getKey = this.queryStr.keyword ? 
        {
            //queryStr is object and keyword is propery or key and its value is stored in string.
            name:{
                $regex: this.queryStr.keyword, //Operator in Mongo 
                $options:"i", //Operator in Mongo for case in sensitive
            },
        }:{};

        this.query = this.query.find({ ...getKey }); //In Query object we have find method access it when call and return;
        return  this ;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
        
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
    }
}

module.exports = ApiFeatures;

