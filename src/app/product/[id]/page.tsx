// import DetailComponent from "@/components/DetailComponent";
// import exp from "constants";

import DetailComponent from "@/components/detail/DetailComponent";
import { it } from "node:test";


export type ParamProps = {
    params: {
        id: string | number;
    };
};

async function getDetail(id: string | number) {
    const productDetail = await fetch(`https://store.istad.co/api/products/${id}`);
    return productDetail.json();
}


export default async function page({ params }: ParamProps) {
    const id = params.id;
    const items = await getDetail(id);
    return (
        <div>
            <DetailComponent quantity={items.quantity} title={items.title} name={items.name} price={items.price} desc={items.desc} image={items.image} id={items.id}/>
        </div>
    )
}
