import { Metadata } from "next";
import ClientEdit from "./clientEdit";
import { getProductById } from "@/services/product";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    return {
      title: `تعديل: ${product?.name || "المنتج"} | لوحة التحكم`,
      description: `صفحة تعديل تفاصيل المنتج ${product?.name}. يمكنك تحديث السعر، الصور والوصف.`,
      robots: { index: false, follow: false },
    };
  } catch (error) {
    return {
      title: "تعديل المنتج",
    };
  }
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <main>
      <h1 className="sr-only">تعديل المنتج {id}</h1>
      <ClientEdit id={id} />
    </main>
  );
};

export default Page;