import RouteClient from "../RouteClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return <RouteClient screen={empty === "true" ? "no-circles" : "circles"} />;
}