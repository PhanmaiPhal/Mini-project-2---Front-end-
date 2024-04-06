export type ProductType={
    id: number;
    name:string;
    desc?:string;
    title:string;
    image:string ;
    price: number;
    category?:string;
    quantity :number
    
}

export type ProductTypeUpdate = {
    id:number,
    name:string,
    image?: string
    price: number,
    desc?:string,
    quantity:number
    category?: {
        name: string
    }
}
