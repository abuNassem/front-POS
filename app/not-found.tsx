import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>الصفحة غير موجودة</h2>
      <p>عذراً، لم نتمكن من العثور على الصفحة المطلوبة.</p>
      <Link href="/">العودة للرئيسية</Link>
    </div>
  )
}