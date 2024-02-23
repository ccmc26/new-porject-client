import { fetchBookById } from '@/app/lib/data';
import Form from '@/app/ui/books/edit-form';
import Breadcrumbs from '@/app/ui/books/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [book] = await Promise.all([
        fetchBookById(id),
        // fetchCustomers(),
      ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/books/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form book={book}/>
    </main>
  );
}