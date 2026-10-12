import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-7xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold md:text-6xl">Pagina nu există.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">Poate a fost mutată. Toate produsele sunt într-un singur loc.</p>
      <div className="mt-8">
        <Button href="/produse/">Vezi produsele</Button>
      </div>
    </div>
  );
}
