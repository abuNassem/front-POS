'use client'
import { getProductById } from "@/services/product"
import { useQuery } from "@tanstack/react-query"
import ProductForm from "../../components/productForm"
import { useProductForm } from "../../hooks/form/useProductForm"
import Link from "next/link"
import { MoveRight } from "lucide-react"

const ClientEdit = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['productId', id],
    queryFn: () => getProductById(id),
    enabled: !!id
  })

  const { formData, setFormData } = useProductForm(data)

  if (isLoading) return <div className="text-center mt-20 text-gray-500">جاري التحميل...</div>
  if (error || !data) return <div className="text-center mt-20 text-red-500">حدث خطأ في تحميل البيانات.</div>

  return (
    <div className="w-full pt-12 px-[100px] flex justify-center">
      <div className="w-full max-w-4xl">
      <div className=" flex justify-between">
                         <h2 className="text-xl font-bold mb-6  text-gray-800">  تعديل منتج</h2>
                    <Link
  href="/dashboard/Products"
  prefetch={true}
  className="inline-flex items-center justify-center gap-2 p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 active:scale-95 shadow-sm"
  aria-label="العودة إلى المنتجات"
>
  <MoveRight className="w-5 h-5 rtl:rotate-180" />
</Link>

                     </div>

        <ProductForm
          formData={formData}
          setFormData={setFormData}
          productId={formData?._id as string}
        />
      </div>
    </div>
  )
}

export default ClientEdit