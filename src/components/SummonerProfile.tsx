import { useParams } from 'react-router-dom';

export default function SummonerProfile() {
  const { name, region } = useParams();

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <p className="font-headline text-primary text-2xl">{name}</p>
      <p className="font-label text-on-surface-variant">{region}</p>
    </main>
  );
}
