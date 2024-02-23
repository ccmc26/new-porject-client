import { fetchBooks } from '@/app/lib/data';
import BooksForm from '@/app/ui/books/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page() {
  const books = await fetchBooks();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Create Books',
            href: '/dashboard/books/create',
            active: true,
          },
        ]}
      />
      <BooksForm books={books} />
    </main>
  );
}
