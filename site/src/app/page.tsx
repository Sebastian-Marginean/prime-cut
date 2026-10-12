import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Aging } from "@/components/home/Aging";
import { Cuts } from "@/components/home/Cuts";
import { Platters } from "@/components/home/Platters";
import { Cheeses } from "@/components/home/Cheeses";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Aging />
      <Cuts />
      <Platters />
      <Cheeses />
      <Contact />
    </>
  );
}
