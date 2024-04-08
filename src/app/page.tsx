import CardHomePage from "@/components/card/CardHomePage";
import Link from "next/link";
import { Suspense } from "react";
import LoadingComponent from "./loading";

async function fetchCard() {
  const product = await fetch("https://store.istad.co/api/products/ ")
  const res = await product.json();
  return res.results;
}

export default async function Home() {
  const cards = await fetchCard();
  return (
    <main>
      <h1 className="font-bold ml-16 mt-3 text-2xl">Product</h1>
      <div className="mx-28 mt-10 mb-2 grid  grid-cols-4  gap-5">
        <Suspense fallback={<LoadingComponent />}>
          {cards.map((item: any, index: number) => (
            <Link key={index} href={`/product/${item.id}`}>
              <CardHomePage id={item.id} price={item.price} image={item.image} name={item.name} quantity={item.quantity} title={item.title} />
            </Link>
          ))}
        </Suspense>

      </div>
    </main>
  );
}
