import { redirect } from "next/navigation";

export default async function IndexPage({ params }: { params: { lang: string }; }) {
  console.log('IndexPage, params:', params);
  const { lang } = params;
  
  // redirect to products page
  return redirect(`/${lang}/topics/new`);
}
