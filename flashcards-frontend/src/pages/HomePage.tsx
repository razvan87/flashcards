import CardGrid from "../components/cards/CardGrid";
import HeroCarousel from "../components/guest/HeroCarousel";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const {user, loading} = useAuth();

  if (loading) return <h2>Loading cards...</h2>;

  if (!user) return <HeroCarousel />;

  return <CardGrid />;
}