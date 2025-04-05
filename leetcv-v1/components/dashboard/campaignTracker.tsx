import { trpc } from "@utils/trpc";

export default function CampaignTracker() {
  const { data: marketingProgram } = trpc.useQuery([
    "fs.notification.marketingProgram",
  ]);

  const { data: influencerProgram } = trpc.useQuery([
    "fs.notification.influencerProgram",
  ]);

  const marketingStats = marketingProgram
    ? Object.entries(marketingProgram).map(([key, value]) => ({
        name: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: value.toString(),
      }))
    : [];
  const influencerProgramStats = influencerProgram
    ? Object.entries(influencerProgram).map(([key, value]) => ({
        name: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: value.toString(),
      }))
    : [];

  return (
    <>
      <Stats title="Campaign Tracker" stats={marketingStats} />
      <Stats title="Influencers Tracker" stats={influencerProgramStats} />
    </>
  );
}

type StatsProps = {
  title: string;
  stats: { name: string; value: string }[];
};

const Stats = ({ title, stats }: StatsProps) => {
  return (
    <>
      <div className="text-2xl font-semibold text-gray-800 my-4">{title}</div>
      <dl className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {stats.map((stat) => {
          return (
            <div
              key={stat.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 border border-gray-100"
            >
              <dt className="text-sm font-medium leading-6 text-gray-500">
                {stat.name}
              </dt>

              <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
};
