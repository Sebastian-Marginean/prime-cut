import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Aging } from "@/components/home/Aging";
import { Cuts } from "@/components/home/Cuts";
import { Platters } from "@/components/home/Platters";
import { CustomPlatter } from "@/components/CustomPlatter";
import { Cheeses } from "@/components/home/Cheeses";
import { Reviews } from "@/components/home/Reviews";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Aging />
      <Cuts />
      <Platters />
      <CustomPlatter />
      <Cheeses />
      <Reviews />
      <Faq />
      <Contact />
    </>
  );
}
